// src/app/admin/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PLES Admin',
  description: 'Admin section for PLES application',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed container mx-auto to allow full width for admin pages
    <div className="w-full">
      {children}
    </div>
  );
}
