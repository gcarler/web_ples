// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlesGroupLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { ThemeToggle } from "@/components/theme-toggle";
import { RotatingHeroText, type HeroStatement } from './rotating-hero-text'; // Import the new component

export function Header() {
  const { user, loading } = useAuth();
  const auth = getAuth(app);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const hideHeroRoutes = ['/login', '/register', '/forgot-password', '/forms'];
  const shouldShowHero = !hideHeroRoutes.includes(pathname) && !pathname.startsWith('/admin');

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

  const heroStatements: HeroStatement[] = [
    {
      title: 'Innovamos territorios con tecnología sostenible',
      description: 'Diseñamos proyectos y plataformas que mejoran vidas en toda Latinoamérica.',
      ctaText: 'Conoce cómo',
      ctaLink: '/about',
      ctaVariant: 'default',
    },
    {
      title: 'Datos, ingeniería y propósito para el desarrollo',
      description: 'De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.',
      ctaText: 'Empieza hoy',
      ctaLink: '/forms',
      ctaVariant: 'accent',
    },
    {
      title: 'Construimos soluciones que cambian comunidades',
      description: 'Integramos participación, tecnología y gestión para superar tus desafíos.',
      ctaText: 'Hagámoslo juntos',
      ctaLink: '/ples-tic', // Example link, adjust as needed
      ctaVariant: 'secondary',
    },
  ];

  return (
    <header className="bg-card text-card-foreground shadow-md rounded-lg">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4 sm:mb-0">
          <PlesGroupLogo className="h-8 w-8" />
          <span>PLES</span>
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 items-center justify-center sm:justify-end w-full sm:w-auto mr-2">
            <li>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link href="/ples-crea" className="text-sm font-medium hover:text-primary transition-colors">
                Ples CREA
              </Link>
            </li>
            <li>
              <Link href="/ples-tic" className="text-sm font-medium hover:text-primary transition-colors">
                Ples TIC
              </Link>
            </li>
            <li>
              <Link href="/ples-catastro" className="text-sm font-medium hover:text-primary transition-colors">
                Ples catastro
              </Link>
            </li>
            <li>
              <Link href="/ples-consulting" className="text-sm font-medium hover:text-primary transition-colors">
                Ples consulting
              </Link>
            </li>
            <li>
              <Link href="/forms" className="text-sm font-medium hover:text-primary transition-colors">
                Contáctenos
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-md">Admin</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer flex items-center">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" asChild className="rounded-md">
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar sesión
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
      </nav>

      {shouldShowHero && (
        <div className="w-full"> {/* Removed border-t border-border */}
          <RotatingHeroText statements={heroStatements} />
        </div>
      )}
    </header>
  );
}
