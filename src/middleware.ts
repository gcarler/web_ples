// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth, Auth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// Helper function to initialize Firebase Admin SDK safely
function initializeFirebaseAdmin(): Auth | null {
    // Ensure initialization happens only once
    if (admin.apps.length > 0) {
        // console.log('Firebase Admin SDK already initialized.');
        return getAuth(admin.app());
    }
    try {
        console.log('Attempting Firebase Admin SDK initialization in middleware...');
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKeyEnv = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKeyEnv) {
            throw new Error('Missing Firebase Admin SDK environment variables.');
        }
        const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

        admin.initializeApp({
            credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        });
        console.log('Firebase Admin SDK initialized successfully in middleware.');
        return getAuth(admin.app());
    } catch (error: any) {
        console.error("Middleware: Firebase Admin SDK failed to initialize.", error.message);
        // Log the error but don't necessarily throw, allow middleware to proceed and handle auth check failure
        return null; // Return null if initialization fails
    }
}

// Attempt to initialize Firebase Admin when the module loads.
// If it fails, adminAuth will be null, and the middleware will handle it.
const adminAuth = initializeFirebaseAdmin();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL('/login', request.url); // Base URL for login redirect

  // If Firebase Admin SDK failed to initialize, block access to admin routes immediately.
  if (pathname.startsWith('/admin') && !adminAuth) {
      console.error("Middleware: Blocking admin access, Firebase Admin SDK not initialized.");
      loginUrl.searchParams.set('error', 'config_error'); // Add error param
      return NextResponse.redirect(loginUrl);
  }

  // No need to run auth checks if adminAuth is null (initialization failed)
  // Allow non-admin routes even if admin SDK init failed
  if (!adminAuth && !pathname.startsWith('/admin')) {
      return NextResponse.next();
  }
   // Handle the case where adminAuth failed but we are on a non-admin path
    if (!adminAuth && pathname !== '/login' && !pathname.startsWith('/_next') && !pathname.startsWith('/favicon.ico') && !pathname.startsWith('/api') && !pathname.startsWith('/images') ) {
         // Allow access to non-admin pages even if admin SDK fails
         // console.log('Middleware: Allowing non-admin path despite Admin SDK init failure.');
         return NextResponse.next();
    }


  // Check if the route is an admin route (paths starting with /admin)
  if (pathname.startsWith('/admin')) {
      // Check again if adminAuth is initialized, just in case
       if (!adminAuth) {
         console.error("Middleware: Blocking admin access, Firebase Admin SDK not initialized (redundant check).");
         loginUrl.searchParams.set('error', 'config_error');
         return NextResponse.redirect(loginUrl);
       }

      const token = request.cookies.get('firebaseIdToken')?.value;

      if (!token) {
          console.log('Middleware: No token found for admin route, redirecting to login.');
          return NextResponse.redirect(loginUrl);
      }

      try {
          // Verify the ID token using the initialized adminAuth
          await adminAuth.verifyIdToken(token);
          // console.log('Middleware: Token verified, allowing access to admin route.');
          return NextResponse.next(); // User is authenticated
      } catch (error) {
          console.error('Middleware: Invalid or expired token for admin route, redirecting to login.', error);
          const response = NextResponse.redirect(loginUrl);
          // Clear invalid cookie on redirect
          response.cookies.set('firebaseIdToken', '', { path: '/', maxAge: -1 });
          return response;
      }
  }

  // Allow all other requests (non-admin routes)
  return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  // IMPORTANT: Middleware needs Node.js runtime because firebase-admin uses Node.js APIs
  runtime: 'nodejs',
  // Matcher defines which paths the middleware runs on.
  // Apply to all admin routes.
  // Exclude public files (_next/static, images, favicon.ico) and API routes.
  // Also exclude the login page itself to avoid redirect loops.
  matcher: [
    '/admin/:path*', // Matches all routes under /admin/
    // The matcher below might be too broad if you only want to protect /admin
    // '/((?!api|_next/static|_next/image|favicon.ico|login).*)', // Example of broader matcher excluding specifics
    // Let's stick to just protecting /admin/* for now
  ],
};
