// src/app/ples-crea/page.tsx
'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, Globe, CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration';
import { useLanguage } from '@/contexts/LanguageContext';
import * as LucideIcons from 'lucide-react';

export default function PlesCreaPage() {
  const { t } = useLanguage();
  const content = t.PlesCrea;
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <GlobeIllustration />
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
                <Link href={`/forms?service=ples-crea`}>
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
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.servicesTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                {content.servicesDesc}
            </p>
            <div className="grid md:grid-cols-3 gap-8 group/spotlight" onMouseMove={handleMouseMove}>
            {/* Logic to map services from translations ... */}
            </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Globe className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.ctaSectionTitle}</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             {content.ctaSectionDesc}
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-crea`}>
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
