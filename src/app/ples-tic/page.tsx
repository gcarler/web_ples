
// src/app/ples-tic/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Cpu, Lightbulb, ShieldCheck, TrendingUp, Code, CloudCog, Lock, BarChartBig, Network, Search, DraftingCompass, KanbanSquare, FlaskConical, GitPullRequestArrow, Rocket, Workflow, Brain, Database, Settings, Server, Shield, Layers, ShoppingBag, ShoppingCart, Cloud, Users, BarChart3, HeartPulse, Building2, Globe, Landmark, Warehouse, Users2, Megaphone, ConciergeBell, Zap, Wrench, ChevronRight } from 'lucide-react';
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

  const ofiPlesCategories = [
    { name: "Sitio web", icon: Globe, apps: [
        { name: "OfiPles Sitio web", type: "Sitio web", description: "Creador de sitios web empresariales" },
        { name: "OfiPles Comercio electrónico", type: "Comercio electrónico", description: "Vende tus productos en línea" },
        { name: "OfiPles Blog", type: "Blog", description: "Publica entradas, anuncios y noticias" },
        { name: "OfiPles Foro", type: "Foro", description: "Gestiona un foro para preguntas frecuentes" },
        { name: "OfiPles eLearning", type: "eLearning", description: "Gestiona y publica tus cursos" },
        { name: "OfiPles Chat en vivo", type: "Chat en vivo", description: "Chatea con los visitantes de tu sitio web" },
    ]},
    { name: "Ventas", icon: TrendingUp, apps: [
        { name: "OfiPles CRM", type: "CRM", description: "Gestiona tus leads y cierra oportunidades" },
        { name: "OfiPles Ventas", type: "Ventas", description: "De cotizaciones a facturas" },
        { name: "OfiPles Punto de venta", type: "Punto de venta", description: "Interfaz de punto de venta para tiendas y restaurantes" },
        { name: "OfiPles Suscripciones", type: "Suscripciones", description: "Facturas recurrentes y renovaciones" },
        { name: "OfiPles Alquiler", type: "Alquiler", description: "Gestiona contratos, entregas y devoluciones" },
    ]},
    { name: "Finanzas", icon: Landmark, apps: [
        { name: "OfiPles Contabilidad", type: "Contabilidad", description: "Gestiona tu contabilidad financiera y analítica" },
        { name: "OfiPles Facturación", type: "Facturación", description: "Facturas y pagos" },
        { name: "OfiPles Gastos", type: "Gastos", description: "Gestiona los gastos de tus empleados" },
        { name: "OfiPles Documentos", type: "Documentos", description: "Gestión de documentos" },
        { name: "OfiPles Tablero de hojas de cálculo", type: "Hojas de cálculo", description: "Documentos y hojas de cálculo" },
        { name: "OfiPles Firma electrónica", type: "Firma electrónica", description: "Firma documentos en línea" },
    ]},
    { name: "Inventario y fabricación", icon: Warehouse, apps: [
        { name: "OfiPles Inventario", type: "Inventario", description: "Gestiona tu inventario y actividades de logística" },
        { name: "OfiPles Manufactura", type: "Manufactura", description: "Órdenes de fabricación y listas de materiales" },
        { name: "OfiPles Gestión del ciclo de vida del producto", type: "Gestión del ciclo de vida del producto", description: "Gestión del ciclo de vida del producto" },
        { name: "OfiPles Compra", type: "Compra", description: "Órdenes de compra, licitaciones y contratos" },
        { name: "OfiPles MRP de mantenimiento", type: "Mantenimiento", description: "Monitorea tus equipos y gestiona solicitudes" },
        { name: "OfiPles Calidad", type: "Calidad", description: "Controla la calidad de tus productos" },
    ]},
    { name: "Recursos humanos", icon: Users2, apps: [
        { name: "OfiPles Empleados", type: "Empleados", description: "Centraliza la información de tus empleados" },
        { name: "OfiPles Reclutamiento", type: "Reclutamiento", description: "Monitorea tu flujo de reclutamiento" },
        { name: "OfiPles Tiempo personal", type: "Tiempo personal", description: "Asigna y dale seguimiento a las solicitudes de tiempo personal" },
        { name: "OfiPles Evaluaciones", type: "Evaluaciones", description: "Evalúa a tus empleados" },
        { name: "OfiPles Recomendación de empleados", type: "Referencias", description: "Comparte puestos de trabajo y refiere a tus amigos" },
        { name: "OfiPles Flota", type: "Flota", description: "Gestiona tu flota y monitorea el costo de tus vehículos" },
    ]},
    { name: "Marketing", icon: Megaphone, apps: [
        { name: "OfiPles Automatización de marketing", type: "Automatización de marketing", description: "Elabora campañas de correo automatizadas" },
        { name: "OfiPles Marketing por correo electrónico", type: "Marketing por correo electrónico", description: "Diseña, envía y monitorea correos electrónicos" },
        { name: "OfiPles Marketing por SMS", type: "Marketing por SMS", description: "Diseña, envía y monitorea SMS" },
        { name: "OfiPles Marketing social", type: "Marketing social", description: "Gestiona tus redes sociales y los visitantes de tu sitio web" },
        { name: "OfiPles Organización de eventos", type: "Eventos", description: "Publica eventos y vende boletos" },
        { name: "OfiPles Encuesta", type: "Encuesta", description: "Envía tus encuestas o compártelas en un evento en vivo" },
    ]},
    { name: "Servicios", icon: ConciergeBell, apps: [
        { name: "OfiPles Proyecto", type: "Proyecto", description: "Organiza y planea tus proyectos" },
        { name: "OfiPles Hojas de horas", type: "Hojas de horas", description: "Monitorea el tiempo que los empleados invierten en tareas" },
        { name: "OfiPles Servicio externo", type: "Servicio externo", description: "Programa y monitorea operaciones externas, el tiempo y el material" },
        { name: "OfiPles Soporte al cliente", type: "Soporte al cliente", description: "Monitorea, prioritiza y soluciona los tickets de tus clientes" },
        { name: "OfiPles Planeación", type: "Planeación", description: "Gestiona el horario de tus empleados" },
        { name: "OfiPles Citas", type: "Citas", description: "Permite que otras personas agenden reuniones contigo" },
    ]},
    { name: "Productividad", icon: Zap, apps: [
        { name: "OfiPles Conversaciones", type: "Conversaciones", description: "Chat, pasarela de correos electrónicos y canales privados" },
        { name: "OfiPles Aprobaciones", type: "Aprobaciones", description: "Crea y valida solicitudes de aprobación" },
        { name: "OfiPles Internet de las cosas", type: "Internet de las cosas", description: "Modelos básicos y asistentes para IoT" },
        { name: "OfiPles VOIP", type: "VOIP", description: "Haz y recibe llamadas" },
        { name: "OfiPles Información", type: "Información", description: "Gestiona tu biblioteca de información" },
    ]},
    { name: "Personalización", icon: Wrench, apps: [
        { name: "OfiPles Studio", type: "Studio", description: "Crea y personaliza tus propias aplicaciones" },
    ]},
  ];

  const ofiGobDimensions = [
    { name: "Dashboard Principal", purpose: "Ofrece una vista ejecutiva y consolidada de los indicadores más importantes de todas las dimensiones.", submodules: ["No tiene submódulos, es la página de inicio que presenta KPIs (Indicadores Clave de Gestión), gráficos de resumen y alertas importantes."] },
    { name: "Talento Humano (TH)", purpose: "El módulo más desarrollado. Centrado en el ciclo de vida completo del servidor público, desde su atracción hasta su desarrollo y retiro.", submodules: ["Dashboard GETH: Panel principal con indicadores clave de Talento Humano (total de servidores, vacantes, clima laboral, etc.).", "Ciclo de Vida del Servidor: Gestiona la creación de vacantes (con asistencia de IA), el reclutamiento, y los procesos de onboarding y offboarding.", "Desarrollo y Gestión: Administra los perfiles detallados de los empleados, el catálogo de competencias, y la creación y seguimiento de programas de capacitación.", "Desempeño y Bienestar: Permite la gestión del ciclo de evaluación del desempeño, la creación de planes de mejora (PIPs), y la administración de encuestas de clima y recursos de bienestar.", "Cumplimiento y Estrategia: Herramientas para el seguimiento de normativas (ej. Ley de Jóvenes) y la gestión de programas estratégicos como 'Servimos'."] },
    { name: "Direccionamiento Estratégico y Planeación (DE&P)", purpose: "Define la hoja de ruta de la entidad, desde la misión y visión hasta los planes operativos.", submodules: ["Dashboard Estratégico: Vista general del estado de los planes y objetivos.", "Objetivos Estratégicos: Permite la creación y seguimiento de los objetivos de alto nivel, con asistencia de IA para generar borradores.", "Planes Institucionales: Gestión de los planes estratégicos y de acción de la entidad.", "Planes de Trabajo: Desglose de los planes estratégicos en planes de trabajo operativos con tareas específicas.", "Análisis DOFA: Herramienta para realizar análisis de Fortalezas, Oportunidades, Debilidades y Amenazas."] },
    { name: "Gestión con Valores para Resultados (GVR)", purpose: "Asegura que la operación diaria se realice con eficiencia, transparencia y orientada al ciudadano.", submodules: ["Dashboard Gestión y Valores: Panel con los principales indicadores del módulo.", "Procesos Internos: Permite modelar, documentar y optimizar los procesos de la entidad.", "Gestión de PQR: Administra las Peticiones, Quejas, Reclamos y Sugerencias, con IA para redactar borradores de respuesta.", "Gestión de Riesgos Operacionales: Identifica, evalúa y gestiona los riesgos de los procesos.", "Gestión de Proveedores: Registro y evaluación del desempeño de proveedores.", "Cumplimiento Normativo: Seguimiento a la aplicación de normativas en la operación."] },
    { name: "Evaluación de Resultados (ER)", purpose: "Monitorea el desempeño de la entidad para asegurar el cumplimiento de metas y facilitar la mejora continua.", submodules: ["Dashboard Evaluación: Resumen del estado de los indicadores y autoevaluaciones.", "Indicadores de Desempeño: Define, gestiona y visualiza los KPIs de la entidad.", "Autoevaluaciones: Registra y gestiona las autoevaluaciones de políticas y procesos.", "Generación de Informes: Asistente de IA para ayudar a redactar secciones de informes de gestión (ej. FURAG)."] },
    { name: "Información y Comunicación (I&C)", purpose: "Centraliza la gestión de la información y los canales de comunicación.", submodules: ["Dashboard Info & Comms: Vista general de la actividad documental y comunicados.", "Gestión Documental: Repositorio central de documentos con control de versiones y resumen por IA.", "Comunicación Interna: Gestión de boletines y comunicados para los servidores públicos."] },
    { name: "Gestión del Conocimiento y la Innovación (GCI)", purpose: "Fomenta una cultura de aprendizaje, mejora continua e innovación.", submodules: ["Dashboard Conocimiento: Resumen de la actividad de gestión del conocimiento.", "Repositorio de Conocimiento: Gestiona lecciones aprendidas, buenas prácticas y documentos clave.", "Iniciativas de Innovación: Registra y da seguimiento a las ideas y proyectos de innovación.", "Acciones de Mejora: Administra las acciones correctivas y preventivas."] },
    { name: "Control Interno (CI)", purpose: "Asegura el cumplimiento, la gestión de riesgos y la eficacia del Sistema de Control Interno (SCI).", submodules: ["Dashboard Control Interno: Panel principal con información relevante de CI.", "Gestión de Auditorías: Planifica y gestiona las auditorías internas y externas, y sus hallazgos.", "Riesgos (Control Interno): Gestiona los riesgos específicos que afectan al sistema de control.", "Matriz de Cumplimiento: Administra la matriz de cumplimiento de controles y normativas internas.", "Autoevaluaciones SCI: Permite realizar las autoevaluaciones de los componentes del MECI."] },
    { name: "Administración del Sistema", purpose: "Módulo para la configuración y mantenimiento de la plataforma.", submodules: ["Dashboard Admin: Resumen de la actividad del sistema.", "Gestión de Usuarios: Permite crear, editar y administrar los usuarios de la plataforma.", "Gestión de Roles: Permite definir los roles y los permisos asociados a cada uno."] }
  ];

  const cegobModules = [
    { name: "PEI / Inicio (Proyecto Educativo Institucional)", description: "Es el corazón de la plataforma, donde se define la identidad y el rumbo de la institución.", submodules: ["Resumen PEI: Permite gestionar las diferentes versiones del documento PEI, así como sus secciones principales: Identidad Institucional (misión, visión, valores), Componente Pedagógico, Componente Organizacional, Componente Comunitario.", "Objetivos Estratégicos: Define y gestiona los grandes objetivos que guían a la institución.", "Socialización: Administra los anuncios y comunicados relacionados con el PEI."] },
    { name: "SIE (Sistema Institucional de Evaluación)", description: "Módulo dedicado a la gestión de la evaluación de los estudiantes.", submodules: ["Gestión Integral SIE: Un panel central para: Configurar los criterios de evaluación, Definir la escala de valoración nacional y sus equivalencias, Registrar las calificaciones de los estudiantes, Generar boletines y una matriz de calificaciones para análisis.", "Rejilla de Autoevaluación del SIEE: Una herramienta para revisar el propio sistema de evaluación de la institución, basado en directrices oficiales, y que permite iniciar Planes de Mejoramiento (PMI) directamente desde los hallazgos."] },
    { name: "Autoevaluación", description: "Permite a la institución diagnosticar su estado actual en diferentes áreas.", submodules: ["Dashboard de Autoevaluación: Panel principal para gestionar los procesos de autoevaluación, definir indicadores y visualizar resultados en gráficos (radar, barras, circular) y matrices de resumen.", "Tabla de Indicadores: Una vista detallada de todos los indicadores para facilitar su gestión.", "Comparativa de Procesos: Permite comparar los resultados de diferentes periodos de autoevaluación para medir el progreso."] },
    { name: "Evaluaciones Externas", description: "Módulo para analizar los resultados de pruebas estandarizadas (como las Pruebas Saber).", submodules: ["Carga de Resultados: Permite subir los datos de los resultados de las pruebas.", "Análisis Institucional: Visualiza el desempeño histórico y por áreas de una sola institución.", "Análisis Comparativo: Compara el rendimiento entre diferentes instituciones, permitiendo filtrar por municipio, sector, etc."] },
    { name: "PMI (Plan de Mejoramiento Institucional)", description: "Herramienta para crear, gestionar y seguir los proyectos que surgen de la autoevaluación.", submodules: ["Proyectos PMI: Vista principal para ver y editar los planes de mejoramiento, incluyendo sus objetivos, actividades y recursos.", "Cronograma General: Un diagrama de Gantt que muestra la línea de tiempo de todos los proyectos PMI.", "Banco de Prácticas: Un repositorio para registrar y consultar buenas prácticas y lecciones aprendidas."] },
    { name: "Proyectos Transversales", description: "Gestiona los proyectos educativos que atraviesan el currículo (Ambiental, Paz, Sexualidad, etc.).", submodules: ["Listado de Proyectos: Permite administrar los proyectos, sus objetivos y su plan de acción.", "Matriz de Impacto: Muestra cómo cada proyecto transversal se relaciona con las diferentes áreas de gestión institucional."] },
    { name: "Formación Docente", description: "Organiza el desarrollo profesional del equipo docente.", submodules: ["Plan y Necesidades: Permite diagnosticar las necesidades de formación y construir el plan para abordarlas.", "Calendario de Formaciones: Muestra las actividades de formación programadas en una vista de calendario.", "Reporte de Necesidades: Genera un informe consolidado de las necesidades de formación detectadas."] },
    { name: "Autorización Institucional", description: "Módulo para el seguimiento de licencias y requisitos legales.", submodules: ["Licencias Actuales: Gestiona las licencias de funcionamiento y otras autorizaciones, junto con sus requisitos de renovación.", "Historial de Vencimientos: Una vista para consultar licencias pasadas o próximas a vencer.", "Requisitos Pendientes: Un panel de control para dar seguimiento específico a los requisitos que aún no se han completado."] },
    { name: "Administración", description: "Panel de control para la configuración del sistema.", submodules: ["Gestión de Usuarios: Administra los usuarios, roles y permisos de la plataforma. Ofrece múltiples vistas (lista, kanban, gráficos) para analizar la información de los usuarios.", "Configuración Institucional: Permite editar los datos generales de la institución (nombre, logo, etc.) y gestionar los periodos académicos.", "Registros del Sistema: Una bitácora de auditoría para ver los eventos importantes que ocurren en la plataforma.", "Configuraciones Globales: Permite ajustar parámetros que afectan a toda la aplicación, como la seguridad, el mantenimiento y las integraciones externas."] }
  ];


  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            {/* Left Visual Part */}
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

            {/* Right Text Part */}
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
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent group-hover:text-primary-foreground bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
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
        
      <section className="py-16 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Suites de Software Empresarial</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Soluciones integrales y modulares diseñadas para transformar la gestión en los sectores privado, público y educativo.
          </p>

          <Tabs defaultValue="ofi-ples" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="ofi-ples" className="py-3 text-base">OFI-PLES</TabsTrigger>
              <TabsTrigger value="ofi-gob" className="py-3 text-base">OFI-GOB</TabsTrigger>
              <TabsTrigger value="cegob" className="py-3 text-base">CEGOB</TabsTrigger>
            </TabsList>

            <TabsContent value="ofi-ples">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">OFI-PLES: Aplicaciones para Cada Necesidad</CardTitle>
                  <CardDescription>Una suite completa de aplicaciones empresariales integradas para optimizar cada aspecto de su negocio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full space-y-2">
                    {ofiPlesCategories.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                      <AccordionItem key={category.name} value={category.name} className="border-b-0">
                        <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-3 text-lg font-semibold hover:no-underline">
                          <div className="flex items-center gap-3">
                             <CategoryIcon className="h-6 w-6 text-primary"/>
                             {category.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-background rounded-b-md border">
                            {category.apps.map(app => (
                               <Card key={app.name} className="bg-card hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardDescription className="font-medium text-primary">{app.type}</CardDescription>
                                    <CardTitle className="text-lg">{app.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{app.description}</p>
                                </CardContent>
                               </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )})}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ofi-gob">
                <Card className="border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">OFI-GOB: Suite para la Gestión Pública</CardTitle>
                        <CardDescription>Una suite integral que integra y gestiona las dimensiones del Modelo Integrado de Planeación y Gestión (MIPG).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {ofiGobDimensions.map(dim => (
                                <AccordionItem key={dim.name} value={dim.name} className="border-b-0">
                                    <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-3 text-lg font-semibold hover:no-underline text-left">
                                        {dim.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <div className="p-4 bg-background rounded-b-md border space-y-3">
                                            <p className="text-muted-foreground"><strong className="text-foreground">Propósito:</strong> {dim.purpose}</p>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">Submódulos:</h4>
                                                <ul className="space-y-2">
                                                {dim.submodules.map((sub, index) => (
                                                    <li key={index} className="flex items-start text-sm">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 mr-2 text-primary shrink-0"/>
                                                        <span className="text-muted-foreground">{sub}</span>
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="cegob">
               <Card className="border-primary/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">CEGOB: Control y Excelencia en la Gobernanza Educativa</CardTitle>
                        <CardDescription>Una plataforma integral diseñada para unificar y simplificar la gestión de las instituciones educativas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {cegobModules.map(mod => (
                                <AccordionItem key={mod.name} value={mod.name} className="border-b-0">
                                    <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-3 text-lg font-semibold hover:no-underline text-left">
                                        {mod.name}
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <div className="p-4 bg-background rounded-b-md border space-y-3">
                                            <p className="text-muted-foreground">{mod.description}</p>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">Funcionalidades:</h4>
                                                <ul className="space-y-2">
                                                {mod.submodules.map((sub, index) => (
                                                    <li key={index} className="flex items-start text-sm">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 mr-2 text-primary shrink-0"/>
                                                        <span className="text-muted-foreground">{sub}</span>
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
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
