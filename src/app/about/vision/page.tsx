// src/app/about/vision/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react'; // Usaremos Eye para Visión
import React from 'react';

export const metadata = {
  title: 'Nuestra Visión - Sobre Nosotros - PLES',
  description: 'Definiendo nuestro horizonte y anhelo por un futuro sostenible.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Nuestra Visión",
  subtitle: "Definiendo nuestro horizonte.",
  mainIcon: <Eye className="h-12 w-12 md:h-16 md:h-16" />,
  mainParagraph: "Anhelamos inspirar un porvenir donde la sostenibilidad y la equidad sean pilares, catalizadas por la innovación en la respuesta a desafíos críticos como el cambio climático y la gestión responsable de los recursos. Nos concebimos como referentes en la creación de un impacto positivo y perdurable, transformando comunidades hacia un mundo más resiliente y justo para las generaciones venideras.",
  ctaLink: "/forms?subject=Consulta%20Nuestra%20Vision",
  ctaText: "Proyecte el Futuro Con Nosotros"
};

export default function VisionPage() {
  return (
    <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-2 mb-12">
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href={pageDetails.parentLink}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary-foreground" />
              Volver a {pageDetails.parentName}
            </Link>
          </Button>
          <span className="text-muted-foreground">|</span>
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href="/">
               PLES Home
            </Link>
          </Button>
        </div>

        <section className="mb-16 py-12 md:py-20 text-center">
          <div className="relative px-4 z-10">
            <div className="inline-block p-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full mb-8 shadow-md animate-expand-in" style={{ animationFillMode: 'forwards' }}>
              {pageDetails.mainIcon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {pageDetails.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {pageDetails.subtitle}
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="bg-card p-8 md:p-10 rounded-lg shadow-xl border border-border/30 hover:shadow-2xl transition-shadow duration-300">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              {pageDetails.mainParagraph}
            </p>
          </div>
        </section>

        <section className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Button size="lg" asChild className="text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform">
            <Link href={pageDetails.ctaLink}>
              <span className="flex items-center">
                {pageDetails.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
