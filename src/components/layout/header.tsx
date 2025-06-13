// src/components/layout/header.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Removed PlesGroupLogo import as we are using HTML logo now
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, LayoutDashboard } from 'lucide-react';
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

export function Header() {
  const { user, loading } = useAuth();
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

  return (
    <header className="bg-card text-card-foreground rounded-lg">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        {/* START: New HTML Logo based on Footer's version */}
        <Link href="/" className="mb-4 sm:mb-0">
          <div
            className="logo-container font-comfortaa text-2xl font-bold select-none relative group" // Adjusted font size to text-2xl
            style={{ textShadow: '1px 1px 0px hsl(var(--card)), 2px 2px 0px hsl(var(--foreground) / 0.2)' }}
          >
            <span className="letra-p-con-punto relative inline-block">
              <span className="text-muted-foreground group-hover:text-black transition-colors duration-200">
                p
              </span>
              {/* Punto con gradiente y sombra (siempre visible) */}
              <span
                className={cn(
                  "absolute rounded-full",
                  "w-[0.31em] h-[0.31em]", // Tamaño relativo a la fuente
                  "top-[0.38em] left-[0.25em]" // Posición ajustada para el nuevo tamaño de fuente
                )}
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #29c6ff, #00AEEF 70%, #008fbf)',
                  boxShadow: 'inset 0 0 3px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15)' // Sombra ajustada para tamaño menor
                }}
                aria-hidden="true"
              />
            </span>
            <span className="text-muted-foreground group-hover:text-black transition-colors duration-200">
              les
            </span>
          </div>
        </Link>
        {/* END: New HTML Logo */}

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
        </div>
      </nav>
    </header>
  );
}
