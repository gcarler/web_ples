// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { user, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
      toast({
        title: 'Logged Out',
        description: `Successfully logged out (Mock).`,
      });
      router.push(`/login`);
  };

  const navLinks = [
    { href: `/about`, label: t.Header.about },
    { href: `/ples-crea`, label: "PLES CREA" },
    { href: `/ples-tic`, label: "PLES TIC" },
    { href: `/ples-catastro`, label: "PLES Catastro" },
    { href: `/ples-consulting`, label: "PLES Consulting" },
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 px-0 font-bold text-xs">
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('es')}>ES</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>EN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                <Link href={`/login`}>
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t.Header.login}
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
