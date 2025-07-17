// src/app/[locale]/layout.tsx
import { Inter } from "next/font/google";
import type { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export default function LocaleLayout({children, params: {locale}}: Props) {
  return (
    // The lang attribute is set here to ensure it's on the root html tag
    <html lang={locale} suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col antialiased bg-background text-foreground ${inter.className}`}>
        <LanguageProvider>
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
        </LanguageProvider>
      </body>
    </html>
  );
}
