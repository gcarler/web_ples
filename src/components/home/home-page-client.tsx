'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Quote } from 'lucide-react';
import { RotatingHeroText } from '@/components/layout/rotating-hero-text';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { type HeroStatement } from '@/lib/models/content';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const missionIcons = [
    'Lightbulb', 'Cpu', 'Database', 'Server', 'Globe', 'MapPin',
    'BarChart3', 'Users', 'ShieldCheck', 'Layers', 'Settings', 'Handshake'
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

import * as LucideIcons from 'lucide-react';

interface HomePageClientProps {
  initialHeroStatements: HeroStatement[];
}

export default function HomePageClient({ initialHeroStatements }: HomePageClientProps) {
  const { t } = useLanguage();
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [metricIndices, setMetricIndices] = useState([0, 0, 0]);
  const [isAnimatingOut, setIsAnimatingOut] = useState<number | null>(null);

  const heroStatements = t.HomePage.heroStatements || initialHeroStatements;
  const metricsData = t.HomePage.metrics;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % missionIcons.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!metricsData || metricsData.length === 0) return;
    let cardToUpdate = 0;
    const interval = setInterval(() => {
      setIsAnimatingOut(cardToUpdate);
      setTimeout(() => {
        setMetricIndices(prevIndices => {
          const newIndices = [...prevIndices];
          if (metricsData[cardToUpdate]) {
            newIndices[cardToUpdate] = (newIndices[cardToUpdate] + 1) % metricsData[cardToUpdate].length;
          }
          return newIndices;
        });
        setIsAnimatingOut(null);
        cardToUpdate = (cardToUpdate + 1) % metricsData.length;
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [metricsData]);

  const currentIconName = missionIcons[currentIconIndex];
  const CurrentIcon = (LucideIcons as any)[currentIconName] || LucideIcons.HelpCircle;
  const currentAnimationClass = iconAnimations[currentIconIndex % iconAnimations.length];

  return (
    <div className="space-y-0">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(80vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="relative bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl overflow-hidden flex items-center justify-center">
                    <CurrentIcon key={currentIconIndex} className={cn("h-3/5 w-3/5 text-accent", currentAnimationClass)} strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <RotatingHeroText
                statements={heroStatements}
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
            {t.HomePage.experienceTitle}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-center items-stretch gap-8 md:gap-12 text-lg text-foreground mb-20">
            {metricsData.map((metrics, cardIndex) => {
                const metric = metrics[metricIndices[cardIndex]];
                const Icon = metric.icon;
                return (
                    <div key={cardIndex} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out h-40 overflow-hidden">
                        <Icon className="h-12 w-12 text-primary mb-4" />
                        <div className="relative h-12 flex items-center">
                            <span key={metric.text} className={cn("block text-xl leading-tight text-center", isAnimatingOut === cardIndex ? 'animate-slide-out-up' : 'animate-slide-in-up')}>
                                {metric.text}
                            </span>
                        </div>
                    </div>
                );
            })}
          </div>
          <Button asChild size="lg" variant="accent">
            <Link href="/about">
              <span className="flex items-center">
                {t.HomePage.knowMore} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-accent text-primary-foreground animate-gradient bg-[length:300%_300%] overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
             <div className="order-first">
               <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.HomePage.missionTitle}</h2>
               <p className="text-lg lg:text-xl opacity-90 mb-8 leading-relaxed">{t.HomePage.missionDescription}</p>
               <Button asChild size="lg" variant="accent" className="bg-white/20 hover:bg-white/30 border border-white/50 backdrop-blur-sm">
                 <Link href="/about#identidad">
                   <span className="flex items-center">
                     {t.HomePage.missionCTA} <ArrowRight className="ml-2 h-5 w-5" />
                   </span>
                 </Link>
               </Button>
             </div>
              <div className="relative h-96 w-full overflow-hidden rounded-lg md:h-[600px] order-last">
                  {missionIcons.map((iconName, index) => {
                    const style = iconStyles[index % iconStyles.length];
                    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
                    return (
                        <div key={index} className="absolute animate-move-and-scale" style={{ top: style.top, left: style.left, animationDuration: style.duration, animationDelay: style.delay }}>
                            <Icon className={cn("text-white", style.size)} strokeWidth={1.5} />
                        </div>
                    );
                  })}
              </div>
           </div>
        </div>
      </section>

      <section className="py-16 bg-background" id="nuestras-marcas">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">{t.HomePage.brandsTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.HomePage.brands.map((marca) => {
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
                    <Link href={`${marca.href}`}>
                        <span className="flex items-center">
                        {t.HomePage.viewDetails} <ArrowRight className="ml-1 h-4 w-4" />
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
            <h2 className="text-3xl font-bold text-center mb-10">{t.HomePage.audienceTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
             {t.HomePage.audiences.map((audience) => {
                const AudienceIcon = audience.icon;
                return (
                 <Card key={audience.title} className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                    <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <AudienceIcon className="h-6 w-6 text-primary group-hover:text-accent transition-colors"/>
                        <CardTitle>{audience.title}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{audience.description}</p>
                    </CardContent>
                </Card>
                )
             })}
            </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">{t.HomePage.readyTitle}</h2>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">{t.HomePage.readyDescription}</p>
          <Button size="lg" variant="accent" asChild>
             <Link href="/forms">
               <span className="flex items-center">
                 {t.HomePage.readyCTA} <ArrowRight className="ml-2" />
               </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
         <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Testimonios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { name: 'Ruth Gutierrez', title: 'Directora OEDS, Universidad de Cartagena', text: '¡Increíble servicio! Superaron nuestras expectativas.', image: 'https://placehold.co/100x100.png' },
                { name: 'Olga Montes', title: 'Directora, Corporación Rhema', text: 'La implementación fue fluida y el soporte excelente.', image: 'https://placehold.co/100x100.png' },
                { name: 'Mary Janacet', title: 'CEO, Betrip', text: 'Nos ayudaron a optimizar nuestros procesos clave.', image: 'https://placehold.co/100x100.png' },
            ].map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                    <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                    <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4 pt-0 mt-auto">
                    <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                </CardHeader>
                </Card>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}
