// src/components/layout/footer.tsx
'use client'

import Link from 'next/link';
import { Facebook, X, Instagram } from 'lucide-react';
import { PlesGroupLogo } from '@/components/logo';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const content = t.Footer;

  return (
    <footer className="relative w-full bg-muted text-muted-foreground py-8 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="mb-6">
              <PlesGroupLogo className="text-9xl" hoverVariant="black-gradient" />
            </Link>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {content.slogan}
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">{content.linksTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">{content.home}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{content.about}</Link></li>
              <li><Link href="/#nuestras-marcas" className="hover:text-primary transition-colors">{content.services}</Link></li>
              <li><Link href="/forms" className="hover:text-primary transition-colors">{content.contact}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
             <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">{content.contactTitle}</h3>
             <ul className="space-y-2 text-sm">
                <li><a href="mailto:contacto@ples.com.co" className="hover:text-primary transition-colors">contacto@ples.com.co</a></li>
                <li><a href="tel:+573225137924" className="hover:text-primary transition-colors">(+57) 322 513 7924</a></li>
                <li>Cra. 9a #33-19, La Matuna, Cartagena de Indias, Bolívar</li>
             </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-semibold text-foreground tracking-wider uppercase">{content.followUs}</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/16tpHggVQZ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/plesempresa" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <X className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/plesempresa?igsh=MXI3amE2dnBqMnZnMA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-muted-foreground/10 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground/80 border-t border-muted-foreground/20 pt-8 mt-8">
          <p>&copy; {new Date().getFullYear()} PLES S.A.S. {content.rights}</p> 
        </div>
      </div>
    </footer>
  );
}
