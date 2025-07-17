// src/app/[locale]/layout.tsx
import type { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { locales } from '@/i18n';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import { Comfortaa } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';

const comfortaa = Comfortaa({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-comfortaa',
});

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

// This is the main layout for internationalized pages
export default function LocaleLayout({children, params: {locale}}: Props) {

  return (
    <div lang={locale} className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Header locale={locale} />
                <main className="flex-grow w-full">{children}</main>
                <Footer />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    </div>
  );
}
