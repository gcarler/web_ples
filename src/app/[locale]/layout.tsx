// src/app/[locale]/layout.tsx
import type { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import {unstable_setRequestLocale} from 'next-intl/server';
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-comfortaa',
});

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

// This layout now receives the locale from the URL params directly
export default function LocaleLayout({children, params: {locale}}: Props) {
  // Although we are not using next-intl for translations anymore,
  // this function can be useful for setting the locale for other libraries
  // that might depend on it in a server environment.
  // For now, we will comment it out to ensure it's not a source of errors.
  // unstable_setRequestLocale(locale);

  return (
    // The lang attribute is set here to ensure it's on the root html tag
    <html lang={locale} suppressHydrationWarning>
      {/* Use the Comfortaa font variable */}
      <body className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                {/* Pass the locale to the Header component */}
                <Header locale={locale} />
                <main className="flex-grow w-full">{children}</main>
                <Footer />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}