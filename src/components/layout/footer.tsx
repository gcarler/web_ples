import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { PlesGroupLogo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="relative bg-muted text-muted-foreground pt-12 pb-8 mt-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12"> {/* Increased gap and mb */}
          {/* Column 1: About text and Watermark Logo */}
          <div className="space-y-4 relative">
            <p className="text-sm relative z-10">
              Demostrando características fundamentales del desarrollo web como enrutamiento y formularios interactivos, imitando la estructura de un proyecto profesional.
            </p>
            {/* Watermark Logo: Positioned absolutely within this column */}
            <PlesGroupLogo
              className="absolute -bottom-10 -left-4 sm:-left-8 h-40 w-auto z-0 pointer-events-none md:h-48 md:-bottom-12"
              style={{
                '--logo-letter-color': 'white', // Explicitly white letters for watermark
                '--logo-accent-color': '#00AEEF',   // Explicitly #00AEEF blue for watermark
                opacity: 0.4 // Adjust opacity for watermark effect
              } as React.CSSProperties}
            />
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
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

          {/* Column 3: Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contacto</h3>
            <p className="text-sm">
              123 Calle Ficticia, Ciudad Ejemplo, CP 12345
            </p>
            <p className="text-sm">
              Email: <a href="mailto:info@angularflow.com" className="hover:text-primary transition-colors">info@angularflow.com</a>
            </p>
            <p className="text-sm">
              Teléfono: <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 234 567 890</a>
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

        {/* Copyright - Centered */}
        <div className="text-center text-sm relative z-20 mt-8"> {/* Increased mt for spacing from grid */}
          <p>&copy; {new Date().getFullYear()} PLES. Todos los derechos reservados.</p>
          <p className="mt-1">Construido con ❤️.</p>
        </div>
      </div>

      {/* Decorative Circles - positioned relative to the main footer tag */}
      {/* Adjusted sizes and positions to better match the image */}
      <div aria-hidden="true" className="absolute -bottom-20 -right-20 w-80 h-80 md:-bottom-28 md:-right-28 md:w-[26rem] md:h-[26rem] bg-card rounded-full opacity-90 z-0"></div>
      <div aria-hidden="true" className="absolute -bottom-16 -right-16 w-60 h-60 md:-bottom-20 md:-right-20 md:w-[20rem] md:h-[20rem] bg-accent rounded-full z-10"></div>
    </footer>
  );
}
