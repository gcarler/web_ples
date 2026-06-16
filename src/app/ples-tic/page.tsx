// src/app/ples-tic/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, Award, BarChart3, BookOpen, Brain, Briefcase, CheckCircle, CloudCog, Code, Cpu, Database, DraftingCompass, FileText, FlaskConical, GitPullRequestArrow, Globe, Handshake, HomeIcon, KanbanSquare, Layers, Lightbulb, Lock, MapPin, Rocket, Search, Send, Server, Settings, ShieldCheck, ShoppingCart, Target, TrendingUp, Users, Users2
} from 'lucide-react';
import PlexusIllustration from '@/components/illustrations/PlexusIllustration';
import { Badge } from '@/components/ui/badge';
import { InteractiveSoftwareSuites } from '@/components/ples-tic/interactive-software-suites';
import { CodeTypingIllustration } from '@/components/illustrations/CodeTypingIllustration';
import { HealthDataIllustration } from '@/components/illustrations/HealthDataIllustration';

const valuePropositions = [
    {
      icon: Settings,
      title: 'Soluciones a Medida',
      description: 'Desarrollamos software y sistemas adaptados espec?ficamente a sus necesidades y objetivos estrat?gicos.',
    },
    {
      icon: Lightbulb,
      title: 'Innovaci?n y Vanguardia',
      description: 'Aplicamos las ?ltimas tecnolog?as y metodolog?as para garantizar soluciones modernas, eficientes y preparadas para el futuro.',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad Integral',
      description: 'Protegemos sus activos digitales con estrategias de ciberseguridad proactivas y robustas adaptadas a su entorno.',
    },
    {
      icon: TrendingUp,
      title: 'Optimizaci?n y Eficiencia',
      description: 'Automatizamos y optimizamos sus flujos de trabajo para mejorar la productividad, reducir costos y potenciar el crecimiento.',
    },
  ];

const coreServices = [
    {
      icon: Code,
      title: 'Desarrollo de Software a Medida',
      description: 'Creamos aplicaciones web, m?viles y empresariales personalizadas, desde la concepci?n hasta el despliegue y mantenimiento continuo.',
      details: ["An?lisis y Dise?o de Sistemas", "Desarrollo Full-Stack (Frontend/Backend)", "Integraci?n de APIs y Servicios Externos", "Metodolog?as ?giles (Scrum/Kanban)"],
      ctaLink: "/ples-tic/desarrollo-software",
      ctaText: "M?s sobre Desarrollo a Medida",
    },
    {
      icon: CloudCog,
      title: 'Soluciones Cloud y DevOps',
      description: 'Dise?amos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes (AWS, Azure, GCP).',
      details: ["Migraci?n Estrat?gica a la Nube", "Arquitecturas Serverless y Microservicios", "Infraestructura como C?digo (IaC)", "CI/CD y Automatizaci?n DevOps"],
      ctaLink: "/ples-tic/soluciones-cloud",
      ctaText: "Descubra Soluciones Cloud",
    },
    {
      icon: Lock,
      title: 'Ciberseguridad Avanzada',
      description: 'Protegemos su informaci?n y sistemas contra amenazas cibern?ticas con auditor?as, consultor?a y soluciones de seguridad de ?ltima generaci?n.',
      details: ["An?lisis de Vulnerabilidades y Pentesting ?tico", "Gesti?n de Identidad y Acceso (IAM/IGA)", "Seguridad de Redes y Endpoints (EDR/XDR)", "Planes de Respuesta a Incidentes (IRP)"],
      ctaLink: "/ples-tic/ciberseguridad",
      ctaText: "Fortalezca su Seguridad",
    },
    {
      icon: BarChart3,
      title: 'An?lisis de Datos e Inteligencia de Negocio (BI)',
      description: 'Transformamos sus datos en informaci?n valiosa para la toma de decisiones estrat?gicas, mediante dashboards y reportes interactivos.',
      details: ["Modelado y Almacenamiento de Datos (Data Warehousing)", "Visualizaci?n de Datos (Tableau, Power BI, Looker)", "An?lisis Predictivo y Fundamentos de Machine Learning", "Procesos ETL/ELT y Calidad de Datos"],
      ctaLink: "/ples-tic/analisis-datos-bi",
      ctaText: "Explore Inteligencia de Negocio",
    },
    {
      icon: Brain,
      title: 'Automatizaci?n Inteligente con IA',
      description: 'Potenciamos su negocio con soluciones de IA personalizadas que optimizan procesos, extraen valor de sus datos y mejoran la toma de decisiones.',
      details: [
        "An?lisis y Diagn?stico de Oportunidades de IA",
        "Desarrollo de Modelos de Machine Learning y Deep Learning",
        "Implementaci?n de Chatbots y Asistentes Virtuales Inteligentes",
        "Procesamiento de Lenguaje Natural (NLP) y Visi?n por Computadora",
      ],
      ctaLink: "/ples-tic/automatizacion-ia",
      ctaText: "Conozca Nuestras Capacidades en IA",
    },
];

