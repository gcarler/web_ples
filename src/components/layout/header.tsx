import Link from 'next/link';
import { Code } from 'lucide-react'; // Using Code icon as a placeholder logo

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
          <Code className="h-6 w-6" />
          <span>AngularFlow</span>
        </Link>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-end">
          <li>
            <Link href="/" className="hover:text-accent-foreground/80 transition-colors">
              inicio
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-accent-foreground/80 transition-colors">
              sobre nosotros
            </Link>
          </li>
          <li>
            <Link href="/ples-crea" className="hover:text-accent-foreground/80 transition-colors">
              Ples CREA
            </Link>
          </li>
          <li>
            <Link href="/ples-tic" className="hover:text-accent-foreground/80 transition-colors">
              Ples TIC
            </Link>
          </li>
          <li>
            <Link href="/ples-catastro" className="hover:text-accent-foreground/80 transition-colors">
              Ples catastro
            </Link>
          </li>
          <li>
            <Link href="/ples-consulting" className="hover:text-accent-foreground/80 transition-colors">
              Ples consulting
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
