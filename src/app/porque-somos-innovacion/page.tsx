// src/app/porque-somos-innovacion/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, UsersRound, Puzzle, RefreshCw, Layers, TrendingUp, Handshake } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Por Qué Somos Innovación - PLES',
  description: 'Descubra cómo la creatividad y el pensamiento disruptivo nos permiten generar valor sostenible y transformar ideas en impacto real.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Por Qué Somos Innovación",
  subtitle: "La creatividad y el pensamiento disruptivo para generar valor sostenible.",
  mainIcon: Lightbulb,
  ctaLink: "/innovacion-estrategias",
  ctaText: "Descubra Cómo Innovamos"
};

const innovacionPoints = [
  {
    icon: UsersRound,
    title: "Diseño Centrado en las Personas",
    text: "La innovación comienza por entender profundamente las necesidades, dolores y aspiraciones de las personas y comunidades a las que servimos."
  },
  {
    icon: Puzzle,
    title: "Resolución Creativa de Problemas",
    text: "Abordamos los desafíos desde ángulos no convencionales, combinando ideas de diferentes campos para encontrar soluciones únicas y efectivas."
  },
  {
    icon: RefreshCw,
    title: "Cultura de Iteración y Mejora",
    text: "Vemos el fracaso como una oportunidad de aprendizaje y fomentamos un ciclo constante de prototipado, prueba, retroalimentación y mejora continua."
  },
  {
    icon: Layers,
    title: "Modelos de Negocio Disruptivos",
    text: "No solo creamos productos; ayudamos a diseñar nuevos modelos de negocio y de servicio que generan un valor diferencial y sostenible en el tiempo."
  },
  {
    icon: TrendingUp,
    title: "Visión de Futuro y Anticipación",
    text: "Analizamos tendencias emergentes para desarrollar soluciones que no solo resuelven los problemas de hoy, sino que preparan a nuestros clientes para el futuro."
  },
  {
    icon: Handshake,
    title: "Ecosistemas de Colaboración Abierta",
    text: "Fomentamos la colaboración con startups, academia y otros actores para crear ecosistemas que potencien la innovación conjunta y el impacto colectivo."
  }
];

export default function PorqueSomosInnovacionPage() {
  const MainIcon = pageDetails.mainIcon;
  return (
    <div className="py-10 w-full">
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
              <MainIcon className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {pageDetails.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {pageDetails.subtitle}
            </p>
          </div>
        </section>
      </div>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="relative w-full group min-h-[400px] md:min-h-full">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Equipo de PLES en una sesión de lluvia de ideas"
              layout="fill"
              objectFit="cover"
              data-ai-hint="innovation workshop brainstorming"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              La <span className="text-3xl md:text-4xl font-bold text-primary">innovación</span> en PLES es un <span className="text-2xl md:text-3xl font-semibold text-accent">proceso intencional</span>, no un accidente. Es la <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">disciplina</span> de cuestionar el status quo, la <span className="font-semibold text-primary">valentía</span> de experimentar y la <span className="font-semibold text-accent">pasión</span> por crear soluciones que no solo son nuevas, sino <span className="text-2xl md:text-3xl font-semibold text-primary">significativamente mejores</span>. Cultivamos un entorno donde la <span className="text-2xl md:text-3xl font-semibold text-accent">creatividad</span> se encuentra con la <span className="text-2xl md:text-3xl font-semibold text-primary">estrategia</span> para generar un impacto real.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Pilares de Nuestra Innovación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovacionPoints.map((point, index) => {
              const PointIcon = point.icon;
              return (
              <Card key={index} className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 ease-in-out transform hover:scale-[1.03] border">
                <CardHeader className="items-center text-center md:items-start md:text-left">
                  <PointIcon className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm md:text-left text-center">
                    {point.text}
                  </p>
                </CardContent>
              </Card>
            )})}
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
      </div>
    </div>
  );
}
