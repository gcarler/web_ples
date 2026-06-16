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
      title: 'Levantamiento Predial Multiprop?sito',
      description: 'Levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jur?dicos y econ?micos.',
      details: {
        mainIcon: MapPin,
        title: 'Levantamiento Predial Multiprop?sito',
        description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jur?dicos, econ?micos y sociales. Aplicamos <strong class="text-primary group-hover:text-accent transition-colors">el uso inteligente de la experiencia</strong>, metodolog?as cient?ficas y tecnolog?a de vanguardia para garantizar informaci?n territorial confiable, optimizar tiempos y costos, y entregar productos de alta calidad.',
        keyServicesHeading: 'Caracter?sticas Clave del Servicio:',
        keyServices: [ 
          { title: 'Cobertura Exhaustiva', text: 'Levantamientos detallados en zonas urbanas y rurales, adaptados a las particularidades de cada territorio.', icon: 'GlobeIcon' },
          { title: 'Tecnolog?a de Precisi?n', text: 'Uso de GPS RTK/PPK, drones con sensores LiDAR/Fotogram?tricos y estaciones totales rob?ticas para m?xima exactitud.', icon: 'CpuIcon' },
          { title: 'Integraci?n SIG', text: 'Compatibilidad nativa con Sistemas de Informaci?n Geogr?fica (SIG) y Bases de Datos Espaciales para una gesti?n eficiente.', icon: 'LayersIcon' },
          { title: 'Soporte a la Formalizaci?n', text: 'Asesor?a t?cnica y metodol?gica para la formalizaci?n de la propiedad y regularizaci?n de la tenencia de la tierra.', icon: 'DraftingCompassIcon' },
        ],
        methodologyHeading: 'Nuestra Metodolog?a Avanzada:',
        methodology: [
          {
            icon: 'Settings',
            title: "Planificaci?n Detallada y Cient?fica",
            text: "Definimos alcances, seleccionamos tecnolog?as ?ptimas y dise?amos flujos de trabajo eficientes basados en an?lisis t?cnico y nuestra vasta experiencia."
          },
          {
            icon: 'TargetIcon',
            title: "Captura de Datos de Alta Precisi?n",
            text: "Utilizamos GPS RTK/PPK, estaciones totales rob?ticas y drones equipados con sensores LiDAR o fotogram?tricos para garantizar la m?xima exactitud en campo."
          },
          {
            icon: 'CpuIcon',
            title: "Procesamiento y Modelado Avanzado",
            text: "Empleamos software especializado y algoritmos de IA para el procesamiento de datos, generaci?n de Modelos Digitales de Terreno (MDT), Modelos Digitales de Superficie (MDS) y ortofotomosaicos."
          },
          {
            icon: 'CheckCircleIcon',
            title: "Integraci?n y Validaci?n Rigurosa",
            text: "Consolidamos informaci?n f?sica, jur?dica y econ?mica en SIG, aplicando controles de calidad continuos para asegurar la consistencia y fiabilidad de los datos."
          }
        ],
        benefitsHeading: 'Beneficios de Nuestro Levantamiento Predial:',
        benefits: [
          { icon: 'BarChart3Icon', title: "Base Catastral Precisa", text: "Fundamento s?lido para la toma de decisiones estrat?gicas y gesti?n territorial." },
          { icon: 'ShieldCheckIcon', title: "Seguridad Jur?dica", text: "Facilita la formalizaci?n, reduce conflictos y optimiza la recaudaci?n." },
          { icon: 'Clock', title: "Eficiencia y Ahorro", text: "Optimizaci?n de tiempos y costos operativos gracias a tecnolog?a y experiencia." }
        ],
        ctaText: 'Solicitar Asesor?a Especializada',
        formSubject: 'Consulta%20Levantamiento%20Predial'
      }
    },
    {
      slug: 'actualizacion-mantenimiento-catastral',
      icon: FileText,
      title: 'Actualizaci?n y Mantenimiento Catastral',
      description: 'Procesos continuos y automatizados para mantener la informaci?n catastral actualizada y confiable.',
      details: {
        mainIcon: FileText,
        title: 'Actualizaci?n y Mantenimiento Catastral',
        description: 'Implementamos procesos continuos y automatizados para mantener la informaci?n catastral actualizada, confiable y accesible, asegurando la integridad y disponibilidad de los datos para la toma de decisiones estrat?gicas y la gesti?n territorial eficiente.',
        keyServicesHeading: 'Componentes Esenciales del Servicio:',
        keyServices: [
          { title: 'Flujos de Trabajo Digitales', text: 'Dise?o e implementaci?n de procesos optimizados y automatizados para la gesti?n de novedades catastrales y la actualizaci?n continua de la base de datos.', icon: 'Settings' },
          { title: 'Monitoreo Continuo de Cambios', text: 'Uso de tecnolog?as como teledetecci?n y an?lisis de im?genes para identificar cambios en el territorio y activar los procesos de actualizaci?n correspondientes.', icon: 'MonitorPlay' },
          { title: 'Interoperabilidad de Sistemas', text: 'Aseguramos la conexi?n fluida entre el sistema catastral y otras plataformas relevantes (Registro, Notariado, Planeaci?n) para un intercambio de informaci?n eficiente.', icon: 'BarChart3' },
          { title: 'Capacitaci?n y Soporte T?cnico', text: 'Programas de formaci?n para el personal encargado del catastro y soporte continuo para garantizar la correcta operaci?n y mantenimiento del sistema.', icon: 'Users' },
        ],
        benefitsHeading: 'Beneficios Clave para su Entidad:',
        benefits: [
          'Informaci?n Catastral Siempre Precisa y Actualizada',
          'Mayor Confiabilidad en los Datos para la Toma de Decisiones',
          'Optimizaci?n de Procesos y Reducci?n de Tiempos Operativos',
          'Facilita la Gesti?n Fiscal y la Planificaci?n Territorial',
          'Transparencia y Acceso Mejorado a la Informaci?n',
        ],
        ctaText: 'Optimice su Mantenimiento Catastral',
        formSubject: 'Consulta%20Actualizacion%20Mantenimiento%20Catastral'
      }
    },
    {
      slug: 'avaluos-catastrales',
      icon: Scale,
      title: 'Aval?os Masivos y Puntuales',
      description: 'Valoraciones de propiedades con metodolog?as robustas para una base imponible justa.',
      details: {
        mainIcon: ScaleIcon,
        title: 'Aval?os Masivos y Puntuales',
        description: 'Realizamos valoraciones de propiedades con metodolog?as robustas y transparentes, tanto para procesos masivos como para aval?os individuales, asegurando una base imponible justa y una gesti?n eficiente de activos p?blicos y privados.',
        keyServicesHeading: 'Aspectos Destacados del Servicio:',
        keyServices: [
          { title: 'Modelos de Valoraci?n Automatizada (AVM)', text: 'Desarrollo e implementaci?n de modelos econom?tricos y algoritmos de IA para la valoraci?n masiva de predios, garantizando eficiencia y consistencia.', icon: 'BarChart3' },
          { title: 'An?lisis de Mercado Inmobiliario', text: 'Estudios detallados del comportamiento del mercado inmobiliario, identificaci?n de zonas homog?neas f?sicas y geoecon?micas para fundamentar las valoraciones.', icon: 'TrendingUpIcon' },
          { title: 'Cumplimiento Normativo y Est?ndares', text: 'Aplicaci?n de metodolog?as y normativas vigentes (nacionales e internacionales como IVSC) para asegurar la validez y legalidad de los aval?os.', icon: 'ClipboardCheck' },
          { title: 'Informes Detallados y Sustentados', text: 'Generaci?n de informes t?cnicos completos y comprensibles que detallan la metodolog?a, fuentes de informaci?n y resultados de la valoraci?n.', icon: 'FileTextIcon' },
        ],
        benefitsHeading: 'Beneficios de Nuestros Servicios de Aval?os:',
        benefits: [
          'Base Gravable Actualizada y Equitativa para Impuestos Prediales',
          'Valoraci?n Precisa para Transacciones Inmobiliarias',
          'Soporte T?cnico para Expropiaciones y Procesos Jur?dicos',
          'Optimizaci?n de la Gesti?n de Activos Inmobiliarios',
          'Transparencia en los Procesos de Valoraci?n Catastral',
        ],
        ctaText: 'Solicite su Aval?o Profesional',
        formSubject: 'Consulta%20Avaluos'
      }
    },
    {
      slug: 'planes-ordenamiento-territorial',
      icon: Home,
      title: 'Planes de Ordenamiento Territorial (POT)',
      description: 'Planes estrat?gicos que gu?an el crecimiento sostenible y la ocupaci?n eficiente del territorio.',
      details: {
        mainIcon: Home,
        title: 'Planes de Ordenamiento Territorial (POT)',
        description: 'Desarrollamos e implementamos planes estrat?gicos integrales que gu?an el crecimiento sostenible y la ocupaci?n eficiente del territorio, promoviendo la equidad social, la protecci?n ambiental y el desarrollo econ?mico.',
        keyServicesHeading: 'Elementos Clave de Nuestros POT:',
        keyServices: [
          { title: 'Diagn?stico Territorial Integral', text: 'An?lisis exhaustivo de las din?micas f?sicas, sociales, econ?micas y ambientales del territorio para identificar potencialidades y problem?ticas.', icon: 'Map' },
          { title: 'Participaci?n Ciudadana Estrat?gica', text: 'Dise?o y facilitaci?n de procesos participativos inclusivos para asegurar la legitimidad y apropiaci?n social del plan.', icon: 'Users' },
          { title: 'Zonificaci?n y Usos del Suelo', text: 'Definici?n de zonas con usos espec?ficos (residencial, comercial, industrial, protecci?n, etc.) y normativas asociadas para orientar el desarrollo.', icon: 'Layers' },
          { title: 'Instrumentos de Gesti?n y Seguimiento', text: 'Desarrollo de herramientas y mecanismos para la implementaci?n, monitoreo y evaluaci?n continua del POT, asegurando su efectividad a largo plazo.', icon: 'Edit3' },
        ],
        benefitsHeading: 'Beneficios de un POT Estrat?gico:',
        benefits: [
          'Desarrollo Urbano y Rural Ordenado y Sostenible',
          'Mejora de la Calidad de Vida de los Habitantes',
          'Protecci?n del Patrimonio Natural y Cultural',
          'Atracci?n de Inversiones y Fomento Econ?mico',
          'Fortalecimiento de la Gobernanza Territorial',
          'Reducci?n de Vulnerabilidades y Riesgos',
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
                            {details.ctaText || 'Solicitar Informaci?n'} <ArrowRight className="ml-2 h-5 w-5" />
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
                                Expertos en <strong className="text-primary">gesti?n territorial y catastral</strong> con enfoque multiprop?sito. Modernizamos la administraci?n del territorio aplicando <strong className="text-accent">tecnolog?a de vanguardia y metodolog?as cient?ficas</strong> para garantizar la seguridad jur?dica y el desarrollo sostenible.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#CatastroMultiprop?sito</Badge>
                                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Gesti?nTerritorial</Badge>
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
