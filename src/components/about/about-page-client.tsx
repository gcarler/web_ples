// src/components/about/about-page-client.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Info,
  Shield,
  Lightbulb,
  Users as UsersIcon,
  Cpu,
  FlaskConical,
  HeartPulse,
  Target,
  Globe,
  Rocket,
  Eye,
  Gem,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { InnovationAiNetwork } from '@/components/about/innovation-ai-network';
import { CollaborationAbsorb } from '@/components/about/collaboration-absorb';

const iconMap: { [key: string]: React.ElementType } = {
  UsersIcon, Lightbulb, Shield, FlaskConical, Cpu,
  Gem, HeartPulse, Target, Globe, Rocket, Eye, Info
};

export default function AboutPageClient() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const content = t?.AboutPage || (translations.es as any)?.AboutPage;

  // Selected value tab
  const [selectedValue, setSelectedValue] = useState(content.coreValues[2]?.id || 'integridad');
  const selectedContent = content.coreValues.find((v: any) => v.id === selectedValue);

  const isIntegrity = selectedValue === 'integrity' || selectedValue === 'integridad';
  const isInnovation = selectedValue === 'innovation' || selectedValue === 'innovacion';
  const isCollaboration = selectedValue === 'collaboration' || selectedValue === 'colaboracion';

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
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient animate-zoom-in-bounce-hero rounded-full w-full h-full shadow-xl flex items-center justify-center">
                    <Info className="h-3/5 w-3/5 text-primary-foreground" />
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
                  <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">
                    {badge}
                  </Badge>
                ))}
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href="/about/esencia">
                  <span className="flex items-center">
                    {content.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 scroll-mt-20" id="identidad">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">{content.identity.title}</h2>
            <p className="text-lg mb-4 text-foreground/90">
              {content.identity.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.identity.sections.map((section: any, index: number) => {
              const IconComponent = iconMap[section.icon] || HeartPulse;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]"
                >
                  <CardContent className="p-0">
                    <DynamicSection
                      title={section.title}
                      content={section.content}
                      link={section.link}
                      icon={IconComponent}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Interactive Core Values Section (Expanded to ~850px) */}
      <section className="w-full relative">
        <div className="flex flex-col md:flex-row shadow-2xl border-y border-border/20 md:h-[820px] lg:h-[860px] min-h-[720px] overflow-hidden">
          {/* Vertical Menu Tabs */}
          <div className="flex md:flex-col md:w-1/4 lg:w-1/5 bg-card md:border-r md:border-border/20 z-20">
            {content.coreValues.map((value: any, index: number) => {
              const isCurrent = selectedValue === value.id;
              return (
                <button
                  key={value.id}
                  onClick={() => setSelectedValue(value.id!)}
                  className={cn(
                    "w-full p-5 md:p-8 text-center font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out focus:outline-none select-none",
                    "border-b border-border/20",
                    index < content.coreValues.length - 1 ? "md:border-b" : "md:border-b-0",
                    "md:flex-1 md:flex md:flex-col md:items-center md:justify-center gap-2",
                    isCurrent
                      ? 'bg-accent text-accent-foreground animate-gradient bg-[length:200%_200%] shadow-lg'
                      : 'bg-card text-foreground hover:bg-muted/70 hover:text-primary'
                  )}
                >
                  <span className="text-lg md:text-2xl font-bold font-comfortaa">{value.name}</span>
                  <span className="hidden md:inline-block text-xs opacity-75 font-normal capitalize">
                    {value.id === 'colaboracion' || value.id === 'collaboration'
                      ? (isEn ? "Strategic Synergy" : "Sinergia Estratégica")
                      : value.id === 'innovacion' || value.id === 'innovation'
                      ? (isEn ? "Advanced Technology" : "Tecnología Aplicada")
                      : (isEn ? "Ethical Governance" : "Gobernanza y Ética")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fullscreen Interactive Canvas */}
          {selectedContent && (
            <div
              className={cn(
                "flex-1 p-0 relative h-full w-full overflow-hidden transition-colors duration-500",
                isInnovation ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}
            >
              {/* ---------------- 1. INTEGRIDAD ---------------- */}
              {isIntegrity && (
                <div key="integrity-content" className="relative h-full w-full animate-fade-in overflow-hidden flex items-center">
                  {/* Watermark Kinetic Typography */}
                  <h3 className="absolute top-1/2 left-0 -translate-y-1/2 text-[12rem] md:text-[18rem] lg:text-[22rem] font-bold text-primary-foreground/10 tracking-tighter lowercase select-none pointer-events-none z-0">
                    {selectedContent.name}
                  </h3>

                  <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 gap-8">
                    {/* Left: Manifesto & Clear Text (NO awkward chopped words) */}
                    <div className="w-full lg:w-7/12 space-y-6 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs font-semibold uppercase tracking-wider">
                        <Shield className="h-3.5 w-3.5 text-primary-foreground" />
                        <span>{isEn ? "Ethical Pillar" : "Pilar Institucional"}</span>
                      </div>

                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-comfortaa leading-tight text-primary-foreground">
                        {selectedContent.name}
                      </h2>

                      <div className="border-l-4 border-primary-foreground/40 pl-5 py-2">
                        <p className="text-lg sm:text-xl font-medium text-primary-foreground/95 italic leading-relaxed">
                          "{selectedContent.explanation || (isEn
                            ? "We act with honesty, transparency, and professional ethics in every interaction, building trust and lasting value."
                            : "Actuamos con honestidad, transparencia y ética profesional en cada interacción, construyendo confianza duradera.")}"
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 pt-4">
                        <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-4 backdrop-blur-sm">
                          <div className="text-sm font-bold text-primary-foreground flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                            {isEn ? "Data Governance" : "Soberanía de Datos"}
                          </div>
                          <p className="text-xs text-primary-foreground/80 leading-relaxed">
                            {isEn ? "Confidential, protected cadastral and spatial information." : "Protección estricta y blindaje legal de información técnica y catastral."}
                          </p>
                        </div>

                        <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-4 backdrop-blur-sm">
                          <div className="text-sm font-bold text-primary-foreground flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                            {isEn ? "Contractual Transparency" : "Transparencia Contractual"}
                          </div>
                          <p className="text-xs text-primary-foreground/80 leading-relaxed">
                            {isEn ? "Traceable milestones and open accountability." : "Trazabilidad completa, cumplimiento de metas y rendición de cuentas pública."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pro High-Tech Gyroscopic Core (TEXT REMOVED FROM BALL!) */}
                    <div className="w-full lg:w-5/12 flex items-center justify-center relative">
                      <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center">
                        {/* Outer Gyro Ring 1 */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-foreground/25 animate-spin [animation-duration:35s]" />

                        {/* Outer Gyro Ring 2 (counter-rotating) */}
                        <div className="absolute inset-6 rounded-full border border-primary-foreground/35 animate-spin [animation-duration:22s] [animation-direction:reverse]" />

                        {/* Geometric Orbit Accent Ring */}
                        <div className="absolute inset-14 rounded-full border-2 border-primary-foreground/45 rotate-45" />

                        {/* Pristine Glassmorphic Sphere without text */}
                        <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-accent/90 via-primary-foreground/20 to-primary-foreground/40 backdrop-blur-xl shadow-2xl flex items-center justify-center border border-primary-foreground/40 animate-pulse [animation-duration:4s]">
                          <div className="w-28 h-28 rounded-full bg-primary-foreground/20 flex items-center justify-center border border-primary-foreground/50 shadow-inner">
                            <Shield className="h-14 w-14 text-primary-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 2. INNOVACIÓN ---------------- */}
              {isInnovation && (
                <div key="innovation-content" className="relative h-full w-full animate-fade-in overflow-hidden">
                  <InnovationAiNetwork isEn={isEn} />
                </div>
              )}

              {/* ---------------- 3. COLABORACIÓN ---------------- */}
              {isCollaboration && (
                <div key="collaboration-content" className="relative h-full w-full animate-fade-in overflow-hidden">
                  <CollaborationAbsorb isEn={isEn} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
          {content.pillars.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.pillars.items.map((pilar: any) => {
            const PillarIcon = iconMap[pilar.iconName] || FlaskConical;
            return (
              <Card
                key={pilar.title}
                className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]"
              >
                <CardHeader className="items-center">
                  <PillarIcon className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors" />
                  <CardTitle className="mt-4 text-2xl group-hover:text-primary-foreground">
                    {pilar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">
                    {pilar.description}
                  </p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                    <Link href={pilar.link}>
                      <span className="flex items-center">
                        {content.pillars.cta} <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <p className="mt-12 text-center text-md text-muted-foreground italic max-w-3xl mx-auto">
          {content.closingStatement}
        </p>
      </section>
    </div>
  );
}
