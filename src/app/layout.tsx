// src/app/layout.tsx
import type { PropsWithChildren } from 'react';
import './globals.css'; // Use relative path to globals.css
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import { Comfortaa } from "next/font/google";
import { Toaster } from '@/components/ui/toaster';

const comfortaa = Comfortaa({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-comfortaa',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
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
