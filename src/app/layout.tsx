// src/app/layout.tsx
import type { PropsWithChildren } from 'react';
import './globals.css';

// This is the root layout, it's very simple.
// It applies to all routes, including those not using i18n.
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // The lang attribute will be managed by the [locale] layout
    <html suppressHydrationWarning>
      <body>
          {children}
      </body>
    </html>
  );
}
