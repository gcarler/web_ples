// src/components/about/about-page-client.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Info, Shield, Lightbulb, Users as UsersIcon, Cpu, FlaskConical, HeartPulse, Target, Globe, Rocket, Eye, Gem } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';

const iconMap: { [key: string]: React.ElementType } = {
  UsersIcon, Lightbulb, Shield, FlaskConical, Cpu,
  Gem, HeartPulse, Target, Globe, Rocket, Eye, Info
};

export default function AboutPageClient() {
  const { t } = useLanguage();
  const content = t.AboutPage;
  
  const [selectedValue, setSelectedValue] = useState(content.coreValues[2]?.id || 'integridad');
  const selectedContent = content.coreValues.find((v: any) => v.id === selectedValue);

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

  return (
    <div className="pb-10 space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px] animate-slide-in-from-left-hero">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient animate-zoom-in-bounce-hero rounded-full w-full h-full shadow-xl flex items-center justify-center">
                    <Info className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                {content.hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                {content.hero.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {content.hero.badges.map((badge: string) => (
                    <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">{badge}</Badge>
                ))}
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href="/about/esencia"><span className="flex items-center">{content.hero.cta} <ArrowRight className="ml-2 h-5 w-5" /></span></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 scroll-mt-20" id="identidad">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">{content.identity.title}</h2>
            <p className="text-lg mb-4">
              {content.identity.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.identity.sections.map((section: any, index: number) => {
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

      <section className="w-full relative">
        <div className="flex flex-col md:flex-row shadow-2xl border-y border-border/20 md:h-[520px] overflow-hidden">
          <div className="flex md:flex-col md:w-1/3 lg:w-1/4 bg-card md:border-r md:border-border/20">
            {content.coreValues.map((value: any, index: number) => (
              <button
                key={value.id}
                onClick={() => setSelectedValue(value.id!)}
                className={cn(
                  "w-full p-4 md:p-6 text-center font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out focus:outline-none",
                  "border-b border-border/20", index < content.coreValues.length - 1 ? "md:border-b" : "md:border-b-0",
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
                selectedValue === 'innovation' || selectedValue === 'innovacion' ? "bg-accent text-accent-foreground" :
                "bg-primary text-primary-foreground"
            )}>
              {selectedValue === 'integrity' || selectedValue === 'integridad' ? (
                <div key="integrity-content" className="relative h-full w-full animate-fade-in overflow-hidden">
                   <h3 className="absolute top-1/2 text-[12rem] md:text-[16rem] font-bold text-primary-foreground/10 tracking-tighter lowercase select-none z-0 pointer-events-none animate-slide-across-text">
                      {selectedContent.name}
                  </h3>
                  <div className="absolute top-1/2 w-[420px] h-[420px] md:w-[480px] md:h-[480px] animate-slide-across z-10">
                    <div className="relative w-full h-full rounded-full bg-accent flex items-center text-accent-foreground shadow-2xl">
                       <div className="w-4/5 ml-auto text-right flex items-center pr-12">
                          <p className="text-base leading-relaxed">
                              {content.integrityPhrases.map((phrase: string, index: number) => (
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
              ) : selectedValue === 'innovation' || selectedValue === 'innovacion' ? (
                <div key="innovation-content" className="flex h-full w-full animate-fade-in relative overflow-hidden">
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
                                dangerouslySetInnerHTML={{ __html: content.innovationDescription }}
                            />
                        </div>
                    </div>
                </div>
              ) : (
                <div key="collaboration-content" className="h-full w-full relative animate-fade-in flex items-center justify-center p-8 md:p-12 lg:p-16 gap-8">
                  <div className="w-1/4 flex justify-center">
                    <SelectedIconComponent className="h-32 w-32 sm:h-40 sm:w-40 text-accent" />
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center text-center z-10">
                    <h3 className="text-7xl md:text-8xl font-bold text-primary-foreground/20 select-none mb-4 uppercase">
                        {selectedContent.name}
                    </h3>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
                        {content.collaborationPhrases.map((phrase: string, index: number) => (
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

      <section className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
          {content.pillars.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.pillars.items.map((pilar: any) => {
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
                    <Link href={pilar.link}><span className="flex items-center">{content.pillars.cta} <ArrowRight className="ml-1 h-4 w-4" /></span></Link>
                    </Button>
                </div>
                </Card>
            );
          })}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8">
        <p className="mt-12 text-center text-md text-muted-foreground italic max-w-3xl mx-auto">
          {content.closingStatement}
        </p>
      </section>
    </div>
  );
}
