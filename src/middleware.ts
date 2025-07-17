import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'es',

  // Disable automatic locale detection to use path-based routing only
  localeDetection: false
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};
