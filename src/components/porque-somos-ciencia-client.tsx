'use client';
// src/components/porque-somos-ciencia-client.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FlaskConical, Search, BarChart3, Settings, BookOpen, CheckCircle, BrainCircuit } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

export default function CienciaClientPage() {
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
        </div>

        {/* Hero Section with Cube */}
        <section className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center text-center mb-16 overflow-hidden">
            {/* The cube animation will be the background element, moving freely */}
            <div className="absolute inset-0 perspective-container">
              <div className="animation-wrapper">
                <div className="cube-container">
                  <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* The text content is layered on top */}
            <div className="relative z-10 px-4">
                <div className="inline-block p-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full mb-8 shadow-md animate-expand-in">
                  {pageDetails.mainIcon}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {pageDetails.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  {pageDetails.subtitle}
                </p>
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

        <style jsx>{`
            .perspective-container {
                perspective: 1500px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .animation-wrapper {
              animation: float 30s infinite ease-in-out alternate;
            }

            .cube-container {
                width: 250px;
                height: 250px;
                position: relative;
                transform-style: preserve-3d;
                animation: rotate 25s infinite linear;
            }
            
            @media (min-width: 768px) {
                .cube-container {
                    width: 300px;
                    height: 300px;
                }
            }
            
            @keyframes float {
                0% { transform: translate3d(-15vw, 10vh, -50px) rotateX(-10deg) rotateY(10deg); }
                50% { transform: translate3d(15vw, -10vh, 50px) rotateX(10deg) rotateY(-10deg); }
                100% { transform: translate3d(-15vw, 10vh, -50px) rotateX(-10deg) rotateY(10deg); }
            }

            @keyframes rotate {
                from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
            }

            @keyframes color-cycle {
                0%   { border-color: hsl(var(--primary)); background: hsl(var(--primary) / 0.1); }
                20%  { border-color: hsl(var(--accent)); background: hsl(var(--accent) / 0.1); }
                40%  { border-color: hsl(var(--ring)); background: hsl(var(--ring) / 0.1); }
                60%  { border-color: hsl(var(--chart-4)); background: hsl(var(--chart-4) / 0.1); }
                80%  { border-color: hsl(var(--chart-5)); background: hsl(var(--chart-5) / 0.1); }
                100% { border-color: hsl(var(--primary)); background: hsl(var(--primary) / 0.1); }
            }

            .cube {
                width: 100%;
                height: 100%;
                position: absolute;
                transform-style: preserve-3d;
            }

            .face {
                position: absolute;
                width: 100%;
                height: 100%;
                border-width: 2px;
                border-style: solid;
                box-shadow: 0 0 30px currentColor, inset 0 0 30px currentColor;
                backdrop-filter: blur(2px);
                opacity: 0.8;
                animation: color-cycle 20s infinite linear;
            }
            
            .face.front  { transform: rotateY(  0deg) translateZ(125px); animation-delay: 0s; }
            .face.back   { transform: rotateY(180deg) translateZ(125px); animation-delay: -3.3s; }
            .face.right  { transform: rotateY( 90deg) translateZ(125px); animation-delay: -6.6s; }
            .face.left   { transform: rotateY(-90deg) translateZ(125px); animation-delay: -9.9s; }
            .face.top    { transform: rotateX( 90deg) translateZ(125px); animation-delay: -13.2s; }
            .face.bottom { transform: rotateX(-90deg) translateZ(125px); animation-delay: -16.5s; }

            @media (min-width: 768px) {
                .face.front  { transform: rotateY(  0deg) translateZ(150px); }
                .face.back   { transform: rotateY(180deg) translateZ(150px); }
                .face.right  { transform: rotateY( 90deg) translateZ(150px); }
                .face.left   { transform: rotateY(-90deg) translateZ(150px); }
                .face.top    { transform: rotateX( 90deg) translateZ(150px); }
                .face.bottom { transform: rotateX(-90deg) translateZ(150px); }
            }
        `}</style>
      </div>
  );
}
