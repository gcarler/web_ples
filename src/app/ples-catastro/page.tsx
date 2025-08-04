// src/app/ples-catastro/page.tsx
'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, Award, BarChart3, BookOpen, Brain, Briefcase, CheckCircle, CloudCog, Code, Cpu, Database, DraftingCompass, FileText, FlaskConical, GitPullRequestArrow, Globe, Handshake, HomeIcon, KanbanSquare, Layers, Lightbulb, Lock, MapPin, Rocket, Search, Send, Server, Settings, ShieldCheck, ShoppingCart, Target, TrendingUp, Users, Users2, Scale, Home, Map, Edit3, MonitorPlay, Clock, Target as TargetIcon, CheckCircle as CheckCircleIcon, BarChart3 as BarChart3Icon, ShieldCheck as ShieldCheckIcon, Layers as LayersIcon, Cpu as CpuIcon, DraftingCompass as DraftingCompassIcon, Globe as GlobeIcon, Scale as ScaleIcon, ClipboardCheck, TrendingUp as TrendingUpIcon, FileText as FileTextIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PlexusIllustration from '@/components/illustrations/PlexusIllustration';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: { [key: string]: React.ElementType } = {
  HomeIcon, MapPin, FileText, Scale, Home, Settings, MonitorPlay, Users, BarChart3, Layers, Edit3, Map, Clock, DraftingCompass, TargetIcon, CheckCircleIcon, BarChart3Icon, ShieldCheckIcon, LayersIcon, CpuIcon, DraftingCompassIcon, GlobeIcon, ScaleIcon, ClipboardCheck, TrendingUpIcon, FileTextIcon
};

