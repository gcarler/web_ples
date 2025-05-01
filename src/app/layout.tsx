import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'; // Import Separator

export const metadata: Metadata = {
  title: 'PLES',
  description: 'Web page demonstrating Angular-like features with Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        {/* Removed container mx-auto and padding to allow child pages/layouts to control width */}
        <main className="flex-grow">{children}</main>

        {/* Development Admin Links Area - REMOVED */}
        {/* The admin links will be moved to the header and shown conditionally after login */}

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
