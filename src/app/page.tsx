// src/app/page.tsx
'use client'

import HomePageClient from './home/home-page-client';

export default function Home() {
  // This is the root page, which won't have a locale parameter.
  // We'll render the client component with a default locale.
  // The middleware will redirect to /es or /en anyway for the user.
  return <HomePageClient locale="es" />;
}