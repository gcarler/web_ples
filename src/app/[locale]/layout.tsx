// src/app/[locale]/layout.tsx
import type { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export default function LocaleLayout({children, params: {locale}}: Props) {
  return (
    // The lang attribute is set here to ensure it's on the root html tag
    <html lang={locale} suppressHydrationWarning>
      {/* The className no longer includes a font, so it defaults to what's in globals.css */}
      <body className={`min-h-screen flex flex-col antialiased bg-background text-foreground`}>
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
      </body>
    </html>
  );
}
