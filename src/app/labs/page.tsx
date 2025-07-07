// src/app/labs/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Beaker, Bot, BrainCircuit, Building2, Cpu, FlaskConical, Lightbulb, Vote } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Laboratorio de Innovación - PLES',
  description: 'Explorando el futuro. Aquí experimentamos con nuevas ideas, tecnologías y enfoques para resolver los desafíos del mañana.',
};

const experiments = [
    {
        icon: BrainCircuit,
        title: "IA Geoespacial para Análisis Predictivo",
        description: "Aplicación de modelos de Machine Learning para predecir patrones de crecimiento urbano y riesgos ambientales, optimizando la planificación territorial.",
        status: "Activo",
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    },
    {
        icon: Vote,
        title: "Plataforma de Participación Ciudadana con Blockchain",
        description: "Explorando el uso de tecnología blockchain para garantizar la transparencia e inmutabilidad en procesos de consulta y votación ciudadana.",
        status: "Experimental",
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
    {
        icon: Building2,
        title: "Gemelos Digitales para la Gestión de Infraestructura",
        description: "Creación de réplicas virtuales de activos de infraestructura para simular, monitorear y optimizar su operación y mantenimiento en tiempo real.",
        status: "Próximamente",
        statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
     {
        icon: Bot,
        title: "Asistente de IA para Licitaciones Públicas",
        description: "Desarrollo de un agente de IA que analiza pliegos de licitaciones, identifica requisitos clave y ayuda a generar propuestas técnicas de forma automática.",
        status: "Experimental",
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    },
];

export default function LabsPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.1),_hsl(var(--primary)/0.1),_transparent_70%)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full mb-8 shadow-md animate-expand-in">
            <FlaskConical className="h-12 w-12 md:h-16 md:w-16" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Laboratorio de Innovación
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Explorando el futuro. Aquí experimentamos con nuevas ideas, tecnologías y enfoques para resolver los desafíos del mañana.
          </p>
        </div>
      </section>

      {/* Experiments Grid Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Experimentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiments.map((exp, index) => {
              const ExpIcon = exp.icon;
              return (
              <Card key={index} className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 ease-in-out transform hover:scale-[1.03] border flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4">
                  <ExpIcon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{exp.title}</CardTitle>
                    <Badge variant="secondary" className={`mt-2 ${exp.statusColor}`}>{exp.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm">
                    {exp.description}
                  </p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground p-0">
                        <Link href="/forms?subject=Consulta%20Experimento%20Labs">
                            <span className="flex items-center">
                                Saber Más <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                        </Link>
                    </Button>
                </div>
              </Card>
            )})}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <Lightbulb className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tienes una idea disruptiva?</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90">
             La innovación es un proceso colaborativo. Si tienes una idea que podría transformar nuestra forma de trabajar o resolver un problema complejo, nos encantaría escucharla.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href="/forms?subject=Idea%20para%20Labs">
                <span className="flex items-center">
                    Comparte tu Idea <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
