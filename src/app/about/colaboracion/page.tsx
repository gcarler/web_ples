// src/app/about/colaboracion/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, UsersRound, Workflow, Globe2, Layers, Palette, Expand, CheckCircle } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Colaboración Global - Sobre Nosotros - PLES',
  description: 'Conoce cómo nuestra dinámica de colaboración trasciende fronteras.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Colaboración Global",
  subtitle: "Conoce cómo trabajamos.",
  mainIcon: <UsersRound className="h-12 w-12 md:h-16 md:h-16" />,
  ctaLink: "/forms?subject=Consulta%20Colaboracion%20Global",
  ctaText: "Únase a Nuestra Red"
};

const colaboracionPoints = [
  {
    icon: <Workflow className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Dinámica de Colaboración Fluida",
    text: "Nuestros procesos de colaboración están diseñados para ser ágiles y adaptables, permitiendo que la información y las ideas fluyan libremente entre equipos, disciplinas y geografías."
  },
  {
    icon: <Globe2 className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Perspectiva Global y Sensibilidad Cultural",
    text: "Entendemos y valoramos la diversidad cultural. Nuestros equipos internacionales aportan una comprensión profunda de los contextos locales, enriqueciendo las soluciones con relevancia global y aplicabilidad local."
  },
  {
    icon: <Layers className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Enriquecimiento Multidimensional",
    text: "Cada plan, política, estrategia y proyecto se beneficia de múltiples capas de análisis y aportes, provenientes de diversas especialidades y experiencias, asegurando soluciones robustas y completas."
  },
  {
    icon: <Palette className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Diversidad de Visiones y Disciplinas",
    text: "Fomentamos un crisol de ideas donde convergen distintas visiones, disciplinas académicas y enfoques metodológicos, generando una sinergia creativa que desafía los paradigmas convencionales."
  },
  {
    icon: <Expand className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Ampliación de Horizontes de Solución",
    text: "Al integrar perspectivas variadas, expandimos significativamente el espectro de posibles soluciones, permitiéndonos abordar los desafíos desde ángulos innovadores y encontrar respuestas más efectivas y sostenibles."
  }
];

export default function ColaboracionPage() {
  return (
    <div className="py-10 w-full"> {/* Outer container, only vertical padding */}

      {/* Centered container for top content (breadcrumbs, hero) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div> {/* End of centered container for top content */}

      {/* Full-width section for image and text */}
      <section className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="relative w-full group min-h-[400px] md:min-h-full">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Equipo global colaborando en PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="equipo global colaboracion"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Nuestra <span className="text-3xl md:text-4xl font-bold text-primary">dinámica de colaboración</span> trasciende <span className="text-2xl md:text-3xl font-semibold text-accent">fronteras y culturas</span>, enriqueciendo cada <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">plan</span>, <span className="text-xl md:text-2xl font-medium text-primary">política</span>, <span className="text-xl md:text-2xl font-medium text-accent">estrategia</span> y <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">proyecto</span> con una paleta de <span className="text-3xl md:text-4xl font-bold text-primary">visiones</span>, <span className="text-3xl md:text-4xl font-bold text-accent">disciplinas</span> y <span className="text-3xl md:text-4xl font-bold text-primary">enfoques</span> que amplían los <span className="text-2xl md:text-3xl font-semibold text-accent">horizontes de la solución</span>.
            </p>
          </div>
        </div>
      </section> {/* End of full-width image/text section */}

      {/* Centered container for new detailed section and bottom content (CTA) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Desglosando Nuestra Colaboración Global:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {colaboracionPoints.map((point, index) => (
              <Card key={index} className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 ease-in-out transform hover:scale-[1.03] border">
                <CardHeader className="items-center text-center md:items-start md:text-left">
                  {point.icon}
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm md:text-left text-center">
                    {point.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mt-0 mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
            <Link href={pageDetails.ctaLink}>
              <span className="flex items-center">
                {pageDetails.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </section>
      </div> {/* End of centered container for bottom content */}
    </div>
  );
}
