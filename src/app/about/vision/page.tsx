// src/app/about/vision/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Eye, TrendingUp, Zap, ShieldAlert, Gem, Building, Leaf } from 'lucide-react'; // Usaremos Eye para Visión e iconos adicionales
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


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
  ctaLink: "/forms?subject=Consulta%20Nuestra%20Vision",
  ctaText: "Proyecte el Futuro Con Nosotros"
};

const visionPoints = [
  {
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Inspirar un Porvenir Sostenible y Equitativo",
    text: "Buscamos ser una fuente de inspiración activa, demostrando que es posible construir un futuro donde el desarrollo económico, la justicia social y la protección ambiental coexistan y se refuercen mutuamente, beneficiando a todas las personas."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Innovación como Catalizador",
    text: "Entendemos la innovación no solo como desarrollo tecnológico, sino como la capacidad de generar nuevas ideas, procesos y modelos que aborden eficazmente los desafíos críticos y creen valor de manera disruptiva."
  },
  {
    icon: <ShieldAlert className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Respuesta a Desafíos Críticos",
    text: "Enfocamos nuestra experiencia y soluciones en abordar los problemas más urgentes de nuestro tiempo, como la adaptación al cambio climático y la gestión sostenible de los recursos naturales, esenciales para la supervivencia y el bienestar."
  },
  {
    icon: <Gem className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Ser Referentes de Impacto Positivo y Perdurable",
    text: "Aspiramos a ser reconocidos por la excelencia y la trascendencia de nuestras intervenciones, generando un legado de cambio positivo que perdure en el tiempo y sirva de modelo para otros."
  },
  {
    icon: <Building className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Transformación Comunitaria hacia la Resiliencia y Justicia",
    text: "Trabajamos para empoderar a las comunidades, fortaleciendo sus capacidades para adaptarse a los cambios, superar las desigualdades y construir entornos más justos, seguros y prósperos para todos sus miembros."
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Compromiso con las Generaciones Venideras",
    text: "Nuestra visión se proyecta hacia el futuro, tomando decisiones y acciones hoy que aseguren un planeta habitable y oportunidades equitativas para las próximas generaciones, actuando con responsabilidad intergeneracional."
  }
];


export default function VisionPage() {
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
              alt="Visualización de la visión de PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="vision futuro inspiracion"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay on image, from left to transparent, more pronounced on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>

          {/* Columna del Texto (content inside is padded to align with other centered content) */}
          <div className="text-left py-12 px-6 md:px-12 lg:px-16"> {/* Generous padding for text */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Anhelamos <span className="text-3xl md:text-4xl font-bold text-primary">inspirar un porvenir</span> donde la <span className="text-2xl md:text-3xl font-semibold text-accent">sostenibilidad</span> y la <span className="text-2xl md:text-3xl font-semibold text-[hsl(var(--ring))]">equidad</span> sean pilares, catalizadas por la <span className="text-3xl md:text-4xl font-bold text-primary">innovación</span> en la respuesta a <span className="text-xl md:text-2xl font-medium text-accent">desafíos críticos</span> como el <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">cambio climático</span> y la <span className="text-xl md:text-2xl font-medium text-primary">gestión responsable de los recursos</span>. Nos concebimos como <span className="text-2xl md:text-3xl font-semibold text-accent">referentes</span> en la creación de un <span className="text-xl md:text-2xl font-medium text-primary">impacto positivo y perdurable</span>, transformando <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">comunidades</span> hacia un <span className="text-3xl md:text-4xl font-bold text-accent">mundo más resiliente y justo</span> para las <span className="text-2xl md:text-3xl font-semibold text-primary">generaciones venideras</span>.
            </p>
          </div>
        </div>
      </section> {/* End of full-width image/text section */}

      {/* Centered container for new detailed section and bottom content (CTA) */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Desglosando Nuestra Visión:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visionPoints.map((point, index) => (
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
