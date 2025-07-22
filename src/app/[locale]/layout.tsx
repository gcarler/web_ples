import type { PropsWithChildren } from 'react';
import '../globals.css'; // Use relative path to globals.css
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import { Comfortaa } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const comfortaa = Comfortaa({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-comfortaa',
});

interface LocaleLayoutProps extends PropsWithChildren {
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    <Header />
                    <main className="flex-grow w-full">{children}</main>
                    <Footer />
                    <Toaster />
                </AuthProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
