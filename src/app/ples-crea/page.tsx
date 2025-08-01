// src/app/ples-crea/page.tsx
'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, Globe, Layers, BarChart3, CheckCircle, Search, DraftingCompass, Eye, Cpu, BrainCircuit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration';


const services = [
  {
    icon: Layers,
    title: 'Cartografía Digital y Temática',
    description: 'Diseñamos y producimos mapas personalizados de alta precisión, que visualizan datos complejos de manera clara y efectiva para la toma de decisiones estratégicas.',
    details: ['Mapas base topográficos y urbanos', 'Cartografía temática (ambiental, social, económica)', 'Diseño infográfico y de atlas', 'Optimización para web y móvil']
  },
  {
    icon: Cpu,
    title: 'Modelado 3D y Gemelos Digitales',
    description: 'Creamos representaciones tridimensionales realistas de terrenos, ciudades e infraestructuras, proporcionando una comprensión inmersiva del entorno.',
    details: ['Modelos Digitales de Elevación (MDE)', 'Reconstrucción 3D a partir de LiDAR y fotogrametría', 'Creación de Gemelos Digitales de activos', 'Simulaciones y análisis de visibilidad']
  },
  {
    icon: BrainCircuit,
    title: 'Análisis Geoespacial Avanzado',
    description: 'Transformamos datos geográficos en insights de negocio, identificando patrones, tendencias y relaciones espaciales que no son visibles a simple vista.',
    details: ['Análisis de rutas óptimas y logística', 'Estudios de mercado y localización de sitios', 'Modelado de riesgos y vulnerabilidades', 'Análisis de redes y flujos']
  }
];

const processSteps = [
    {
        icon: Search,
        title: "1. Diagnóstico y Adquisición de Datos",
        description: "Comprendemos sus necesidades y recopilamos los datos geoespaciales más precisos utilizando sensores remotos, drones y fuentes de datos confiables."
    },
    {
        icon: DraftingCompass,
        title: "2. Procesamiento y Modelado",
        description: "Aplicamos algoritmos avanzados y técnicas de modelado para procesar, limpiar y estructurar los datos, preparándolos para el análisis y la visualización."
    },
    {
        icon: Eye,
        title: "3. Diseño y Visualización de Información",
        description: "Creamos productos cartográficos y visualizaciones interactivas que comunican los resultados de manera clara, intuitiva y estéticamente impactante."
    }
];


export default function PlesCreaPage() {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <GlobeIllustration />
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES CREA
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transformamos <strong className="text-primary">datos geoespaciales</strong> en <strong className="text-accent">conocimiento visual</strong>. Diseñamos mapas y modelos 3D que revelan patrones, optimizan decisiones y dan forma al futuro.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Geoespacial</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#CartografiaDigital</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Innovacion3D</Badge>
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-crea&subject=Consulta%20PLES%20CREA`}>
                  <span className="flex items-center">
                    Inicie su Proyecto Geoespacial <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Servicios Geoespaciales</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Ofrecemos un portafolio completo de servicios para cubrir todas las fases de un proyecto geoespacial, desde la captura de datos hasta el análisis avanzado.
            </p>
            <div className="grid md:grid-cols-3 gap-8 group/spotlight" onMouseMove={handleMouseMove}>
            {services.map((service) => {
              const ServiceIcon = service.icon;
              return (
                 <div key={service.title} className="relative rounded-lg border border-border bg-background p-px transition-shadow duration-300 before:pointer-events-none before:absolute before:-left-px before:-top-px before:h-full before:w-full before:rounded-lg before:border-primary/50 before:opacity-0 before:shadow-[0_0_80px_20px_hsl(var(--primary)/0.2)] before:transition-opacity before:duration-300 hover:before:opacity-100">
                    <Card
                        className="h-full w-full bg-background/95 p-6 backdrop-blur-sm"
                        style={{
                            '--mouse-x': `${mousePosition.x}px`,
                            '--mouse-y': `${mousePosition.y}px`,
                        } as React.CSSProperties}
                        >
                    <div className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100" 
                        style={{
                            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary)/0.15), transparent 80%)`,
                        }}
                    />
                    <CardHeader className="p-0">
                        <ServiceIcon className="h-10 w-10 text-primary mb-4" />
                        <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 text-muted-foreground">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-6">
                        <ul className="space-y-2 text-sm">
                        {service.details.map(detail => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    </Card>
                </div>
            )})}
            </div>
        </div>
      </section>
      
      {/* Process Section */}
       <section className="py-12 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestro Proceso Colaborativo</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Aplicamos un enfoque metodológico riguroso para garantizar resultados de la más alta calidad y precisión en cada proyecto.
            </p>
            <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0">
                {processSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                        <React.Fragment key={step.title}>
                            <div className="flex flex-col items-center gap-4 text-center md:flex-1 p-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg border border-primary/20">
                                    <StepIcon className="h-8 w-8" />
                                </div>
                                <div className="mt-2">
                                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm max-w-xs mx-auto">{step.description}</p>
                                </div>
                            </div>

                            {index < processSteps.length - 1 && (
                                <div className="hidden md:flex items-center justify-center flex-1 animate-fade-in-up" style={{ animationDelay: `${(index + 0.5) * 0.2}s`}}>
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visualice su Mundo. Transforme sus Decisiones.</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             Permítanos mostrarle cómo la inteligencia geoespacial puede revelar nuevas oportunidades y optimizar sus operaciones.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-crea&subject=Solicitud%20Asesoria%20Geoespacial`}>
                <span className="flex items-center">
                    Hable con un Experto <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
