// src/app/about/esencia/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, HeartPulse, Globe, Library, Users, Target, MessagesSquare, Lightbulb, Focus } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const esenciaPoints = [
  {
    icon: <Globe className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Visión Global",
    text: "Entendemos los desafíos y oportunidades en un contexto interconectado. Nuestras soluciones consideran tendencias mundiales y su impacto local, buscando relevancia y aplicabilidad más allá de las fronteras inmediatas."
  },
  {
    icon: <Library className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Enfoque Multidisciplinario",
    text: "Integramos conocimientos de diversas áreas (tecnología, ciencias sociales, ingeniería, diseño) para abordar problemas complejos desde múltiples ángulos, generando soluciones holísticas e innovadoras."
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Convergencia de Talentos",
    text: "Nuestro equipo amalgama habilidades y experiencias variadas. Fomentamos la colaboración activa para que esta diversidad de pensamiento enriquezca la creatividad y la calidad de nuestros resultados."
  },
  {
    icon: <Target className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Objetivos Trascendentes",
    text: "Aspiramos a generar un impacto positivo y duradero que va más allá de lo técnico o comercial. Nos enfocamos en proyectos con significado y un alcance que contribuya al desarrollo sostenible."
  },
  {
    icon: <MessagesSquare className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Riqueza de Perspectivas",
    text: "Valoramos cada punto de vista como una fuente de enriquecimiento. Creamos un entorno inclusivo donde todas las voces son escuchadas, llevando a análisis más profundos y soluciones robustas."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Ideas Disruptivas e Innovadoras",
    text: "Promovemos un espacio para la experimentación y el cuestionamiento constructivo. Buscamos constantemente nuevas formas de hacer las cosas para que las ideas que rompen moldes florezcan."
  },
  {
    icon: <Focus className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Intervenciones Estratégicas",
    text: "Nuestras soluciones se basan en un entendimiento profundo del contexto. Son intervenciones perspicaces, diseñadas para ser efectivas y eficientes en cualquier escenario que se presente."
  }
];

export default function EsenciaPage() {
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
          {/* Columna de la Imagen (takes full available width on its side) */}
          <div className="relative w-full group min-h-[400px] md:min-h-full">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Visualización de la esencia de PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="equipo innovacion"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay on image, from left to transparent, more pronounced on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>

          {/* Columna del Texto (content inside is padded to align with other centered content) */}
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Con una <span className="text-3xl md:text-4xl font-bold text-primary">visión global</span> y un <span className="text-3xl md:text-4xl font-bold text-accent">enfoque multidisciplinario</span>, nuestro equipo converge <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">talentos</span> y <span className="text-xl md:text-2xl font-medium text-primary">conocimientos diversos</span> para la consecución de <span className="text-2xl md:text-3xl font-semibold text-accent">objetivos trascendentes</span>. En <span className="text-3xl md:text-4xl font-extrabold text-primary">PLES</span>, valoramos la <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">riqueza de cada perspectiva</span>, cultivando un espacio donde las <span className="text-2xl md:text-3xl font-semibold text-primary">ideas disruptivas</span> e <span className="text-2xl md:text-3xl font-semibold text-accent">innovadoras</span> florecen, permitiendo <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">intervenciones estratégicas</span> y <span className="text-xl md:text-2xl font-medium text-primary">perspicaces</span> en cualquier escenario.
            </p>
          </div>
        </div>
      </section> {/* End of full-width image/text section */}

      {/* Centered container for new detailed section and bottom content (CTA) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Desglosando Nuestra Esencia:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {esenciaPoints.map((point, index) => (
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
