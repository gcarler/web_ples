
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlesGroupLogo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="relative bg-muted text-muted-foreground pt-16 pb-8 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Column 1: Logo and Slogan */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="mb-6">
              <PlesGroupLogo className="text-9xl" hoverVariant="black-gradient" />
            </Link>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Somos{' '}
              <span className="font-bold text-primary transition-colors hover:text-accent">
                Ciencia
              </span>
              ,{' '}
              <span className="font-bold text-primary transition-colors hover:text-accent">
                Tecnología
              </span>{' '}
              e{' '}
              <span className="font-bold text-primary transition-colors hover:text-accent">
                Innovación
              </span>.
            </p>
          </div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/#nuestras-marcas" className="hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link href="/forms" className="hover:text-primary transition-colors">Contáctenos</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div className="lg:col-span-2 space-y-4">
             <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">Contacto</h3>
             <ul className="space-y-2 text-sm">
                <li><a href="mailto:contacto@ples.com.co" className="hover:text-primary transition-colors">contacto@ples.com.co</a></li>
                <li><a href="tel:+573225137924" className="hover:text-primary transition-colors">(+57) 322 513 7924</a></li>
                <li>Cra. 9a #33-19, La Matuna, Cartagena de Indias, Bolívar</li>
             </ul>
          </div>
          
          {/* Column 4: Social Media */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground/80 border-t border-muted-foreground/20 pt-8 mt-8">
          <p>&copy; {new Date().getFullYear()} PLES GROUP S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
