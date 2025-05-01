// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth'; // Use Admin SDK for server-side auth check
import { initializeAdminApp } from './lib/firebase/firebase-admin-init'; // Helper to init admin app

initializeAdminApp(); // Ensure admin app is initialized

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define admin routes that require authentication
  const adminRoutes = ['/admin', '/admin/dashboard', '/admin/crm', '/admin/erp', '/admin/bpm'];

  // Check if the current path starts with any of the admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute) {
    const token = request.cookies.get('firebaseIdToken')?.value; // Assuming you store the ID token in a cookie

    if (!token) {
      console.log('Middleware: No token found, redirecting to login.');
       // Use absolute URL for redirection
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the ID token using Firebase Admin SDK
      await getAuth().verifyIdToken(token);
      // console.log('Middleware: Token verified, allowing access.');
      return NextResponse.next(); // User is authenticated, proceed
    } catch (error) {
      console.error('Middleware: Invalid token, redirecting to login.', error);
       // Clear the invalid cookie if needed (optional)
       const response = NextResponse.redirect(new URL('/login', request.url));
       response.cookies.set('firebaseIdToken', '', { maxAge: -1 });
      return response;
    }
  }

  // Allow access to non-admin routes
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (the login page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
     // Explicitly include admin routes if the negative lookahead isn't sufficient
     '/admin/:path*',
    ],
};
