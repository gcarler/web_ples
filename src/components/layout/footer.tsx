import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Removed Code icon import
import { Separator } from '@/components/ui/separator';
import { PlesGroupLogo } from '@/components/logo'; // Import the new logo component

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary mb-4">
               {/* Replace Code icon with PlesGroupLogo SVG */}
              <PlesGroupLogo className="h-8 w-8" />
              <span className="text-white">AngularFlow</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Demostrando características fundamentales del desarrollo web como enrutamiento y formularios interactivos, imitando la estructura de un proyecto profesional.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
               <li>
                <Link href="/forms" className="text-gray-300 hover:text-white transition-colors">
                    Formularios
                </Link>
                </li>
              <li>
                <Link href="/ples-crea" className="text-gray-300 hover:text-white transition-colors">
                  Ples CREA
                </Link>
              </li>
              <li>
                <Link href="/ples-tic" className="text-gray-300 hover:text-white transition-colors">
                  Ples TIC
                </Link>
              </li>
               <li>
                <Link href="/ples-catastro" className="text-gray-300 hover:text-white transition-colors">
                  Ples Catastro
                </Link>
              </li>
               <li>
                <Link href="/ples-consulting" className="text-gray-300 hover:text-white transition-colors">
                  Ples Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <p className="text-gray-400 text-sm">
              123 Calle Ficticia, Ciudad Ejemplo, CP 12345
            </p>
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:info@angularflow.com" className="text-gray-300 hover:text-white transition-colors">info@angularflow.com</a>
            </p>
            <p className="text-gray-400 text-sm">
              Teléfono: <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">+1 234 567 890</a>
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" /> {/* Using Twitter icon for X */}
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 my-8" />

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AngularFlow. Todos los derechos reservados.</p>
          <p className="mt-1">Construido con Next.js y <span role="img" aria-label="corazón">❤️</span>.</p>
        </div>
      </div>
    </footer>
  );
}
