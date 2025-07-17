
'use client';

import '../globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export default function LocaleLayout({ children, params: {locale} }: Props) {
  const pathname = usePathname();
  // Hide header and footer on full-screen pages like login, register, etc. for a cleaner UI.
  const noLayoutRoutes = ['/login', '/register', '/forgot-password', '/forms', '/footer'];
  const showHeader = !noLayoutRoutes.some(route => pathname.includes(route));
  const showFooter = !noLayoutRoutes.some(route => pathname.includes(route));
  const messages = useMessages();


  return (
    // The suppressHydrationWarning is needed because of next-themes
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
            <AuthProvider>
              {showHeader && <Header />}
              <main className="flex-grow w-full">{children}</main>
              {showFooter && <Footer />}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
