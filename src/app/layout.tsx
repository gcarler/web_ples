
// src/app/layout.tsx
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import { Comfortaa } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatAssistant } from '@/components/ai/chat-assistant';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { CookieConsent } from '@/components/analytics/cookie-consent';

export const metadata: Metadata = {
  metadataBase: new URL('https://ples.com.co'),
  title: {
    default: 'PLES | Ciencia, Tecnología e Innovación Territorial',
    template: '%s | PLES',
  },
  description: 'Ingeniería de vanguardia: Catastro Multipropósito, Infraestructura Tecnológica Crítica, Soluciones Geoespaciales y Consultoría Territorial con SLA 99.98%.',
  keywords: [
    'PLES', 'Catastro Multipropósito', 'Infraestructura Tecnológica', 'Redes Cat6A', 'Fibra Óptica',
    'CCTV 4K', 'Datacenter', 'Sistemas de Información Geográfica', 'GIS', 'Cartagena', 'Colombia',
    'Consultoría Territorial', 'PLES TIC', 'PLES CREA', 'PLES Catastro', 'PLES Consulting'
  ],
  authors: [{ name: 'PLES S.A.S.', url: 'https://ples.com.co' }],
  creator: 'PLES S.A.S.',
  publisher: 'PLES S.A.S.',
  alternates: {
    canonical: 'https://ples.com.co',
  },
  openGraph: {
    title: 'PLES | Ciencia, Tecnología e Innovación Territorial',
    description: 'Soluciones territoriales de alto rendimiento: Catastro Multipropósito, Infraestructura TI Crítica, Ciberseguridad y Consultoría Estratégica.',
    url: 'https://ples.com.co',
    siteName: 'PLES',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PLES - Ciencia, Tecnología e Innovación Territorial',
        type: 'image/png',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PLES | Ciencia, Tecnología e Innovación Territorial',
    description: 'Soluciones territoriales de alto rendimiento: Catastro Multipropósito, Infraestructura TI Crítica y Consultoría.',
    creator: '@plesempresa',
    site: '@plesempresa',
    images: ['https://ples.com.co/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ples.com.co/#organization',
      name: 'PLES S.A.S.',
      legalName: 'PLES S.A.S.',
      url: 'https://ples.com.co',
      logo: 'https://ples.com.co/icon.png',
      description: 'Ciencia, Tecnología, Catastro Multipropósito e Infraestructura Tecnológica Crítica con SLA de Alta Disponibilidad.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Cra. 9a #33-19, La Matuna',
        addressLocality: 'Cartagena de Indias',
        addressRegion: 'Bolívar',
        addressCountry: 'CO',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+57-322-513-7924',
        contactType: 'customer service',
        email: 'contacto@ples.com.co',
        areaServed: 'CO',
        availableLanguage: ['es', 'en'],
      },
      sameAs: [
        'https://x.com/plesempresa',
        'https://www.instagram.com/plesempresa',
        'https://www.facebook.com/share/16tpHggVQZ/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ples.com.co/#website',
      url: 'https://ples.com.co',
      name: 'PLES',
      publisher: {
        '@id': 'https://ples.com.co/#organization',
      },
      inLanguage: 'es-CO',
    },
  ],
};

const comfortaa = Comfortaa({ 
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-comfortaa',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <LanguageProvider>
            <AuthProvider>
                <GoogleAnalytics />
                <Header />
                <main className="flex-grow w-full">{children}</main>
                <Footer />
                <Toaster />
                <ChatAssistant />
                <CookieConsent />
            </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
