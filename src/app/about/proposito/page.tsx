// src/app/about/proposito/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, Globe, Handshake, Users, Focus, Leaf, Zap, CheckCircle } from 'lucide-react'; // Usaremos Lightbulb para Propósito
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Nuestro Propósito - Sobre Nosotros - PLES',
  description: 'Explorando nuestro motor y convicción en la experiencia inteligente.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Nuestro Propósito",
  subtitle: "Explorando nuestro motor.",
  mainIcon: <Lightbulb className="h-12 w-12 md:h-16 md:h-16" />,
  ctaLink: "/forms?subject=Consulta%20Nuestro%20Proposito",
  ctaText: "Descubra Cómo Podemos Ayudar"
};

const propositoPoints = [
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Convicción en la Experiencia Inteligente",
    text: "Creemos firmemente que la aplicación inteligente del conocimiento y la experiencia acumulada es la clave para desbloquear soluciones innovadoras y efectivas a los desafíos complejos."
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Forjar Puentes Sólidos",
    text: "Actuamos como catalizadores, conectando los sectores público y privado con las comunidades para fomentar la colaboración, la sinergia y el logro de objetivos comunes que benefician a todos."
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Aprovechar la Sabiduría Colectiva",
    text: "Valoramos e integramos diversas perspectivas y conocimientos. Creemos que la inteligencia colectiva es fundamental para desarrollar estrategias comprensivas y soluciones holísticas."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Abordar Desafíos Globales",
    text: "Nos enfocamos en los grandes retos que enfrenta nuestra sociedad, como el cambio climático, la equidad y el desarrollo sostenible, aplicando nuestra experiencia para generar un impacto positivo a escala."
  },
  {
    icon: <Focus className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Estrategia Refinada",
    text: "No solo identificamos problemas, sino que diseñamos e implementamos estrategias perspicaces y bien fundamentadas, asegurando que cada intervención sea precisa, eficiente y efectiva."
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Visión de Sostenibilidad a Largo Plazo",
    text: "Todas nuestras acciones están guiadas por un compromiso con la sostenibilidad, buscando soluciones que no solo sean efectivas hoy, sino que también aseguren un futuro próspero y equitativo para las generaciones venideras."
  }
];

export default function PropositoPage() {
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
              alt="Visualización del propósito de PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="equipo proposito"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay on image, from left to transparent, more pronounced on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>

          {/* Columna del Texto (content inside is padded to align with other centered content) */}
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Impulsados por la <span className="text-3xl md:text-4xl font-bold text-primary">convicción</span> en el <span className="text-xl md:text-2xl font-medium text-accent">poder transformador</span> de la <span className="text-3xl md:text-4xl font-bold text-[hsl(var(--ring))]">experiencia inteligente</span>, forjamos <span className="text-2xl md:text-3xl font-semibold text-primary">puentes sólidos</span> entre los ámbitos <span className="text-xl md:text-2xl font-medium text-accent">público</span> y <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">privado</span>, así como con las <span className="text-2xl md:text-3xl font-semibold text-primary">comunidades que servimos</span>. Aprovechamos la <span className="text-xl md:text-2xl font-medium text-accent">sabiduría colectiva</span> para abordar los <span className="text-3xl md:text-4xl font-bold text-primary">desafíos globales</span> con una <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">estrategia refinada</span> y una <span className="text-2xl md:text-3xl font-semibold text-accent">visión de sostenibilidad</span> a largo plazo.
            </p>
          </div>
        </div>
      </section> {/* End of full-width image/text section */}

      {/* Centered container for new detailed section and bottom content (CTA) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Desglosando Nuestro Propósito:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propositoPoints.map((point, index) => (
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
