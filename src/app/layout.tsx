import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'; // Import Separator
import { AuthProvider } from '@/contexts/AuthContext'; // Import AuthProvider
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'PLES',
  description: 'Web page demonstrating Angular-like features with Next.js.',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning for next-themes */}
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <AuthProvider> {/* Wrap content with AuthProvider */}
            <Header />
            {/* main tag should allow children to dictate their own width and padding strategy */}
            <main className="flex-grow w-full">{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
