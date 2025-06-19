// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { ThemeToggle } from "@/components/theme-toggle";
import { PlesGroupLogo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import React from 'react'; // Import React for useState

export function Header() {
  const { user, loading } = useAuth();
  const auth = getAuth(app);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  // const [desktopNavVisible, setDesktopNavVisible] = React.useState(true); // No longer needed for desktop

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
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
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Sobre nosotros" },
    { href: "/ples-crea", label: "Ples CREA" },
    { href: "/ples-tic", label: "Ples TIC" },
    { href: "/ples-catastro", label: "Ples catastro" },
    { href: "/ples-consulting", label: "Ples consulting" },
    { href: "/forms", label: "Contáctenos" },
  ];

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 shadow-sm">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4"> {/* Container for logo and nav links */}
          <Link href="/" className="flex-shrink-0">
            <PlesGroupLogo className="h-7" />
          </Link>
          
          {/* Desktop Navigation Links - Always visible */}
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname === link.href ? "text-primary font-semibold" : "text-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Desktop Controls (Theme, Auth) - Pushed to the right */}
        <div className="hidden md:flex items-center space-x-2">
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
              <Button variant="outline" size="sm" asChild className="rounded-md">
                <Link href="/login">
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar sesión
                  </span>
                </Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile Navigation Trigger & Controls */}
        <div className="md:hidden flex items-center">
          <ThemeToggle /> {/* Theme toggle can be outside sheet for quick access on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2"> {/* Added ml-2 for spacing */}
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0 flex flex-col bg-card">
              <div className="p-4 flex justify-between items-center border-b border-border">
                <SheetClose asChild>
                   <Link href="/" className="flex-shrink-0">
                     <PlesGroupLogo className="h-6" />
                   </Link>
                </SheetClose>
              </div>
              
              <div className="flex-grow p-4 space-y-3 overflow-y-auto">
                <ul className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-2.5 px-3 rounded-md text-base hover:bg-accent hover:text-accent-foreground transition-colors",
                            pathname === link.href && "bg-accent text-accent-foreground font-semibold"
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div className="p-4 space-y-4 mt-auto border-t border-border">
                {/* Theme toggle already outside, or can be duplicated here if preferred */}
                {/* <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <ThemeToggle />
                </div> */}
                <div className="pt-2">
                  {!loading && (
                    user ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Panel
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={5} className="w-56">
                          <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                           <SheetClose asChild>
                            <Link href="/admin/dashboard">
                              <span className="flex items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                              </span>
                            </Link>
                           </SheetClose>
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
                      <SheetClose asChild>
                        <Button variant="default" className="w-full" asChild>
                          <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Iniciar sesión
                          </Link>
                        </Button>
                      </SheetClose>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
