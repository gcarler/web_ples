// This component is now very simple because the logic is moved to the [locale] layout.
import type { PropsWithChildren } from 'react';

// Since this is a root layout, it needs the html and body tags.
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
