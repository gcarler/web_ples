// src/app/layout.tsx
import type { PropsWithChildren } from 'react';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import { Comfortaa } from "next/font/google"; // Corrected import
import { Toaster } from '@/components/ui/toaster';

// Correctly instantiate the Comfortaa font
const comfortaa = Comfortaa({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-comfortaa',
});

// This is the root layout
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
       {/* Apply the font variable to the body */}
      <body className={`${comfortaa.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                {/* Passing locale="es" as it's the default now */}
                <Header locale="es" />
                <main className="flex-grow w-full">{children}</main>
                <Footer />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
