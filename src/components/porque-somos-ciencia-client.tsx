
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
  ctaLink: "/forms?subject=Consulta%20Proyectos%20Cientificos",
  ctaText: "Explore Nuestros Proyectos"
};

const cienciaPoints = [
  {
    icon: Search,
    title: "Investigación Basada en Evidencia",
    text: "Cada solución parte de un análisis profundo de datos y evidencia científica para comprender el problema en su totalidad, evitando suposiciones y asegurando un diagnóstico preciso."
  },
  {
    icon: BarChart3,
    title: "Rigor Metodológico y Cuantitativo",
    text: "Aplicamos métodos científicos y estadísticos rigurosos para garantizar la validez, fiabilidad y replicabilidad de nuestros resultados, lo que se traduce en soluciones robustas."
  },
  {
    icon: Settings,
    title: "Experimentación y Validación",
    text: "Fomentamos la experimentación controlada y la validación de hipótesis para probar y refinar soluciones antes de su implementación a gran escala, minimizando riesgos."
  },
  {
    icon: BookOpen,
    title: "Gestión del Conocimiento",
    text: "Sistematizamos el aprendizaje y la experiencia acumulada para construir una base de conocimiento sólida que enriquece y acelera cada nuevo proyecto."
  },
  {
    icon: CheckCircle,
    title: "Objetividad y Transparencia",
    text: "Nuestro enfoque científico garantiza que las recomendaciones se basen en datos objetivos, promoviendo la transparencia y la confianza con nuestros clientes y aliados."
  },
  {
    icon: BrainCircuit,
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
                <h1 className="text-4xl md:text-5xl font-bold text-foreground [text-shadow:0_2px_10px_hsl(var(--primary)/0.5)] py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  {pageDetails.title}
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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
                {cienciaPoints.map((point, index) => {
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
            
            <section className="py-16 text-center animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <Card className="max-w-2xl mx-auto bg-card shadow-lg border hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <FlaskConical className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Explore Nuestro Laboratorio de Innovación</CardTitle>
                  <CardDescription>
                    Vea cómo aplicamos estos principios científicos en experimentos y prototipos de vanguardia.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="accent">
                    <Link href="/labs">
                      Visitar PLES Labs <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section className="text-center mt-0 mb-16 animate-fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
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
              animation: float 45s infinite ease-in-out alternate;
            }

            .cube-container {
                width: 250px;
                height: 250px;
                position: relative;
                transform-style: preserve-3d;
            }
            
            .cube {
              width: 100%;
              height: 100%;
              position: relative;
              transform-style: preserve-3d;
              animation: rotate 40s infinite linear;
            }

            @media (min-width: 768px) {
                .cube-container {
                    width: 300px;
                    height: 300px;
                }
            }
            
            @keyframes float {
                0% { transform: translate3d(-15vw, 10vh, -50px); }
                50% { transform: translate3d(15vw, -10vh, 50px); }
                100% { transform: translate3d(-15vw, 10vh, -50px); }
            }

            @keyframes rotate {
                from { transform: rotateX(0deg) rotateY(0deg); }
                to { transform: rotateX(360deg) rotateY(360deg); }
            }
            
            @keyframes pulse-glow {
                from {
                    opacity: 0.7;
                }
                to {
                    opacity: 1;
                }
            }

            .face {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid hsl(var(--accent));
                background: hsl(var(--primary) / 0.05);
                backdrop-filter: blur(1px);
                animation: pulse-glow 2.5s infinite alternate ease-in-out;
            }
            
            .face.front  { 
                transform: rotateY(  0deg) translateZ(125px);
            }
            .face.back   { 
                transform: rotateY(180deg) translateZ(125px); 
            }
            .face.right  { 
                transform: rotateY( 90deg) translateZ(125px); 
            }
            .face.left   { 
                transform: rotateY(-90deg) translateZ(125px); 
            }
            .face.top    { 
                transform: rotateX( 90deg) translateZ(125px); 
            }
            .face.bottom { 
                transform: rotateX(-90deg) translateZ(125px); 
            }

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
