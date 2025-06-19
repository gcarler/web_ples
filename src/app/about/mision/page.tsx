// src/app/about/mision/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Rocket, Handshake, Brain, Globe, Leaf, TrendingUp } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Nuestra Misión - Sobre Nosotros - PLES',
  description: 'Guiando nuestras acciones y consolidando lazos estratégicos para un futuro sostenible.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Nuestra Misión",
  subtitle: "Guiando nuestras acciones.",
  mainIcon: <Rocket className="h-12 w-12 md:h-16 md:h-16" />,
  ctaLink: "/forms?subject=Consulta%20Nuestra%20Mision",
  ctaText: "Explore Nuestras Estrategias"
};

const misionPoints = [
  {
    icon: <Handshake className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Consolidar Lazos Estratégicos",
    text: "Fomentamos y fortalecemos alianzas efectivas entre diversos sectores (público, privado, académico) y comunidades, creando sinergias para el desarrollo integral y la consecución de metas compartidas."
  },
  {
    icon: <Brain className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Aplicar Experiencia con Discernimiento",
    text: "Utilizamos nuestro profundo conocimiento y experiencia acumulada de manera reflexiva y criteriosa, adaptando nuestras soluciones a contextos específicos para maximizar su efectividad e impacto."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Afrontar Retos Globales",
    text: "Nos enfocamos en abordar problemáticas complejas de alcance global, como el cambio climático, la desigualdad y la transformación digital, aportando soluciones innovadoras y pertinentes."
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Sostenibilidad en la Acción",
    text: "Integramos principios de sostenibilidad ambiental, social y económica en todas nuestras intervenciones, buscando un equilibrio que asegure beneficios a largo plazo y el bienestar de las generaciones presentes y futuras."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Visión de Futuro Proactiva",
    text: "Nuestras estrategias y acciones están orientadas por una perspectiva de futuro, anticipando tendencias y preparando a las organizaciones y comunidades para los desafíos y oportunidades venideras."
  }
];

export default function MisionPage() {
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
        <div className="grid md:grid-cols-2 items-center"> {/* No gap, image meets text container */}
          {/* Columna de la Imagen (takes full available width on its side) */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] group"> {/* Increased height for more impact */}
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Visualización de la misión de PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="equipo mision estrategia"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay on image, from left to transparent, more pronounced on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>

          {/* Columna del Texto (content inside is padded to align with other centered content) */}
          <div className="text-left py-12 px-6 md:px-12 lg:px-16"> {/* Generous padding for text */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Consolidar <span className="text-3xl md:text-4xl font-bold text-primary">lazos estratégicos</span> entre <span className="text-2xl md:text-3xl font-semibold text-accent">sectores</span> y <span className="text-2xl md:text-3xl font-semibold text-[hsl(var(--ring))]">comunidades</span>, aplicando nuestra <span className="text-3xl md:text-4xl font-bold text-primary">experiencia con discernimiento</span> para afrontar los <span className="text-2xl md:text-3xl font-semibold text-accent">retos globales</span> de manera <span className="text-3xl md:text-4xl font-bold text-primary">sostenible</span> y con <span className="text-3xl md:text-4xl font-bold text-accent">visión de futuro</span>.
            </p>
          </div>
        </div>
      </section> {/* End of full-width image/text section */}

      {/* Centered container for new detailed section and bottom content (CTA) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Desglosando Nuestra Misión:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {misionPoints.map((point, index) => (
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
          <Button size="lg" asChild className="text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform">
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
