'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ples_cookie_consent');
    if (!consent) {
      // Delay slightly so it doesn't interrupt initial page load
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ples_cookie_consent', 'granted');
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ples_cookie_consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner || pathname === '/login' || pathname?.startsWith('/login')) return null;

  return (
    <aside
      aria-label="Aviso de privacidad y cookies"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 p-4 rounded-xl border border-primary/20 bg-background/95 backdrop-blur-md shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">
            Privacidad y Tratamiento de Datos
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Utilizamos analítica anónima para optimizar la experiencia técnica de la plataforma, en cumplimiento de la Ley 1581 de 2012 (Habeas Data). Puedes aceptar o continuar solo con cookies esenciales.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              variant="default"
              onClick={handleAccept}
              className="text-xs h-8 px-3 font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Aceptar analítica
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDecline}
              className="text-xs h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              Solo esenciales
            </Button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Cerrar aviso"
          className="text-muted-foreground hover:text-foreground p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
