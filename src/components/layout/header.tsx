// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, ChevronDown, FlaskConical } from 'lucide-react';
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

export function Header() {
  const { user, loading, userProfile } = useAuth(); // Added userProfile for logout message
  const auth = getAuth(app);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
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
      { href: "/about", label: "Sobre Nosotros" },
      { href: "/ples-crea", label: "PLES CREA" },
      { href: "/ples-tic", label: "PLES TIC" },
      { href: "/ples-catastro", label: "PLES Catastro" },
      { href: "/ples-consulting", label: "PLES Consulting" },
      { href: "/labs", label: "Labs" },
  ];

  const pilarLinks = [
      { href: "/porque-somos-ciencia", label: "Ciencia" },
      { href: "/porque-somos-tecnologia", label: "Tecnología" },
      { href: "/porque-somos-innovacion", label: "Innovación" },
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
                   const isActive = pathname.startsWith(link.href);
                   return (
                       <Link
                           key={link.href}
                           href={link.href}
                           className={cn(
                               "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                               isActive
                                 ? "bg-primary text-primary-foreground"
                                 : "text-foreground hover:text-primary"
                           )}
                           aria-current={isActive ? "page" : undefined}
                       >
                           {link.label}
                       </Link>
                   );
               })}
               
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-foreground hover:text-primary data-[state=open]:bg-muted">
                        Pilares <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {pilarLinks.map((link) => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
           </div>
          
          <ThemeToggle />
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
                    Iniciar sesión
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
