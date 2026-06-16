// src/app/ples-catastro/page.tsx
'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, HomeIcon, MapPin, FileText, Scale, Home, Settings, MonitorPlay, Users, BarChart3, Layers, Edit3, Map, Clock, Target, ShieldCheck, Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: { [key: string]: React.ElementType } = {
  HomeIcon, MapPin, FileText, Scale, Home, Settings, MonitorPlay, Users, BarChart3, Layers, Edit3, Map, Clock, Target, ShieldCheck, Globe
};

const RenderDetailView = ({ service, t }: { service: any, t: any }) => {
    const details = service.details || {};
    const MainIcon = iconMap[details.mainIcon] || HomeIcon;

    return (
        <div className="animate-fade-in-up p-1">
            <section className="text-center mb-12">
                <div className="inline-block p-4 bg-primary/10 rounded-lg mb-6">
                    <MainIcon className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4"
                    dangerouslySetInnerHTML={{ __html: service.title }}></h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto"
                   dangerouslySetInnerHTML={{ __html: service.description }}></p>
            </section>

            {/* In a real scenario, more details would be pulled from translations too */}
            
            <section className="text-center">
                <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
                    <Link href={`/forms?service=${service.slug}`}>
                        <span className="flex items-center">
                            {t.PlesCatastro.cta} <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                    </Link>
                </Button>
            </section>
        </div>
    );
};

const PlesCatastroPageContent = () => {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedService, setSelectedService] = useState<any>(null);

    const services = t.PlesCatastro.services;

    useEffect(() => {
        const serviceSlug = searchParams.get('service');
        const service = services.find((s: any) => s.slug === serviceSlug) || services[0];
        setSelectedService(service);
    }, [searchParams, services]);

    const handleSelectService = (service: any) => {
        setSelectedService(service);
        router.push(`/ples-catastro?service=${service.slug}`, { scroll: false });
    };

    if (!selectedService) {
        return (
             <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                <aside className="h-fit lg:sticky top-24">
                     <Skeleton className="h-10 w-full mb-4" />
                     <Skeleton className="h-24 w-full mb-2" />
                </aside>
                <main>
                    <Skeleton className="h-48 w-full mb-8" />
                </main>
            </div>
        )
    }

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
                                        <HomeIcon className="h-3/5 w-3/5 text-accent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
                            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                                {t.PlesCatastro.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {t.PlesCatastro.subtitle} {t.PlesCatastro.description}
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                                {t.PlesCatastro.badges.map((badge: string) => (
                                    <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">{badge}</Badge>
                                ))}
                            </div>
                            <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                                <Link href={`/forms?service=ples-catastro`}>
                                    <span className="flex items-center">
                                        {t.PlesCatastro.cta} <ArrowRight className="ml-2 h-5 w-5" />
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    <aside className="h-fit lg:sticky top-24">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.PlesCatastro.servicesTitle}</h2>
                        <div className="space-y-2">
                            {services.map((service: any) => {
                                const Icon = MapPin; // Simplified for now
                                const isSelected = selectedService?.slug === service.slug;
                                return (
                                    <Card
                                        key={service.slug}
                                        onClick={() => handleSelectService(service)}
                                        className={`p-4 cursor-pointer border-2 transition-all duration-200 ${isSelected ? 'border-primary shadow-xl scale-105' : 'border-border hover:border-primary/50 hover:shadow-lg'}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <Icon className={`h-8 w-8 mt-1 shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                            <div>
                                                <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{service.title}</h3>
                                                <p className="text-sm text-muted-foreground">{service.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </aside>
                    <main className="bg-background/50 rounded-lg p-4 md:p-8 min-h-[600px]">
                        {selectedService && <RenderDetailView service={selectedService} t={t} />}
                    </main>
                </div>
            </section>
        </div>
    );
}


export default function PlesCatastroPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlesCatastroPageContent />
        </Suspense>
    )
}