const services = [
    {
      slug: 'levantamiento-predial',
      icon: MapPin,
      title: 'Levantamiento Predial Multipropósito',
      description: 'Levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos y económicos.',
      details: {
        mainIcon: MapPin,
        title: 'Levantamiento Predial Multipropósito',
        description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales. Aplicamos <strong class="text-primary group-hover:text-accent transition-colors">el uso inteligente de la experiencia</strong>, metodologías científicas y tecnología de vanguardia para garantizar información territorial confiable, optimizar tiempos y costos, y entregar productos de alta calidad.',
        keyServicesHeading: 'Características Clave del Servicio:',
        keyServices: [ 
          { title: 'Cobertura Exhaustiva', text: 'Levantamientos detallados en zonas urbanas y rurales, adaptados a las particularidades de cada territorio.', icon: 'GlobeIcon' },
          { title: 'Tecnología de Precisión', text: 'Uso de GPS RTK/PPK, drones con sensores LiDAR/Fotogramétricos y estaciones totales robóticas para máxima exactitud.', icon: 'CpuIcon' },
          { title: 'Integración SIG', text: 'Compatibilidad nativa con Sistemas de Información Geográfica (SIG) y Bases de Datos Espaciales para una gestión eficiente.', icon: 'LayersIcon' },
          { title: 'Soporte a la Formalización', text: 'Asesoría técnica y metodológica para la formalización de la propiedad y regularización de la tenencia de la tierra.', icon: 'DraftingCompassIcon' },
        ],
        methodologyHeading: 'Nuestra Metodología Avanzada:',
        methodology: [
          {
            icon: 'Settings',
            title: "Planificación Detallada y Científica",
            text: "Definimos alcances, seleccionamos tecnologías óptimas y diseñamos flujos de trabajo eficientes basados en análisis técnico y nuestra vasta experiencia."
          },
          {
            icon: 'TargetIcon',
            title: "Captura de Datos de Alta Precisión",
            text: "Utilizamos GPS RTK/PPK, estaciones totales robóticas y drones equipados con sensores LiDAR o fotogramétricos para garantizar la máxima exactitud en campo."
          },
          {
            icon: 'CpuIcon',
            title: "Procesamiento y Modelado Avanzado",
            text: "Empleamos software especializado y algoritmos de IA para el procesamiento de datos, generación de Modelos Digitales de Terreno (MDT), Modelos Digitales de Superficie (MDS) y ortofotomosaicos."
          },
          {
            icon: 'CheckCircleIcon',
            title: "Integración y Validación Rigurosa",
            text: "Consolidamos información física, jurídica y económica en SIG, aplicando controles de calidad continuos para asegurar la consistencia y fiabilidad de los datos."
          }
        ],
        benefitsHeading: 'Beneficios de Nuestro Levantamiento Predial:',
        benefits: [
          { icon: 'BarChart3Icon', title: "Base Catastral Precisa", text: "Fundamento sólido para la toma de decisiones estratégicas y gestión territorial." },
          { icon: 'ShieldCheckIcon', title: "Seguridad Jurídica", text: "Facilita la formalización, reduce conflictos y optimiza la recaudación." },
          { icon: 'Clock', title: "Eficiencia y Ahorro", text: "Optimización de tiempos y costos operativos gracias a tecnología y experiencia." }
        ],
        ctaText: 'Solicitar Asesoría Especializada',
        formSubject: 'Consulta%20Levantamiento%20Predial'
      }
    },
    {
      slug: 'actualizacion-mantenimiento-catastral',
      icon: FileText,
      title: 'Actualización y Mantenimiento Catastral',
      description: 'Procesos continuos y automatizados para mantener la información catastral actualizada y confiable.',
      details: {
        mainIcon: FileText,
        title: 'Actualización y Mantenimiento Catastral',
        description: 'Implementamos procesos continuos y automatizados para mantener la información catastral actualizada, confiable y accesible, asegurando la integridad y disponibilidad de los datos para la toma de decisiones estratégicas y la gestión territorial eficiente.',
        keyServicesHeading: 'Componentes Esenciales del Servicio:',
        keyServices: [
          { title: 'Flujos de Trabajo Digitales', text: 'Diseño e implementación de procesos optimizados y automatizados para la gestión de novedades catastrales y la actualización continua de la base de datos.', icon: 'Settings' },
          { title: 'Monitoreo Continuo de Cambios', text: 'Uso de tecnologías como teledetección y análisis de imágenes para identificar cambios en el territorio y activar los procesos de actualización correspondientes.', icon: 'MonitorPlay' },
          { title: 'Interoperabilidad de Sistemas', text: 'Aseguramos la conexión fluida entre el sistema catastral y otras plataformas relevantes (Registro, Notariado, Planeación) para un intercambio de información eficiente.', icon: 'BarChart3' },
          { title: 'Capacitación y Soporte Técnico', text: 'Programas de formación para el personal encargado del catastro y soporte continuo para garantizar la correcta operación y mantenimiento del sistema.', icon: 'Users' },
        ],
        benefitsHeading: 'Beneficios Clave para su Entidad:',
        benefits: [
          'Información Catastral Siempre Precisa y Actualizada',
          'Mayor Confiabilidad en los Datos para la Toma de Decisiones',
          'Optimización de Procesos y Reducción de Tiempos Operativos',
          'Facilita la Gestión Fiscal y la Planificación Territorial',
          'Transparencia y Acceso Mejorado a la Información',
        ],
        ctaText: 'Optimice su Mantenimiento Catastral',
        formSubject: 'Consulta%20Actualizacion%20Mantenimiento%20Catastral'
      }
    },
    {
      slug: 'avaluos-catastrales',
      icon: Scale,
      title: 'Avalúos Masivos y Puntuales',
      description: 'Valoraciones de propiedades con metodologías robustas para una base imponible justa.',
      details: {
        mainIcon: ScaleIcon,
        title: 'Avalúos Masivos y Puntuales',
        description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes, tanto para procesos masivos como para avalúos individuales, asegurando una base imponible justa y una gestión eficiente de activos públicos y privados.',
        keyServicesHeading: 'Aspectos Destacados del Servicio:',
        keyServices: [
          { title: 'Modelos de Valoración Automatizada (AVM)', text: 'Desarrollo e implementación de modelos econométricos y algoritmos de IA para la valoración masiva de predios, garantizando eficiencia y consistencia.', icon: 'BarChart3' },
          { title: 'Análisis de Mercado Inmobiliario', text: 'Estudios detallados del comportamiento del mercado inmobiliario, identificación de zonas homogéneas físicas y geoeconómicas para fundamentar las valoraciones.', icon: 'TrendingUpIcon' },
          { title: 'Cumplimiento Normativo y Estándares', text: 'Aplicación de metodologías y normativas vigentes (nacionales e internacionales como IVSC) para asegurar la validez y legalidad de los avalúos.', icon: 'ClipboardCheck' },
          { title: 'Informes Detallados y Sustentados', text: 'Generación de informes técnicos completos y comprensibles que detallan la metodología, fuentes de información y resultados de la valoración.', icon: 'FileTextIcon' },
        ],
        benefitsHeading: 'Beneficios de Nuestros Servicios de Avalúos:',
        benefits: [
          'Base Gravable Actualizada y Equitativa para Impuestos Prediales',
          'Valoración Precisa para Transacciones Inmobiliarias',
          'Soporte Técnico para Expropiaciones y Procesos Jurídicos',
          'Optimización de la Gestión de Activos Inmobiliarios',
          'Transparencia en los Procesos de Valoración Catastral',
        ],
        ctaText: 'Solicite su Avalúo Profesional',
        formSubject: 'Consulta%20Avaluos'
      }
    },
    {
      slug: 'planes-ordenamiento-territorial',
      icon: Home,
      title: 'Planes de Ordenamiento Territorial (POT)',
      description: 'Planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio.',
      details: {
        mainIcon: Home,
        title: 'Planes de Ordenamiento Territorial (POT)',
        description: 'Desarrollamos e implementamos planes estratégicos integrales que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad social, la protección ambiental y el desarrollo económico.',
        keyServicesHeading: 'Elementos Clave de Nuestros POT:',
        keyServices: [
          { title: 'Diagnóstico Territorial Integral', text: 'Análisis exhaustivo de las dinámicas físicas, sociales, económicas y ambientales del territorio para identificar potencialidades y problemáticas.', icon: 'Map' },
          { title: 'Participación Ciudadana Estratégica', text: 'Diseño y facilitación de procesos participativos inclusivos para asegurar la legitimidad y apropiación social del plan.', icon: 'Users' },
          { title: 'Zonificación y Usos del Suelo', text: 'Definición de zonas con usos específicos (residencial, comercial, industrial, protección, etc.) y normativas asociadas para orientar el desarrollo.', icon: 'Layers' },
          { title: 'Instrumentos de Gestión y Seguimiento', text: 'Desarrollo de herramientas y mecanismos para la implementación, monitoreo y evaluación continua del POT, asegurando su efectividad a largo plazo.', icon: 'Edit3' },
        ],
        benefitsHeading: 'Beneficios de un POT Estratégico:',
        benefits: [
          'Desarrollo Urbano y Rural Ordenado y Sostenible',
          'Mejora de la Calidad de Vida de los Habitantes',
          'Protección del Patrimonio Natural y Cultural',
          'Atracción de Inversiones y Fomento Económico',
          'Fortalecimiento de la Gobernanza Territorial',
          'Reducción de Vulnerabilidades y Riesgos',
        ],
        ctaText: 'Planifique el Futuro de su Territorio',
        formSubject: 'Consulta%20Planes%20Ordenamiento%20Territorial'
      }
    }
];

