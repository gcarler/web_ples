
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // CardDescription importada
import { ArrowRight, Gem, HeartPulse, Target, Globe, Rocket, Eye, Info, Shield, Lightbulb, Users as UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const coreValues = [
  {
    id: 'colaboracion',
    name: 'Colaboración',
    icon: UsersIcon,
    explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos un espíritu de trabajo en equipo sinérgico, tanto internamente como con nuestros clientes y aliados estratégicos. Creemos firmemente que la convergencia de diversas perspectivas y talentos enriquece los resultados, amplía los horizontes y es fundamental para el éxito compartido.",
  },
  {
    id: 'innovacion',
    name: 'Innovación',
    icon: Lightbulb,
    explanation: "Como motor de nuestro progreso, la innovación nos impulsa a buscar constantemente nuevas ideas, enfoques disruptivos y tecnologías de vanguardia. Abrazamos la creatividad para generar soluciones eficientes y transformadoras que aporten un valor diferencial y superen los desafíos complejos.",
  },
  {
    id: 'integridad',
    name: 'Integridad',
    icon: Shield,
    explanation: "Actuamos con honestidad, transparencia y ética profesional en todas nuestras interacciones. La integridad es el pilar que sustenta la confianza con nuestros clientes, colaboradores y la sociedad, guiando cada decisión y proyecto que emprendemos.",
  },
];

export default function AboutPage() {
  const [selectedValue, setSelectedValue] = useState('colaboracion'); // Default to 'colaboracion'
  const selectedContent = coreValues.find(v => v.id === selectedValue);

  const sections = [
    {
      title: 'Nuestra Esencia',
      content: 'Comprendiendo quienes somos.',
      link: '/about/esencia',
      icon: HeartPulse,
    },
    {
      title: 'Nuestro Propósito',
      content: 'Explorando nuestro motor.',
      link: '/about/proposito',
      icon: Target,
    },
    {
      title: 'Colaboración Global',
      content: 'Conoce cómo trabajamos.',
      link: '/about/colaboracion',
      icon: Globe,
    },
    {
      title: 'Nuestra Misión',
      content: 'Guiando nuestras acciones.',
      link: '/about/mision',
      icon: Rocket,
    },
    {
      title: 'Nuestra Visión',
      content: 'Definiendo nuestro horizonte.',
      link: '/about/vision',
      icon: Eye,
    },
  ];

  return (
    <div className="py-10 space-y-16">

      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute -left-[65%] sm:-left-[55%] md:-left-[45%] top-1/2 transform -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center"
                  >
                    <Info className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                Sobre PLES
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Fusionamos visión global y enfoque multidisciplinario para construir un legado de impacto y sostenibilidad.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#VisiónGlobal</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Innovación</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Sostenibilidad</Badge>
              </div>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/about/esencia">
                  <span className="flex items-center">
                    Nuestra Historia <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Nuestra Identidad</h2>
            <p className="text-lg mb-4">
              Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <CardContent className="p-0">
                  <DynamicSection {...section} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Interactive "Nuestros Valores Fundamentales" Section */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row min-h-[450px] md:min-h-[500px] bg-card shadow-2xl rounded-xl overflow-hidden border border-border/20">
          {/* Vertical Tabs - Left Side */}
          <div className="flex md:flex-col w-full md:w-20 lg:w-24 border-b md:border-b-0 md:border-r border-border/20">
            {coreValues.map((value, index) => {
              let bgColor = 'bg-primary/60'; // Lightest blue for first/top
              if (index === 1) bgColor = 'bg-primary/70'; // Middle blue
              if (index === 2) bgColor = 'bg-primary/80'; // Darkest blue for last/bottom

              return (
                <button
                  key={value.id}
                  onClick={() => setSelectedValue(value.id)}
                  className={cn(
                    "w-full md:h-1/3 p-3 md:p-0 flex items-center justify-center text-center text-primary-foreground uppercase tracking-wider font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 ease-in-out hover:opacity-90",
                    "md:writing-mode-vertical-rl md:transform md:rotate-180",
                    selectedValue === value.id ? 'bg-accent text-accent-foreground shadow-inner-lg' : `${bgColor} hover:${bgColor}/90`,
                    index < coreValues.length - 1 && "md:border-b border-primary/20", // Horizontal border for vertical tabs
                    index < coreValues.length - 1 && index > 0 && "border-r md:border-r-0 border-primary/20" // Vertical border for horizontal tabs
                  )}
                >
                  {value.name}
                </button>
              );
            })}
          </div>

          {/* Content Display - Right Side */}
          <div className="flex-1 bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight uppercase">
              NUESTROS VALORES
            </h2>
            {selectedContent && (
              <div key={selectedContent.id} className="animate-fade-in-up space-y-4">
                <selectedContent.icon className="h-16 w-16 sm:h-20 sm:w-20 text-accent mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-semibold text-accent">
                  {selectedContent.name}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed max-w-md mx-auto text-primary-foreground/90">
                  {selectedContent.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="mt-12 text-center text-md text-muted-foreground italic max-w-3xl mx-auto">
          Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
        </p>
      </section>

    </div>
  );
}