const ourApproachSteps = [
    { icon: Search, title: 'Entendimiento y Diagn?stico', description: 'Analizamos sus necesidades, objetivos y entorno tecnol?gico actual.' },
    { icon: DraftingCompass, title: 'Dise?o y Planificaci?n Estrat?gica', description: 'Definimos la arquitectura, tecnolog?as y hoja de ruta del proyecto.' },
    { icon: KanbanSquare, title: 'Desarrollo ?gil e Implementaci?n', description: 'Construimos la soluci?n con enfoque en calidad y entregas incrementales.' },
    { icon: FlaskConical, title: 'Pruebas Exhaustivas y Despliegue', description: 'Realizamos pruebas rigurosas para garantizar funcionalidad y seguridad.' },
    { icon: GitPullRequestArrow, title: 'Soporte y Evoluci?n Continua', description: 'Ofrecemos soporte post-implementaci?n y planes de mantenimiento continuo.' },
];

const technologies = ['JavaScript (React, Next.js, Node.js)', 'Python (Django, Flask, FastAPI)', 'Java, C#/.NET', 'Bases de Datos (PostgreSQL, MySQL, MongoDB, Redis)', 'Docker, Kubernetes, Terraform', 'AWS, Azure, Google Cloud Platform', 'Inteligencia Artificial (Machine Learning, NLP, Computer Vision)', 'Git, Jenkins, GitLab CI', 'Marcos de Ciberseguridad (NIST, ISO 27001)', 'Herramientas BI (Tableau, Power BI)'];

const caseStudies = [
    {
      title: 'Transformaci?n Digital para Empresa Retail Global',
      challenge: 'Procesos manuales obsoletos, falta de visibilidad de inventario en tiempo real y una experiencia de cliente desactualizada.',
      solution: 'Desarrollamos una plataforma e-commerce omnicanal, integramos un sistema ERP en la nube y creamos una estrategia de marketing digital personalizada. Resultados: Incremento de ventas online del 45% y mejora en la satisfacci?n del cliente.',
      illustration: (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <PlexusIllustration />
          <div className="relative h-full w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-subtle-float">
                <ShoppingCart className="h-20 w-20 text-accent"/>
            </div>
            <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.3s' }}>
                <ShoppingCart className="h-8 w-8 text-primary"/>
            </div>
            <div className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.5s' }}>
                <CloudCog className="h-8 w-8 text-primary"/>
            </div>
            <div className="absolute bottom-[25%] left-[25%] -translate-x-1/2 translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.7s' }}>
                <Users className="h-8 w-8 text-primary"/>
            </div>
            <div className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.9s' }}>
                <BarChart3 className="h-8 w-8 text-primary"/>
            </div>
          </div>
        </div>
      ),
      tags: ['Desarrollo Web Full-Stack', 'Soluciones Cloud', 'Integraci?n ERP']
    },
    {
      title: 'Plataforma Segura de Gesti?n de Datos para Sector Salud',
      challenge: 'Silos de informaci?n m?dica, dificultad para el an?lisis de datos de pacientes y necesidad de cumplir con estrictas normativas de privacidad (HIPAA/GDPR).',
      solution: 'Implementamos una plataforma centralizada en la nube para la gesti?n de datos de pacientes, con dashboards de BI para an?lisis cl?nicos y robustas medidas de seguridad y cumplimiento normativo. Se logr? una mejora significativa en la toma de decisiones m?dicas y la eficiencia operativa.',
      illustration: (
        <HealthDataIllustration className="h-full w-full rounded-lg"/>
      ),
      tags: ['Inteligencia de Negocio', 'Arquitectura Cloud', 'Seguridad de Datos']
    },
];

