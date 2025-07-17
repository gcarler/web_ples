
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building, Users, Handshake, Quote, CheckCircle, Database, UsersRound, Globe, Server, HomeIcon, Lightbulb, Layers, Cpu, BookOpen, Send, MapPin, BarChart3, ShieldCheck, Settings, BrainCircuit, GraduationCap, Briefcase } from 'lucide-react';
import { RotatingHeroText } from '@/components/layout/rotating-hero-text';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { type HeroStatement } from '@/lib/models/content';
import React from 'react';

const missionIcons = [
    Lightbulb, Cpu, Database, Server, Globe, MapPin, 
    BarChart3, Users, ShieldCheck, Layers, Settings, Handshake
];

const iconAnimations = [
  'animate-fly-in-word',
  'animate-zoom-in-rotate',
  'animate-drop-in',
  'animate-expand-in',
];

const iconStyles = [
  { top: '10%', left: '15%', size: 'h-16 w-16', duration: '22s', delay: '0s' },
  { top: '25%', left: '70%', size: 'h-20 w-20', duration: '28s', delay: '-5s' },
  { top: '70%', left: '80%', size: 'h-12 w-12', duration: '19s', delay: '-10s' },
  { top: '80%', left: '20%', size: 'h-24 w-24', duration: '32s', delay: '-2s' },
  { top: '50%', left: '50%', size: 'h-10 w-10', duration: '18s', delay: '-15s' },
  { top: '5%', left: '40%', size: 'h-14 w-14', duration: '25s', delay: '-8s' },
  { top: '40%', left: '5%', size: 'h-16 w-16', duration: '30s', delay: '-3s' },
  { top: '60%', left: '60%', size: 'h-20 w-20', duration: '24s', delay: '-12s' },
  { top: '90%', left: '50%', size: 'h-12 w-12', duration: '20s', delay: '-1s' },
  { top: '30%', left: '30%', size: 'h-16 w-16', duration: '26s', delay: '-7s' },
  { top: '75%', left: '5%', size: 'h-20 w-20', duration: '21s', delay: '-14s' },
  { top: '15%', left: '90%', size: 'h-8 w-8', duration: '35s', delay: '-4s' },
];

const allMetrics = [
    { id: 1, icon: CheckCircle, text: "+15 proyectos ejecutados", dataAiHint:"projects checkmark" },
    { id: 2, icon: Database, text: "42 sistemas de información desarrollados", dataAiHint:"database systems" },
    { id: 3, icon: UsersRound, text: "8 alianzas académicas y comunitarias", dataAiHint:"community alliance" },
    { id: 4, icon: Lightbulb, text: "+5000 horas de consultoría", dataAiHint:"consulting lightbulb" },
    { id: 5, icon: Building, text: "10+ sectores impactados", dataAiHint:"building sectors" },
    { id: 6, icon: BrainCircuit, text: "+20 soluciones de IA implementadas", dataAiHint:"ai solutions brain" },
];


interface HomePageClientProps {
  initialHeroStatements: HeroStatement[];
}

