
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from "next-themes";
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

// Moved getMessages function here to be used by the server component
async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({ children, params: {locale} }: Props) {
  // Await messages here in the Server Component
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
