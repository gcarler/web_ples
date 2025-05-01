// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth'; // Use Admin SDK for server-side auth check
import { initializeAdminApp } from './lib/firebase/firebase-admin-init'; // Import the initializer

// Attempt to initialize Firebase Admin SDK
// This needs to run successfully for the middleware to use getAuth()
let adminInitialized = false;
try {
    initializeAdminApp();
    adminInitialized = true;
} catch (error: any) {
    console.error("Middleware: Firebase Admin SDK failed to initialize. Auth checks will fail.", error.message);
    // Depending on the desired behavior, you could redirect all admin routes immediately,
    // or let the auth check fail later. We'll log the error here.
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define admin routes that require authentication
  const adminRoutes = ['/admin', '/admin/dashboard', '/admin/crm', '/admin/erp', '/admin/bpm'];

  // Define public routes that should not be checked by this middleware
  const publicRoutes = ['/login', '/forms', '/about', '/ples-crea', '/ples-tic', '/ples-catastro', '/ples-consulting', '/'];

  // Check if it's an API route or internal Next.js route
   if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
       return NextResponse.next();
   }
    // Check if it's a public asset like favicon or images
   if (pathname.match(/\.(ico|png|jpg|jpeg|svg)$/)) {
        return NextResponse.next();
    }

  // Check if the current path is one of the defined public routes
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname === '/'); // Ensure root path '/' is public

  // Allow access to public routes without authentication check
  if (isPublicRoute) {
      return NextResponse.next();
  }

  // Check if the current path starts with any of the admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute) {
    // Check if admin SDK initialized properly before attempting to use it
    if (!adminInitialized) {
        console.error("Middleware: Cannot verify token because Firebase Admin SDK failed to initialize.");
        // Redirect to login or show an error page
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('error', 'config_error');
        return NextResponse.redirect(loginUrl);
    }

    const token = request.cookies.get('firebaseIdToken')?.value; // Assuming you store the ID token in a cookie

    if (!token) {
      console.log('Middleware: No token found for admin route, redirecting to login.');
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
      console.error('Middleware: Invalid or expired token, redirecting to login.', error);
       // Clear the invalid cookie if needed (optional)
       const response = NextResponse.redirect(new URL('/login', request.url));
       response.cookies.set('firebaseIdToken', '', { maxAge: -1 });
      return response;
    }
  }

  // If the route is not explicitly public and not admin, allow access (or define other rules)
  return NextResponse.next();
}

// Force Node.js runtime for this middleware
// This is crucial because firebase-admin uses Node.js APIs.
export const config = {
    runtime: 'nodejs', // Correct way to specify runtime in Next.js 13+ App Router middleware
};
