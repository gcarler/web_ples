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
