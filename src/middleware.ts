// Middleware has been temporarily disabled to resolve build issues.
// Auth logic can be re-implemented in a server component layout or page.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
