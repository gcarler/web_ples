
// src/app/ples-tic/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, Cpu, Lightbulb, ShieldCheck, TrendingUp, Code, CloudCog, Lock, BarChartBig, Network, Search, DraftingCompass, KanbanSquare, FlaskConical, GitPullRequestArrow, Rocket, Workflow, Brain, Database, Settings, Server, Shield, Layers, ShoppingCart, ShoppingBag, Cloud, Users, HeartPulse, Building2, Globe, Landmark, Warehouse, Users2, Megaphone, ConciergeBell, Zap, Wrench, ChevronRight, Briefcase, Map, School, FileArchive, Info, LayoutDashboard, Target, ShieldAlert, FileSearch, ExternalLink, GitMerge, FileCheck, BookOpen, ClipboardCheck, BrainCircuit
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PlexusIllustration from '@/components/illustrations/PlexusIllustration';
import DataPipelineIllustration from '@/components/illustrations/DataPipelineIllustration';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export const metadata = {
  title: 'PLES TIC - Soluciones Tecnológicas Innovadoras para su Negocio',
  description: 'Impulsamos la transformación digital de su organización con desarrollo de software a medida, soluciones cloud, ciberseguridad, automatización con IA y análisis de datos.',
};

export default function PlesTicPage() {
  const valuePropositions = [
    {
      icon: <Settings className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
      title: 'Soluciones a Medida',
      description: 'Desarrollamos software y sistemas adaptados específicamente a sus necesidades y objetivos estratégicos.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
      title: 'Innovación y Vanguardia',
      description: 'Aplicamos las últimas tecnologías y metodologías para garantizar soluciones modernas, eficientes y preparadas para el futuro.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
      title: 'Seguridad Integral',
      description: 'Protegemos sus activos digitales con estrategias de ciberseguridad proactivas y robustas adaptadas a su entorno.',
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
      title: 'Optimización y Eficiencia',
      description: 'Automatizamos y optimizamos sus flujos de trabajo para mejorar la productividad, reducir costos y potenciar el crecimiento.',
    },
  ];

  const coreServices = [
    {
      icon: <Code className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Desarrollo de Software a Medida',
      description: 'Creamos aplicaciones web, móviles y empresariales personalizadas, desde la concepción hasta el despliegue y mantenimiento continuo.',
      details: ["Análisis y Diseño de Sistemas", "Desarrollo Full-Stack (Frontend/Backend)", "Integración de APIs y Servicios Externos", "Metodologías Ágiles (Scrum/Kanban)"],
      ctaLink: "/ples-tic/desarrollo-software",
      ctaText: "Más sobre Desarrollo a Medida",
    },
    {
      icon: <CloudCog className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Soluciones Cloud y DevOps',
      description: 'Diseñamos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes (AWS, Azure, GCP).',
      details: ["Migración Estratégica a la Nube", "Arquitecturas Serverless y Microservicios", "Infraestructura como Código (IaC)", "CI/CD y Automatización DevOps"],
      ctaLink: "/ples-tic/soluciones-cloud",
      ctaText: "Descubra Soluciones Cloud",
    },
    {
      icon: <Lock className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Ciberseguridad Avanzada',
      description: 'Protegemos su información y sistemas contra amenazas cibernéticas con auditorías, consultoría y soluciones de seguridad de última generación.',
      details: ["Análisis de Vulnerabilidades y Pentesting Ético", "Gestión de Identidad y Acceso (IAM/IGA)", "Seguridad de Redes y Endpoints (EDR/XDR)", "Planes de Respuesta a Incidentes (IRP)"],
      ctaLink: "/ples-tic/ciberseguridad",
      ctaText: "Fortalezca su Seguridad",
    },
    {
      icon: <BarChartBig className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Análisis de Datos e Inteligencia de Negocio (BI)',
      description: 'Transformamos sus datos en información valiosa para la toma de decisiones estratégicas, mediante dashboards y reportes interactivos.',
      details: ["Modelado y Almacenamiento de Datos (Data Warehousing)", "Visualización de Datos (Tableau, Power BI, Looker)", "Análisis Predictivo y Fundamentos de Machine Learning", "Procesos ETL/ELT y Calidad de Datos"],
      ctaLink: "/ples-tic/analisis-datos-bi",
      ctaText: "Explore Inteligencia de Negocio",
    },
    {
      icon: <Brain className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Automatización Inteligente con IA',
      description: 'Potenciamos su negocio con soluciones de IA personalizadas que optimizan procesos, extraen valor de sus datos y mejoran la toma de decisiones.',
      details: [
        "Análisis y Diagnóstico de Oportunidades de IA",
        "Desarrollo de Modelos de Machine Learning y Deep Learning",
        "Implementación de Chatbots y Asistentes Virtuales Inteligentes",
        "Procesamiento de Lenguaje Natural (NLP) y Visión por Computadora",
      ],
      ctaLink: "/ples-tic/automatizacion-ia",
      ctaText: "Conozca Nuestras Capacidades en IA",
    },
  ];

  const ourApproachSteps = [
    { icon: <Search className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Entendimiento y Diagnóstico', description: 'Analizamos sus necesidades, objetivos y entorno tecnológico actual.' },
    { icon: <DraftingCompass className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Diseño y Planificación Estratégica', description: 'Definimos la arquitectura, tecnologías y hoja de ruta del proyecto.' },
    { icon: <KanbanSquare className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Desarrollo Ágil e Implementación', description: 'Construimos la solución con enfoque en calidad y entregas incrementales.' },
    { icon: <FlaskConical className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Pruebas Exhaustivas y Despliegue', description: 'Realizamos pruebas rigurosas para garantizar funcionalidad y seguridad.' },
    { icon: <GitPullRequestArrow className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Soporte y Evolución Continua', description: 'Ofrecemos soporte post-implementación y planes de mantenimiento.' },
  ];

  const technologies = ['JavaScript (React, Next.js, Node.js)', 'Python (Django, Flask, FastAPI)', 'Java, C#/.NET', 'Bases de Datos (PostgreSQL, MySQL, MongoDB, Redis)', 'Docker, Kubernetes, Terraform', 'AWS, Azure, Google Cloud Platform', 'Inteligencia Artificial (Machine Learning, NLP, Computer Vision)', 'Git, Jenkins, GitLab CI', 'Marcos de Ciberseguridad (NIST, ISO 27001)', 'Herramientas BI (Tableau, Power BI)'];

  const caseStudies = [
    {
      title: 'Transformación Digital para Empresa Retail Global',
      challenge: 'Procesos manuales obsoletos, falta de visibilidad de inventario en tiempo real y una experiencia de cliente desactualizada.',
      solution: 'Desarrollamos una plataforma e-commerce omnicanal, integramos un sistema ERP en la nube y creamos una estrategia de marketing digital personalizada. Resultados: Incremento de ventas online del 45% y mejora en la satisfacción del cliente.',
      illustration: (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <PlexusIllustration />
          <div className="relative h-full w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-subtle-float">
                <ShoppingBag className="h-20 w-20 text-accent"/>
            </div>
            <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.3s' }}>
                <ShoppingCart className="h-8 w-8 text-primary"/>
            </div>
            <div className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2 animate-subtle-float" style={{ animationDelay: '0.5s' }}>
                <Cloud className="h-8 w-8 text-primary"/>
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
      tags: ['Desarrollo Web Full-Stack', 'Soluciones Cloud', 'Integración ERP']
    },
    {
      title: 'Plataforma Segura de Gestión de Datos para Sector Salud',
      challenge: 'Silos de información médica, dificultad para el análisis de datos de pacientes y necesidad de cumplir con estrictas normativas de privacidad (HIPAA/GDPR).',
      solution: 'Implementamos una plataforma centralizada en la nube para la gestión de datos de pacientes, con dashboards de BI para análisis clínicos y robustas medidas de seguridad y cumplimiento normativo. Se logró una mejora significativa en la toma de decisiones médicas y la eficiencia operativa.',
      illustration: (
        <DataPipelineIllustration className="h-full w-full rounded-lg"/>
      ),
      tags: ['Inteligencia de Negocio', 'Arquitectura Cloud', 'Seguridad de Datos']
    },
  ];

    const ofiPlesModules = {
    "Sitio web": [
      { name: "OfiPles Sitio web", description: "Creador de sitios web empresariales" },
      { name: "OfiPles Comercio electrónico", description: "Vende tus productos en línea" },
      { name: "OfiPles Blog", description: "Publica entradas, anuncios y noticias" },
      { name: "OfiPles Foro", description: "Gestiona un foro para preguntas frecuentes" },
      { name: "OfiPles eLearning", description: "Gestiona y publica tus cursos" },
      { name: "OfiPles Chat en vivo", description: "Chatea con los visitantes de tu sitio web" }
    ],
    "Ventas": [
      { name: "OfiPles CRM", description: "Gestiona tus leads y cierra oportunidades" },
      { name: "OfiPles Ventas", description: "De cotizaciones a facturas" },
      { name: "OfiPles Punto de venta", description: "Interfaz de punto de venta para tiendas y restaurantes" },
      { name: "OfiPles Suscripciones", description: "Facturas recurrentes y renovaciones" },
      { name: "OfiPles Alquiler", description: "Gestiona contratos, entregas y devoluciones" }
    ],
    "Finanzas": [
      { name: "OfiPles Contabilidad", description: "Gestiona tu contabilidad financiera y analítica" },
      { name: "OfiPles Facturación", description: "Facturas y pagos" },
      { name: "OfiPles Gastos", description: "Gestiona los gastos de tus empleados" },
      { name: "OfiPles Documentos", description: "Gestión de documentos" },
      { name: "OfiPles Tablero de hojas de cálculo", description: "Documentos y hojas de cálculo" },
      { name: "OfiPles Firma electrónica", description: "Firma documentos en línea" }
    ],
    "Inventario y fabricación": [
      { name: "OfiPles Inventario", description: "Gestiona tu inventario y actividades de logística" },
      { name: "OfiPles Manufactura", description: "Órdenes de fabricación y listas de materiales" },
      { name: "OfiPles Gestión del ciclo de vida del producto", description: "Gestión del ciclo de vida del producto" },
      { name: "OfiPles Compra", description: "Órdenes de compra, licitaciones y contratos" },
      { name: "OfiPles MRP de mantenimiento", description: "Monitorea tus equipos y gestiona solicitudes" },
      { name: "OfiPles Calidad", description: "Controla la calidad de tus productos" }
    ],
    "Recursos humanos": [
      { name: "OfiPles Empleados", description: "Centraliza la información de tus empleados" },
      { name: "OfiPles Reclutamiento", description: "Monitorea tu flujo de reclutamiento" },
      { name: "OfiPles Tiempo personal", description: "Asigna y dale seguimiento a las solicitudes de tiempo personal" },
      { name: "OfiPles Evaluaciones", description: "Evalúa a tus empleados" },
      { name: "OfiPles Recomendación de empleados", description: "Comparte puestos de trabajo y refiere a tus amigos" },
      { name: "OfiPles Flota", description: "Gestiona tu flota y monitorea el costo de tus vehículos" }
    ],
    "Marketing": [
      { name: "OfiPles Automatización de marketing", description: "Elabora campañas de correo automatizadas" },
      { name: "OfiPles Marketing por correo electrónico", description: "Diseña, envía y monitorea correos electrónicos" },
      { name: "OfiPles Marketing por SMS", description: "Diseña, envía y monitorea SMS" },
      { name: "OfiPles Marketing social", description: "Gestiona tus redes sociales y los visitantes de tu sitio web" },
      { name: "OfiPles Organización de eventos", description: "Publica eventos y vende boletos" },
      { name: "OfiPles Encuesta", description: "Envía tus encuestas o compártelas en un evento en vivo" }
    ],
    "Servicios": [
      { name: "OfiPles Proyecto", description: "Organiza y planea tus proyectos" },
      { name: "OfiPles Hojas de horas", description: "Monitorea el tiempo que los empleados invierten en tareas" },
      { name: "OfiPles Servicio externo", description: "Programa y monitorea operaciones externas, el tiempo y el material" },
      { name: "OfiPles Soporte al cliente", description: "Monitorea, prioritiza y soluciona los tickets de tus clientes" },
      { name: "OfiPles Planeación", description: "Gestiona el horario de tus empleados" },
      { name: "OfiPles Citas", description: "Permite que otras personas agenden reuniones contigo" }
    ],
    "Productividad": [
      { name: "OfiPles Conversaciones", description: "Chat, pasarela de correos electrónicos y canales privados" },
      { name: "OfiPles Aprobaciones", description: "Crea y valida solicitudes de aprobación" },
      { name: "OfiPles Internet de las cosas", description: "Modelos básicos y asistentes para IoT" },
      { name: "OfiPles VOIP", description: "Haz y recibe llamadas" },
      { name: "OfiPles Información", description: "Gestiona tu biblioteca de información" }
    ],
    "Personalización": [
      { name: "OfiPles Studio", description: "Crea y personaliza tus propias aplicaciones" }
    ]
  };

  const gobPlesModules = {
    "CatastroGob": {
        icon: <Map className="h-6 w-6 text-primary" />,
        description: "Software integral para la gestión catastral con enfoque multipropósito, diseñado para entidades territoriales, gestores y operadores catastrales, asegurando el cumplimiento del modelo LADM_COL.",
        submodules: ["Gestión de Trámites", "Módulo SIG", "Gestión Física y Jurídica"]
    },
    "SIATGOB": {
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        description: "Solución avanzada para la administración del territorio a nivel municipal, integrada con la ICDE para optimizar la planificación y el control del uso del suelo.",
        submodules: ["Ordenamiento Territorial", "Administración de la Propiedad", "Fortalecimiento Fiscal", "Planificación y Desarrollo", "Gestión de Recursos y Riesgos"]
    },
    "PAEgob": {
        icon: <School className="h-6 w-6 text-primary" />,
        description: "Solución para optimizar la gestión y supervisión del Programa de Alimentación Escolar (PAE), dirigida a administradores e instituciones educativas.",
        submodules: ["Gestión de Instituciones", "Gestión de Beneficiarios", "Reportes Diarios y Mensuales", "Validación de Entregas"]
    },
    "EduGOB (GEGOB)": {
        icon: <Users2 className="h-6 w-6 text-primary" />,
        description: "Plataforma integral para la gestión en instituciones de educación superior, básica y media, enfocada en procesos académicos, administrativos y bienestar estudiantil.",
        submodules: ["Gestión de Usuarios", "Bienestar Estudiantil", "Convocatorias y Becas", "Constructor de Hojas de Vida", "Módulo de Analítica"]
    },
    "GestorDoc": {
        icon: <FileArchive className="h-6 w-6 text-primary" />,
        description: "Solución completa de gestión documental que cumple con la Ley General de Archivos de Colombia (Ley 594 de 2000), garantizando organización, seguridad y trazabilidad.",
        submodules: ["Tablas de Retención Documental (TRD)", "Flujos de Trabajo Seguros", "Consultas Virtuales y Presenciales", "Identificadores Únicos (FUID)"]
    },
    "infoGOB": {
        icon: <Info className="h-6 w-6 text-primary" />,
        description: "Plataforma enfocada en la transparencia y la rendición de cuentas para la gestión de proyectos, permitiendo el acceso público a información detallada.",
        submodules: ["Gestión de Proyectos", "Seguimiento y Monitoreo", "Participación Ciudadana", "Módulo SIG"]
    }
  };

  const cegobModules = {
    "PEI / Inicio": {
        icon: <BookOpen className="h-6 w-6 text-primary" />,
        description: "Es el corazón de la plataforma, donde se define la identidad y el rumbo de la institución.",
        submodules: ["Resumen PEI", "Objetivos Estratégicos", "Socialización"]
    },
    "SIE": {
        icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
        description: "Módulo dedicado a la gestión de la evaluación de los estudiantes.",
        submodules: ["Gestión Integral SIE", "Rejilla de Autoevaluación del SIEE"]
    },
    "Autoevaluación": {
        icon: <FileSearch className="h-6 w-6 text-primary" />,
        description: "Permite a la institución diagnosticar su estado actual en diferentes áreas.",
        submodules: ["Dashboard de Autoevaluación", "Tabla de Indicadores", "Comparativa de Procesos"]
    },
    "Evaluaciones Externas": {
        icon: <ExternalLink className="h-6 w-6 text-primary" />,
        description: "Módulo para analizar los resultados de pruebas estandarizadas (como las Pruebas Saber).",
        submodules: ["Carga de Resultados", "Análisis Institucional", "Análisis Comparativo"]
    },
    "PMI": {
        icon: <TrendingUp className="h-6 w-6 text-primary" />,
        description: "Herramienta para crear, gestionar y seguir los proyectos que surgen de la autoevaluación.",
        submodules: ["Proyectos PMI", "Cronograma General", "Banco de Prácticas"]
    },
    "Proyectos Transversales": {
        icon: <GitMerge className="h-6 w-6 text-primary" />,
        description: "Gestiona los proyectos educativos que atraviesan el currículo (Ambiental, Paz, Sexualidad, etc.).",
        submodules: ["Listado de Proyectos", "Matriz de Impacto"]
    },
    "Formación Docente": {
        icon: <School className="h-6 w-6 text-primary" />,
        description: "Organiza el desarrollo profesional del equipo docente.",
        submodules: ["Plan y Necesidades", "Calendario de Formaciones", "Reporte de Necesidades"]
    },
    "Autorización Institucional": {
        icon: <FileCheck className="h-6 w-6 text-primary" />,
        description: "Módulo para el seguimiento de licencias y requisitos legales.",
        submodules: ["Licencias Actuales", "Historial de Vencimientos", "Requisitos Pendientes"]
    },
    "Administración": {
        icon: <Settings className="h-6 w-6 text-primary" />,
        description: "Panel de control para la configuración del sistema.",
        submodules: ["Gestión de Usuarios", "Configuración Institucional", "Registros del Sistema", "Configuraciones Globales"]
    }
  };

  const getIconForOfiPlesCategory = (category: string) => {
    switch(category.toLowerCase()) {
        case 'sitio web': return <Globe className="h-6 w-6 text-primary" />;
        case 'ventas': return <ShoppingCart className="h-6 w-6 text-primary" />;
        case 'finanzas': return <Landmark className="h-6 w-6 text-primary" />;
        case 'inventario y fabricación': return <Warehouse className="h-6 w-6 text-primary" />;
        case 'recursos humanos': return <Users2 className="h-6 w-6 text-primary" />;
        case 'marketing': return <Megaphone className="h-6 w-6 text-primary" />;
        case 'servicios': return <ConciergeBell className="h-6 w-6 text-primary" />;
        case 'productividad': return <Zap className="h-6 w-6 text-primary" />;
        case 'personalización': return <Wrench className="h-6 w-6 text-primary" />;
        default: return <ChevronRight className="h-6 w-6 text-primary" />;
    }
  }

  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center"
                  >
                    <Cpu className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES TIC
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <strong className="text-primary">Innovación Tecnológica y Estrategia Digital</strong> para el Futuro de su Empresa. En PLES TIC, combinamos experticia técnica con visión de negocio para desarrollar soluciones de TI <strong className="text-accent">robustas, escalables y seguras</strong> que impulsan su <strong className="text-primary">crecimiento y eficiencia operativa</strong>.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#DesarrolloDeSoftware</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#SolucionesCloud</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Ciberseguridad</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#AutomatizacionIA</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#TransformacionDigital</Badge>
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href="/forms?service=ples-tic&subject=Consulta%20Soluciones%20PLES%20TIC">
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
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">¿Por Qué Elegir PLES TIC?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Nos enfocamos en resultados tangibles, construyendo alianzas tecnológicas a largo plazo para el éxito de su organización.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((vp) => (
                <Card key={vp.title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader className="items-center">
                    {vp.icon}
                    <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{vp.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90">{vp.description}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Servicios Tecnológicos Clave</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service) => (
              <Link key={service.title} href={service.ctaLink || '#'} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent group-hover:text-primary-foreground bg-card group-hover:animate-gradient hover:bg-[length:200%_200%]">
                    <CardHeader className="flex flex-row items-start gap-4">
                        {service.icon}
                        <div>
                        <CardTitle className="text-xl group-hover:text-primary-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{service.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                        {service.details.map(detail => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 mr-2 shrink-0" />
                            {detail}
                            </li>
                        ))}
                        </ul>
                        {service.ctaLink && service.ctaText && (
                          <div className="mt-4 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                              {service.ctaText} <ArrowRight className="ml-1 h-4 w-4"/>
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

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestro Enfoque Colaborativo</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Trabajamos de cerca con usted en cada etapa, desde la idea inicial hasta el soporte continuo, asegurando soluciones que realmente funcionan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ourApproachSteps.map((step) => (
                <Card key={step.title} className="text-center p-6 group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center bg-card hover:animate-gradient hover:bg-[length:200%_200%]">
                {step.icon}
                <CardTitle className="text-lg mt-2 mb-1 group-hover:text-primary-foreground">{step.title}</CardTitle>
                <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/90 flex-grow">{step.description}</p>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-card shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Tecnologías y Plataformas que Dominamos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Utilizamos un stack tecnológico moderno y flexible para construir soluciones robustas, escalables y seguras, adaptadas a los desafíos de su industria.
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
              <Card key={study.title} className="overflow-hidden group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col bg-card hover:animate-gradient hover:bg-[length:200%_200%]">
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
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Desafío:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Solución PLES TIC:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                        <Link href="/forms?subject=Mas%20Informacion%20Caso%20Estudio%20TIC">
                            <span className="flex items-center">
                                Conocer Más <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
        
      <section className="w-full py-20 bg-secondary">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Suites de Software</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Soluciones integrales diseñadas para los sectores privado y público, unificando operaciones para una mayor eficiencia y una toma de decisiones más inteligente.
          </p>
        </div>

        <Tabs defaultValue="ofi-ples" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto h-auto">
            <TabsTrigger value="ofi-ples" className="py-2.5 text-base">Suite Empresarial: Ofi-Ples</TabsTrigger>
            <TabsTrigger value="gob-ples" className="py-2.5 text-base">Suite Gubernamental: Gob-Ples</TabsTrigger>
            <TabsTrigger value="cegob" className="py-2.5 text-base">Suite Educativa: CEGOB</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ofi-ples" className="bg-card py-8 mt-2">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground">Ofi-Ples: Aplicaciones para Cada Necesidad</h3>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Una solución integral de ERP y CRM para unificar y automatizar las operaciones de negocio, mejorando la eficiencia y la productividad.</p>
              </div>
              <Accordion type="single" collapsible className="w-full" defaultValue="Ventas">
                {Object.entries(ofiPlesModules).map(([category, modules]) => (
                  <AccordionItem value={category} key={category} className="border-x-0 rounded-none">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 px-4 text-left data-[state=open]:text-primary capitalize">
                      <div className="flex items-center gap-4">
                        {getIconForOfiPlesCategory(category)}
                        <span>{category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-10 pr-4 bg-secondary/50">
                      <ul className="space-y-4">
                        {modules.map(module => (
                          <li key={module.name}>
                            <p className="font-semibold text-foreground">{module.name}</p>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="gob-ples" className="bg-card py-8 mt-2">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground">Gob-Ples: Soluciones para el Sector Público</h3>
                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Plataformas especializadas para responder a las necesidades de entidades territoriales, instituciones educativas y otros organismos del sector público.</p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(gobPlesModules).map(([category, data]) => (
                  <AccordionItem value={category} key={category} className="border-x-0 rounded-none">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 px-4 text-left data-[state=open]:text-primary">
                      <div className="flex items-center gap-4">
                        {data.icon}
                        <span>{category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-10 pr-4 bg-secondary/50 space-y-3">
                      <p className="text-base text-muted-foreground">{data.description}</p>
                      {data.submodules && data.submodules.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Módulos Clave:</h4>
                          <div className="flex flex-wrap gap-2">
                            {data.submodules.map(sub => <Badge key={sub} variant="secondary">{sub}</Badge>)}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="cegob" className="bg-card py-8 mt-2">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground">CEGOB: Control y Excelencia en la Gobernanza Educativa</h3>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Plataforma integral para unificar y simplificar la gestión de las instituciones educativas, permitiendo una administración transparente, eficiente y basada en datos.</p>
                </div>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(cegobModules).map(([category, data]) => (
                  <AccordionItem value={category} key={category} className="border-x-0 rounded-none">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 px-4 text-left data-[state=open]:text-primary">
                      <div className="flex items-center gap-4">
                        {data.icon}
                        <span>{category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-10 pr-4 bg-secondary/50 space-y-3">
                      <p className="text-base text-muted-foreground">{data.description}</p>
                      {data.submodules && data.submodules.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">Funcionalidades:</h4>
                          <div className="flex flex-wrap gap-2">
                            {data.submodules.map(sub => <Badge key={sub} variant="secondary">{sub}</Badge>)}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

        </Tabs>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Rocket className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Impulse su Negocio con la Tecnología del Mañana</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             Descubra cómo las soluciones personalizadas de PLES TIC pueden transformar su organización, optimizar sus operaciones y abrir nuevas oportunidades de crecimiento.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href="/forms?service=ples-tic&subject=Solicitud%20Asesoria%20Tecnologica">
                <span className="flex items-center">
                    Solicitar Asesoría Tecnológica <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

    