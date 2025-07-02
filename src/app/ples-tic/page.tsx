// src/app/ples-tic/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Cpu, Lightbulb, ShieldCheck, TrendingUp, Code, CloudCog, Lock, BarChartBig, Network, Search, DraftingCompass, KanbanSquare, FlaskConical, GitPullRequestArrow, Rocket, Workflow, Brain, Database, Settings, Server, Shield, Layers, ShoppingCart, Cloud, Users, HeartPulse, Building2, Globe, Landmark, Warehouse, Users2, Megaphone, ConciergeBell, Zap, Wrench, Briefcase, Map, School, FileArchive, Info, LayoutDashboard, Target, ShieldAlert, FileSearch, ExternalLink, GitMerge, FileCheck, BookOpen, ClipboardCheck, BrainCircuit, ShoppingBag, BarChart3, MousePointerClick, LayoutTemplate, MonitorSmartphone
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PlexusIllustration from '@/components/illustrations/PlexusIllustration';
import DataPipelineIllustration from '@/components/illustrations/DataPipelineIllustration';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
    { icon: <GitPullRequestArrow className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />, title: 'Soporte y Evolución Continua', description: 'Ofrecemos soporte post-implementación y planes de mantenimiento continuo.' },
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
    "Sitio Web": {
        icon: Globe,
        description: "Herramientas para construir y gestionar su presencia en línea de manera integral.",
        items: [
          { name: "OfiPles Sitio web", description: "Creador de sitios web empresariales", details: {
              mainIcon: Globe,
              title: 'OfiPles Sitio Web',
              description: 'Su plataforma todo-en-uno para crear, lanzar y gestionar sitios web empresariales de alto impacto. Sin necesidad de código, con resultados profesionales.',
              keyServices: [
                { title: 'Editor Visual Intuitivo', text: 'Diseñe y modifique páginas con un potente sistema de arrastrar y soltar. Vea los cambios en tiempo real y construya su sitio de forma visual.', icon: MousePointerClick },
                { title: 'Plantillas Profesionales', text: 'Comience con buen pie eligiendo entre una amplia variedad de plantillas diseñadas por expertos y totalmente personalizables.', icon: LayoutTemplate },
                { title: 'Diseño 100% Adaptable', text: 'Asegure que su sitio web se vea y funcione a la perfección en cualquier dispositivo: móviles, tabletas y computadoras de escritorio.', icon: MonitorSmartphone },
                { title: 'Herramientas SEO Integradas', text: 'Optimice su sitio para los motores de búsqueda con nuestras herramientas integradas para gestionar títulos, metadescripciones, sitemaps y más.', icon: Rocket },
              ],
              benefits: [
                'Lance su sitio web profesional en tiempo récord.',
                'Total autonomía para actualizar y gestionar su contenido sin depender de terceros.',
                'Mejore su posicionamiento en Google y atraiga más clientes.',
                'Proyecte una imagen de marca sólida, profesional y confiable.',
                'Integración nativa con otros módulos de OfiPles como Blog, Tienda y CRM.',
              ],
              ctaText: "Empezar a Construir mi Sitio",
              formSubject: "Consulta%20OfiPles%20Sitio%20Web"
            } 
          },
          { name: "OfiPles Comercio electrónico", description: "Vende tus productos en línea", details: { mainIcon: Globe, title: 'OfiPles Comercio electrónico', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Blog", description: "Publica entradas, anuncios y noticias", details: { mainIcon: Globe, title: 'OfiPles Blog', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Foro", description: "Gestiona un foro para preguntas frecuentes", details: { mainIcon: Globe, title: 'OfiPles Foro', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles eLearning", description: "Gestiona y publica tus cursos", details: { mainIcon: Globe, title: 'OfiPles eLearning', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Chat en vivo", description: "Chatea con los visitantes de tu sitio web", details: { mainIcon: Globe, title: 'OfiPles Chat en vivo', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Ventas": {
        icon: ShoppingCart,
        description: "Optimice todo su ciclo de ventas, desde la captación de clientes hasta la facturación final.",
        items: [
          { name: "OfiPles CRM", description: "Gestiona tus leads y cierra oportunidades", details: { mainIcon: ShoppingCart, title: 'OfiPles CRM', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Ventas", description: "De cotizaciones a facturas", details: { mainIcon: ShoppingCart, title: 'OfiPles Ventas', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Punto de venta", description: "Interfaz de punto de venta para tiendas y restaurantes", details: { mainIcon: ShoppingCart, title: 'OfiPles Punto de venta', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Suscripciones", description: "Facturas recurrentes y renovaciones", details: { mainIcon: ShoppingCart, title: 'OfiPles Suscripciones', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Alquiler", description: "Gestiona contratos, entregas y devoluciones", details: { mainIcon: ShoppingCart, title: 'OfiPles Alquiler', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Finanzas": {
        icon: Landmark,
        description: "Controle la salud financiera de su empresa con herramientas contables y de facturación robustas.",
        items: [
          { name: "OfiPles Contabilidad", description: "Gestiona tu contabilidad financiera y analítica", details: { mainIcon: Landmark, title: 'OfiPles Contabilidad', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Facturación", description: "Facturas y pagos", details: { mainIcon: Landmark, title: 'OfiPles Facturación', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Gastos", description: "Gestiona los gastos de tus empleados", details: { mainIcon: Landmark, title: 'OfiPles Gastos', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Documentos", description: "Gestión de documentos", details: { mainIcon: Landmark, title: 'OfiPles Documentos', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Tablero de hojas de cálculo", description: "Documentos y hojas de cálculo", details: { mainIcon: Landmark, title: 'OfiPles Tablero de hojas de cálculo', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Firma electrónica", description: "Firma documentos en línea", details: { mainIcon: Landmark, title: 'OfiPles Firma electrónica', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Inventario y Fabricación": {
        icon: Warehouse,
        description: "Gestione eficientemente su cadena de suministro, producción y control de calidad.",
        items: [
          { name: "OfiPles Inventario", description: "Gestiona tu inventario y actividades de logística", details: { mainIcon: Warehouse, title: 'OfiPles Inventario', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Manufactura", description: "Órdenes de fabricación y listas de materiales", details: { mainIcon: Warehouse, title: 'OfiPles Manufactura', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Gestión del ciclo de vida del producto", description: "Gestión del ciclo de vida del producto", details: { mainIcon: Warehouse, title: 'OfiPles Gestión del ciclo de vida del producto', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Compra", description: "Órdenes de compra, licitaciones y contratos", details: { mainIcon: Warehouse, title: 'OfiPles Compra', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles MRP de mantenimiento", description: "Monitorea tus equipos y gestiona solicitudes", details: { mainIcon: Warehouse, title: 'OfiPles MRP de mantenimiento', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Calidad", description: "Controla la calidad de tus productos", details: { mainIcon: Warehouse, title: 'OfiPles Calidad', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Recursos Humanos": {
        icon: Users2,
        description: "Administre el ciclo de vida completo de sus empleados, desde la contratación hasta la evaluación.",
        items: [
          { name: "OfiPles Empleados", description: "Centraliza la información de tus empleados", details: { mainIcon: Users2, title: 'OfiPles Empleados', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Reclutamiento", description: "Monitorea tu flujo de reclutamiento", details: { mainIcon: Users2, title: 'OfiPles Reclutamiento', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Tiempo personal", description: "Asigna y dale seguimiento a las solicitudes de tiempo personal", details: { mainIcon: Users2, title: 'OfiPles Tiempo personal', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Evaluaciones", description: "Evalúa a tus empleados", details: { mainIcon: Users2, title: 'OfiPles Evaluaciones', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Recomendación de empleados", description: "Comparte puestos de trabajo y refiere a tus amigos", details: { mainIcon: Users2, title: 'OfiPles Recomendación de empleados', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Flota", description: "Gestiona tu flota y monitorea el costo de tus vehículos", details: { mainIcon: Users2, title: 'OfiPles Flota', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Marketing": {
        icon: Megaphone,
        description: "Cree, automatice y mida sus campañas de marketing para llegar a su público objetivo.",
        items: [
          { name: "OfiPles Automatización de marketing", description: "Elabora campañas de correo automatizadas", details: { mainIcon: Megaphone, title: 'OfiPles Automatización de marketing', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Marketing por correo electrónico", description: "Diseña, envía y monitorea correos electrónicos", details: { mainIcon: Megaphone, title: 'OfiPles Marketing por correo electrónico', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Marketing por SMS", description: "Diseña, envía y monitorea SMS", details: { mainIcon: Megaphone, title: 'OfiPles Marketing por SMS', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Marketing social", description: "Gestiona tus redes sociales y los visitantes de tu sitio web", details: { mainIcon: Megaphone, title: 'OfiPles Marketing social', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Organización de eventos", description: "Publica eventos y vende boletos", details: { mainIcon: Megaphone, title: 'OfiPles Organización de eventos', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Encuesta", description: "Envía tus encuestas o compártelas en un evento en vivo", details: { mainIcon: Megaphone, title: 'OfiPles Encuesta', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Servicios": {
        icon: ConciergeBell,
        description: "Gestione proyectos, soporte y servicios de campo con herramientas diseñadas para la eficiencia.",
        items: [
          { name: "OfiPles Proyecto", description: "Organiza y planea tus proyectos", details: { mainIcon: ConciergeBell, title: 'OfiPles Proyecto', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Hojas de horas", description: "Monitorea el tiempo que los empleados invierten en tareas", details: { mainIcon: ConciergeBell, title: 'OfiPles Hojas de horas', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Servicio externo", description: "Programa y monitorea operaciones externas, el tiempo y el material", details: { mainIcon: ConciergeBell, title: 'OfiPles Servicio externo', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Soporte al cliente", description: "Monitorea, prioritiza y soluciona los tickets de tus clientes", details: { mainIcon: ConciergeBell, title: 'OfiPles Soporte al cliente', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Planeación", description: "Gestiona el horario de tus empleados", details: { mainIcon: ConciergeBell, title: 'OfiPles Planeación', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Citas", description: "Permite que otras personas agenden reuniones contigo", details: { mainIcon: ConciergeBell, title: 'OfiPles Citas', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Productividad": {
        icon: Zap,
        description: "Herramientas para mejorar la comunicación interna y la productividad del equipo.",
        items: [
          { name: "OfiPles Conversaciones", description: "Chat, pasarela de correos electrónicos y canales privados", details: { mainIcon: Zap, title: 'OfiPles Conversaciones', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Aprobaciones", description: "Crea y valida solicitudes de aprobación", details: { mainIcon: Zap, title: 'OfiPles Aprobaciones', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Internet de las cosas", description: "Modelos básicos y asistentes para IoT", details: { mainIcon: Zap, title: 'OfiPles Internet de las cosas', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles VOIP", description: "Haz y recibe llamadas", details: { mainIcon: Zap, title: 'OfiPles VOIP', description: 'Placeholder description.', keyServices: [], benefits: []} },
          { name: "OfiPles Información", description: "Gestiona tu biblioteca de información", details: { mainIcon: Zap, title: 'OfiPles Información', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "Personalización": {
        icon: Wrench,
        description: "Adapte y extienda la plataforma para que se ajuste perfectamente a sus flujos de trabajo únicos.",
        items: [
          { name: "OfiPles Studio", description: "Crea y personaliza tus propias aplicaciones", details: { mainIcon: Wrench, title: 'OfiPles Studio', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    }
};

const gobPlesModules = {
    "CatastroGob": {
        icon: Map,
        description: "Software integral para la gestión catastral con enfoque multipropósito.",
        items: [
            { name: "Administración de Trámites", description: "Formación, actualización y conservación.", details: { mainIcon: Map, title: 'Administración de Trámites', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Módulo SIG", description: "Análisis espacial y visualización.", details: { mainIcon: Map, title: 'Módulo SIG', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Gestión Física y Jurídica", description: "Control completo de cada predio.", details: { mainIcon: Map, title: 'Gestión Física y Jurídica', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "SiatGob": {
        icon: Briefcase,
        description: "Solución avanzada para la administración del territorio a nivel municipal.",
        items: [
            { name: "Ordenamiento Territorial", description: "Gestión de licencias y seguimiento.", details: { mainIcon: Briefcase, title: 'Ordenamiento Territorial', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Administración de la Propiedad", description: "Inventario de predios rurales, urbanos y fiscales.", details: { mainIcon: Briefcase, title: 'Administración de la Propiedad', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Fortalecimiento Fiscal", description: "Herramientas de valorización.", details: { mainIcon: Briefcase, title: 'Fortalecimiento Fiscal', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Planificación y Desarrollo", description: "Monitoreo del crecimiento.", details: { mainIcon: Briefcase, title: 'Planificación y Desarrollo', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Recursos Naturales y Riesgos", description: "Identificación de zonas de riesgo.", details: { mainIcon: Briefcase, title: 'Recursos Naturales y Riesgos', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
     "OfiGob": {
        icon: LayoutDashboard,
        description: "Suite que integra y gestiona las dimensiones del Modelo Integrado de Planeación y Gestión (MIPG).",
        items: [
            { name: "Talento Humano", description: "Gestión del ciclo de vida del servidor.", details: { mainIcon: LayoutDashboard, title: 'Talento Humano', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Direccionamiento Estratégico", description: "Planes y seguimiento de metas.", details: { mainIcon: LayoutDashboard, title: 'Direccionamiento Estratégico', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Gestión con Valores", description: "Transparencia y servicio al ciudadano.", details: { mainIcon: LayoutDashboard, title: 'Gestión con Valores', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Evaluación de Resultados", description: "Indicadores y reportes de gestión.", details: { mainIcon: LayoutDashboard, title: 'Evaluación de Resultados', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Gestión del Conocimiento", description: "Captura y difusión de conocimiento.", details: { mainIcon: LayoutDashboard, title: 'Gestión del Conocimiento', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Control Interno", description: "Mecanismos de control y auditoría.", details: { mainIcon: LayoutDashboard, title: 'Control Interno', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "PaeGob": {
        icon: School,
        description: "Solución tecnológica para optimizar la gestión y supervisión del Programa de Alimentación Escolar (PAE).",
        items: [
            { name: "Gestión de Instituciones", description: "Manejo de sedes y rectores.", details: { mainIcon: School, title: 'Gestión de Instituciones', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Gestión de Beneficiarios", description: "Focalización de estudiantes.", details: { mainIcon: School, title: 'Gestión de Beneficiarios', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Reportes y Seguimiento", description: "Informes diarios y mensuales.", details: { mainIcon: School, title: 'Reportes y Seguimiento', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Validación de Entregas", description: "Control con firma digital.", details: { mainIcon: School, title: 'Validación de Entregas', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "EduGob": {
        icon: BookOpen,
        description: "Plataforma enfocada en la gestión escolar y académica del día a día.",
        items: [
            { name: "Gestión Académica", description: "Carreras, cursos, calificaciones.", details: { mainIcon: BookOpen, title: 'Gestión Académica', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Gestión Administrativa", description: "Convocatorias, certificados, carnets.", details: { mainIcon: BookOpen, title: 'Gestión Administrativa', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Bienestar Estudiantil", description: "Seguimiento físico, mental y social.", details: { mainIcon: BookOpen, title: 'Bienestar Estudiantil', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Desarrollo Profesional", description: "Gestión de hojas de vida.", details: { mainIcon: BookOpen, title: 'Desarrollo Profesional', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Analítica", description: "Reportes de rendimiento y egresados.", details: { mainIcon: BookOpen, title: 'Analítica', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "GeGob": {
        icon: BrainCircuit,
        description: "Plataforma de alto nivel para la gobernanza y la mejora continua del sistema educativo.",
        items: [
            { name: "Tablero Principal (Dashboard)", description: "KPIs, mapas de calor y alertas críticas.", details: { mainIcon: BrainCircuit, title: 'Tablero Principal (Dashboard)', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "PEI (Proyecto Educativo Institucional)", description: "Gestión estratégica y seguimiento.", details: { mainIcon: BrainCircuit, title: 'PEI (Proyecto Educativo Institucional)', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "SIE (Sistema Institucional de Evaluación)", description: "Gestión de calificaciones y autoevaluación.", details: { mainIcon: BrainCircuit, title: 'SIE (Sistema Institucional de Evaluación)', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Autoevaluación y PMI", description: "Diagnóstico y planes de mejoramiento.", details: { mainIcon: BrainCircuit, title: 'Autoevaluación y PMI', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Evaluaciones Externas", description: "Análisis de Pruebas Saber y comparativas.", details: { mainIcon: BrainCircuit, title: 'Evaluaciones Externas', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Módulos de Apoyo", description: "Proyectos transversales y formación.", details: { mainIcon: BrainCircuit, title: 'Módulos de Apoyo', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Administración del Sistema", description: "Gestión de usuarios y auditoría.", details: { mainIcon: BrainCircuit, title: 'Administración del Sistema', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
     "GestorDoc": {
        icon: FileArchive,
        description: "Solución completa de gestión documental que cumple con la Ley 594 de 2000.",
        items: [
            { name: "Tablas de Retención Documental", description: "Creación y gestión de TRD.", details: { mainIcon: FileArchive, title: 'Tablas de Retención Documental', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Flujos de Trabajo Seguros", description: "Automatización de procesos documentales.", details: { mainIcon: FileArchive, title: 'Flujos de Trabajo Seguros', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Consultas Virtuales", description: "Acceso controlado a documentos.", details: { mainIcon: FileArchive, title: 'Consultas Virtuales', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Identificadores Únicos (FUID)", description: "Trazabilidad completa del documento.", details: { mainIcon: FileArchive, title: 'Identificadores Únicos (FUID)', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    },
    "InfoGob": {
        icon: Info,
        description: "Plataforma enfocada en la transparencia y la rendición de cuentas para la gestión de proyectos.",
        items: [
            { name: "Gestión de Proyectos", description: "Control de objetivos y financiamiento.", details: { mainIcon: Info, title: 'Gestión de Proyectos', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Seguimiento y Monitoreo", description: "Visualización de avances y resultados.", details: { mainIcon: Info, title: 'Seguimiento y Monitoreo', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Participación Ciudadana", description: "Foros y chats para la comunidad.", details: { mainIcon: Info, title: 'Participación Ciudadana', description: 'Placeholder description.', keyServices: [], benefits: []} },
            { name: "Módulo SIG", description: "Visualización geoespacial de datos.", details: { mainIcon: Info, title: 'Módulo SIG', description: 'Placeholder description.', keyServices: [], benefits: []} }
        ]
    }
};

function InteractiveSoftwareSuites() {
    const [activeTab, setActiveTab] = useState('empresarial');
    const [selectedModuleKey, setSelectedModuleKey] = useState(Object.keys(ofiPlesModules)[0]);
    const [selectedSubModule, setSelectedSubModule] = React.useState<any | null>(null);

    const handleModuleSelection = (key: string) => {
        setSelectedModuleKey(key);
        setSelectedSubModule(null); // Reset detail view when category changes
    };

    const handleSubModuleClick = (module: any) => {
        setSelectedSubModule(module);
    };

    const currentModules = activeTab === 'empresarial' ? ofiPlesModules : gobPlesModules;
    const currentDescription = activeTab === 'empresarial' 
        ? "Esta línea de productos está concebida como una solución integral de Planificación de Recursos Empresariales (ERP) y Gestión de Relaciones con el Cliente (CRM) dirigida al sector privado. El objetivo principal de Ofi-Ples es unificar y automatizar las operaciones de negocio para mejorar la eficiencia, la productividad y la toma de decisiones."
        : "Gob-Ples es la línea más diversificada y especializada de PLES-TIC, compuesta por un conjunto de plataformas diseñadas para responder a las necesidades específicas de entidades territoriales, instituciones educativas y otros organismos del sector público en Colombia. Cada software de Gob-Ples está construido para resolver problemáticas concretas de la administración pública.";

    useEffect(() => {
        if (activeTab === 'empresarial') {
            setSelectedModuleKey(Object.keys(ofiPlesModules)[0]);
        } else {
            setSelectedModuleKey(Object.keys(gobPlesModules)[0]);
        }
        setSelectedSubModule(null); // Reset detail view on tab change
    }, [activeTab]);

    const RenderDetailView = ({ module, onBack }: { module: any, onBack: () => void }) => {
        const { details } = module;
        const MainIcon = details.mainIcon || Globe;
        return (
            <div className="animate-fade-in-up">
                <Button variant="ghost" onClick={onBack} className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a los módulos
                </Button>
                <section className="text-center mb-12">
                    <div className="inline-block p-4 bg-primary/10 rounded-lg mb-6">
                        <MainIcon className="h-16 w-16 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4">
                        {details.title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {details.description}
                    </p>
                </section>

                {details.keyServices && details.keyServices.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Funcionalidades Clave</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {details.keyServices.map((service: any) => {
                                const ServiceIcon = service.icon;
                                return (
                                    <Card key={service.title} className="p-6 group transition-shadow duration-300 hover:shadow-lg">
                                        <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                            <ServiceIcon className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
                                            <CardTitle className="text-lg font-semibold mb-2">{service.title}</CardTitle>
                                            <CardDescription className="text-sm">{service.text}</CardDescription>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </section>
                )}

                {details.benefits && details.benefits.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Beneficios Principales</h2>
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
                 <section className="text-center">
                    <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
                        <Link href={`/forms?subject=${details.formSubject}`}>
                        <span className="flex items-center">
                            {details.ctaText || 'Solicitar Información'} <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                        </Link>
                    </Button>
                </section>
            </div>
        );
    };

    return (
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Dos Grandes Suites de Software</h2>
        </div>
        
        <div className="w-full">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto h-auto mb-8">
                    <TabsTrigger value="empresarial" className="py-2 text-base">Suite Empresarial</TabsTrigger>
                    <TabsTrigger value="gubernamental" className="py-2 text-base">Suite Gubernamental</TabsTrigger>
                </TabsList>
                
                <Card className="shadow-lg border bg-card w-full">
                     <div className="text-center p-6 md:p-8 border-b">
                        <h3 className="text-2xl font-bold text-foreground">{activeTab === 'empresarial' ? 'Ofi-Ples' : 'Gob-Ples'}</h3>
                        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">{currentDescription}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-0 min-h-[600px]">
                        <aside className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-border bg-card">
                            <nav className="flex flex-col p-2">
                                {Object.entries(currentModules).map(([category, data]:[string, any]) => {
                                    const Icon = data.icon;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => handleModuleSelection(category)}
                                            className={cn(
                                                "flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                                selectedModuleKey === category
                                                    ? "text-primary bg-primary/10"
                                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                            )}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />
                                            <span className="truncate">{category}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </aside>
                        <main className="flex-1 bg-muted/20 dark:bg-black/20 p-6 md:p-8">
                            {selectedSubModule ? (
                                <RenderDetailView module={selectedSubModule} onBack={() => setSelectedSubModule(null)} />
                            ) : (
                                (currentModules[selectedModuleKey]) ? (
                                <div className="animate-fade-in-up">
                                    <h4 className="text-xl font-semibold text-foreground mb-1">{selectedModuleKey}</h4>
                                    <p className="text-muted-foreground mb-6 text-sm">{currentModules[selectedModuleKey].description}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {currentModules[selectedModuleKey].items.map((module: any) => (
                                            <Card 
                                                key={module.name} 
                                                onClick={() => handleSubModuleClick(module)}
                                                className="h-full p-4 transition-all duration-300 ease-in-out group hover:shadow-lg hover:border-primary hover:scale-105 cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between">
                                                  <p className="font-semibold text-foreground group-hover:text-primary">{module.name}</p>
                                                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                                ) : <p>Seleccione un módulo para ver sus detalles.</p>
                            )}
                        </main>
                    </div>
                </Card>
            </Tabs>
        </div>
      </section>
    );
}

export default function PlesTicPage() {

  return (
    <div className="space-y-0">
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

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="w-full py-16">
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

      <section className="py-12 bg-secondary px-4 sm:px-6 lg:px-8">
        <div className="w-full">
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

      <InteractiveSoftwareSuites />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="w-full py-16">
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

      <section className="py-12 bg-card shadow-xl px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
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

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.title} className="overflow-hidden group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col bg-card group-hover:animate-gradient hover:bg-[length:200%_200%]">
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
