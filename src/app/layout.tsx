// src/app/layout.tsx
import type { PropsWithChildren } from 'react';

// This is the root layout, which is simple and language-agnostic.
// The language-specific layout is in [locale]/layout.tsx
export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
