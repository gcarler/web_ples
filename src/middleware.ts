// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth'; // Use Admin SDK for server-side auth check
import { initializeAdminApp } from './lib/firebase/firebase-admin-init'; // Import the initializer

// Initialize Firebase Admin SDK conditionally (important for server environments)
// This initialization must happen before the middleware function uses the SDK.
// Ensure firebase-admin-init.ts only initializes once.
initializeAdminApp();


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
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // Allow access to public routes without authentication check
  if (isPublicRoute) {
      return NextResponse.next();
  }


  // Check if the current path starts with any of the admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute) {
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
      console.error('Middleware: Invalid token, redirecting to login.', error);
       // Clear the invalid cookie if needed (optional)
       const response = NextResponse.redirect(new URL('/login', request.url));
       response.cookies.set('firebaseIdToken', '', { maxAge: -1 });
      return response;
    }
  }

  // If the route is not explicitly public and not admin, allow access (or define other rules)
  // For now, let's allow other routes - adjust if needed
  return NextResponse.next();
}

// Force Node.js runtime for this middleware
export const runtime = 'nodejs';

// Removed the config object entirely to simplify and rely solely on the runtime export.
// By default, middleware applies to all paths unless a matcher is specified.
// The logic inside the middleware now handles which paths require auth.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - login (the login page itself)
//      */
//     // '/((?!api|_next/static|_next/image|favicon.ico|login).*)', // This complex regex might be causing issues
//      // Explicitly include admin routes if the negative lookahead isn't sufficient
//      '/admin/:path*',
//   ],
// };
