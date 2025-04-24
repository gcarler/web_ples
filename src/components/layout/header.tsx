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
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/" className="hover:text-accent-foreground/80 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/forms" className="hover:text-accent-foreground/80 transition-colors">
              Forms
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
