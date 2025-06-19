// src/app/about/esencia/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, HeartPulse } from 'lucide-react';
import React from 'react';
import Image from 'next/image'; // Importar Image

export const metadata = {
  title: 'Nuestra Esencia - Sobre Nosotros - PLES',
  description: 'Comprendiendo quienes somos y nuestro enfoque multidisciplinario.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Nuestra Esencia",
  subtitle: "Comprendiendo quienes somos.",
  mainIcon: <HeartPulse className="h-12 w-12 md:h-16 md:h-16" />,
  ctaLink: "/forms?subject=Consulta%20Nuestra%20Esencia",
  ctaText: "Conozca Más Sobre Nosotros"
};

export default function EsenciaPage() {
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

        <section className="max-w-screen-xl mx-auto py-12 px-6 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Columna de la Imagen */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl group">
              <Image
                src="https://placehold.co/800x1000.png"
                alt="Visualización de la esencia de PLES"
                layout="fill"
                objectFit="cover"
                data-ai-hint="equipo innovacion"
                className="rounded-lg transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Columna del Texto */}
            <div className="text-left">
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                Con una <span className="text-3xl md:text-4xl font-bold text-primary">visión global</span> y un <span className="text-3xl md:text-4xl font-bold text-accent">enfoque multidisciplinario</span>, nuestro equipo converge <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">talentos</span> y <span className="text-xl md:text-2xl font-medium text-primary">conocimientos diversos</span> para la consecución de <span className="text-2xl md:text-3xl font-semibold text-accent">objetivos trascendentes</span>. En <span className="text-3xl md:text-4xl font-extrabold text-primary">PLES</span>, valoramos la <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">riqueza de cada perspectiva</span>, cultivando un espacio donde las <span className="text-2xl md:text-3xl font-semibold text-primary">ideas disruptivas</span> e <span className="text-2xl md:text-3xl font-semibold text-accent">innovadoras</span> florecen, permitiendo <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">intervenciones estratégicas</span> y <span className="text-xl md:text-2xl font-medium text-primary">perspicaces</span> en cualquier escenario.
              </p>
            </div>
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
