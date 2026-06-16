// src/app/ples-tic/(services)/layout.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
}

interface ServiceLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle: string;
  sections: Section[];
}

const ServiceLayoutClient: React.FC<React.PropsWithChildren<ServiceLayoutProps>> = ({ children, pageTitle, pageSubtitle, sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    const elements = contentRef.current?.querySelectorAll('section[id]');
    elements?.forEach((el) => observer.current?.observe(el));

    return () => {
      elements?.forEach((el) => observer.current?.unobserve(el));
    };
  }, [sections]);

  const pathname = usePathname();

  return (
    <div className="bg-background text-foreground">
      <header className="relative py-16 md:py-24 bg-card border-b">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/ples-tic">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a PLES TIC
                    </Link>
                </Button>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4">
                {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
                {pageSubtitle}
            </p>
        </div>
      </header>

      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          <aside className="lg:col-span-1 lg:sticky top-24 self-start">
            <nav className="space-y-2">
                <h3 className="font-semibold text-lg mb-3">En esta p?gina</h3>
                {sections.map(section => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={cn(
                            "block pl-4 py-1.5 border-l-2 text-sm transition-colors",
                            activeSection === section.id
                            ? "border-primary text-primary font-semibold"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                        )}
                    >
                    {section.title}
                    </a>
                ))}
            </nav>
          </aside>

          <main ref={contentRef} className="lg:col-span-3 space-y-16">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}


// A new root layout component that extracts metadata and passes it down
export default function ServiceLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const serviceDetails = {
        '/ples-tic/desarrollo-software': {
            pageTitle: 'Desarrollo de Software a Medida',
            pageSubtitle: 'Construimos soluciones tecnol?gicas precisas, robustas y escalables que se alinean perfectamente con sus objetivos de negocio.',
            sections: [
                { id: 'introduccion', title: 'Introducci?n' },
                { id: 'nuestra-metodologia', title: 'Nuestra Metodolog?a' },
                { id: 'stack-tecnologico', title: 'Stack Tecnol?gico' },
                { id: 'casos-de-uso', title: 'Casos de Uso' },
            ]
        },
        '/ples-tic/soluciones-cloud': {
            pageTitle: 'Soluciones Cloud y DevOps',
            pageSubtitle: 'Dise?amos arquitecturas cloud-native y optimizamos operaciones con pr?cticas DevOps para m?xima eficiencia, escalabilidad y seguridad.',
            sections: [
                { id: 'introduccion', title: 'Introducci?n' },
                { id: 'servicios-cloud', title: 'Servicios Cloud' },
                { id: 'enfoque-devops', title: 'Nuestro Enfoque DevOps' },
                { id: 'plataformas-principales', title: 'Plataformas Principales' },
            ]
        },
        '/ples-tic/ciberseguridad': {
            pageTitle: 'Ciberseguridad Avanzada',
            pageSubtitle: 'Protegemos sus activos digitales m?s cr?ticos con una estrategia de ciberseguridad 360°, desde la prevenci?n hasta la respuesta a incidentes.',
            sections: [
                { id: 'introduccion', title: 'Introducci?n' },
                { id: 'nuestro-enfoque', title: 'Nuestro Enfoque 360°' },
                { id: 'servicios-clave', title: 'Servicios Clave' },
                { id: 'marcos-de-referencia', title: 'Marcos de Referencia' },
            ]
        },
        '/ples-tic/analisis-datos-bi': {
            pageTitle: 'An?lisis de Datos e Inteligencia de Negocio',
            pageSubtitle: 'Convertimos sus datos crudos en insights estrat?gicos, impulsando una toma de decisiones informada y una ventaja competitiva sostenible.',
            sections: [
                { id: 'introduccion', title: 'Introducci?n' },
                { id: 'nuestros-servicios-bi', title: 'Nuestros Servicios de BI' },
                { id: 'proceso-de-datos', title: 'Nuestro Proceso de Datos' },
                { id: 'herramientas', title: 'Herramientas que Dominamos' },
            ]
        },
        '/ples-tic/automatizacion-ia': {
            pageTitle: 'Automatizaci?n Inteligente con IA',
            pageSubtitle: 'Implementamos soluciones de Inteligencia Artificial para automatizar procesos, optimizar operaciones y descubrir nuevas oportunidades de negocio.',
            sections: [
                { id: 'introduccion', title: 'Introducci?n' },
                { id: 'capacidades-ia', title: 'Capacidades en IA' },
                { id: 'nuestro-proceso', title: 'Nuestro Proceso de Implementaci?n' },
                { id: 'casos-de-uso', title: 'Casos de Uso' },
            ]
        }
    };
    
    // Find the current page's details, default to empty if not found
    const currentPageDetails = Object.entries(serviceDetails).find(([path]) => pathname.startsWith(path))?.[1] || { pageTitle: 'Servicio TIC', pageSubtitle: '', sections: [] };

    return (
        <ServiceLayoutClient {...currentPageDetails}>
            {children}
        </ServiceLayoutClient>
    );
}