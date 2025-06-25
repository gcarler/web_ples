'use client';

import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: PropsWithChildren) {
  const pathname = usePathname();
  // Hide footer on full-screen pages like login, register, etc. for a cleaner UI.
  const noFooterRoutes = ['/login', '/register', '/forgot-password', '/forms'];
  const showFooter = !noFooterRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="flex-grow w-full">{children}</main>
            {showFooter && <Footer />}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
