// src/app/layout.tsx
import type { PropsWithChildren } from 'react';
import './globals.css';

// This is now a pass-through layout. The main structure is in [locale]/layout.tsx
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body>
          {children}
      </body>
    </html>
  );
}
