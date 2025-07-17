// src/app/[locale]/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

// This layout is now minimal and just sets the language for the server.
// The main layout structure is in src/app/layout.tsx
export default function LocaleLayout({children, params: {locale}}: Props) {
  // The call to unstable_setRequestLocale was removed as next-intl is no longer used.
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
