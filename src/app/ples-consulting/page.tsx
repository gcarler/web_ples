// src/app/ples-consulting/page.tsx
'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, BrainCircuit, MessageSquare, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PlesConsultingPage() {
  const { t } = useLanguage();
  const content = t.PlesConsulting;

  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center">
                    <BrainCircuit className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {content.subtitle} {content.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {content.badges.map((badge: string) => (
                    <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">{badge}</Badge>
                ))}
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-consulting`}>
                  <span className="flex items-center">
                    {content.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.expertiseTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                {content.expertiseDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
            {content.propositions?.map((area: any) => { // Assuming propositions mapping from Tic structure if applicable or expertise mapping
              const AreaIcon = BrainCircuit; 
              return (
                <Card
                  key={area.title}
                  className="group bg-card hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] border-2 border-transparent hover:border-primary/50 overflow-hidden hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:animate-gradient hover:bg-[length:200%_200%]">
                  <CardHeader className="flex flex-row items-start gap-4">
                      <AreaIcon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />
                      <div>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary-foreground transition-colors duration-300">{area.title}</CardTitle>
                      <CardDescription className="mt-1 text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300">{area.description}</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-2 text-sm">
                      {area.details?.map((detail: string) => (
                          <li key={detail} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 transition-colors duration-300 mr-2 shrink-0" />
                          <span className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300">{detail}</span>
                          </li>
                      ))}
                      </ul>
                  </CardContent>
                </Card>
            )})}
            </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.differentiatorsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ... logic to map differentiators ... */}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.processTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                {content.processDesc}
            </p>
             <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0">
                {/* ... steps mapping ... */}
            </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.ctaSectionTitle}</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             {content.ctaSectionDesc}
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-consulting`}>
                <span className="flex items-center">
                    {content.ctaSectionBtn} <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
