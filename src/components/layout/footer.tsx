
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    // Footer background can be full-width
    <footer className="relative bg-muted text-muted-foreground pt-12 pb-8 mt-16 overflow-hidden">
      {/* Footer content will now respect only padding, not max-width or centering */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="flex flex-col justify-between h-full">
            <div className="pt-4 pb-10">
              <p className="text-lg text-muted-foreground">
                Somos{' '}
                <span className="font-semibold transition-all duration-300 ease-in-out inline-block hover:scale-110 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:text-transparent">
                  Ciencia
                </span>
                ,{' '}
                <span className="font-semibold transition-all duration-300 ease-in-out inline-block hover:scale-110 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:text-transparent">
                  Tecnología
                </span>{' '}
                e{' '}
                <span className="font-semibold transition-all duration-300 ease-in-out inline-block hover:scale-110 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:bg-clip-text hover:text-transparent">
                  Innovación
                </span>
                .
              </p>
            </div>
          </div>

          <div className="space-y-4 z-10">
            <h3 className="text-lg font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/ples-crea" className="hover:text-primary transition-colors">
                  Ples CREA
                </Link>
              </li>
              <li>
                <Link href="/ples-tic" className="hover:text-primary transition-colors">
                  Ples TIC
                </Link>
              </li>
              <li>
                <Link href="/ples-catastro" className="hover:text-primary transition-colors">
                  Ples Catastro
                </Link>
              </li>
              <li>
                <Link href="/ples-consulting" className="hover:text-primary transition-colors">
                  Ples Consulting
                </Link>
              </li>
              <li>
                <Link href="/forms" className="hover:text-primary transition-colors">
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 z-10">
            <h3 className="text-lg font-semibold text-foreground">Contacto</h3>
            <p className="text-sm">
              Cra. 9a #33-19, La Matuna, Cartagena de Indias, Bolívar
            </p>
            <p className="text-sm">
              Email: <a href="mailto:contacto@ples.com.co" className="hover:text-primary transition-colors">contacto@ples.com.co</a>
            </p>
            <p className="text-sm">
              Teléfono: <a href="tel:+573225137924" className="hover:text-primary transition-colors">(+57) 322 513 7924</a>
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm relative z-20 mt-8">
          <p>&copy; {new Date().getFullYear()} PLES. Todos los derechos reservados.</p>
          <p className="mt-1">PLES: Fusionando ciencia, tecnología e innovación en estrategias para un impacto trascendente y sostenible.</p>
        </div>
      </div>
    </footer>
  );
}
