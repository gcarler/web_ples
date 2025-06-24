
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
import React, { useState, useEffect, useRef } from 'react';

export function Header() {
  const { user, loading, userProfile } = useAuth(); // Added userProfile for logout message
  const auth = getAuth(app);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Sobre nosotros" },
    { href: "/ples-crea", label: "Ples CREA" },
    { href: "/ples-tic", label: "Ples TIC" },
    { href: "/ples-catastro", label: "Ples catastro" },
    { href: "/ples-consulting", label: "Ples consulting" },
    { href: "/forms", label: "Contáctenos" },
  ];

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    top: 0, 
    height: 2, 
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = navLinks.findIndex(link => pathname.startsWith(link.href) && (link.href === "/" ? pathname === "/" : true));

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

  const updateIndicator = React.useCallback((element: HTMLElement | null, isHover: boolean = false) => {
    if (element && navContainerRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = element.getBoundingClientRect();
      const indicatorHeight = 2; 

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
        top: navRect.height - indicatorHeight, 
        height: indicatorHeight,
      });
    } else if (!isHover) {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0, width: 0 })); 
    }
  }, []);

  useEffect(() => {
    const allRefsReady = linkRefs.current.every(ref => ref !== null);
    if (allRefsReady && activeIndex !== -1 && linkRefs.current[activeIndex]) {
       requestAnimationFrame(() => {
         if (linkRefs.current[activeIndex]) {
            updateIndicator(linkRefs.current[activeIndex]);
         }
       });
    } else {
       requestAnimationFrame(() => {
         setIndicatorStyle(prev => ({ ...prev, opacity: 0, width: 0 }));
       });
    }
  }, [pathname, activeIndex, updateIndicator]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (linkRefs.current[index]) {
      updateIndicator(linkRefs.current[index], true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      updateIndicator(linkRefs.current[activeIndex]);
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0, width: 0 }));
    }
  };

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 border-b">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <PlesGroupLogo className="h-7" />
          </Link>
          
          <div ref={navContainerRef} className="relative hidden md:flex items-center h-10">
            <ul
              className="flex items-center space-x-1 h-full"
              onMouseLeave={handleMouseLeave}
            >
              {navLinks.map((link, index) => {
                const isActualActive = activeIndex === index;
                const isVisuallyActive = (isActualActive && hoveredIndex === null) || hoveredIndex === index;

                return (
                  <li key={link.href} className="h-full flex items-center">
                    <Link
                      href={link.href}
                      ref={el => (linkRefs.current[index] = el)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium flex items-center h-8",
                        "transition-colors duration-300 ease-in-out",
                        isVisuallyActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                      )}
                      style={{ zIndex: 1 }} 
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span
              className="absolute bg-primary pointer-events-none transition-[left,width,opacity] duration-300 ease-in-out rounded-full"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
                zIndex: 0, 
              }}
            />
          </div>
        </div>
        
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

        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
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
                            pathname.startsWith(link.href) && (link.href === "/" ? pathname === "/" : true) && "bg-accent text-accent-foreground font-semibold"
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
