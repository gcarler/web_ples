// src/app/ples-tic/page.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Rocket, Shield, Cpu, 
  Terminal, Database, Network, Globe, Lock, Layers,
  Server, BarChart3, Brain, Sparkles, FileText, Compass, Calculator
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InteractiveSoftwareSuites } from '@/components/ples-tic/interactive-software-suites';
import { InfrastructureCores } from '@/components/ples-tic/infrastructure-cores';
import { CloudMeshConsole } from '@/components/ples-tic/cloud-mesh-console';
import { TicEstimator } from '@/components/ples-tic/tic-estimator';
import { CodeTypingIllustration } from '@/components/illustrations/CodeTypingIllustration';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function PlesTicPage() {
  const { t, language } = useLanguage();
  const content = t?.PlesTic || translations.es.PlesTic;

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden border-b border-border/40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-10">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 rounded-3xl blur-2xl -z-10" />
                <CodeTypingIllustration />
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIVISIÓN DE TECNOLOGÍA & ARQUITECTURA DIGITAL</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground py-1 mb-6 leading-tight">
                {content.title}
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                <strong className="text-foreground font-semibold">{content.subtitle}</strong>. {content.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {content.badges.map((badge: string) => (
                  <Badge key={badge} variant="outline" className="text-xs px-3.5 py-1.5 border-primary/30 bg-primary/5 text-foreground font-mono">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/20" asChild>
                  <Link href={`/forms?service=ples-tic&subject=Consulta%20Soluciones%20PLES%20TIC`}>
                    <span className="flex items-center gap-2">
                      {content.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </Button>

                <Button size="lg" variant="outline" className="border-border rounded-xl px-6" asChild>
                  <Link href="#estimador">
                    <Calculator className="w-4 h-4 mr-2 text-primary" />
                    <span>Calcular Proyecto</span>
                  </Link>
                </Button>

                <Button size="lg" variant="outline" className="border-border rounded-xl px-6" asChild>
                  <Link href="#cloud-mesh">
                    <Terminal className="w-4 h-4 mr-2 text-primary" />
                    <span>Consola Cloud</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cloud Mesh & Architecture Console */}
      <section id="cloud-mesh" className="w-full px-4 sm:px-6 lg:px-8">
        <CloudMeshConsole />
      </section>

      {/* Strategic Pillars of Enterprise Technology */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="text-primary border-primary/30 font-mono text-xs mb-3">
            INGENIERÍA & GOBERNANZA
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {content.servicesTitle}
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            Diseñamos e implementamos ecosistemas digitales escalables con enfoque en seguridad, interoperabilidad y cero dependencias obsoletas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map(({ icon: Icon, title, description, details, cta }: any, idx: number) => (
            <div 
              key={title} 
              className="p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-mono text-primary font-semibold tracking-wider uppercase mb-1">
                  MÓDULO 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {description}
                </p>

                <div className="space-y-2 border-t border-border/50 pt-4">
                  {details.map((detail: string) => (
                    <div key={detail} className="flex items-start gap-2 text-xs text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/40">
                <Button 
                  asChild
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 rounded-lg group-hover:translate-x-1 transition-all"
                >
                  <Link href={`/forms?service=ples-tic&subject=${encodeURIComponent(title)}`}>
                    <span>{cta || 'Consultar con un Ingeniero'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Cores */}
      <section className="w-full">
        <InfrastructureCores />
      </section>

      {/* Software Suites Showcase */}
      <section className="w-full">
        <InteractiveSoftwareSuites />
      </section>

      {/* Estimador de Proyectos PLES TIC */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <TicEstimator />
      </section>

      {/* Final Call to Action */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary/95 to-accent p-10 sm:p-14 text-primary-foreground text-center relative overflow-hidden shadow-2xl">
          <Rocket className="h-14 w-14 mx-auto mb-5 opacity-90 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            {content.ctaSectionTitle}
          </h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed font-light">
            {content.ctaSectionDesc}
          </p>
          <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg" asChild>
            <Link href={`/forms?service=ples-tic&subject=Solicitud%20Asesoria%20Tecnologica`}>
              <span className="flex items-center gap-2">
                {content.ctaSectionBtn} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
