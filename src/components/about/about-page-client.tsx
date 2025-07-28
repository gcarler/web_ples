// src/components/about/about-page-client.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Info, Shield, Lightbulb, Users as UsersIcon, Cpu, Layers, Zap, FlaskConical, Brain, Search, Settings, Handshake, Puzzle, Link as LinkIcon, Workflow, MessageSquare, GitMerge, Share2, ShieldCheck, Scale, Lock, Verified, FileCheck, Award, Gem, Target, Globe, Rocket, Eye, HeartPulse } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type CoreValue, type Pillar } from '@/lib/models/content';
import React from 'react';

// Icon Map to render Lucide icons from string names
const iconMap: { [key: string]: React.ElementType } = {
  UsersIcon, Lightbulb, Shield, FlaskConical, Cpu,
  Gem, HeartPulse, Target, Globe, Rocket, Eye, Info,
  Layers, Zap, Brain, Search, Settings, Handshake, Puzzle, LinkIcon,
  Workflow, MessageSquare, GitMerge, Share2, ShieldCheck, Scale, Lock, Verified,
  FileCheck, Award
};

interface AboutPageClientProps {
  initialCoreValues: CoreValue[];
  initialPillars: Pillar[];
}

export default function AboutPageClient({ initialCoreValues, initialPillars }: AboutPageClientProps) {
  const [selectedValue, setSelectedValue] = useState(initialCoreValues[2]?.id || 'integridad');
  const selectedContent = initialCoreValues.find(v => v.id === selectedValue);

  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['bg-primary/20', 'bg-accent/20', 'bg-ring/20', 'bg-primary/30', 'bg-accent/30', 'bg-ring/30', 'bg-accent/40'];
    const sizes = ['h-8 w-8', 'h-12 w-12', 'h-16 w-16', 'h-20 w-20', 'h-24 w-24', 'h-32 w-32'];
    const generatedBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 20}s`,
        animationDelay: `-${Math.random() * 20}s`,
      },
      className: cn(
        sizes[Math.floor(Math.random() * sizes.length)],
        colors[Math.floor(Math.random() * colors.length)]
      ),
    }));
    setBubbles(generatedBubbles);
  }, []);

  const SelectedIconComponent = selectedContent ? iconMap[selectedContent.iconName] || Shield : Shield;
  
  const identitySections = [
      { title: 'Nuestra Esencia', content: 'Comprendiendo quienes somos.', link: '/about/esencia', icon: 'HeartPulse' },
      { title: 'Nuestro Propósito', content: 'Explorando nuestro motor.', link: '/about/proposito', icon: 'Target' },
      { title: 'Colaboración Global', content: 'Conoce cómo trabajamos.', link: '/about/colaboracion', icon: 'Globe' },
      { title: 'Nuestra Misión', content: 'Guiando nuestras acciones.', link: '/about/mision', icon: 'Rocket' },
      { title: 'Nuestra Visión', content: 'Definiendo nuestro horizonte.', link: '/about/vision', icon: 'Eye' },
  ];
  
  const integrityPhrases = [
      "Actuamos con honestidad,", "transparencia y ética", "profesional en cada interacción.",
      "La integridad es el pilar", "de la confianza que construimos", "con nuestros clientes, socios,", "y la comunidad, garantizando", "que nuestras acciones", "siempre estén alineadas", "con nuestros principios."
  ];

  const innovationDescription = `Como motor de nuestro progreso, la <strong>innovación</strong> nos impulsa a <strong>desafiar el status quo</strong> y a explorar constantemente <strong>nuevas tecnologías y metodologías</strong>. Convertimos <strong>ideas audaces</strong> en soluciones prácticas que aportan un <strong>valor tangible y sostenible</strong> a nuestros clientes.`;
  
  const collaborationPhrases = [
      "La colaboración", "es la esencia", "de nuestro accionar.",
      "Fomentamos la sinergia", "entre equipos", "multidisciplinarios",
      "y promovemos", "alianzas estratégicas", "para co-crear",
      "soluciones integrales", "que superan", "las expectativas",
      "y generan", "un impacto", "duradero."
  ];

  return (
    <div className="pb-10 space-y-16">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px] animate-slide-in-from-left-hero">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient animate-zoom-in-bounce-hero rounded-full w-full h-full shadow-xl flex justify-center items-center">
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
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href="/about/esencia"><span className="flex items-center">Nuestra Historia <ArrowRight className="ml-2 h-5 w-5" /></span></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Nuestra Identidad</h2>
            <p className="text-lg mb-4">
              Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {identitySections.map((section, index) => {
               const IconComponent = iconMap[section.icon] || HeartPulse;
               return (
                  <Card key={index} className="group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]">
                    <CardContent className="p-0">
                        <DynamicSection title={section.title} content={section.content} link={section.link} icon={IconComponent} />
                    </CardContent>
                  </Card>
               )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Core Values Section */}
      <section className="w-full relative">
        <div className="flex flex-col md:flex-row shadow-2xl border-y border-border/20 md:h-[520px] overflow-hidden">
          <div className="flex md:flex-col md:w-1/3 lg:w-1/4 bg-card md:border-r md:border-border/20">
            {initialCoreValues.map((value, index) => (
              <button
                key={value.id}
                onClick={() => setSelectedValue(value.id!)}
                className={cn(
                  "w-full p-4 md:p-6 text-center font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out focus:outline-none",
                  "border-b border-border/20", index < initialCoreValues.length - 1 ? "md:border-b" : "md:border-b-0", 
                  "md:flex-1 md:flex md:items-center md:justify-center",
                  selectedValue === value.id ? 'bg-accent text-accent-foreground animate-gradient bg-[length:200%_200%]' : 'bg-primary text-primary-foreground hover:bg-primary/80'
                )}
              >
                <span className="text-xl md:text-2xl">{value.name}</span>
              </button>
            ))}
          </div>
          
          {selectedContent && (
            <div className={cn(
                "flex-1 p-0 relative md:h-full",
                selectedValue === 'innovacion' ? "bg-accent text-accent-foreground" :
                "bg-primary text-primary-foreground"
            )}>
              {/* --- Conditional Rendering for Content --- */}
              {selectedValue === 'integridad' ? (
                <div key="integridad-content" className="relative h-full w-full animate-fade-in overflow-hidden">
                   <h3 className="absolute top-1/2 text-[12rem] md:text-[16rem] font-bold text-primary-foreground/10 tracking-tighter lowercase select-none z-0 pointer-events-none animate-slide-across-text">
                      {selectedContent.name}
                  </h3>
                  <div className="absolute top-1/2 w-[420px] h-[420px] md:w-[480px] md:h-[480px] animate-slide-across z-10">
                    <div className="relative w-full h-full rounded-full bg-accent flex items-center text-accent-foreground shadow-2xl">
                       <div className="w-4/5 ml-auto text-right flex items-center pr-12">
                          <p className="text-base leading-relaxed">
                              {integrityPhrases.map((phrase, index) => (
                              <span
                                  key={index}
                                  className="inline-block animate-fade-in-up opacity-0 transition-all duration-300 hover:font-bold hover:bg-white/20 hover:scale-110 rounded-md cursor-pointer px-2 py-1"
                                  style={{
                                  animationDelay: `${(index + 3) * 0.1}s`,
                                  animationFillMode: 'forwards',
                                  }}
                              >
                                  {phrase}{' '}
                              </span>
                              ))}
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedValue === 'innovacion' ? (
                <div key="innovacion-content" className="flex h-full w-full animate-fade-in relative overflow-hidden">
                    {bubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className={cn('absolute rounded-full animate-bubble-roam opacity-80', bubble.className)}
                        style={bubble.style as React.CSSProperties}
                      />
                    ))}

                    <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 md:p-12 lg:p-16">
                        <h3 className="text-7xl md:text-9xl font-thin text-accent-foreground tracking-tight lowercase">
                            {selectedContent.name}
                        </h3>
                        <div className="flex w-full justify-start">
                            <p
                                className="text-lg md:text-xl leading-relaxed text-accent-foreground/80 max-w-md text-left"
                                dangerouslySetInnerHTML={{ __html: innovationDescription }}
                            />
                        </div>
                    </div>
                </div>
              ) : (
                <div key="colaboracion-content" className="h-full w-full relative animate-fade-in flex items-center justify-center p-8 md:p-12 lg:p-16 gap-8">
                  <div className="w-1/4 flex justify-center">
                    <SelectedIconComponent className="h-32 w-32 sm:h-40 sm:w-40 text-accent" />
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center text-center z-10">
                    <h3 className="text-7xl md:text-8xl font-bold text-primary-foreground/20 select-none mb-4 uppercase">
                        {selectedContent.name}
                    </h3>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
                        {collaborationPhrases.map((phrase, index) => (
                            <span
                                key={index}
                                className="inline-block animate-fade-in-up opacity-0 transition-all duration-300 hover:text-accent hover:scale-105 cursor-pointer"
                                style={{ animationDelay: `${index * 0.12}s`, animationFillMode: 'forwards' }}
                            >
                                {phrase}{' '}
                            </span>
                        ))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Pillars Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
          Nuestros Pilares Fundamentales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialPillars.map((pilar) => {
            const PillarIcon = iconMap[pilar.iconName] || FlaskConical;
            return (
                <Card key={pilar.title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader className="items-center">
                    <PillarIcon className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                    <CardTitle className="mt-4 text-2xl group-hover:text-primary-foreground">{pilar.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90">{pilar.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                    <Link href={pilar.link}><span className="flex items-center">Saber Más <ArrowRight className="ml-1 h-4 w-4" /></span></Link>
                    </Button>
                </div>
                </Card>
            );
          })}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8">
        <p className="mt-12 text-center text-md text-muted-foreground italic max-w-3xl mx-auto">
          Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
        </p>
      </section>
    </div>
  );
}
