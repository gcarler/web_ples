'use client';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for the updated slide
import { Carousel, type CarouselSlideProps } from '@/components/ui/carousel'; // Import Carousel
import { PlesGroupLogo } from '@/components/logo'; // Import the new logo component
import { Button } from '@/components/ui/button'; // Import Button for CTAs
import { ArrowRight, LogIn } from 'lucide-react'; // Import icon for buttons

export function Header() {
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
    <header className="bg-card text-card-foreground shadow-md">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4 sm:mb-0">
          {/* Use CSS class for stroke */}
          <PlesGroupLogo className="h-8 w-8" />
          <span>PLES</span> {/* Replaced AngularFlow with PLES */}
        </Link>
        <div className="flex items-center gap-4">
            <ul className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 items-center justify-center sm:justify-end w-full sm:w-auto">
               <li>
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                  inicio
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
            </ul>
            {/* Add Login Button */}
             {/* TODO: Add authentication logic and link */}
             <Button variant="outline" size="sm" asChild>
               <Link href="/login"> {/* Replace with your actual login page route */}
                 <LogIn className="mr-2 h-4 w-4" />
                 Iniciar sesión
               </Link>
             </Button>
        </div>

      </nav>

      {/* Carousel Section */}
      <div className="w-full border-t border-border">
        <Carousel slides={slides} />
      </div>
    </header>
  );
}
