import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'; // Import Separator

export const metadata: Metadata = {
  title: 'PLES',
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

        {/* Development Admin Links Area */}
        <div className="text-center my-6 px-4">
            <p className="text-xs text-muted-foreground mb-2">Admin Sections (Dev)</p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                 <Link href="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary underline">
                    Dashboard
                </Link>
                 <Separator orientation="vertical" className="h-4 bg-border" />
                <Link href="/admin/crm" className="text-sm text-muted-foreground hover:text-primary underline">
                    CRM Contacts
                </Link>
                 <Separator orientation="vertical" className="h-4 bg-border" />
                <Link href="/admin/crm/opportunities" className="text-sm text-muted-foreground hover:text-primary underline">
                    CRM Opportunities
                </Link>
                <Separator orientation="vertical" className="h-4 bg-border" />
                 <Link href="/admin/erp/products" className="text-sm text-muted-foreground hover:text-primary underline">
                    ERP Products
                </Link>
                 <Separator orientation="vertical" className="h-4 bg-border" />
                 <Link href="/admin/erp/orders" className="text-sm text-muted-foreground hover:text-primary underline">
                    ERP Orders
                </Link>
                 <Separator orientation="vertical" className="h-4 bg-border" />
                 <Link href="/admin/bpm/processes" className="text-sm text-muted-foreground hover:text-primary underline">
                    BPM Processes
                </Link>
            </div>
        </div>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
