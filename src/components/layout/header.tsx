'use client';
import Link from 'next/link';
import { Code } from 'lucide-react'; // Using Code icon as a placeholder logo
import { Carousel, type CarouselSlideProps } from '@/components/ui/carousel'; // Import Carousel

export function Header() {
  // Sample slide data (replace with your actual data)
  const slides: CarouselSlideProps[] = [
    {
      type: 'image',
      src: 'https://picsum.photos/1200/400?random=1',
      alt: 'Random Landscape 1',
      content: (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Discover Our Services</h2>
          <p className="text-lg text-gray-200 mb-4">Innovative solutions tailored for you.</p>
          <Link href="/ples-crea" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Learn More
          </Link>
        </div>
      ),
    },
    {
      type: 'image',
      src: 'https://picsum.photos/1200/400?random=2',
      alt: 'Random Landscape 2',
       content: (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Expert Consulting</h2>
          <p className="text-lg text-gray-200 mb-4">Guidance to achieve your goals.</p>
           <Link href="/ples-consulting" className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Get Started
          </Link>
        </div>
      ),
    },
     {
      type: 'video',
      src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Replace with a real video URL or local path if configured
      content: (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl font-bold text-white mb-2">Watch Our Intro</h2>
          <p className="text-lg text-gray-200 mb-4">See how we make a difference.</p>
           <Link href="/about" className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            About Us
          </Link>
        </div>
      ),
      videoProps: { autoPlay: true, muted: true, loop: true } // Example video props
    },
  ];


  return (
    <header className="bg-card text-card-foreground shadow-md">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4 sm:mb-0">
          <Code className="h-6 w-6" />
          <span>AngularFlow</span>
        </Link>
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
      </nav>

      {/* Carousel Section */}
      <div className="w-full border-t border-border">
        <Carousel slides={slides} />
      </div>
    </header>
  );
}