const RenderDetailView = ({ service }: { service: any }) => {
    const { details } = service;
    if (!details) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                <p>Seleccione un servicio para ver los detalles.</p>
            </div>
        );
    }
    const MainIcon = iconMap[details.mainIcon] || HomeIcon;

    return (
        <div className="animate-fade-in-up p-1">
            <section className="text-center mb-12">
                <div className="inline-block p-4 bg-primary/10 rounded-lg mb-6">
                    <MainIcon className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4"
                    dangerouslySetInnerHTML={{ __html: details.title }}></h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto"
                   dangerouslySetInnerHTML={{ __html: details.description }}></p>
            </section>

            {details.keyServices && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{details.keyServicesHeading}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.keyServices.map((item: any) => {
                            const ServiceIcon = iconMap[item.icon];
                            return (
                                <Card key={item.title} className="p-6 group transition-shadow duration-300 hover:shadow-lg bg-background/50">
                                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                        <ServiceIcon className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
                                        <CardTitle className="text-lg font-semibold mb-2">{item.title}</CardTitle>
                                        <CardDescription className="text-sm">{item.text}</CardDescription>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}

            {details.methodology && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{details.methodologyHeading}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {details.methodology.map((item: any) => {
                            const ItemIcon = iconMap[item.icon];
                            return (
                                <Card key={item.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 bg-background/50">
                                    <div className="flex items-start gap-4">
                                        <ItemIcon className="h-8 w-8 text-primary group-hover:text-accent transition-colors mt-1 shrink-0" />
                                        <div>
                                            <CardTitle className="text-lg font-semibold mb-1">{item.title}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{item.text}</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}

            {details.benefits && Array.isArray(details.benefits) && typeof details.benefits[0] === 'string' && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{details.benefitsHeading}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
                        {details.benefits.map((benefit: string) => (
                            <li key={benefit} className="flex items-start text-foreground p-2">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {details.benefits && Array.isArray(details.benefits) && typeof details.benefits[0] === 'object' && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">{details.benefitsHeading}</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                         {details.benefits.map((item: any) => {
                             const ItemIcon = iconMap[item.icon];
                             return (
                                <Card key={item.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 bg-background/50 text-center">
                                    <div className="flex flex-col items-center">
                                        <ItemIcon className="h-8 w-8 text-primary group-hover:text-accent transition-colors mb-3" />
                                        <CardTitle className="text-lg font-semibold mb-1">{item.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{item.text}</p>
                                    </div>
                                </Card>
                            );
                        })}
                     </div>
                </section>
            )}

            <section className="text-center">
                <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
                    <Link href={`/forms?service=${service.slug}&subject=${details.formSubject}`}>
                        <span className="flex items-center">
                            {details.ctaText || 'Solicitar Información'} <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                    </Link>
                </Button>
            </section>
        </div>
    );
};

const PlesCatastroPageContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedService, setSelectedService] = useState<any>(null);

    useEffect(() => {
        const serviceSlug = searchParams.get('service');
        const service = services.find(s => s.slug === serviceSlug) || services[0];
        setSelectedService(service);
    }, [searchParams]);

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
                     <Skeleton className="h-24 w-full mb-2" />
                     <Skeleton className="h-24 w-full mb-2" />
                </aside>
                <main>
                    <Skeleton className="h-48 w-full mb-8" />
                    <Skeleton className="h-64 w-full" />
                </main>
            </div>
        )
    }

    return (
        <div className="space-y-16">
            {/* Hero */}
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
                                PLES Catastro
                            </h1>
                            <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Expertos en <strong className="text-primary">gestión territorial y catastral</strong> con enfoque multipropósito. Modernizamos la administración del territorio aplicando <strong className="text-accent">tecnología de vanguardia y metodologías científicas</strong> para garantizar la seguridad jurídica y el desarrollo sostenible.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#CatastroMultipropósito</Badge>
                                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#GestiónTerritorial</Badge>
                                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#SIG</Badge>
                            </div>
                            <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                                <Link href={`/forms?service=ples-catastro&subject=Consulta%20General%20PLES%20Catastro`}>
                                    <span className="flex items-center">
                                        Hablemos de su Territorio <ArrowRight className="ml-2 h-5 w-5" />
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Master-Detail Section */}
            <section className="w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
                    <aside className="h-fit lg:sticky top-24">
                        <h2 className="text-2xl font-semibold mb-4 text-foreground">Nuestros Servicios</h2>
                        <div className="space-y-2">
                            {services.map(service => {
                                const Icon = service.icon;
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
                        {selectedService && <RenderDetailView service={selectedService} />}
                    </main>
                </div>
            </section>
        </div>
    );
}


export default function PlesCatastroPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <PlesCatastroPageContent />
        </Suspense>
    )
}
