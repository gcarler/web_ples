// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth, Auth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import { UserProfile, UserRole, ROLES, hasPermission } from '@/lib/models/user'; // Import user models and permissions
import { adminDb } from '@/lib/firebase/firebase-admin-config'; // Use existing admin init
import { Timestamp } from 'firebase/firestore';

// Helper function to get user profile from Firestore
async function getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
        const userDocRef = adminDb.collection('users').doc(uid);
        const docSnap = await userDocRef.get();
        if (docSnap.exists) {
            const data = docSnap.data() as any; // Cast needed for timestamp conversion
             // Basic timestamp conversion (might need more robust handling)
             if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                 data.createdAt = data.createdAt.toDate();
             }
             if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
                 data.updatedAt = data.updatedAt.toDate();
             }
             // Convert back to Firestore Timestamps for schema validation
            return {
                ...data,
                uid: uid,
                 createdAt: data.createdAt instanceof Date ? Timestamp.fromDate(data.createdAt) : data.createdAt,
                 updatedAt: data.updatedAt instanceof Date ? Timestamp.fromDate(data.updatedAt) : data.updatedAt,
             } as UserProfile;
        }
        return null;
    } catch (error) {
        console.error("Middleware: Error fetching user profile:", error);
        return null;
    }
}


// Mapping of admin routes to required permissions
const routePermissions: Record<string, string> = {
    '/admin/dashboard': 'view_dashboard',
    '/admin/crm': 'manage_crm',
    '/admin/crm/opportunities': 'manage_crm',
    '/admin/erp/products': 'manage_erp',
    '/admin/erp/orders': 'manage_erp',
    '/admin/bpm/processes': 'view_bpm', // Assuming view_bpm allows viewing list
    '/admin/users': 'manage_users',
    '/admin/users/new': 'manage_users',
    // Add more specific routes if needed, e.g., /admin/erp/orders/[id] might require 'manage_erp'
};

// Function to check permission for a given path
function checkRoutePermission(role: UserRole | undefined | null, pathname: string): boolean {
    if (!role) return false; // No role, no access

    // Allow admin access to everything
    if (role === 'admin') return true;

    // Find the permission required for the specific or base path
    let requiredPermission: string | undefined = undefined;
    for (const route in routePermissions) {
        // Check for exact match or if the path starts with a defined route base
        if (pathname === route || pathname.startsWith(route + '/')) {
            requiredPermission = routePermissions[route];
            break;
        }
    }

    // If no specific permission is defined for the route, deny access by default for safety
    if (!requiredPermission) {
        console.warn(`Middleware: No permission defined for route: ${pathname}. Denying access.`);
        return false;
    }

    // Check if the user's role has the required permission
    return hasPermission(role, requiredPermission);
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/login', request.url); // Base URL for login redirect
  const dashboardUrl = new URL('/admin/dashboard', request.url); // Default admin page
  const forbiddenUrl = new URL('/403', request.url); // Create a 403 Forbidden page if needed

  // Check if the route is an admin route
  if (pathname.startsWith('/admin')) {
      // Firebase Admin SDK should already be initialized via firebase-admin-config.ts
      let adminAuthInstance: Auth | null = null;
      try {
          adminAuthInstance = getAuth(admin.app());
      } catch (e) {
           console.error("Middleware: Firebase Admin SDK not initialized.", e);
           loginUrl.searchParams.set('error', 'config_error');
           return NextResponse.redirect(loginUrl);
      }

      const token = request.cookies.get('firebaseIdToken')?.value;

      if (!token) {
          console.log('Middleware: No token found for admin route, redirecting to login.');
          return NextResponse.redirect(loginUrl);
      }

      try {
          // Verify the ID token
          const decodedToken = await adminAuthInstance.verifyIdToken(token);
          const uid = decodedToken.uid;

          // Fetch user profile to get the role
          const userProfile = await getUserProfile(uid);

          if (!userProfile) {
              console.warn(`Middleware: User profile not found for UID ${uid}. Redirecting to login.`);
              const response = NextResponse.redirect(loginUrl);
              response.cookies.set('firebaseIdToken', '', { path: '/', maxAge: -1 }); // Clear cookie
              return response;
          }

          // Check if the user's role has permission for the requested route
          if (!checkRoutePermission(userProfile.role, pathname)) {
              console.warn(`Middleware: User ${uid} (${userProfile.role}) does not have permission for ${pathname}. Redirecting.`);
              // Redirect to dashboard or a dedicated 'forbidden' page
              // For simplicity, redirecting to dashboard for now
              return NextResponse.redirect(dashboardUrl); // Or forbiddenUrl
          }

          // User is authenticated and has permission
          // console.log(`Middleware: User ${uid} (${userProfile.role}) allowed access to ${pathname}.`);
          return NextResponse.next();

      } catch (error) {
          console.error('Middleware: Invalid or expired token for admin route, redirecting to login.', error);
          const response = NextResponse.redirect(loginUrl);
          response.cookies.set('firebaseIdToken', '', { path: '/', maxAge: -1 }); // Clear invalid cookie
          return response;
      }
  }

  // Allow all other requests (non-admin routes)
  return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  // Use Node.js runtime because firebase-admin requires it
  runtime: 'nodejs',
  matcher: [
    '/admin/:path*', // Apply middleware to all routes under /admin/
    // Exclude API routes, static files, image optimization files etc. by convention
    // '/((?!api|_next/static|_next/image|favicon.ico|login).*)', // This matcher might be too broad if login isn't excluded properly
  ],
};
