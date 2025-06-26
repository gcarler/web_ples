// src/app/porque-somos-ciencia/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FlaskConical, Search, BarChart3, Settings, BookOpen, CheckCircle, BrainCircuit } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Por Qué Somos Ciencia - PLES',
  description: 'Descubra cómo nuestro compromiso con el rigor metodológico, la investigación y la evidencia impulsa soluciones efectivas y confiables.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Por Qué Somos Ciencia",
  subtitle: "El rigor metodológico como pilar de la confianza y la efectividad.",
  mainIcon: <FlaskConical className="h-12 w-12 md:h-16 md:w-16" />,
  ctaLink: "/forms?subject=Consulta%20Proyectos%20Cientificos",
  ctaText: "Explore Nuestros Proyectos"
};

const cienciaPoints = [
  {
    icon: <Search className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Investigación Basada en Evidencia",
    text: "Cada solución parte de un análisis profundo de datos y evidencia científica para comprender el problema en su totalidad, evitando suposiciones y asegurando un diagnóstico preciso."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Rigor Metodológico y Cuantitativo",
    text: "Aplicamos métodos científicos y estadísticos rigurosos para garantizar la validez, fiabilidad y replicabilidad de nuestros resultados, lo que se traduce en soluciones robustas."
  },
  {
    icon: <Settings className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Experimentación y Validación",
    text: "Fomentamos la experimentación controlada y la validación de hipótesis para probar y refinar soluciones antes de su implementación a gran escala, minimizando riesgos."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Gestión del Conocimiento",
    text: "Sistematizamos el aprendizaje y la experiencia acumulada para construir una base de conocimiento sólida que enriquece y acelera cada nuevo proyecto."
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Objetividad y Transparencia",
    text: "Nuestro enfoque científico garantiza que las recomendaciones se basen en datos objetivos, promoviendo la transparencia y la confianza con nuestros clientes y aliados."
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />,
    title: "Enfoque Interdisciplinario",
    text: "Conectamos diversas disciplinas científicas (ciencias de datos, sociales, ambientales) para abordar problemas complejos desde una perspectiva holística e integrada."
  }
];

export default function PorqueSomosCienciaPage() {
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
              {pageDetails.mainIcon}
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
          <div className="relative w-full group min-h-[400px] md:min-h-full bg-muted/20 flex items-center justify-center p-4 overflow-hidden">
            <svg width="80%" height="80%" viewBox="0 0 400 400" className="opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <defs>
                    <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'hsl(var(--accent))'}} />
                        <stop offset="100%" style={{stopColor: 'hsl(var(--primary))'}} />
                    </linearGradient>
                    <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur">
                             <animate attributeName="stdDeviation" values="4;7;4" dur="4s" repeatCount="indefinite" />
                        </feGaussianBlur>
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g id="network-group">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 200 200"
                        to="360 200 200"
                        dur="120s"
                        repeatCount="indefinite"
                        />
                    <animateMotion
                        dur="80s"
                        repeatCount="indefinite"
                        path="M0,0 C15,-10 -15,10 0,0 Z"
                        />
                    
                    {/* Gray Lines - Based on the image structure */}
                    <line x1="50" y1="50" x2="200" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="200" y1="60" x2="290" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="290" y1="80" x2="350" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="350" y1="150" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="290" y1="380" x2="80" y2="320" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="80" y1="320" x2="210" y2="340" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="50" y1="50" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="200" y1="60" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="80" y1="320" x2="30" y2="240" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="30" y1="240" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                    <line x1="150" y1="180" x2="210" y2="340" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />

                    {/* Glowing Lines */}
                    <g filter="url(#glow-filter)">
                        <line x1="50" y1="50" x2="290" y2="380" stroke="url(#glow-gradient)" strokeWidth="3" />
                        <line x1="350" y1="150" x2="80" y2="320" stroke="url(#glow-gradient)" strokeWidth="3" />
                    </g>
                    
                    {/* Nodes (Circles) - Placed on top of lines */}
                    <circle cx="50" cy="50" r="12" fill="hsl(var(--primary))"><animate attributeName="r" values="12;12.5;12" dur="5s" repeatCount="indefinite" begin="0s" /></circle>
                    <circle cx="200" cy="60" r="8" fill="hsl(var(--accent))"><animate attributeName="r" values="8;8.5;8" dur="4.5s" repeatCount="indefinite" begin="0.5s" /></circle>
                    <circle cx="290" cy="80" r="7" fill="hsl(var(--primary))" opacity="0.5"><animate attributeName="r" values="7;7.5;7" dur="6s" repeatCount="indefinite" begin="1s" /></circle>
                    <circle cx="350" cy="150" r="14" fill="hsl(var(--primary))"><animate attributeName="r" values="14;14.5;14" dur="4s" repeatCount="indefinite" begin="0.2s" /></circle>
                    <circle cx="150" cy="180" r="18" fill="hsl(var(--accent))"><animate attributeName="r" values="18;18.5;18" dur="3.5s" repeatCount="indefinite" begin="0.8s" /></circle>
                    <circle cx="80" cy="320" r="9" fill="hsl(var(--primary))"><animate attributeName="r" values="9;9.5;9" dur="5.5s" repeatCount="indefinite" begin="1.2s" /></circle>
                    <circle cx="210" cy="340" r="9" fill="hsl(var(--primary))"><animate attributeName="r" values="9;9.5;9" dur="6.5s" repeatCount="indefinite" begin="1.5s" /></circle>
                    <circle cx="290" cy="380" r="11" fill="hsl(var(--accent))"><animate attributeName="r" values="11;11.5;11" dur="4.8s" repeatCount="indefinite" begin="0.4s" /></circle>
                    <circle cx="30" cy="240" r="11" fill="hsl(var(--primary))"><animate attributeName="r" values="11;11.5;11" dur="5.2s" repeatCount="indefinite" begin="0.9s" /></circle>
                </g>
            </svg>
          </div>
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              En PLES, la <span className="text-3xl md:text-4xl font-bold text-primary">ciencia</span> no es un concepto abstracto, es nuestra <span className="text-2xl md:text-3xl font-semibold text-accent">hoja de ruta</span>. Aplicamos el <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">método científico</span> en cada proyecto, desde la <span className="font-semibold text-primary">investigación</span> profunda hasta la <span className="font-semibold text-accent">validación rigurosa</span> de resultados. Esto nos permite construir soluciones <span className="text-2xl md:text-3xl font-semibold text-primary">confiables, medibles y transparentes</span>, minimizando riesgos y maximizando el impacto positivo y sostenible de nuestras intervenciones.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Nuestros Principios Científicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cienciaPoints.map((point, index) => (
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
      </div>
    </div>
  );
}