export default function HomePageClient({ initialHeroStatements }: HomePageClientProps) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [cardOrder, setCardOrder] = useState([allMetrics[0], allMetrics[1], allMetrics[2]]);

  useEffect(() => {
    if (missionIcons.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % missionIcons.length);
    }, 7000); // Change icon every 7 seconds
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Function to shuffle the array of cards
    const shuffleCards = () => {
      setCardOrder(prevOrder => {
        // Create a copy and shuffle it
        const newOrder = [...prevOrder];
        for (let i = newOrder.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
        }
        return newOrder;
      });
    };

    const interval = setInterval(shuffleCards, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);


  const CurrentIcon = missionIcons[currentIconIndex];
  const currentAnimationClass = iconAnimations[currentIconIndex % iconAnimations.length];
  
  return (
    <div className="space-y-0">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(80vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="relative bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl overflow-hidden flex items-center justify-center"
                  >
                    <CurrentIcon
                      key={currentIconIndex}
                      className={cn("h-3/5 w-3/5 text-accent", currentAnimationClass)}
                      strokeWidth={1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <RotatingHeroText
                statements={initialHeroStatements}
                className="items-center text-center lg:items-start lg:text-left"
                titleClassName="text-4xl sm:text-5xl xl:text-6xl text-foreground mb-6"
                descriptionClassName="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-16">
            EL USO INTELIGENTE DE LA EXPERIENCIA
          </h1>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 justify-center items-stretch gap-8 md:gap-12 text-lg text-foreground mb-20 h-40">
            {allMetrics.slice(0, 3).map((_, index) => {
              const metric = cardOrder[index];
              const Icon = metric.icon;
              // Determine target position based on the original index of the metric in the `allMetrics` array
              const originalIndex = allMetrics.findIndex(m => m.id === metric.id);
              let positionClass = '';
              // This maps the card's original position to its new shuffled position visually.
              // Find where the card should go based on its content.
              const targetIndex = cardOrder.findIndex(c => c.id === allMetrics[index].id);

              switch(targetIndex) {
                    case 0: positionClass = 'translate-x-0'; break;
                    case 1: positionClass = 'translate-x-[calc(100%_+_2rem)] sm:translate-x-[calc(100%_+_3rem)]'; break;
                    case 2: positionClass = 'translate-x-[calc(200%_+_4rem)] sm:translate-x-[calc(200%_+_6rem)]'; break;
              }

              return (
                  <div
                    key={allMetrics[index].id} // Use a stable key based on position
                    className={cn(
                      'absolute w-full sm:w-1/3 flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-transform duration-700 ease-in-out h-full',
                      positionClass
                    )}
                    style={{
                      width: 'calc((100% - 2 * 3rem) / 3)' // For md gap-12
                    }}
                  >
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <span className="text-xl leading-tight">{metric.text}</span>
                  </div>
              );
            })}
          </div>
          <Button asChild size="lg" variant="accent">
            <Link href="/about">
              <span className="flex items-center">
                Saber Más <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-accent text-primary-foreground animate-gradient bg-[length:300%_300%] overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
             <div className="order-first">
               <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nuestra Misión</h2>
               <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed">
                 Somos una empresa dedicada a ofrecer soluciones innovadoras y eficientes que impulsan el crecimiento y la transformación digital de nuestros clientes. Creemos en el poder de la tecnología para simplificar procesos y crear valor.
               </p>
               <Button asChild size="lg" variant="accent" className="bg-white/20 hover:bg-white/30 border border-white/50 backdrop-blur-sm">
                 <Link href="/about/mision">
                   <span className="flex items-center">
                     Explora nuestra Misión <ArrowRight className="ml-2 h-5 w-5" />
                   </span>
                 </Link>
               </Button>
             </div>
              <div className="relative h-96 w-full overflow-hidden rounded-lg md:h-[600px] order-last">
                  {missionIcons.map((Icon, index) => {
                    const style = iconStyles[index % iconStyles.length]; // Use modulo for safety
                    return (
                        <div
                            key={index}
                            className="absolute animate-move-and-scale"
                            style={{
                                top: style.top,
                                left: style.left,
                                animationDuration: style.duration,
                                animationDelay: style.delay,
                            }}
                        >
                            <Icon 
                                className={cn("text-white", style.size)}
                                strokeWidth={1.5}
                            />
                        </div>
                    );
                  })}
              </div>
           </div>
        </div>
      </section>

      <section className="py-16 bg-background" id="nuestras-marcas">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestras Marcas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { title: 'Ples CREA', description: 'Cartografía y diseño geoespacial.', icon: Globe, href: "/ples-crea" },
                { title: 'Ples TIC', description: 'Tecnologías de la información.', icon: Server, href: "/ples-tic" },
                { title: 'Ples Catastro', description: 'Catastro y gestión territorial.', icon: HomeIcon, href: "/ples-catastro" },
                { title: 'Ples Consulting', description: 'Consultoría estratégica.', icon: Lightbulb, href: "/ples-consulting" },
            ].map((marca) => {
              const MarcaIcon = marca.icon;
              return (
                <Card key={marca.title} className="text-center group hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4 group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground">
                    <MarcaIcon className="h-8 w-8" />
                    </div>
                    <CardTitle className="group-hover:text-primary-foreground">{marca.title}</CardTitle>
                    <CardDescription className="group-hover:text-primary-foreground/90">{marca.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                    <Link href={marca.href}>
                        <span className="flex items-center">
                        Ver Detalles <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>
                    </Button>
                </CardContent>
                </Card>
            )})}
            </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
         <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestro Público Objetivo</h2>
            <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <Building className="h-6 w-6 text-primary group-hover:text-accent transition-colors"/>
                    <CardTitle>Sector Público</CardTitle>
                </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Ofrecemos soluciones adaptadas a las necesidades de entidades gubernamentales y administraciones públicas, mejorando la eficiencia y transparencia.
                </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                    <Handshake className="h-6 w-6 text-accent group-hover:text-primary transition-colors"/>
                    <CardTitle>Sector Privado</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Impulsamos la competitividad de las empresas con herramientas tecnológicas y consultoría estratégica para optimizar sus operaciones.
                </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                    <CardTitle>Sector Social y Comunitario</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Colaboramos con organizaciones sin fines de lucro y comunidades para fortalecer su impacto social a través de la tecnología y la innovación.
                </p>
                </CardContent>
            </Card>
            </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">¿Listo para Transformar su Organización?</h2>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            Contáctenos hoy mismo para descubrir cómo nuestras soluciones pueden ayudarle a alcanzar sus objetivos.
          </p>
          <Button size="lg" variant="accent" asChild>
             <Link href="/forms">
               <span className="flex items-center">
                 Contactar Ahora <ArrowRight className="ml-2" />
               </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
