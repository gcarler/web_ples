import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link'; // Import Link

export const metadata: Metadata = {
  title: 'PLES', // Replaced AngularFlow with PLES
  description: 'Web page demonstrating Angular-like features with Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        {/* Optional: Add a simple Admin link for development access */}
        <div className="text-center my-4">
            <Link href="/admin/crm" className="text-sm text-muted-foreground hover:text-primary underline">
                Admin CRM View
            </Link>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
