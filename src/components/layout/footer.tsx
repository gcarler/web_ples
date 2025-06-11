import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PlesGroupLogo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4">
              <PlesGroupLogo className="h-8 w-8 logo-outline" />
              <span>PLES</span>
            </Link>
            <p className="text-sm">
              Demostrando características fundamentales del desarrollo web como enrutamiento y formularios interactivos, imitando la estructura de un proyecto profesional.
            </p>
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

        <Separator className="my-8 bg-border" />

        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PLES. Todos los derechos reservados.</p>
          <p className="mt-1">Construido con <span role="img" aria-label="corazón">❤️</span>.</p>
        </div>
      </div>
    </footer>
  );
}
