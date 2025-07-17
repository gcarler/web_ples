// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) {
        return defaultLocale;
    }

    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const lang of languages) {
        if (locales.includes(lang)) {
            return lang;
        }
        // Handle cases like en-US -> en
        const baseLang = lang.split('-')[0];
        if (locales.includes(baseLang)) {
            return baseLang;
        }
    }
    
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for specific paths like API routes, static files, etc.
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.startsWith('/admin') || // Exclude all admin routes
        pathname.includes('.') // Exclude files with extensions
    ) {
        return NextResponse.next();
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    
    return Response.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
    ],
};
