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
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'hsl(var(--primary))'}} />
                        <stop offset="100%" style={{stopColor: 'hsl(var(--accent))'}} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
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
                        dur="60s"
                        begin="1s"
                        repeatCount="indefinite"
                        additive="sum"
                        />
                    <animateMotion
                        dur="45s"
                        begin="1s"
                        repeatCount="indefinite"
                        path="M0,0 C10,-15 -10,15 0,0 Z"
                        />

                    <circle id="node0" cx="200" cy="200" r="15" fill="hsl(var(--accent))" filter="url(#glow)">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" fill="freeze" />
                         <animate attributeName="r" values="15;16;15" dur="5s" repeatCount="indefinite" begin="1s" />
                    </circle>

                    <circle id="node1" cx="100" cy="100" r="10" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.5s" fill="freeze" />
                    </circle>
                    <circle id="node2" cx="300" cy="100" r="10" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0.8s" fill="freeze" />
                    </circle>
                    <circle id="node3" cx="100" cy="300" r="10" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="1.1s" fill="freeze" />
                    </circle>
                    <circle id="node4" cx="300" cy="300" r="10" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="1.4s" fill="freeze" />
                    </circle>
                    <circle id="node5" cx="200" cy="50" r="8" fill="hsl(var(--accent))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="1.7s" fill="freeze" />
                    </circle>
                    <circle id="node6" cx="200" cy="350" r="8" fill="hsl(var(--accent))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="2s" fill="freeze" />
                    </circle>
                    <circle id="node7" cx="50" cy="200" r="8" fill="hsl(var(--accent))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="2.3s" fill="freeze" />
                    </circle>
                    <circle id="node8" cx="350" cy="200" r="8" fill="hsl(var(--accent))" opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="1s" begin="2.6s" fill="freeze" />
                    </circle>

                    <line x1="200" y1="200" x2="100" y2="100" stroke="url(#line-gradient)" stroke-width="2" stroke-dasharray="142" stroke-dashoffset="142">
                        <animate attributeName="stroke-dashoffset" from="142" to="0" dur="1s" begin="3s" fill="freeze" />
                    </line>
                    <line x1="200" y1="200" x2="300" y2="100" stroke="url(#line-gradient)" stroke-width="2" stroke-dasharray="142" stroke-dashoffset="142">
                        <animate attributeName="stroke-dashoffset" from="142" to="0" dur="1s" begin="3.2s" fill="freeze" />
                    </line>
                    <line x1="200" y1="200" x2="100" y2="300" stroke="url(#line-gradient)" stroke-width="2" stroke-dasharray="142" stroke-dashoffset="142">
                        <animate attributeName="stroke-dashoffset" from="142" to="0" dur="1s" begin="3.4s" fill="freeze" />
                    </line>
                    <line x1="200" y1="200" x2="300" y2="300" stroke="url(#line-gradient)" stroke-width="2" stroke-dasharray="142" stroke-dashoffset="142">
                        <animate attributeName="stroke-dashoffset" from="142" to="0" dur="1s" begin="3.6s" fill="freeze" />
                    </line>
                    <line x1="100" y1="100" x2="200" y2="50" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="3.8s" fill="freeze" />
                    </line>
                    <line x1="300" y1="100" x2="200" y2="50" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="4s" fill="freeze" />
                    </line>
                    <line x1="100" y1="100" x2="50" y2="200" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="4.2s" fill="freeze" />
                    </line>
                     <line x1="300" y1="100" x2="350" y2="200" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="4.4s" fill="freeze" />
                    </line>
                     <line x1="100" y1="300" x2="200" y2="350" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="4.6s" fill="freeze" />
                    </line>
                     <line x1="300" y1="300" x2="200" y2="350" stroke="hsl(var(--muted-foreground))" stroke-width="1.5" stroke-dasharray="112" stroke-dashoffset="112">
                        <animate attributeName="stroke-dashoffset" from="112" to="0" dur="1s" begin="4.8s" fill="freeze" />
                    </line>
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
