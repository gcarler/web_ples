// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, ChevronDown, Globe } from 'lucide-react';
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
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { translations } from '@/lib/translations';

function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLocale: 'en' | 'es') => {
    if (newLocale === currentLocale) return;
    
    // Pathname has the locale prefix, so we need to replace it.
    // e.g. /en/about -> /es/about
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')} disabled={currentLocale === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('es')} disabled={currentLocale === 'es'}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Header now accepts locale as a prop
export function Header({ locale }: { locale: string }) {
  const { user, loading, userProfile } = useAuth();
  const auth = app ? getAuth(app) : null;
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  
  const t = translations[locale as 'en' | 'es']?.Header;

  // If translations for the current locale are not found, use a fallback.
  if (!t) {
    return null; 
  }
  
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
  
  // Navigation links are now built using the locale prop
  const navLinks = [
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/ples-crea`, label: t.plesCrea },
    { href: `/${locale}/ples-tic`, label: t.plesTic },
    { href: `/${locale}/ples-catastro`, label: t.plesCatastro },
    { href: `/${locale}/ples-consulting`, label: t.plesConsulting },
  ];

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 border-b">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="flex-shrink-0">
            <PlesGroupLogo className="text-5xl" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
           <div className="flex items-center gap-2">
               {navLinks.map((link) => {
                   const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
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
          <LanguageSwitcher currentLocale={locale} />

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
                    {t.login}
                  </span>
                </Link>
              </Button>
            )
          )}
        </div>
      </nav>
    </header>
  );
}