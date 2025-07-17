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
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `.` (e.g. `/_next/static`)
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … the ones for the admin panel
  matcher: ['/((?!api|_next|.*\\..*|admin).*)']
};