export default function PlesTicPage() {
  return (
    <div className="space-y-0">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
                <CodeTypingIllustration />
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES TIC
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <strong className="text-primary">Innovaci?n Tecnol?gica y Estrategia Digital para el Presente</strong>. En PLES TIC, combinamos experticia t?cnica con visi?n de negocio para desarrollar soluciones de TI <strong className="text-accent">robustas, escalables y seguras</strong> que impulsan su <strong className="text-primary">crecimiento y eficiencia operativa</strong>.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#DesarrolloDeSoftware</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#SolucionesCloud</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Ciberseguridad</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#AutomatizacionIA</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#AnalisisDeDatos</Badge>
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-tic&subject=Consulta%20Soluciones%20PLES%20TIC`}>
                  <span className="flex items-center">
                    Descubra Nuestras Soluciones <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">?Por Qu? Elegir PLES TIC?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Nos enfocamos en resultados tangibles, construyendo alianzas tecnol?gicas a largo plazo para el ?xito de su organizaci?n.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map(({icon: Icon, title, description}) => (
                <Card key={title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader className="items-center">
                    <Icon className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
                    <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90">{description}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Servicios Tecnol?gicos Clave</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map(({icon: Icon, title, description, details, ctaLink, ctaText}) => (
              <Link key={title} href={ctaLink || '#'} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                        <div>
                        <CardTitle className="text-xl group-hover:text-primary-foreground">{title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                        {details.map(detail => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 mr-2 shrink-0" />
                            {detail}
                            </li>
                        ))}
                        </ul>
                        {ctaLink && ctaText && (
                          <div className="mt-4 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                              {ctaText} <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
            </div>
        </div>
      </section>

      <InteractiveSoftwareSuites />

      <section>
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestro Enfoque Colaborativo</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Trabajamos de cerca con usted en cada etapa, desde la idea inicial hasta el soporte continuo, asegurando soluciones que realmente funcionan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ourApproachSteps.map(({icon: Icon, title, description}) => (
                <Card key={title} className="text-center p-6 group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center bg-card hover:animate-gradient hover:bg-[length:200%_200%]">
                <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />
                <CardTitle className="text-lg mt-2 mb-1 group-hover:text-primary-foreground">{title}</CardTitle>
                <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/90 flex-grow">{description}</p>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-card shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Tecnolog?as y Plataformas que Dominamos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Utilizamos un stack tecnol?gico moderno y flexible para construir soluciones robustas, escalables y seguras, adaptadas a los desaf?os de su industria.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent hover:scale-105">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.title} className="overflow-hidden group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
                <div className="relative h-56 w-full bg-card group-hover:bg-transparent transition-colors">
                  {study.illustration}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary-foreground">{study.title}</CardTitle>
                  <div className="mt-2">
                    {study.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2 mb-2 group-hover:bg-primary-foreground/20 group-hover:text-accent-foreground">{tag}</Badge>)}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Desaf?o:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Soluci?n PLES TIC:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                        <Link href={`/forms?subject=Mas%20Informacion%20Caso%20Estudio%20TIC`}>
                            <span className="flex items-center">
                                Conocer M?s <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
        
      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Rocket className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Impulse su Negocio con la Tecnolog?a del Ma?ana</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             Descubra c?mo las soluciones personalizadas de PLES TIC pueden transformar su organizaci?n, optimizar sus operaciones y abrir nuevas oportunidades de crecimiento.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-tic&subject=Solicitud%20Asesoria%20Tecnologica`}>
                <span className="flex items-center">
                    Solicitar Asesor?a Tecnol?gica <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

    

    


