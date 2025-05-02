'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for the updated slide
import { usePathname } from 'next/navigation'; // Import usePathname
import { Carousel, type CarouselSlideProps } from '@/components/ui/carousel'; // Import Carousel
import { PlesGroupLogo } from '@/components/logo'; // Import the new logo component
import { Button } from '@/components/ui/button'; // Import Button for CTAs
import { ArrowRight, LogIn, LogOut, LayoutDashboard, Users, Package, ShoppingCart, Workflow } from 'lucide-react'; // Import icons
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook
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
} from "@/components/ui/dropdown-menu"; // Import Dropdown components
import { cn } from '@/lib/utils'; // Import cn utility


export function Header() {
  const { user, loading } = useAuth(); // Get user and loading state
  const auth = getAuth(app);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

   // Define routes where the carousel should be hidden
  const hideCarouselRoutes = ['/login', '/register', '/forgot-password'];
  const shouldShowCarousel = !hideCarouselRoutes.includes(pathname) && !pathname.startsWith('/admin'); // Also hide on admin routes

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the cookie on logout
      document.cookie = `firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout Error:', error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };


  // Updated slide data with provided variants
  const slides: CarouselSlideProps[] = [
    {
      type: 'image',
      src: 'https://picsum.photos/1200/400?random=1',
      alt: 'Abstract technology background',
      content: (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Innovamos territorios con tecnología sostenible</h2>
          <p className="text-lg text-gray-200 mb-4 max-w-xl">Diseñamos proyectos y plataformas que mejoran vidas en toda Latinoamérica.</p>
          {/* Using Button component directly */}
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/about"> {/* Example Link */}
              Conoce cómo <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      ),
    },
    {
      type: 'image',
      src: 'https://picsum.photos/1200/400?random=2',
      alt: 'Data visualization concept',
       content: (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Datos, ingeniería y propósito para el desarrollo</h2>
          <p className="text-lg text-gray-200 mb-4 max-w-xl">De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.</p>
           <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/forms"> {/* Example Link */}
              Empieza hoy <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      ),
    },
     {
      type: 'image', // Changed from 'video' to 'image'
      src: 'https://picsum.photos/1200/400?random=8', // Changed to a placeholder image source
      alt: 'Community building concept', // Added alt text for the image
      content: (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Construimos soluciones que cambian comunidades</h2>
          <p className="text-lg text-gray-200 mb-4 max-w-xl">Integramos participación, tecnología y gestión para superar tus desafíos.</p>
           <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Link href="/ples-tic"> {/* Example Link */}
              Hagámoslo juntos <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      ),
      // Removed videoProps
    },
  ];


  return (
    // Apply rounded corners from theme via globals.css --radius variable
    <header className="bg-card text-card-foreground shadow-md rounded-lg">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4 sm:mb-0">
          <PlesGroupLogo className="h-8 w-8 logo-outline" />
          <span>PLES</span>
        </Link>
        <div className="flex items-center gap-4">
            <ul className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 items-center justify-center sm:justify-end w-full sm:w-auto mr-4">
               <li>
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>  
              <li>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                  sobre nosotros
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
                  forms
                </Link>
                </li>

            </ul>
            {/* Conditional Admin Dropdown or Login Button */}
             {!loading && (
               user ? (
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                      {/* Apply rounded corners to trigger button */}
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
                      {/* Add other admin links as needed */}
                     {/* <DropdownMenuItem asChild><Link href="/admin/crm">CRM</Link></DropdownMenuItem> */}
                     {/* <DropdownMenuItem asChild><Link href="/admin/erp">ERP</Link></DropdownMenuItem> */}
                     {/* <DropdownMenuItem asChild><Link href="/admin/bpm">BPM</Link></DropdownMenuItem> */}
                     {/* <DropdownMenuItem asChild><Link href="/admin/users">Manage Users</Link></DropdownMenuItem> */}
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer flex items-center">
                       <LogOut className="mr-2 h-4 w-4" /> Logout
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               ) : (
                 // Apply rounded corners to login button
                 <Button variant="outline" size="sm" asChild className="rounded-md">
                   <Link href="/login">
                     <LogIn className="mr-2 h-4 w-4" />
                     Iniciar sesión
                   </Link>
                 </Button>
               )
             )}
        </div>

      </nav>

      {/* Carousel Section - Conditionally render based on path */}
       {shouldShowCarousel && (
          <div className="w-full border-t border-border">
              <Carousel slides={slides} />
          </div>
       )}
    </header>
  );
}
