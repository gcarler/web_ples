'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, ChevronDown, ExternalLink, Menu, X, Activity } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
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
import { LanguageSelector } from "@/components/language-selector";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === 'loading';
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname === '/login' || pathname?.startsWith('/login')) {
    return null;
  }

  const handleLogout = async () => {
      await signOut({ callbackUrl: '/login' });
  };

  const navLinks = [
    { href: "/about", label: t.Header.about },
    { href: "/ples-crea", label: "PLES CREA" },
    { href: "/ples-tic", label: "PLES TIC" },
    { href: "/ples-catastro", label: "PLES Catastro" },
    { href: "/ples-consulting", label: "PLES Consulting" },
    { 
      href: "/brochureples/", 
      label: language === 'en' ? "Tech Catalog" : "Catálogo TI",
      isExternal: true 
    },
  ];

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 border-b">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <PlesGroupLogo className="text-5xl" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
           <div className="flex items-center gap-1">
               {navLinks.map((link) => {
                   if (link.isExternal) {
                     return (
                       <a
                         key={link.href}
                         href={link.href}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="nav-link-underline relative px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                       >
                         <span>{link.label}</span>
                         <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                       </a>
                     );
                   }

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
          
          <LanguageSelector />

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
                    {t.Header.login}
                  </span>
                </Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="p-2"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </a>
                );
              }

              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t">
            {!loading && (
              user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard Admin
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <Button variant="accent" size="sm" asChild className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t.Header.login}
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
