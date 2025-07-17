// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, ChevronDown, FlaskConical, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { useToast } from '@/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlesGroupLogo } from '@/components/logo';
import React from 'react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // The path will be like /es/about, so we need to remove the current locale
      const newPath = pathname.startsWith(`/${locale}`) ? pathname.substring(3) : pathname;
      router.replace(`/${nextLocale}${newPath}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" disabled={isPending}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSelectChange('en')} disabled={locale === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange('es')} disabled={locale === 'es'}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function Header() {
  const { user, loading, userProfile } = useAuth(); // Added userProfile for logout message
  const auth = app ? getAuth(app) : null;
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Header');


  const handleLogout = async () => {
    if (!auth) {
        toast({
            title: "Logout Failed",
            description: "Firebase is not configured.",
            variant: "destructive",
        });
        return;
    }
    try {
      await signOut(auth);
      document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast({
        title: 'Logged Out',
        description: `Successfully logged out ${userProfile?.email || ''}.`,
      });
      router.push('/login'); 
    } catch (error) {
      console.error('Logout Error:', error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
    const navLinks = [
      { href: "/about", label: t('about') },
      { href: "/ples-crea", label: "PLES CREA" },
      { href: "/ples-tic", label: "PLES TIC" },
      { href: "/ples-catastro", label: "PLES Catastro" },
      { href: "/ples-consulting", label: "PLES Consulting" },
  ];

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 border-b">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <PlesGroupLogo className="text-5xl" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
           {/* Desktop Navigation */}
           <div className="flex items-center gap-2">
               {navLinks.map((link) => {
                   const isActive = pathname.includes(link.href);
                   return (
                       <Link
                           key={link.href}
                           href={link.href}
                           className={cn(
                               "nav-link-underline relative px-3 py-2 text-sm font-medium transition-colors",
                               isActive
                                 ? "text-primary active"
                                 : "text-foreground hover:text-primary"
                           )}
                           aria-current={isActive ? "page" : undefined}
                       >
                           {link.label}
                       </Link>
                   );
               })}
           </div>
          
          <ThemeToggle />
          <LanguageSwitcher />
          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-md">Admin</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">
                      <span className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                     <span className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                     </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="accent" size="sm" asChild className="rounded-md">
                <Link href="/login">
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t('login')}
                  </span>
                </Link>
              </Button>
            )
          )}
            {/* Add a mobile menu trigger here if needed */}
        </div>
      </nav>
    </header>
  );
}
