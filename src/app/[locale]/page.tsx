// src/app/[locale]/page.tsx
'use client'

import HomePageClient from '../home/home-page-client';

// This page component will receive the `locale` from the URL params
export default function LocalePage({ params }: { params: { locale: string } }) {
  // Pass the detected locale as a prop to the client component
  return <HomePageClient locale={params.locale} />;
}