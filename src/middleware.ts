// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: The original authentication logic has been commented out to prevent
// startup errors when the Firebase Admin SDK is not configured.
// This means the admin panel is currently not secure.
// To re-enable security, provide your Firebase Admin credentials in a `.env.local`
// file and restore the original contents of this file from version history.

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Use Node.js runtime because firebase-admin requires it
  runtime: 'nodejs',
  matcher: [
    '/admin/:path*', // Apply middleware to all routes under /admin/
  ],
};
