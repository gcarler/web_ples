// src/app/[locale]/about/page.tsx
'use client'

import AboutPageClient from '@/components/about/about-page-client';
import { type CoreValue, type Pillar } from '@/lib/models/content';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  
  // Data is now fetched from the translation file, but we maintain the structure.
   const coreValues: CoreValue[] = [
        { id: 'colaboracion', name: 'COLABORACIÓN', iconName: 'UsersIcon', explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos la sinergia entre equipos multidisciplinarios y promovemos alianzas estratégicas para co-crear soluciones integrales que superan las expectativas y generan un impacto duradero.", order: 0 },
        { id: 'innovacion', name: 'INNOVACIÓN', iconName: 'Lightbulb', explanation: "Como motor de nuestro progreso, la innovación nos impulsa a desafiar el status quo y a explorar constantemente nuevas tecnologías y metodologías. Convertimos ideas audaces en soluciones prácticas que aportan un valor tangible y sostenible a nuestros clientes.", order: 1 },
        { id: 'integridad', name: 'INTEGRIDAD', iconName: 'Shield', explanation: "Actuamos con honestidad, transparencia y ética profesional en cada interacción. La integridad es el pilar de la confianza que construimos con nuestros clientes, socios y la comunidad, garantizando que nuestras acciones siempre estén alineadas con nuestros principios.", order: 2 },
    ];
  
   const pillars: Pillar[] = [
        { id: 'ciencia', title: 'Ciencia', description: 'El rigor metodológico como pilar de la confianza y la efectividad.', link: '/porque-somos-ciencia', iconName: 'FlaskConical', order: 0 },
        { id: 'tecnologia', title: 'Tecnología', description: 'Herramientas de vanguardia como catalizadores de la eficiencia y la escala.', link: '/porque-somos-tecnologia', iconName: 'Cpu', order: 1 },
        { id: 'innovacion', title: 'Innovación', description: 'La creatividad y el pensamiento disruptivo para generar valor sostenible.', link: '/porque-somos-innovacion', iconName: 'Lightbulb', order: 2 },
    ];

  // Pass data to the client component
  return <AboutPageClient initialCoreValues={coreValues} initialPillars={pillars} />;
}
