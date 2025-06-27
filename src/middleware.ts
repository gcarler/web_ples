// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from './lib/firebase/firebase-admin-config';
import { UserProfile, hasPermission } from './lib/models/user';

// This function will run for every request that matches the `matcher` config below.
export async function middleware(request: NextRequest) {
  // 1. Get the Firebase session token from the cookies.
  const token = request.cookies.get('firebaseIdToken')?.value;

  // 2. If no token is found, redirect to the login page.
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Optionally, add a redirect parameter to send the user back after login.
    loginUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Verify the token with the Firebase Admin SDK.
  try {
    // This will throw an error if the token is invalid or expired.
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // 4. Extract the user's role from the token.
    // We default to 'read_only' if the role is not explicitly set in the token.
    const userRole = (decodedToken.role as UserProfile['role']) || 'read_only';

    // 5. Check if the user has the basic permission to view the dashboard.
    // If not, redirect them to a "Forbidden" page.
    if (!hasPermission(userRole, 'view_dashboard')) {
        const forbiddenUrl = new URL('/403', request.url);
        return NextResponse.redirect(forbiddenUrl);
    }
    
    // 6. If the token is valid and the user has permission, allow the request to proceed.
    return NextResponse.next();

  } catch (error) {
    // If token verification fails, clear the invalid cookie and redirect to login.
    console.error('Middleware Error: Invalid or expired token.', error);
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    // Clear the problematic cookie.
    response.cookies.set('firebaseIdToken', '', { maxAge: -1 });
    return response;
  }
}

// Configuration to specify which paths this middleware should run on.
export const config = {
  // Use Node.js runtime because firebase-admin requires it.
  runtime: 'nodejs',
  // Apply middleware to all routes under the /admin/ path.
  matcher: [
    '/admin/:path*',
  ],
};
