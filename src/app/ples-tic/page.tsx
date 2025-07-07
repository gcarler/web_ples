
// src/app/ples-tic/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertTriangle, ArrowLeft, ArrowRight, Award, Banknote, BarChart3, BarChartHorizontalBig, Barcode, Bell, BookOpen, BookUser, Bot, Brain, BrainCircuit, Briefcase, Building, Building2, Calculator, Calendar, CalendarDays, Camera, CheckCircle, ChevronDown, ClipboardCheck, ClipboardEdit, ClipboardList, Clock, Cloud, CloudCog, Code, ConciergeBell, Cpu, CreditCard, Database, DraftingCompass, Edit, Eye, Factory, FileArchive, FileCheck, FileDigit, FileSearch, FileSignature, FileText, Filter, FlaskConical, FolderArchive, FolderKanban, GanttChartSquare, GitBranch, GitMerge, GitPullRequestArrow, Globe, GraduationCap, Headset, HeartPulse, HelpCircle, History, Home, Inbox, Info, KanbanSquare, KeyRound, Landmark, Layers, LayoutDashboard, LayoutTemplate, Lightbulb, Link as LinkIcon, ListOrdered, Lock, Mail, Map, MapPin, Megaphone, MessageCircle, MessagesSquare, MessageSquareDiff, MonitorSmartphone, MousePointerClick, Network, Package, PenSquare, Presentation, Printer, Receipt, Repeat, Rocket, Scale, School, Search, Send, Server, Settings, Share2, Shield, ShieldAlert, ShieldCheck, ShoppingBag, ShoppingCart, Tablet, Tags, Target, Timer, TrendingUp, Truck, UploadCloud, UserCheck, Users, Users2, UsersRound, Video, Warehouse, Workflow, Wrench, Zap
} from 'lucide-react';
import PlexusIllustration from '@/components/illustrations/PlexusIllustration';
import DataPipelineIllustration from '@/components/illustrations/DataPipelineIllustration';
import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const valuePropositions = [
    {
      icon: Settings,
      title: 'Soluciones a Medida',
      description: 'Desarrollamos software y sistemas adaptados específicamente a sus necesidades y objetivos estratégicos.',
    },
    {
      icon: Lightbulb,
      title: 'Innovación y Vanguardia',
      description: 'Aplicamos las últimas tecnologías y metodologías para garantizar soluciones modernas, eficientes y preparadas para el futuro.',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad Integral',
      description: 'Protegemos sus activos digitales con estrategias de ciberseguridad proactivas y robustas adaptadas a su entorno.',
    },
    {
      icon: TrendingUp,
      title: 'Optimización y Eficiencia',
      description: 'Automatizamos y optimizamos sus flujos de trabajo para mejorar la productividad, reducir costos y potenciar el crecimiento.',
    },
  ];

const coreServices = [
    {
      icon: Code,
      title: 'Desarrollo de Software a Medida',
      description: 'Creamos aplicaciones web, móviles y empresariales personalizadas, desde la concepción hasta el despliegue y mantenimiento continuo.',
      details: ["Análisis y Diseño de Sistemas", "Desarrollo Full-Stack (Frontend/Backend)", "Integración de APIs y Servicios Externos", "Metodologías Ágiles (Scrum/Kanban)"],
      ctaLink: "/ples-tic/desarrollo-software",
      ctaText: "Más sobre Desarrollo a Medida",
    },
    {
      icon: CloudCog,
      title: 'Soluciones Cloud y DevOps',
      description: 'Diseñamos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes (AWS, Azure, GCP).',
      details: ["Migración Estratégica a la Nube", "Arquitecturas Serverless y Microservicios", "Infraestructura como Código (IaC)", "CI/CD y Automatización DevOps"],
      ctaLink: "/ples-tic/soluciones-cloud",
      ctaText: "Descubra Soluciones Cloud",
    },
    {
      icon: Lock,
      title: 'Ciberseguridad Avanzada',
      description: 'Protegemos su información y sistemas contra amenazas cibernéticas con auditorías, consultoría y soluciones de seguridad de última generación.',
      details: ["Análisis de Vulnerabilidades y Pentesting Ético", "Gestión de Identidad y Acceso (IAM/IGA)", "Seguridad de Redes y Endpoints (EDR/XDR)", "Planes de Respuesta a Incidentes (IRP)"],
      ctaLink: "/ples-tic/ciberseguridad",
      ctaText: "Fortalezca su Seguridad",
    },
    {
      icon: BarChart3,
      title: 'Análisis de Datos e Inteligencia de Negocio (BI)',
      description: 'Transformamos sus datos en información valiosa para la toma de decisiones estratégicas, mediante dashboards y reportes interactivos.',
      details: ["Modelado y Almacenamiento de Datos (Data Warehousing)", "Visualización de Datos (Tableau, Power BI, Looker)", "Análisis Predictivo y Fundamentos de Machine Learning", "Procesos ETL/ELT y Calidad de Datos"],
      ctaLink: "/ples-tic/analisis-datos-bi",
      ctaText: "Explore Inteligencia de Negocio",
    },
    {
      icon: Brain,
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
    { icon: Search, title: 'Entendimiento y Diagnóstico', description: 'Analizamos sus necesidades, objetivos y entorno tecnológico actual.' },
    { icon: DraftingCompass, title: 'Diseño y Planificación Estratégica', description: 'Definimos la arquitectura, tecnologías y hoja de ruta del proyecto.' },
    { icon: KanbanSquare, title: 'Desarrollo Ágil e Implementación', description: 'Construimos la solución con enfoque en calidad y entregas incrementales.' },
    { icon: FlaskConical, title: 'Pruebas Exhaustivas y Despliegue', description: 'Realizamos pruebas rigurosas para garantizar funcionalidad y seguridad.' },
    { icon: GitPullRequestArrow, title: 'Soporte y Evolución Continua', description: 'Ofrecemos soporte post-implementación y planes de mantenimiento continuo.' },
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
          { name: "OfiPles Sitio web", slug: "sitio-web", description: "Creador de sitios web empresariales", details: {
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
          { name: "OfiPles Comercio electrónico", slug: "comercio-electronico", description: "Vende tus productos en línea", details: {
              mainIcon: ShoppingCart,
              title: 'OfiPles Comercio Electrónico',
              description: 'La solución completa para lanzar y escalar su tienda en línea. Gestione productos, procese pagos y administre pedidos desde una única plataforma integrada.',
              keyServices: [
                  { title: 'Catálogo de Productos Avanzado', text: 'Gestione productos ilimitados, variantes (talla, color), inventario y precios de forma centralizada.', icon: ListOrdered },
                  { title: 'Pasarelas de Pago Seguras', text: 'Integre múltiples métodos de pago locales e internacionales para ofrecer una experiencia de compra sin fricciones.', icon: CreditCard },
                  { title: 'Gestión de Pedidos y Envíos', text: 'Administre todo el ciclo de vida del pedido, desde la compra hasta la entrega, con seguimiento y notificaciones automáticas.', icon: Package },
                  { title: 'Herramientas de Marketing', text: 'Cree cupones de descuento, promociones y campañas de recuperación de carritos abandonados para impulsar sus ventas.', icon: Megaphone }
              ],
              benefits: [
                  'Venda sus productos 24/7 y alcance un mercado global.',
                  'Gestión de inventario centralizada que evita sobreventas.',
                  'Ofrezca una experiencia de compra segura y profesional.',
                  'Aumente la conversión con herramientas de marketing integradas.',
                  'Obtenga reportes detallados de ventas y rendimiento de productos.'
              ],
              ctaText: 'Comience a Vender en Línea',
              formSubject: 'Consulta%20OfiPles%20Comercio%20Electronico'
          } },
          { name: "OfiPles Blog", slug: "blog", description: "Publica entradas, anuncios y noticias", details: {
              mainIcon: Edit,
              title: 'OfiPles Blog',
              description: 'Atraiga y fidelice a su audiencia con contenido de valor. Nuestro módulo de blog le permite crear, gestionar y optimizar sus publicaciones para llegar a más personas.',
              keyServices: [
                  { title: 'Editor de Contenido Avanzado', text: 'Cree artículos atractivos con un editor intuitivo que soporta texto enriquecido, imágenes, videos y código embebido.', icon: FileText },
                  { title: 'Gestión de Categorías y Etiquetas', text: 'Organice su contenido de manera lógica para mejorar la navegación del usuario y la estructura de su sitio.', icon: Tags },
                  { title: 'Optimización SEO Integrada', text: 'Herramientas para personalizar URLs, metadatos y asegurar que su contenido sea amigable para los motores de búsqueda.', icon: BarChart3 },
                  { title: 'Programación de Publicaciones', text: 'Planifique su calendario de contenidos y programe sus artículos para que se publiquen automáticamente en la fecha y hora deseadas.', icon: CalendarDays }
              ],
              benefits: [
                  'Posicione su marca como un referente en su industria.',
                  'Atraiga tráfico orgánico a su sitio web a través de contenido relevante.',
                  'Fomente una comunidad alrededor de su marca.',
                  'Mejore el SEO de su sitio web de forma continua.',
                  'Genere leads y oportunidades de negocio a través de su contenido.'
              ],
              ctaText: 'Empiece a Escribir su Historia',
              formSubject: 'Consulta%20OfiPles%20Blog'
          } },
          { name: "OfiPles Foro", slug: "foro", description: "Gestiona un foro para preguntas frecuentes", details: {
              mainIcon: MessagesSquare,
              title: 'OfiPles Foro',
              description: 'Cree una comunidad activa donde sus clientes y usuarios puedan interactuar, resolver dudas y compartir conocimientos. Fomente el engagement y reduzca la carga de soporte.',
              keyServices: [
                  { title: 'Creación de Temas y Categorías', text: 'Estructure su foro en categorías y sub-foros para mantener las conversaciones organizadas y fáciles de encontrar.', icon: FolderKanban },
                  { title: 'Perfiles de Usuario y Reputación', text: 'Permita que los usuarios personalicen sus perfiles y gane reputación a través de sus contribuciones, incentivando la participación.', icon: Users },
                  { title: 'Herramientas de Moderación', text: 'Mantenga un ambiente sano y productivo con herramientas para moderar contenido, gestionar usuarios y prevenir el spam.', icon: Shield },
                  { title: 'Notificaciones y Suscripciones', text: 'Los usuarios pueden suscribirse a temas de su interés y recibir notificaciones de nuevas respuestas, manteniendo la comunidad activa.', icon: Bell }
              ],
              benefits: [
                  'Reduzca los tickets de soporte al permitir que la comunidad resuelva dudas comunes.',
                  'Obtenga feedback valioso directamente de sus usuarios.',
                  'Mejore el SEO con contenido generado por los propios usuarios.',
                  'Fomente la lealtad y el sentido de pertenencia a su marca.',
                  'Cree un centro de conocimiento colaborativo.'
              ],
              ctaText: 'Construya su Comunidad',
              formSubject: 'Consulta%20OfiPles%20Foro'
          } },
          { name: "OfiPles eLearning", slug: "elearning", description: "Gestiona y publica tus cursos", details: {
              mainIcon: GraduationCap,
              title: 'OfiPles eLearning',
              description: 'Transforme su conocimiento en cursos en línea. Nuestra plataforma le permite crear, vender y gestionar experiencias de aprendizaje impactantes para su audiencia.',
              keyServices: [
                  { title: 'Constructor de Cursos Intuitivo', text: 'Estructure sus cursos con lecciones, videos, documentos, y otros recursos multimedia de forma sencilla.', icon: Layers },
                  { title: 'Evaluaciones y Cuestionarios', text: 'Cree quizzes y exámenes para evaluar el progreso de los estudiantes y reforzar el aprendizaje.', icon: ClipboardCheck },
                  { title: 'Seguimiento del Progreso del Alumno', text: 'Monitoree el avance de cada estudiante, vea qué lecciones han completado y qué calificaciones han obtenido.', icon: BarChart3 },
                  { title: 'Certificados Personalizables', text: 'Emita certificados de finalización automáticamente a los estudiantes que completen sus cursos, añadiendo valor a su oferta.', icon: Award }
              ],
              benefits: [
                  'Monetice su conocimiento y experiencia.',
                  'Ofrezca formación a sus clientes, empleados o a una audiencia global.',
                  'Automatice el proceso de inscripción, pago y certificación.',
                  'Cree una experiencia de aprendizaje profesional y atractiva.',
                  'Escale su oferta formativa sin limitaciones geográficas.'
              ],
              ctaText: 'Cree su Academia en Línea',
              formSubject: 'Consulta%20OfiPles%20eLearning'
          } },
          { name: "OfiPles Chat en vivo", slug: "chat-en-vivo", description: "Chatea con los visitantes de tu sitio web", details: {
              mainIcon: MessageCircle,
              title: 'OfiPles Chat en Vivo',
              description: 'Conecte instantáneamente con los visitantes de su sitio web para resolver dudas, capturar leads y mejorar la conversión. No deje que un cliente potencial se vaya con preguntas sin responder.',
              keyServices: [
                  { title: 'Comunicación en Tiempo Real', text: 'Interactúe en vivo con los visitantes, guiándolos a través de su sitio y respondiendo preguntas al instante.', icon: Zap },
                  { title: 'Asistente IA (Opcional)', text: 'Configure un bot para que responda preguntas frecuentes 24/7 y califique leads, pasando solo las conversaciones importantes a su equipo.', icon: Bot },
                  { title: 'Historial de Conversaciones', text: 'Guarde todas las interacciones para un seguimiento posterior, asegurando un contexto completo en futuras conversaciones.', icon: ClipboardList },
                  { title: 'Disparadores y Mensajes Proactivos', text: 'Inicie conversaciones automáticamente basadas en el comportamiento del visitante, como el tiempo en una página o una acción específica.', icon: Target }
              ],
              benefits: [
                  'Aumente la tasa de conversión resolviendo dudas en el momento de la compra.',
                  'Mejore drásticamente la satisfacción del cliente con soporte inmediato.',
                  'Capture más leads cualificados directamente desde su sitio web.',
                  'Entienda mejor las necesidades y puntos de dolor de sus visitantes.',
                  'Ofrezca un canal de comunicación moderno y preferido por muchos usuarios.'
              ],
              ctaText: 'Active su Chat en Vivo',
              formSubject: 'Consulta%20OfiPles%20Chat%20en%20Vivo'
          } }
        ]
    },
    "Ventas": {
        icon: ShoppingCart,
        description: "Optimice todo su ciclo de ventas, desde la captación de clientes hasta la facturación final.",
        items: [
          { name: "OfiPles CRM", slug: "crm", description: "Gestiona tus leads y cierra oportunidades", details: {
              mainIcon: Users,
              title: 'OfiPles CRM',
              description: 'Centralice la gestión de sus clientes y oportunidades de venta. Obtenga una vista 360° de cada interacción y optimice su proceso comercial para cerrar más negocios, más rápido.',
              keyServices: [
                  { title: 'Gestión de Contactos y Empresas', text: 'Mantenga una base de datos centralizada y limpia de todos sus prospectos, clientes y las organizaciones a las que pertenecen.', icon: Users2 },
                  { title: 'Pipeline de Ventas Visual', text: 'Visualice y gestione sus oportunidades de negocio a través de etapas personalizables en un tablero Kanban intuitivo.', icon: KanbanSquare },
                  { title: 'Registro de Actividades', text: 'Registre todas las interacciones (llamadas, reuniones, correos) asociadas a un contacto u oportunidad para un seguimiento completo.', icon: ClipboardList },
                  { title: 'Automatización y Recordatorios', text: 'Configure recordatorios automáticos para seguimientos y automatice tareas repetitivas para que su equipo se enfoque en vender.', icon: Clock }
              ],
              benefits: [
                  'Nunca pierda una oportunidad de venta por falta de seguimiento.',
                  'Mejore la colaboración y visibilidad dentro de su equipo de ventas.',
                  'Tome decisiones basadas en datos con reportes de rendimiento precisos.',
                  'Aumente la productividad de su equipo comercial.',
                  'Construya relaciones más sólidas y duraderas con sus clientes.'
              ],
              ctaText: 'Optimice su Proceso de Ventas',
              formSubject: 'Consulta%20OfiPles%20CRM'
          } },
          { name: "OfiPles Ventas", slug: "ventas", description: "De cotizaciones a facturas", details: {
              mainIcon: FileText,
              title: 'OfiPles Ventas',
              description: 'Agilice su proceso de ventas con una herramienta que le permite crear y enviar cotizaciones profesionales, gestionar pedidos y convertirlos en facturas con un solo clic.',
              keyServices: [
                  { title: 'Creación de Cotizaciones', text: 'Genere cotizaciones personalizadas y profesionales con su marca, productos y precios en minutos.', icon: ClipboardEdit },
                  { title: 'Gestión de Pedidos de Venta', text: 'Convierta cotizaciones aprobadas en pedidos de venta, activando los procesos de logística y facturación.', icon: Package },
                  { title: 'Listas de Precios Múltiples', text: 'Defina diferentes listas de precios por tipo de cliente, volumen o región, y aplíquelas automáticamente.', icon: BarChart3 },
                  { title: 'Integración con CRM e Inventario', text: 'Conectado nativamente con su CRM para obtener datos del cliente y con Inventario para verificar disponibilidad de stock.', icon: GitMerge }
              ],
              benefits: [
                  'Reduzca el tiempo necesario para crear y enviar cotizaciones.',
                  'Evite errores manuales y asegure la consistencia en sus precios.',
                  'Mejore la comunicación entre los equipos de ventas y logística.',
                  'Ofrezca una experiencia profesional y ágil a sus clientes.',
                  'Tenga una visibilidad clara del flujo de pedidos y ventas pendientes.'
              ],
              ctaText: 'Agilice sus Cotizaciones',
              formSubject: 'Consulta%20OfiPles%20Ventas'
          } },
          { name: "OfiPles Punto de venta", slug: "punto-de-venta", description: "Interfaz para tiendas y restaurantes", details: {
              mainIcon: Tablet,
              title: 'OfiPles Punto de Venta (POS)',
              description: 'Una interfaz de punto de venta rápida, intuitiva y potente para su tienda física o restaurante. Funciona en cualquier dispositivo y se integra perfectamente con su inventario y contabilidad.',
              keyServices: [
                  { title: 'Interfaz Rápida y Táctil', text: 'Diseñado para la velocidad, con una interfaz limpia y optimizada para pantallas táctiles que minimiza los clics.', icon: MousePointerClick },
                  { title: 'Gestión de Pagos Múltiples', text: 'Acepte efectivo, tarjetas de crédito/débito y otros métodos de pago de forma integrada y segura.', icon: CreditCard },
                  { title: 'Integración de Hardware', text: 'Compatible con impresoras de recibos, lectores de códigos de barras y cajones de dinero para una operación fluida.', icon: Printer },
                  { title: 'Sincronización en Tiempo Real', text: 'Las ventas actualizan automáticamente su inventario y registros contables, proporcionando datos precisos al instante.', icon: Zap }
              ],
              benefits: [
                  'Acelere el proceso de cobro y reduzca las colas.',
                  'Mantenga su inventario siempre actualizado, tanto en tienda física como online.',
                  'Simplifique la contabilidad con la conciliación automática de ventas.',
                  'Funciona incluso con conexiones a internet intermitentes.',
                  'Obtenga reportes detallados de ventas por tienda, empleado o producto.'
              ],
              ctaText: 'Modernice su Punto de Venta',
              formSubject: 'Consulta%20OfiPles%20Punto%20de%20Venta'
          } },
          { name: "OfiPles Suscripciones", slug: "suscripciones", description: "Facturas recurrentes y renovaciones", details: {
              mainIcon: Repeat,
              title: 'OfiPles Suscripciones',
              description: 'Gestione modelos de negocio basados en ingresos recurrentes. Automatice la facturación, gestione planes y suscripciones, y reduzca la pérdida de clientes (churn).',
              keyServices: [
                  { title: 'Facturación Recurrente Automática', text: 'Configure planes y deje que el sistema genere y envíe facturas automáticamente según la periodicidad definida (mensual, anual, etc.).', icon: Zap },
                  { title: 'Gestión de Planes y Actualizaciones', text: 'Cree diferentes niveles de planes y permita que los clientes mejoren (upgrade) o reduzcan (downgrade) su suscripción fácilmente.', icon: Layers },
                  { title: 'Manejo de Pagos Fallidos (Dunning)', text: 'Automatice el proceso de reintento de cobro y notificaciones para pagos fallidos, reduciendo el churn involuntario.', icon: AlertTriangle },
                  { title: 'Métricas Clave de Suscripción (MRR, Churn)', text: 'Obtenga un tablero con las métricas más importantes para su negocio de suscripción, como Ingreso Mensual Recurrente y tasa de abandono.', icon: BarChart3 }
              ],
              benefits: [
                  'Asegure un flujo de caja predecible con ingresos recurrentes.',
                  'Reduzca la carga administrativa asociada a la facturación manual.',
                  'Mejore la retención de clientes con una gestión profesional.',
                  'Facilite el crecimiento y la escalabilidad de su modelo de negocio.',
                  'Tome decisiones estratégicas basadas en métricas de suscripción precisas.'
              ],
              ctaText: 'Automatice sus Ingresos Recurrentes',
              formSubject: 'Consulta%20OfiPles%20Suscripciones'
          } },
          { name: "OfiPles Alquiler", slug: "alquiler", description: "Gestiona contratos y disponibilidad", details: {
              mainIcon: KeyRound,
              title: 'OfiPles Alquiler',
              description: 'Una solución completa para gestionar su negocio de alquiler. Controle la disponibilidad de sus productos, gestione contratos y programe recogidas y devoluciones desde un solo lugar.',
              keyServices: [
                  { title: 'Calendario de Disponibilidad Visual', text: 'Vea la disponibilidad de sus productos de alquiler en un calendario tipo Gantt, evitando reservas duplicadas.', icon: Calendar },
                  { title: 'Gestión de Contratos de Alquiler', text: 'Cree, envíe y gestione contratos de alquiler, incluyendo términos, condiciones y firmas electrónicas.', icon: FileSignature },
                  { title: 'Programación de Entregas y Recogidas', text: 'Organice la logística de sus alquileres, asignando fechas y responsables para las entregas y devoluciones.', icon: Truck },
                  { title: 'Facturación Flexible', text: 'Genere facturas automáticamente al inicio, al final o durante el período de alquiler, según sus reglas de negocio.', icon: Receipt }
              ],
              benefits: [
                  'Maximice la utilización de sus productos de alquiler.',
                  'Simplifique la gestión administrativa y contractual.',
                  'Ofrezca una experiencia de reserva clara y sin errores a sus clientes.',
                  'Mejore la planificación logística y la eficiencia operativa.',
                  'Total integración con los módulos de Ventas y Contabilidad.'
              ],
              ctaText: 'Optimice su Negocio de Alquiler',
              formSubject: 'Consulta%20OfiPles%20Alquiler'
          } }
        ]
    },
    "Finanzas": {
        icon: Landmark,
        description: "Controle la salud financiera de su empresa con herramientas contables y de facturación robustas.",
        items: [
          { name: "OfiPles Contabilidad", slug: "contabilidad", description: "Gestiona tu contabilidad financiera", details: {
              mainIcon: BookUser,
              title: 'OfiPles Contabilidad',
              description: 'Un sistema contable completo y flexible que simplifica la gestión financiera de su empresa, automatiza asientos y genera informes precisos para el cumplimiento y la toma de decisiones.',
              keyServices: [
                  { title: 'Plan de Cuentas Personalizable', text: 'Adapte el plan de cuentas a la estructura de su empresa y a las normativas locales.', icon: Settings },
                  { title: 'Automatización de Asientos Contables', text: 'Los asientos se generan automáticamente a partir de facturas, pagos, gastos y movimientos de inventario.', icon: Zap },
                  { title: 'Informes Financieros en Tiempo Real', text: 'Genere balances, estados de resultados, libros mayores y otros informes financieros con datos siempre actualizados.', icon: BarChart3 },
                  { title: 'Conciliación Bancaria Inteligente', text: 'Importe extractos bancarios y concilie transacciones de forma rápida y sencilla con sugerencias automáticas.', icon: GitMerge }
              ],
              benefits: [
                  'Asegure el cumplimiento de las normativas fiscales y contables.',
                  'Reduzca el tiempo dedicado a tareas contables manuales.',
                  'Obtenga una visión clara y precisa de la salud financiera de su empresa.',
                  'Facilite las auditorías con información organizada y trazable.',
                  'Tome decisiones estratégicas basadas en informes financieros confiables.'
              ],
              ctaText: 'Simplifique su Contabilidad',
              formSubject: 'Consulta%20OfiPles%20Contabilidad'
          } },
          { name: "OfiPles Facturación", slug: "facturacion", description: "Facturas y pagos", details: {
              mainIcon: Receipt,
              title: 'OfiPles Facturación',
              description: 'Cree y envíe facturas profesionales, gestione pagos y haga seguimiento de sus cuentas por cobrar de manera eficiente. Integrado con su contabilidad para una gestión impecable.',
              keyServices: [
                  { title: 'Creación Rápida de Facturas', text: 'Genere facturas a partir de pedidos de venta, hojas de horas o de forma manual con plantillas personalizables.', icon: FileDigit },
                  { title: 'Seguimiento de Pagos', text: 'Registre pagos parciales o completos, y vea fácilmente el estado de cada factura (borrador, enviada, pagada, vencida).', icon: CheckCircle },
                  { title: 'Recordatorios de Pago Automáticos', text: 'Configure y automatice el envío de correos de recordatorio para facturas vencidas, mejorando el flujo de caja.', icon: Clock },
                  { title: 'Facturación Electrónica (Opcional)', text: 'Cumpla con la normativa de facturación electrónica de su país mediante integraciones con proveedores autorizados.', icon: Cloud }
              ],
              benefits: [
                  'Acelere su ciclo de cobro y mejore su flujo de caja.',
                  'Proyecte una imagen profesional con facturas claras y personalizadas.',
                  'Reduzca el tiempo administrativo dedicado al seguimiento de pagos.',
                  'Mantenga un registro claro y organizado de todas sus transacciones.',
                  'Evite errores con la creación de facturas a partir de datos existentes.'
              ],
              ctaText: 'Optimice su Facturación',
              formSubject: 'Consulta%20OfiPles%20Facturacion'
          } },
          { name: "OfiPles Gastos", slug: "gastos", description: "Gestiona los gastos de tus empleados", details: {
              mainIcon: CreditCard,
              title: 'OfiPles Gastos',
              description: 'Simplifique el proceso de reporte y aprobación de gastos de los empleados. Desde la captura del recibo hasta el reembolso y la contabilización, todo en un flujo de trabajo digital.',
              keyServices: [
                  { title: 'Reporte de Gastos Simplificado', text: 'Los empleados pueden registrar gastos fácilmente, incluso tomando una foto del recibo desde su móvil.', icon: Camera },
                  { title: 'Flujos de Aprobación Personalizables', text: 'Defina flujos de aprobación multinivel. Los gerentes pueden aprobar o rechazar gastos desde cualquier dispositivo.', icon: Workflow },
                  { title: 'Integración con Contabilidad', text: 'Una vez aprobados, los gastos generan automáticamente los asientos contables correspondientes, listos para su reembolso.', icon: GitMerge },
                  { title: 'Gestión de Adelantos y Reembolsos', text: 'Controle los adelantos de efectivo y gestione los reembolsos a empleados de manera centralizada.', icon: Banknote }
              ],
              benefits: [
                  'Ahorre tiempo a sus empleados y gerentes en la gestión de gastos.',
                  'Mejore el control y la visibilidad sobre los gastos de la empresa.',
                  'Elimine el papeleo y los procesos manuales.',
                  'Acelere el proceso de reembolso a los empleados.',
                  'Asegure que los gastos se registren correctamente en la contabilidad.'
              ],
              ctaText: 'Digitalice la Gestión de Gastos',
              formSubject: 'Consulta%20OfiPles%20Gastos'
          } },
          { name: "OfiPles Documentos", slug: "documentos", description: "Gestión de documentos", details: {
              mainIcon: FolderArchive,
              title: 'OfiPles Documentos',
              description: 'Un sistema de gestión documental colaborativo y seguro. Organice, comparta y controle el acceso a todos los archivos de su empresa en un espacio de trabajo centralizado.',
              keyServices: [
                  { title: 'Organización por Espacios de Trabajo', text: 'Cree carpetas y subcarpetas para organizar sus documentos por proyecto, departamento o cualquier otra estructura lógica.', icon: FolderKanban },
                  { title: 'Control de Versiones', text: 'Mantenga un historial de cambios para cada documento, permitiéndole revisar y restaurar versiones anteriores fácilmente.', icon: GitMerge },
                  { title: 'Compartir de Forma Segura', text: 'Comparta archivos y carpetas con usuarios internos o externos mediante enlaces seguros con fecha de vencimiento.', icon: Share2 },
                  { title: 'Flujos de Trabajo de Aprobación', text: 'Defina flujos de aprobación para documentos que requieran revisión, como contratos o políticas internas.', icon: Workflow }
              ],
              benefits: [
                  'Centralice todos sus documentos en una única fuente de verdad.',
                  'Mejore la colaboración y evite la duplicación de archivos.',
                  'Asegure que su equipo siempre trabaje con la última versión de un documento.',
                  'Controle quién puede ver, editar y compartir información sensible.',
                  'Acceda a sus archivos desde cualquier lugar y dispositivo.'
              ],
              ctaText: 'Centralice sus Documentos',
              formSubject: 'Consulta%20OfiPles%20Documentos'
          } },
          { name: "OfiPles Firma electrónica", slug: "firma-electronica", description: "Firma documentos en línea", details: {
              mainIcon: PenSquare,
              title: 'OfiPles Firma Electrónica',
              description: 'Acelere sus acuerdos y contratos. Envíe, firme y gestione documentos de forma electrónica con plena validez legal, sin necesidad de imprimir ni escanear.',
              keyServices: [
                  { title: 'Envío Fácil para Firma', text: 'Suba un documento PDF, arrastre y suelte los campos de firma y envíelo a una o varias personas para que lo firmen.', icon: Send },
                  { title: 'Firma desde Cualquier Dispositivo', text: 'Los firmantes pueden revisar y firmar documentos desde su computadora, tableta o smartphone de forma intuitiva.', icon: MousePointerClick },
                  { title: 'Pista de Auditoría Completa', text: 'Cada acción (envío, visualización, firma) queda registrada con fecha, hora y dirección IP, garantizando la trazabilidad.', icon: FileCheck },
                  { title: 'Plantillas Reutilizables', text: 'Guarde documentos de uso frecuente como plantillas para agilizar el envío de contratos o acuerdos estándar.', icon: LayoutTemplate }
              ],
              benefits: [
                  'Reduzca drásticamente el tiempo para cerrar acuerdos.',
                  'Elimine los costos asociados a la impresión, envío y almacenamiento de papel.',
                  'Mejore la experiencia de sus clientes, socios y empleados.',
                  'Aumente la seguridad y el control sobre sus documentos importantes.',
                  'Contribuya a la sostenibilidad reduciendo el consumo de papel.'
              ],
              ctaText: 'Acelere sus Contratos',
              formSubject: 'Consulta%20OfiPles%20Firma%20Electronica'
          } }
        ]
    },
    "Inventario y Fabricación": {
        icon: Warehouse,
        description: "Gestione eficientemente su cadena de suministro, producción y control de calidad.",
        items: [
          { name: "OfiPles Inventario", slug: "inventario", description: "Gestiona tu inventario y logística", details: {
              mainIcon: Warehouse,
              title: 'OfiPles Inventario',
              description: 'Optimice toda su cadena de suministro con un sistema de gestión de inventario de doble entrada. Controle cada movimiento, desde la recepción hasta la entrega al cliente.',
              keyServices: [
                  { title: 'Trazabilidad Completa', text: 'Rastree cada producto con números de serie o lotes, desde su origen hasta su destino final.', icon: Barcode },
                  { title: 'Gestión Multi-Almacén', text: 'Administre el stock en múltiples almacenes y ubicaciones, y defina reglas de reabastecimiento entre ellos.', icon: Building2 },
                  { title: 'Rutas Logísticas Avanzadas', text: 'Configure reglas para automatizar las transferencias, como el cross-docking o el dropshipping.', icon: Workflow },
                  { title: 'Valoración de Inventario', text: 'Utilice métodos de costeo como FIFO o Costo Promedio, y obtenga informes de valoración en tiempo real.', icon: Calculator }
              ],
              benefits: [
                  'Reduzca los quiebres de stock y el exceso de inventario.',
                  'Aumente la eficiencia de sus operaciones de almacén.',
                  'Mejore la precisión de su inventario y reduzca las pérdidas.',
                  'Obtenga una visibilidad completa de su cadena de suministro.',
                  'Tome decisiones de compra más inteligentes basadas en datos reales.'
              ],
              ctaText: 'Controle su Inventario',
              formSubject: 'Consulta%20OfiPles%20Inventario'
          } },
          { name: "OfiPles Manufactura", slug: "manufactura", description: "Órdenes de fabricación y listas de materiales", details: {
              mainIcon: Factory,
              title: 'OfiPles Manufactura (MRP)',
              description: 'Planifique, programe y controle su producción de principio a fin. Gestione listas de materiales, órdenes de fabricación y centros de trabajo para optimizar su planta.',
              keyServices: [
                  { title: 'Listas de Materiales (BoM)', text: 'Cree y gestione listas de materiales de múltiples niveles y versiones para sus productos.', icon: ClipboardList },
                  { title: 'Planificación y Órdenes de Producción', text: 'Genere órdenes de fabricación y controle el consumo de materiales y el tiempo de producción.', icon: GanttChartSquare },
                  { title: 'Gestión de Centros de Trabajo', text: 'Organice su planta en centros de trabajo, defina sus capacidades y siga el rendimiento de cada uno.', icon: Settings },
                  { title: 'Informes de Producción', text: 'Analice la eficiencia de su producción, los costos y los tiempos con informes detallados.', icon: BarChart3 }
              ],
              benefits: [
                  'Optimice la planificación de sus necesidades de materiales (MRP).',
                  'Mejore la eficiencia y la productividad de su planta.',
                  'Reduzca los tiempos de ciclo y los costos de producción.',
                  'Obtenga visibilidad en tiempo real del estado de cada orden de fabricación.',
                  'Facilite la toma de decisiones con datos de producción precisos.'
              ],
              ctaText: 'Optimice su Producción',
              formSubject: 'Consulta%20OfiPles%20Manufactura'
          } }
        ]
    },
    "Recursos Humanos": {
        icon: Users2,
        description: "Administre el ciclo de vida completo de sus empleados, desde la contratación hasta la evaluación.",
        items: [
          { name: "OfiPles Empleados", slug: "empleados", description: "Centraliza la información de tus empleados", details: {
              mainIcon: Users,
              title: 'OfiPles Empleados',
              description: 'Centralice toda la información de su equipo en un solo lugar. Gestione perfiles, contratos, ausencias y mucho más, de forma segura y accesible.',
              keyServices: [
                  { title: 'Directorio de Empleados', text: 'Mantenga una base de datos centralizada con toda la información relevante de cada empleado, desde datos de contacto hasta roles y departamentos.', icon: Users2 },
                  { title: 'Gestión de Contratos', text: 'Administre los contratos de sus empleados, con alertas automáticas para fechas de vencimiento y renovaciones.', icon: FileSignature },
                  { title: 'Control de Asistencia y Ausencias', text: 'Registre las ausencias (vacaciones, bajas médicas) y realice un seguimiento de la asistencia de forma sencilla.', icon: CalendarDays },
                  { title: 'Portal del Empleado', text: 'Ofrezca a sus empleados un portal de autoservicio donde pueden consultar su información, solicitar ausencias y más.', icon: UserCheck }
              ],
              benefits: [
                  'Tenga toda la información de RRHH organizada y accesible.',
                  'Reduzca la carga administrativa del departamento de RRHH.',
                  'Mejore la comunicación y la transparencia con sus empleados.',
                  'Asegure el cumplimiento de las políticas de la empresa.',
                  'Facilite la incorporación (onboarding) de nuevos empleados.'
              ],
              ctaText: 'Gestione su Talento',
              formSubject: 'Consulta%20OfiPles%20Empleados'
          } },
          { name: "OfiPles Reclutamiento", slug: "reclutamiento", description: "Monitorea tu flujo de reclutamiento", details: {
              mainIcon: Briefcase,
              title: 'OfiPles Reclutamiento',
              description: 'Atraiga y contrate al mejor talento. Gestione todo su proceso de selección, desde la publicación de ofertas hasta la contratación, en una plataforma colaborativa.',
              keyServices: [
                  { title: 'Portal de Empleo Personalizado', text: 'Publique sus ofertas de trabajo en una página de empleo con su propia marca, integrada en su sitio web.', icon: Megaphone },
                  { title: 'Pipeline de Candidatos Visual', text: 'Organice a los candidatos en etapas (nuevo, entrevista, oferta) en un tablero Kanban para un seguimiento claro.', icon: KanbanSquare },
                  { title: 'Base de Datos de Talentos', text: 'Construya su propio banco de talentos con los perfiles de todos los candidatos que han aplicado.', icon: Database },
                  { title: 'Comunicación y Programación', text: 'Envíe correos automáticos, programe entrevistas y comuníquese con los candidatos directamente desde la plataforma.', icon: Mail }
              ],
              benefits: [
                  'Optimice y acelere su proceso de contratación.',
                  'Mejore la experiencia de los candidatos.',
                  'Fomente la colaboración entre reclutadores y gerentes contratantes.',
                  'Tome decisiones de contratación más informadas.',
                  'Construya una marca empleadora sólida.'
              ],
              ctaText: 'Atraiga al Mejor Talento',
              formSubject: 'Consulta%20OfiPles%20Reclutamiento'
          } },
          { name: "OfiPles Evaluaciones", slug: "evaluaciones", description: "Evalúa a tus empleados", details: {
              mainIcon: ClipboardCheck,
              title: 'OfiPles Evaluaciones',
              description: 'Fomente una cultura de mejora continua con un sistema de evaluación del desempeño flexible y colaborativo. Defina objetivos, recopile feedback y cree planes de desarrollo.',
              keyServices: [
                  { title: 'Evaluaciones Periódicas', text: 'Programe y realice evaluaciones de desempeño (anuales, semestrales) con formularios y flujos de trabajo personalizables.', icon: Calendar },
                  { title: 'Feedback 360°', text: 'Recopile retroalimentación de pares, gerentes y subordinados para obtener una visión completa del desempeño de cada empleado.', icon: UsersRound },
                  { title: 'Definición de Objetivos (OKRs)', text: 'Establezca y dé seguimiento a los objetivos individuales y de equipo, alineándolos con la estrategia de la empresa.', icon: Target },
                  { title: 'Planes de Desarrollo Individual', text: 'Cree planes de acción y desarrollo basados en los resultados de las evaluaciones para potenciar el crecimiento de su talento.', icon: TrendingUp }
              ],
              benefits: [
                  'Alinee los objetivos individuales con los de la empresa.',
                  'Fomente una comunicación abierta y constructiva sobre el desempeño.',
                  'Identifique y desarrolle el talento interno.',
                  'Tome decisiones justas y basadas en datos sobre promociones y compensación.',
                  'Aumente la motivación y el compromiso de los empleados.'
              ],
              ctaText: 'Potencie el Desempeño',
              formSubject: 'Consulta%20OfiPles%20Evaluaciones'
          } }
        ]
    },
    "Marketing": {
        icon: Megaphone,
        description: "Cree, automatice y mida sus campañas de marketing para llegar a su público objetivo.",
        items: [
            { name: "OfiPles Marketing por correo electrónico", slug: "email-marketing", description: "Diseña, envía y monitorea correos electrónicos", details: {
                mainIcon: Mail,
                title: 'OfiPles Marketing por Correo Electrónico',
                description: 'Cree y envíe campañas de email marketing impactantes. Desde newsletters hasta promociones, nuestra herramienta le ayuda a conectar con su audiencia y obtener resultados medibles.',
                keyServices: [
                    { title: 'Editor de Arrastrar y Soltar', text: 'Diseñe correos visualmente atractivos sin necesidad de código, utilizando un editor intuitivo y plantillas profesionales.', icon: LayoutTemplate },
                    { title: 'Segmentación de Audiencias', text: 'Envíe el mensaje correcto a la persona correcta segmentando sus listas de contactos en base a sus intereses y comportamiento.', icon: Filter },
                    { title: 'Informes y Analíticas', text: 'Mida el éxito de sus campañas con métricas clave como tasas de apertura, clics y conversiones.', icon: BarChart3 },
                    { title: 'Pruebas A/B', text: 'Optimice sus resultados probando diferentes asuntos, contenidos o llamadas a la acción para ver qué funciona mejor.', icon: FlaskConical }
                ],
                benefits: [
                    'Mantenga a su audiencia informada y comprometida.',
                    'Genere tráfico a su sitio web y aumente las ventas.',
                    'Construya relaciones duraderas con sus clientes.',
                    'Personalice la comunicación a gran escala.',
                    'Obtenga un alto retorno de la inversión en sus esfuerzos de marketing.'
                ],
                ctaText: 'Cree su Próxima Campaña',
                formSubject: 'Consulta%20OfiPles%20Marketing%20por%20Correo'
            } }
        ]
    },
    "Servicios": {
        icon: ConciergeBell,
        description: "Gestione proyectos, soporte y servicios de campo con herramientas diseñadas para la eficiencia.",
        items: [
          { name: "OfiPles Proyecto", slug: "proyecto", description: "Organiza y planea tus proyectos", details: {
              mainIcon: Briefcase,
              title: 'OfiPles Proyecto',
              description: 'Planifique, siga y gestione sus proyectos de forma colaborativa. Obtenga una visión clara del progreso, gestione recursos y asegure entregas a tiempo y dentro del presupuesto.',
              keyServices: [
                  { title: 'Vista de Tareas (Kanban, Gantt)', text: 'Visualice sus proyectos y tareas en diferentes formatos, como tableros Kanban, diagramas de Gantt y listas.', icon: KanbanSquare },
                  { title: 'Gestión de Hojas de Horas', text: 'Registre el tiempo dedicado a cada tarea para un seguimiento preciso de los costos y la rentabilidad del proyecto.', icon: Clock },
                  { title: 'Análisis de Rentabilidad', text: 'Compare los costos planificados con los reales y analice la rentabilidad de cada proyecto con informes detallados.', icon: BarChart3 },
                  { title: 'Colaboración en Tareas', text: 'Comuníquese con su equipo, comparta documentos y siga el progreso directamente en cada tarea del proyecto.', icon: MessageSquareDiff }
              ],
              benefits: [
                  'Mejore la visibilidad y el control sobre todos sus proyectos.',
                  'Asegure que los proyectos se entreguen a tiempo y dentro del presupuesto.',
                  'Fomente la colaboración y la comunicación dentro del equipo.',
                  'Optimice la asignación de recursos.',
                  'Tome decisiones informadas basadas en datos de proyecto en tiempo real.'
              ],
              ctaText: 'Organice sus Proyectos',
              formSubject: 'Consulta%20OfiPles%20Proyecto'
          } },
          { name: "OfiPles Soporte al cliente", slug: "soporte-cliente", description: "Monitorea y soluciona tickets", details: {
              mainIcon: Headset,
              title: 'OfiPles Soporte al Cliente',
              description: 'Ofrezca un servicio de atención al cliente excepcional. Gestione, priorice y resuelva todas las solicitudes de sus clientes desde una plataforma multicanal.',
              keyServices: [
                  { title: 'Sistema de Tickets Multicanal', text: 'Centralice las solicitudes de soporte recibidas por correo electrónico, teléfono o chat en vivo en un único sistema de tickets.', icon: Inbox },
                  { title: 'Acuerdos de Nivel de Servicio (SLA)', text: 'Defina y monitoree los tiempos de respuesta y resolución para garantizar un servicio de alta calidad y cumplir con sus promesas.', icon: Timer },
                  { title: 'Base de Conocimiento (Helpdesk)', text: 'Cree una base de conocimiento con artículos y guías para que los clientes puedan resolver sus dudas por sí mismos.', icon: HelpCircle },
                  { title: 'Informes de Rendimiento', text: 'Analice el rendimiento de su equipo de soporte con métricas como el tiempo de primera respuesta, satisfacción del cliente y más.', icon: BarChart3 }
              ],
              benefits: [
                  'Mejore la satisfacción y la lealtad de sus clientes.',
                  'Aumente la eficiencia de su equipo de soporte.',
                  'No pierda nunca una solicitud de cliente.',
                  'Reduzca el volumen de tickets recurrentes con una buena base de conocimiento.',
                  'Obtenga información valiosa sobre las necesidades y problemas de sus clientes.'
              ],
              ctaText: 'Mejore su Soporte',
              formSubject: 'Consulta%20OfiPles%20Soporte'
          } }
        ]
    }
};

const gobPlesModules = {
    "CatastroGob": {
        icon: Map,
        description: "Software integral para la gestión catastral con enfoque multipropósito.",
        items: [
            { name: "Administración de Trámites", slug: "catastrogob-tramites", description: "Formación, actualización y conservación.", details: {
                mainIcon: FileText,
                title: 'Administración de Trámites Catastrales',
                description: 'Gestione de manera integral los trámites de formación, actualización y conservación catastral, asegurando el cumplimiento del modelo LADM_COL y la eficiencia operativa.',
                keyServices: [
                  { title: 'Flujos de Trabajo Digitales', text: 'Automatice y estandarice los procesos para cada tipo de trámite, desde la solicitud hasta la resolución, reduciendo tiempos y errores.', icon: Workflow },
                  { title: 'Gestión Documental Integrada', text: 'Asocie todos los documentos soporte (planos, escrituras) a cada trámite, creando un expediente digital completo y auditable.', icon: FolderArchive },
                  { title: 'Notificaciones y Seguimiento', text: 'Mantenga informados a los ciudadanos y funcionarios sobre el estado de sus trámites con notificaciones automáticas.', icon: Bell },
                  { title: 'Tablero de Control', text: 'Visualice la carga de trabajo, los tiempos de respuesta y los cuellos de botella para una gestión proactiva.', icon: LayoutDashboard }
                ],
                benefits: [
                  'Reducción drástica de los tiempos de respuesta en trámites.',
                  'Mayor transparencia para el ciudadano y los entes de control.',
                  'Eliminación del papeleo y los archivos físicos.',
                  'Garantía de cumplimiento normativo en cada paso del proceso.',
                  'Mejora en la productividad del equipo catastral.'
                ],
                ctaText: 'Optimice sus Trámites',
                formSubject: 'Consulta%20CatastroGob%20Tramites'
            }},
            { name: "Módulo SIG", slug: "catastrogob-sig", description: "Análisis espacial y visualización.", details: {
                mainIcon: Map,
                title: 'Módulo de Sistema de Información Geográfica (SIG)',
                description: 'Un potente motor geoespacial para la visualización, edición y análisis de la información predial. Conecte los datos alfanuméricos con su representación en el territorio.',
                keyServices: [
                    { title: 'Visualizador Cartográfico Web', text: 'Explore la cartografía base, capas temáticas y la información de los predios en un mapa interactivo y rápido.', icon: Globe },
                    { title: 'Herramientas de Edición y Digitalización', text: 'Cree y modifique la geometría de los predios con herramientas de alta precisión, manteniendo la topología de la red.', icon: DraftingCompass },
                    { title: 'Análisis Espacial', text: 'Realice consultas espaciales complejas, análisis de proximidad, superposición de capas y generación de mapas temáticos.', icon: BrainCircuit },
                    { title: 'Integración con Servicios WMS/WFS', text: 'Conecte y consuma servicios de la Infraestructura Colombiana de Datos Espaciales (ICDE) y otras fuentes externas.', icon: GitMerge }
                ],
                benefits: [
                    'Toma de decisiones basada en la ubicación y el contexto territorial.',
                    'Facilita la identificación de inconsistencias entre datos físicos y jurídicos.',
                    'Potente herramienta para la planificación urbana y el ordenamiento territorial.',
                    'Acceso democrático a la información geoespacial para distintas áreas del municipio.',
                    'Mejora la calidad y precisión de la base de datos catastral.'
                ],
                ctaText: 'Potencie su Análisis Espacial',
                formSubject: 'Consulta%20CatastroGob%20SIG'
            }},
            { name: "Gestión Física y Jurídica", slug: "catastrogob-gestion", description: "Control completo de cada predio.", details: {
                mainIcon: Building,
                title: 'Gestión Física y Jurídica del Predio',
                description: 'El corazón del catastro. Un repositorio centralizado que almacena y relaciona toda la información física, jurídica y económica de cada predio del territorio.',
                keyServices: [
                  { title: 'Ficha Predial Integral', text: 'Consulte en una única vista toda la información del predio: propietarios, áreas, construcciones, avalúos y más.', icon: FileSearch },
                  { title: 'Historial de Mutaciones', text: 'Mantenga un registro completo de todos los cambios que ha sufrido un predio a lo largo del tiempo, garantizando la trazabilidad.', icon: History },
                  { title: 'Gestión de Propietarios y Tenencia', text: 'Administre la información de propietarios, poseedores y ocupantes, y los diferentes tipos de tenencia de la tierra.', icon: Users },
                  { title: 'Componente Económico', text: 'Registre y gestione los avalúos catastrales, las zonas homogéneas y los elementos que determinan el valor del predio.', icon: Banknote }
                ],
                benefits: [
                  'Base de datos unificada y consistente para toda la entidad territorial.',
                  'Garantiza la seguridad jurídica de la propiedad.',
                  'Fundamento para una liquidación justa y equitativa del impuesto predial.',
                  'Información confiable para la planificación y la inversión pública.',
                  'Facilita la interoperabilidad con otras entidades como Notariado y Registro.'
                ],
                ctaText: 'Centralice la Información Predial',
                formSubject: 'Consulta%20CatastroGob%20Gestion'
            }}
        ]
    },
    "SiatGob": {
        icon: Briefcase,
        description: "Solución avanzada para la administración del territorio a nivel municipal.",
        items: [
            { name: "Ordenamiento Territorial", slug: "siatgob-ordenamiento", description: "Gestión de licencias y seguimiento.", details: {
                mainIcon: Building2,
                title: 'Ordenamiento Territorial',
                description: 'Gestione el desarrollo y uso del suelo de su municipio de acuerdo a su Plan de Ordenamiento Territorial (POT). Controle licencias, usos permitidos y seguimiento a las normativas urbanísticas.',
                keyServices: [
                  { title: 'Gestión de Licencias Urbanísticas', text: 'Digitalice el trámite de licencias de construcción, parcelación y urbanismo, desde la solicitud hasta la expedición.', icon: FileSignature },
                  { title: 'Consulta de Usos del Suelo', text: 'Permita a ciudadanos y funcionarios consultar fácilmente los usos permitidos y la normativa aplicable para cualquier predio.', icon: Search },
                  { title: 'Seguimiento a Planes Parciales', text: 'Monitoree el avance y cumplimiento de los planes parciales y otros instrumentos de planificación y gestión del suelo.', icon: GanttChartSquare },
                  { title: 'Inspección, Vigilancia y Control', text: 'Gestione las visitas de inspección y los procesos por infracciones urbanísticas en una plataforma centralizada.', icon: ShieldAlert }
                ],
                benefits: [
                  'Asegura un crecimiento urbano ordenado y planificado.',
                  'Ofrece transparencia y agilidad en los trámites urbanísticos.',
                  'Facilita el control y seguimiento al cumplimiento de la normativa.',
                  'Proporciona herramientas para la toma de decisiones en planificación.',
                  'Mejora la comunicación entre la administración y los constructores.'
                ],
                ctaText: 'Planifique su Territorio',
                formSubject: 'Consulta%20SiatGob%20Ordenamiento'
            }}
        ]
    },
    "OfiGob": {
        icon: LayoutDashboard,
        description: "Suite que integra y gestiona las dimensiones del Modelo Integrado de Planeación y Gestión (MIPG).",
        items: [
            { name: "Talento Humano", slug: "ofigob-th", description: "Gestión del ciclo de vida, desarrollo y desempeño del servidor público.", details: {
                mainIcon: Users2,
                title: 'Gestión del Talento Humano',
                description: 'Plataforma para administrar el ciclo completo del servidor público, desde la vinculación hasta el retiro, fomentando el desarrollo y evaluando el desempeño para un servicio público de excelencia.',
                keyServices: [
                  { title: 'Ciclo de Vida del Servidor', text: 'Gestione los procesos de reclutamiento, selección, vinculación, onboarding y retiro.', icon: Workflow },
                  { title: 'Desarrollo y Gestión', text: 'Administre perfiles de cargo, catálogo de competencias y planes de capacitación.', icon: GraduationCap },
                  { title: 'Desempeño y Bienestar', text: 'Realice evaluaciones formales, concierte objetivos, gestione planes de mejora (PIPs) y fomente el bienestar.', icon: ClipboardCheck },
                  { title: 'Cumplimiento y Estrategia', text: 'Asegure el cumplimiento de la normatividad GETH y alinee la planeación estratégica del talento humano.', icon: Target }
                ],
                benefits: [
                  'Optimiza procesos de reclutamiento y selección.',
                  'Fomenta el desarrollo profesional y la retención del talento.',
                  'Alinea el desempeño individual con los objetivos institucionales.',
                  'Garantiza el cumplimiento normativo en la gestión de personal.',
                ],
                ctaText: "Potenciar el Talento Humano",
                formSubject: "Consulta%20OfiGob%20Talento%20Humano"
            }},
            { name: "Direccionamiento Estratégico y Planeación", slug: "ofigob-planeacion", description: "Definición, seguimiento y control de objetivos, planes y proyectos institucionales.", details: {
                mainIcon: Target,
                title: 'Direccionamiento Estratégico y Planeación',
                description: 'Herramienta para traducir la estrategia en acción. Gestione objetivos, planes institucionales, planes de trabajo y realice análisis DOFA para una planeación coherente y efectiva.',
                keyServices: [
                  { title: 'Gestión de Objetivos Estratégicos', text: 'Defina y de seguimiento a los objetivos de la entidad, con asistencia de IA para su formulación.', icon: Rocket },
                  { title: 'Formulación y Seguimiento de Planes', text: 'Gestione planes institucionales y de acción, monitoreando su avance en tiempo real.', icon: GanttChartSquare },
                  { title: 'Administración de Planes de Trabajo', text: 'Desglose los planes en tareas concretas y asigne responsables para una ejecución efectiva.', icon: KanbanSquare },
                  { title: 'Análisis Estratégico', text: 'Realice análisis DOFA y otras matrices estratégicas para informar la toma de decisiones.', icon: Search }
                ],
                benefits: [
                  'Asegura la alineación de toda la entidad con la visión estratégica.',
                  'Mejora la visibilidad y el seguimiento del avance de los planes.',
                  'Facilita la toma de decisiones basada en datos de ejecución.',
                  'Potencia la planificación con herramientas de análisis y asistencia de IA.',
                ],
                ctaText: "Definir la Estrategia",
                formSubject: "Consulta%20OfiGob%20Planeacion"
            }},
             { name: "Gestión con Valores para Resultados", slug: "ofigob-gvr", description: "Optimización de procesos, gestión de PQR, riesgos y proveedores.", details: {
                mainIcon: ShieldCheck,
                title: 'Gestión con Valores para Resultados',
                description: 'Módulo para optimizar la operación interna, mejorar el servicio al ciudadano y gestionar los riesgos. Centraliza la gestión de procesos, PQR, proveedores y cumplimiento normativo.',
                keyServices: [
                  { title: 'Gestión de Procesos y Procedimientos', text: 'Mapee, documente y optimice los procesos internos de la entidad.', icon: Workflow },
                  { title: 'Sistema de PQR con IA', text: 'Gestione peticiones, quejas y reclamos con un asistente de IA para la generación de respuestas.', icon: Headset },
                  { title: 'Gestión de Riesgos Operacionales', text: 'Identifique, evalúe y gestione los riesgos operativos a través de matrices especializadas.', icon: AlertTriangle },
                  { title: 'Registro y Evaluación de Proveedores', text: 'Mantenga una base de datos de proveedores y evalúe su desempeño.', icon: Truck }
                ],
                benefits: [
                  'Aumenta la eficiencia y estandarización de los procesos internos.',
                  'Mejora los tiempos y la calidad de respuesta a los ciudadanos.',
                  'Permite una gestión proactiva de los riesgos operacionales.',
                  'Fortalece la relación y el control sobre la cadena de suministro.',
                ],
                ctaText: "Optimizar la Gestión Interna",
                formSubject: "Consulta%20OfiGob%20GVR"
            }},
            { name: "Evaluación de Resultados", slug: "ofigob-evaluacion", description: "Medición del desempeño a través de indicadores, autoevaluaciones e informes.", details: {
                mainIcon: BarChartHorizontalBig,
                title: 'Evaluación de Resultados',
                description: 'Mida el impacto de su gestión. Esta herramienta permite definir y seguir indicadores de desempeño, realizar autoevaluaciones institucionales y generar informes detallados con asistencia de IA.',
                keyServices: [
                  { title: 'Gestión de Indicadores de Desempeño', text: 'Defina y monitoree los KPIs de la entidad, con tableros de control visuales.', icon: BarChart3 },
                  { title: 'Autoevaluaciones de Gestión', text: 'Realice autoevaluaciones de políticas y gestión para identificar áreas de mejora.', icon: ClipboardCheck },
                  { title: 'Generador de Informes con IA', text: 'Utilice un asistente de IA para crear informes de gestión y resultados de forma automática.', icon: Bot }
                ],
                benefits: [
                  'Permite una toma de decisiones basada en resultados medibles.',
                  'Fomenta una cultura de mejora continua y rendición de cuentas.',
                  'Simplifica la generación de informes complejos.',
                  'Proporciona una visión clara del cumplimiento de los objetivos.',
                ],
                ctaText: "Medir y Evaluar Resultados",
                formSubject: "Consulta%20OfiGob%20Evaluacion"
            }},
            { name: "Información y Comunicación", slug: "ofigob-ic", description: "Gestión documental centralizada y herramientas de comunicación interna.", details: {
                mainIcon: MessageCircle,
                title: 'Información y Comunicación',
                description: 'Asegure un flujo de información eficiente y seguro dentro de su entidad. Centralice la gestión documental y optimice los canales de comunicación interna.',
                keyServices: [
                  { title: 'Gestión Documental', text: 'Utilice un repositorio centralizado para todos los documentos de la entidad.', icon: FolderArchive },
                  { title: 'Asistente IA para Documentos', text: 'Encuentre y resuma información clave en grandes volúmenes de documentos con IA.', icon: FileSearch },
                  { title: 'Comunicación Interna', text: 'Gestione boletines, noticias y comunicados internos para mantener a todo el personal informado.', icon: Megaphone }
                ],
                benefits: [
                  'Centraliza y protege el patrimonio documental de la entidad.',
                  'Agiliza la búsqueda y recuperación de información.',
                  'Mejora la efectividad de la comunicación interna.',
                  'Garantiza que toda la entidad esté informada y alineada.',
                ],
                ctaText: "Mejorar la Comunicación",
                formSubject: "Consulta%20OfiGob%20IC"
            }},
            { name: "Gestión del Conocimiento y la Innovación", slug: "ofigob-gci", description: "Repositorio de conocimiento, gestión de innovación y acciones de mejora.", details: {
                mainIcon: BrainCircuit,
                title: 'Gestión del Conocimiento y la Innovación',
                description: 'Capitalice el saber hacer de su entidad. Este módulo permite crear un repositorio de conocimiento, gestionar iniciativas de innovación y dar seguimiento a las acciones de mejora continua.',
                keyServices: [
                  { title: 'Repositorio de Conocimiento', text: 'Centralice lecciones aprendidas, buenas prácticas y conocimiento técnico.', icon: Database },
                  { title: 'Gestión de Iniciativas de Innovación', text: 'Canalice y gestione las ideas y proyectos de innovación de su equipo.', icon: Lightbulb },
                  { title: 'Seguimiento de Acciones de Mejora', text: 'Asegure que las oportunidades de mejora identificadas se conviertan en acciones concretas.', icon: CheckCircle }
                ],
                benefits: [
                  'Evita la pérdida de conocimiento crítico.',
                  'Fomenta una cultura de innovación y colaboración.',
                  'Sistematiza el proceso de mejora continua.',
                  'Convierte las lecciones aprendidas en activos institucionales.',
                ],
                ctaText: "Fomentar la Innovación",
                formSubject: "Consulta%20OfiGob%20GCI"
            }},
            { name: "Control Interno", slug: "ofigob-ci", description: "Gestión de auditorías, riesgos de control y matrices de cumplimiento.", details: {
                mainIcon: Shield,
                title: 'Control Interno (MECI)',
                description: 'Fortalezca el Sistema de Control Interno (SCI) de su entidad. Gestione auditorías, evalúe riesgos de control y asegure el cumplimiento a través de matrices especializadas.',
                keyServices: [
                  { title: 'Gestión de Auditorías', text: 'Planifique y ejecute el plan de auditorías y gestione los hallazgos.', icon: ClipboardList },
                  { title: 'Gestión de Riesgos de Control', text: 'Identifique y valore los riesgos de control y corrupción.', icon: AlertTriangle },
                  { title: 'Matriz de Cumplimiento', text: 'Asegure el seguimiento al cumplimiento normativo de la entidad.', icon: FileCheck },
                  { title: 'Autoevaluaciones del SCI', text: 'Realice autoevaluaciones periódicas del sistema de control interno.', icon: UserCheck }
                ],
                benefits: [
                  'Asegura el cumplimiento del Modelo Estándar de Control Interno (MECI).',
                  'Fortalece la cultura de autocontrol en la entidad.',
                  'Permite una gestión proactiva de los riesgos de control y corrupción.',
                  'Sistematiza y facilita el proceso de auditoría interna.',
                ],
                ctaText: "Fortalecer el Control Interno",
                formSubject: "Consulta%20OfiGob%20CI"
            }},
            { name: "Administración del Sistema", slug: "ofigob-admin", description: "Configuración central, gestión de usuarios y administración de roles y permisos.", details: {
                mainIcon: Wrench,
                title: 'Administración del Sistema',
                description: 'El centro de control de OfiGob. Gestione usuarios, defina roles y permisos detallados, y configure los parámetros generales del sistema para adaptarlo a su entidad.',
                keyServices: [
                  { title: 'Gestión de Usuarios', text: 'Cree y administre las cuentas de usuario de la plataforma.', icon: Users },
                  { title: 'Gestión de Roles y Permisos', text: 'Defina perfiles de acceso granulares para cada módulo y funcionalidad.', icon: Lock }
                ],
                benefits: [
                  'Control total sobre la seguridad y el acceso a la información.',
                  'Flexibilidad para adaptar la plataforma a la estructura de la entidad.',
                  'Facilita la administración centralizada de toda la suite.',
                  'Garantiza la trazabilidad de las acciones administrativas.',
                ],
                ctaText: "Configurar el Sistema",
                formSubject: "Consulta%20OfiGob%20Admin"
            }}
        ]
    },
     "GeGob": {
        icon: BrainCircuit,
        description: "Plataforma de alto nivel para la gobernanza y la mejora continua del sistema educativo.",
        items: [
            { name: "Tablero Principal", slug: "gegob-dashboard", description: "Vista centralizada de indicadores clave.", details: {
                mainIcon: LayoutDashboard,
                title: "Tablero Principal",
                description: "Visualice en tiempo real los indicadores más importantes de la gestión educativa y el rendimiento institucional.",
                keyServices: [
                  { title: "Resumen de Avances del PMI", text: "Monitoree el progreso de sus planes de mejoramiento de un solo vistazo.", icon: TrendingUp },
                  { title: "Alertas de Autoevaluación", text: "Reciba notificaciones sobre plazos y tareas pendientes del proceso de autoevaluación.", icon: Bell },
                  { title: "Estado de Proyectos Transversales", text: "Vea el estado actual de los proyectos pedagógicos institucionales.", icon: GitMerge },
                  { title: "Indicadores de Formación Docente", text: "Analice la cobertura y el impacto de los planes de capacitación.", icon: GraduationCap }
                ],
                benefits: [
                  "Visión 360° de la gestión educativa.",
                  "Toma de decisiones ágil y basada en datos.",
                  "Identificación rápida de áreas críticas.",
                  "Comunicación efectiva de resultados a la comunidad."
                ],
                ctaText: "Explorar Tablero",
                formSubject: "Consulta%20GeGob%20Tablero"
            }},
            { name: "PEI", slug: "gegob-pei", description: "Gestión del Proyecto Educativo Institucional.", details: {
                mainIcon: FileText,
                title: "Proyecto Educativo Institucional (PEI)",
                description: "Gestione y articule el documento maestro que guía la identidad y el quehacer de la institución educativa.",
                keyServices: [
                  { title: "Constructor y Editor del Documento PEI", text: "Utilice un editor colaborativo para construir y mantener actualizado el PEI.", icon: ClipboardEdit },
                  { title: "Alineación con PMI y Autoevaluación", text: "Asegure la coherencia entre el PEI, los planes de mejora y los resultados del diagnóstico.", icon: LinkIcon },
                  { title: "Control de Versiones y Repositorio Histórico", text: "Mantenga un registro de los cambios y acceda a versiones anteriores del documento.", icon: History },
                  { title: "Publicación y Socialización del PEI", text: "Comparta fácilmente el documento con la comunidad educativa y entes de control.", icon: Share2 }
                ],
                benefits: [
                  "Asegura la coherencia y visión a largo plazo de la institución.",
                  "Facilita la participación de la comunidad educativa en su construcción.",
                  "Simplifica las actualizaciones y revisiones periódicas.",
                  "Mantiene un registro histórico organizado y accesible."
                ],
                ctaText: "Gestionar PEI",
                formSubject: "Consulta%20GeGob%20PEI"
            }},
            { name: "SIE", slug: "gegob-sie", description: "Sistema Institucional de Evaluación.", details: {
                mainIcon: Award,
                title: "Sistema Institucional de Evaluación (SIE)",
                description: "Defina y administre los criterios y metodologías de evaluación de los estudiantes, en cumplimiento con la normativa vigente.",
                keyServices: [
                  { title: "Configuración de Escalas de Valoración", text: "Personalice las escalas de calificación (cuantitativas o cualitativas) según el PEI.", icon: Settings },
                  { title: "Definición de Criterios de Promoción", text: "Establezca las reglas claras para la promoción de los estudiantes al siguiente grado.", icon: CheckCircle },
                  { title: "Gestión de Planes de Apoyo y Nivelación", text: "Documente y dé seguimiento a las estrategias de apoyo para estudiantes con dificultades.", icon: HelpCircle },
                  { title: "Generación de Informes de Rendimiento", text: "Cree informes consolidados sobre el rendimiento académico para análisis institucional.", icon: BarChart3 }
                ],
                benefits: [
                  "Garantiza un proceso de evaluación transparente, justo y equitativo.",
                  "Facilita la comunicación de los criterios de evaluación a toda la comunidad.",
                  "Sistematiza el seguimiento al desempeño de los estudiantes.",
                  "Cumple con los requisitos normativos del Ministerio de Educación."
                ],
                ctaText: "Configurar SIE",
                formSubject: "Consulta%20GeGob%20SIE"
            }},
            { name: "Autoevaluación", slug: "gegob-autoevaluacion", description: "Diagnóstico y análisis institucional.", details: {
                mainIcon: BarChart3,
                title: 'Autoevaluación Institucional',
                description: 'Guía a las instituciones en un proceso estructurado de autodiagnóstico para identificar fortalezas y oportunidades de mejora en todas sus áreas de gestión.',
                keyServices: [
                  { title: "Motor de Diagnóstico Personalizable", text: "Cree y aplique instrumentos de autoevaluación basados en las guías del MEN o en sus propios marcos de calidad.", icon: Settings },
                  { title: "Recopilación de Evidencias", text: "Permita adjuntar documentos y evidencias que soporten las valoraciones en cada uno de los componentes.", icon: FileArchive },
                  { title: "Visualización Gráfica de Resultados", text: "Analice los resultados con gráficos de radar y barras que facilitan la identificación de áreas críticas.", icon: BarChartHorizontalBig },
                  { title: "Generación Automática de Informes", text: "Produzca informes de autoevaluación consolidados listos para ser presentados a la comunidad y entes de control.", icon: Presentation }
                ],
                benefits: [
                  'Fomenta una cultura de reflexión y mejora continua.',
                  'Proporciona una base objetiva para la toma de decisiones.',
                  'Simplifica y estandariza el proceso de autoevaluación anual.',
                  'Facilita la preparación para auditorías y certificaciones de calidad.'
                ],
                ctaText: "Iniciar Autoevaluación",
                formSubject: "Consulta%20GeGob%20Autoevaluacion"
            }},
            { name: "Evaluaciones Externas", slug: "gegob-eval-externas", description: "Análisis de resultados de pruebas.", details: {
                mainIcon: BarChartHorizontalBig,
                title: "Análisis de Evaluaciones Externas",
                description: "Importe, visualice y analice los resultados de pruebas estandarizadas (como las Pruebas Saber) para complementar el diagnóstico institucional y orientar las estrategias pedagógicas.",
                keyServices: [
                  { title: "Carga Masiva de Resultados de Pruebas", text: "Importe fácilmente los archivos de resultados proporcionados por el ICFES u otras entidades.", icon: UploadCloud },
                  { title: "Tableros de Comparación Histórica", text: "Analice la evolución de los resultados de la institución a lo largo del tiempo.", icon: TrendingUp },
                  { title: "Análisis Comparativo", text: "Compare el rendimiento de la institución con promedios nacionales, regionales y de entidades similares.", icon: UsersRound },
                  { title: "Identificación de Fortalezas y Debilidades", text: "Desglose los resultados por área, competencia y componente para un análisis detallado.", icon: Search }
                ],
                benefits: [
                  "Complementa la autoevaluación con una mirada objetiva y externa.",
                  "Permite tomar decisiones pedagógicas y curriculares basadas en datos.",
                  "Facilita el seguimiento al impacto de las estrategias de mejora académica.",
                  "Proporciona información valiosa para la rendición de cuentas."
                ],
                ctaText: "Analizar Resultados",
                formSubject: "Consulta%20GeGob%20EvalExternas"
            }},
            { name: "PMI", slug: "gegob-pmi", description: "Planes de Mejoramiento Institucional.", details: {
                mainIcon: Lightbulb,
                title: "Planes de Mejoramiento Institucional (PMI)",
                description: "Transforme los hallazgos del diagnóstico en acciones concretas. Defina objetivos, actividades, responsables y plazos para cerrar las brechas identificadas.",
                keyServices: [
                  { title: "Conexión Directa con Autoevaluación", text: "Cree objetivos de mejora a partir de los resultados de la autoevaluación, asegurando la coherencia.", icon: LinkIcon },
                  { title: "Formulación de Proyectos y Actividades", text: "Estructure su plan con proyectos, actividades, metas, responsables y cronogramas claros.", icon: GanttChartSquare },
                  { title: "Seguimiento y Registro de Avances", text: "Monitoree el progreso de cada actividad y registre los avances para una gestión efectiva del plan.", icon: ClipboardCheck },
                  { title: "Banco de Buenas Prácticas", text: "Acceda a un repositorio de estrategias exitosas para inspirar y guiar la formulación de sus planes.", icon: BrainCircuit }
                ],
                benefits: [
                  "Asegura que los planes de mejoramiento respondan a necesidades reales.",
                  "Facilita el seguimiento y control a la ejecución de las mejoras.",
                  "Promueve la colaboración y la asignación clara de responsabilidades.",
                  "Proporciona una hoja de ruta clara para la mejora continua."
                ],
                ctaText: "Construir PMI",
                formSubject: "Consulta%20GeGob%20PMI"
            }},
            { name: "Proyectos Transversales", slug: "gegob-proyectos", description: "Gestión de proyectos curriculares.", details: {
                mainIcon: GitMerge,
                title: "Gestión de Proyectos Transversales",
                description: "Planifique y dé seguimiento a los proyectos pedagógicos que articulan diferentes áreas del conocimiento (ambiental, sexualidad, derechos humanos, etc.).",
                keyServices: [
                  { title: "Banco de Proyectos Institucionales", text: "Centralice la información y documentación de todos los proyectos transversales.", icon: Briefcase },
                  { title: "Planificación de Actividades y Recursos", text: "Asigne responsables, fechas y recursos para cada actividad de los proyectos.", icon: CalendarDays },
                  { title: "Registro de Evidencias y Resultados", text: "Documente el impacto y los productos de cada proyecto con un repositorio de evidencias.", icon: FileArchive },
                  { title: "Articulación con el PEI y Planes de Área", text: "Asegure que los proyectos estén alineados con la propuesta pedagógica de la institución.", icon: LinkIcon }
                ],
                benefits: [
                  "Centraliza y organiza la información de los proyectos pedagógicos.",
                  "Facilita la colaboración entre docentes de diferentes áreas.",
                  "Permite visibilizar y comunicar el impacto de estos proyectos.",
                  "Asegura el cumplimiento de los requerimientos normativos vigentes."
                ],
                ctaText: "Gestionar Proyectos",
                formSubject: "Consulta%20GeGob%20Proyectos"
            }},
            { name: "Formación Docente", slug: "gegob-formacion", description: "Planes de capacitación para docentes.", details: {
                mainIcon: GraduationCap,
                title: "Formación y Desarrollo Docente",
                description: "Diseñe y gestione el plan de formación continua para su equipo docente, alineado a las necesidades identificadas en la autoevaluación y el PMI.",
                keyServices: [
                  { title: "Detección de Necesidades de Formación", text: "Identifique las áreas de capacitación prioritarias a partir de los resultados de la evaluación.", icon: Search },
                  { title: "Catálogo de Cursos y Capacitaciones", text: "Organice la oferta de formación interna y externa disponible para los docentes.", icon: ListOrdered },
                  { title: "Registro de Asistencia y Participación", text: "Lleve un control de la participación de los docentes en las diferentes actividades de formación.", icon: UserCheck },
                  { title: "Seguimiento al Impacto de la Formación", text: "Evalúe cómo la capacitación se traduce en mejores prácticas en el aula.", icon: TrendingUp }
                ],
                benefits: [
                  "Potencia las competencias y habilidades del equipo docente.",
                  "Asegura que la inversión en formación sea pertinente y estratégica.",
                  "Mantiene un registro histórico de la capacitación recibida por cada docente.",
                  "Contribuye directamente a la mejora de la calidad educativa."
                ],
                ctaText: "Planificar Formación",
                formSubject: "Consulta%20GeGob%20Formacion"
            }},
            { name: "Autorización Institucional", slug: "gegob-autorizacion", description: "Gestión de licencias y autorizaciones.", details: {
                mainIcon: ShieldCheck,
                title: "Autorización Institucional",
                description: "Gestione los procesos de solicitud y renovación de licencias de funcionamiento y autorizaciones oficiales ante las secretarías de educación.",
                keyServices: [
                  { title: "Checklist de Requisitos Normativos", text: "Asegure el cumplimiento de todos los requisitos legales y documentales para cada trámite.", icon: ClipboardCheck },
                  { title: "Carga y Gestión de Documentos Soporte", text: "Centralice y organice toda la documentación necesaria para los procesos de autorización.", icon: UploadCloud },
                  { title: "Seguimiento al Estado del Trámite", text: "Monitoree en qué etapa se encuentra cada solicitud ante la entidad competente.", icon: Workflow },
                  { title: "Alertas de Vencimiento de Licencias", text: "Reciba notificaciones automáticas para iniciar los procesos de renovación a tiempo.", icon: Bell }
                ],
                benefits: [
                  "Simplifica y agiliza los complejos procesos de licenciamiento.",
                  "Reduce el riesgo de incumplimiento normativo.",
                  "Evita la operación sin las autorizaciones vigentes.",
                  "Centraliza toda la documentación legal de la institución en un solo lugar."
                ],
                ctaText: "Gestionar Autorizaciones",
                formSubject: "Consulta%20GeGob%20Autorizacion"
            }},
            { name: "Administración", slug: "gegob-admin", description: "Configuración del sistema.", details: {
                mainIcon: Settings,
                title: "Administración del Sistema",
                description: "Módulo de configuración general de la plataforma GeGob, gestión de usuarios, roles y parámetros institucionales.",
                keyServices: [
                  { title: "Gestión de Usuarios y Permisos", text: "Cree usuarios y asigne roles para controlar el acceso a los diferentes módulos y funcionalidades.", icon: Users },
                  { title: "Configuración del Año Lectivo", text: "Defina los parámetros del año escolar, periodos académicos y calendarios.", icon: Calendar },
                  { title: "Personalización de Parámetros", text: "Adapte la plataforma a la realidad de su institución, configurando sedes, jornadas, etc.", icon: Wrench },
                  { title: "Auditoría de Acciones en el Sistema", text: "Realice un seguimiento de las acciones importantes realizadas por los usuarios en la plataforma.", icon: History }
                ],
                benefits: [
                  "Control total sobre la seguridad y el acceso a la información.",
                  "Flexibilidad para adaptar la plataforma a las particularidades de la institución.",
                  "Facilita la administración técnica de la plataforma.",
                  "Garantiza la trazabilidad de las acciones y cambios en el sistema."
                ],
                ctaText: "Configurar Sistema",
                formSubject: "Consulta%20GeGob%20Admin"
            }}
        ]
    },
    "GestorDoc": {
        icon: FileArchive,
        description: "Solución completa de gestión documental que cumple con la Ley 594 de 2000.",
        items: [
            { name: "Administración de Consultas", slug: "gestordoc-consultas", description: "Gestión de solicitudes de consulta de documentos.", details: {
                mainIcon: HelpCircle,
                title: 'Administración de Consultas',
                description: 'Gestione solicitudes de consulta de documentos de manera presencial o virtual, proporcionando un medio eficiente para acceder a la información requerida.',
                keyServices: [
                  { title: 'Solicitud y Respuesta a Consultas', text: 'Permite a los usuarios solicitar y a los funcionarios responder consultas de manera eficiente, tanto virtual como presencial.', icon: MessageCircle },
                  { title: 'Gestión y Devolución', text: 'Mantenga y devuelva consultas, asegurando una gestión transparente y efectiva del proceso.', icon: Repeat },
                  { title: 'Identificador Único (FUID)', text: 'Asigna un FUID a cada consulta para un seguimiento y registro ordenado.', icon: Barcode },
                  { title: 'Consulta de Hoja de Control', text: 'Visualice la hoja de control para un seguimiento detallado del estado y la ubicación de las consultas.', icon: FileSearch }
                ],
                benefits: [
                  'Agiliza el acceso a la información requerida.',
                  'Garantiza una gestión transparente y ordenada de las consultas.',
                  'Facilita el seguimiento y registro de todas las interacciones.',
                  'Mejora la atención y satisfacción del usuario.'
                ],
                ctaText: 'Optimice sus Consultas',
                formSubject: 'Consulta%20GestorDoc%20Consultas'
            }},
            { name: "Gestión de Formatos y TRD", slug: "gestordoc-formatos", description: "Organización y clasificación documental.", details: {
                mainIcon: GanttChartSquare,
                title: 'Gestión de Formatos y TRD',
                description: 'Organice, clasifique y gestione el ciclo de vida de sus documentos de acuerdo con las normativas legales, utilizando las Tablas de Retención Documental (TRD).',
                keyServices: [
                  { title: 'Organización por Series y Subseries', text: 'Clasifique los documentos en conjuntos lógicos para facilitar su recuperación y gestión.', icon: Layers },
                  { title: 'Creación y Administración de TRD', text: 'Establezca plazos de conservación y disposición final de los documentos cumpliendo con la regulación.', icon: Timer },
                  { title: 'Identificador Único (FUID) para Documentos', text: 'Asigne un FUID a cada documento para garantizar su unicidad, seguimiento y referencia.', icon: Barcode },
                  { title: 'Hoja de Control Documental', text: 'Lleve un registro detallado del estado y ubicación de cada documento para una gestión eficiente.', icon: FileCheck }
                ],
                benefits: [
                  'Cumplimiento de la Ley General de Archivos.',
                  'Organización documental lógica y eficiente.',
                  'Control preciso sobre el ciclo de vida de los documentos.',
                  'Facilita auditorías y procesos de consulta.'
                ],
                ctaText: 'Implemente sus TRD',
                formSubject: 'Consulta%20GestorDoc%20Formatos'
            }},
            { name: "Administración del Sistema", slug: "gestordoc-sistemas", description: "Control de acceso y seguridad.", details: {
                mainIcon: Settings,
                title: 'Administración del Sistema',
                description: 'Controle y personalice el sistema de gestión documental. Gestione usuarios, perfiles, permisos y dependencias para un entorno seguro y adaptado a su organización.',
                keyServices: [
                  { title: 'Gestión de Usuarios y Perfiles', text: 'Cree y administre usuarios y perfiles, asignando roles y privilegios específicos.', icon: Users },
                  { title: 'Gestión de Permisos de Acceso', text: 'Determine qué acciones y funcionalidades puede realizar cada usuario o perfil en el sistema.', icon: Lock },
                  { title: 'Configuración de Políticas de Seguridad', text: 'Establezca políticas de autenticación, contraseñas y otras medidas de seguridad.', icon: ShieldCheck },
                  { title: 'Administración de Dependencias', text: 'Facilite la gestión y configuración de las dependencias entre diferentes áreas o unidades organizativas dentro de la entidad, lo que permite establecer relaciones jerárquicas y de colaboración efectiva en el uso del sistema.', icon: GitBranch }
                ],
                benefits: [
                  'Entorno seguro y controlado para su patrimonio documental.',
                  'Flexibilidad para adaptar los permisos a su estructura organizativa.',
                  'Gestión centralizada de la seguridad y el acceso.',
                  'Trazabilidad de las acciones realizadas en el sistema.'
                ],
                ctaText: 'Controle su Sistema',
                formSubject: 'Consulta%20GestorDoc%20Sistemas'
            }}
        ]
    },
    "PaeGob": {
        icon: School,
        description: "Solución tecnológica para optimizar la gestión y supervisión del Programa de Alimentación Escolar (PAE).",
        items: [
            { name: "Gestión de Beneficiarios", slug: "paegob-beneficiarios", description: "Focalización de estudiantes.", details: {
                mainIcon: Users2,
                title: 'Gestión de Beneficiarios del PAE',
                description: 'Asegure que el Programa de Alimentación Escolar llegue a quienes más lo necesitan. Gestione la focalización, inscripción y seguimiento de los estudiantes beneficiarios de forma eficiente.',
                keyServices: [
                  { title: 'Focalización y Caracterización', text: 'Importe y gestione la matrícula oficial (SIMAT) y aplique criterios de focalización para identificar a los beneficiarios.', icon: Filter },
                  { title: 'Registro y Novedades', text: 'Administre el registro de estudiantes en el programa y gestione las novedades como traslados o retiros.', icon: UserCheck },
                  { title: 'Control de Cupos por Sede', text: 'Asigne y controle el número de cupos del programa para cada institución y sede educativa.', icon: Building },
                  { title: 'Informes de Cobertura', text: 'Genere reportes detallados sobre la cobertura del programa, el número de beneficiarios y su caracterización.', icon: BarChart3 }
                ],
                benefits: [
                  'Garantiza una asignación equitativa y transparente de los cupos.',
                  'Mantiene una base de datos de beneficiarios actualizada y confiable.',
                  'Facilita la generación de informes para el Ministerio de Educación.',
                  'Reduce el riesgo de errores y duplicidades en la asignación.',
                  'Permite un seguimiento preciso de la población atendida.'
                ],
                ctaText: 'Optimice su Focalización',
                formSubject: 'Consulta%20PaeGob%20Beneficiarios'
            }},
            { name: "Validación de Entregas", slug: "paegob-entregas", description: "Control con firma digital.", details: {
                mainIcon: FileCheck,
                title: 'Validación de Entregas y Reportes del PAE',
                description: 'Controle y supervise la entrega de las raciones alimentarias en cada sede educativa. Nuestra plataforma digitaliza el proceso de validación, garantizando transparencia y trazabilidad.',
                keyServices: [
                  { title: 'Reporte Diario de Entrega', text: 'Los operadores registran diariamente el número de raciones entregadas en cada sede a través de una aplicación móvil.', icon: Tablet },
                  { title: 'Validación con Firma Digital', text: 'El rector o coordinador de cada sede valida la información reportada mediante una firma digital, dando fe de la entrega.', icon: PenSquare },
                  { title: 'Consolidación Automática', text: 'El sistema consolida automáticamente los reportes diarios para generar los informes mensuales requeridos por la auditoría.', icon: Zap },
                  { title: 'Registro de No Conformidades', text: 'Permita que las sedes reporten cualquier incidencia o no conformidad con el servicio de forma inmediata.', icon: AlertTriangle }
                ],
                benefits: [
                  'Elimina el uso de planillas físicas y reduce errores manuales.',
                  'Proporciona evidencia digital y trazabilidad de cada entrega.',
                  'Agiliza la consolidación de informes y el proceso de auditoría.',
                  'Mejora el control y la supervisión del programa por parte de la entidad territorial.',
                  'Aumenta la transparencia en la ejecución de los recursos del PAE.'
                ],
                ctaText: 'Digitalice su Supervisión',
                formSubject: 'Consulta%20PaeGob%20Entregas'
            }}
        ]
    },
    "EduGob": {
        icon: BookOpen,
        description: "Plataforma enfocada en la gestión escolar y académica del día a día.",
        items: [
            { name: "Gestión Académica", slug: "edugob-academica", description: "Carreras, cursos, calificaciones.", details: {
                mainIcon: GraduationCap,
                title: 'Gestión Académica',
                description: 'El núcleo de su institución educativa. Gestione todo el ciclo académico, desde la oferta de cursos y la matrícula, hasta el registro de calificaciones y el control de asistencia.',
                keyServices: [
                  { title: 'Administración de Cursos y Materias', text: 'Cree y configure la estructura académica de su institución, incluyendo programas, planes de estudio y asignaturas.', icon: Layers },
                  { title: 'Matrícula y Gestión de Estudiantes', text: 'Administre el proceso de inscripción y matrícula de estudiantes, asignándolos a sus respectivos cursos y grupos.', icon: Users2 },
                  { title: 'Registro de Calificaciones', text: 'Permita que los docentes registren las calificaciones de los estudiantes de forma segura y centralizada.', icon: ClipboardEdit },
                  { title: 'Control de Asistencia', text: 'Lleve un registro detallado de la asistencia de los estudiantes a clases, generando alertas y reportes.', icon: CheckCircle }
                ],
                benefits: [
                  'Centraliza y estandariza la información académica.',
                  'Simplifica los procesos administrativos para docentes y personal.',
                  'Proporciona a estudiantes y padres acceso a la información académica.',
                  'Genera datos confiables para el seguimiento del rendimiento estudiantil.',
                  'Facilita la generación de boletines, certificados y reportes.'
                ],
                ctaText: 'Organice su Gestión Académica',
                formSubject: 'Consulta%20EduGob%20Academica'
            }}
        ]
    },
    "InfoGob": {
        icon: Info,
        description: "Plataforma enfocada en la transparencia y la rendición de cuentas para la gestión de proyectos.",
        items: [
            { name: "Seguimiento y Monitoreo", slug: "infogob-seguimiento", description: "Visualización de avances y resultados.", details: {
                mainIcon: Presentation,
                title: 'Transparencia y Seguimiento de Proyectos (InfoGob)',
                description: 'Fortalezca la confianza ciudadana con una plataforma que permite la visualización pública y el seguimiento del avance físico y financiero de los proyectos de inversión.',
                keyServices: [
                  { title: 'Visor Público de Proyectos', text: 'Ofrezca a la ciudadanía un portal interactivo para consultar información detallada de cada proyecto: objetivos, presupuesto, avances y contratistas.', icon: Eye },
                  { title: 'Reporte de Avances por Contratistas', text: 'Facilite a los ejecutores el reporte periódico de avances físicos y financieros a través de una interfaz sencilla.', icon: UploadCloud },
                  { title: 'Componente Geográfico (SIG)', text: 'Ubique cada proyecto en un mapa, permitiendo a los ciudadanos ver las inversiones que se están realizando en su comunidad.', icon: MapPin },
                  { title: 'Participación Ciudadana', text: 'Habilite espacios como foros y encuestas para que la comunidad pueda opinar y hacer seguimiento a los proyectos de su interés.', icon: UsersRound }
                ],
                benefits: [
                  'Aumenta la transparencia y la confianza en la gestión pública.',
                  'Empodera a los ciudadanos con información clara y accesible.',
                  'Facilita la rendición de cuentas por parte de la administración.',
                  'Permite un control social más efectivo sobre la inversión pública.',
                  'Mejora la comunicación entre el gobierno y la comunidad.'
                ],
                ctaText: 'Fomente la Transparencia',
                formSubject: 'Consulta%20InfoGob'
            }}
        ]
    }
};

const InteractiveSoftwareSuites = () => {
    const [activeTab, setActiveTab] = useState('empresarial');
    // State to hold the module whose details are being displayed
    const [activeModule, setActiveModule] = useState<any | null>(null);

    const currentSuiteData = useMemo(() => activeTab === 'empresarial' ? ofiPlesModules : gobPlesModules, [activeTab]);

    // Effect to set the default view when the tab or suite data changes
    useEffect(() => {
        const firstCategoryKey = Object.keys(currentSuiteData)[0];
        if (firstCategoryKey && currentSuiteData[firstCategoryKey]?.items.length > 0) {
            const firstModule = currentSuiteData[firstCategoryKey].items[0];
            setActiveModule(firstModule);
        } else {
            setActiveModule(null);
        }
    }, [currentSuiteData]);

    const RenderDetailView = ({ module }: { module: any }) => {
        const { details } = module;
        if (!details) {
             return (
                <div className="p-8 text-center text-muted-foreground">
                    <p>Detalles no disponibles para este módulo.</p>
                </div>
            )
        }
        const MainIcon = details.mainIcon || Globe;
        return (
            <div className="animate-fade-in-up p-1">
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
                                    <Card key={service.title} className="p-6 group transition-shadow duration-300 hover:shadow-lg bg-background/50">
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
      <section className="w-full bg-card text-card-foreground">
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Dos Grandes Suites de Software</h2>
            </div>
            
            <div className="mb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-lg">
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="empresarial" className="py-2 text-base">Suite Empresarial</TabsTrigger>
                        <TabsTrigger value="gubernamental" className="py-2 text-base">Suite Gubernamental</TabsTrigger>
                    </TabsList>
                </Tabs>
                <p className="text-muted-foreground mt-4 max-w-3xl">
                    {activeTab === 'empresarial' 
                        ? "Solución integral de ERP y CRM para unificar y automatizar las operaciones del sector privado, mejorando la eficiencia y la toma de decisiones."
                        : "Conjunto de plataformas especializadas para resolver las necesidades específicas de entidades territoriales e instituciones del sector público."
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 min-h-[600px]">
                {/* Sidebar with Accordion */}
                <aside className="bg-background rounded-lg p-2 h-fit lg:sticky top-24">
                    <Accordion type="single" collapsible className="w-full" defaultValue={Object.keys(currentSuiteData)[0]}>
                        {Object.entries(currentSuiteData).map(([category, data]: [string, any]) => {
                            const Icon = data.icon;
                            return (
                                <AccordionItem value={category} key={category} className="border-b border-border/50">
                                    <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary" />
                                            <span>{category}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-1 pt-2">
                                            {data.items.map((module: any) => (
                                                <li key={module.slug}>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => setActiveModule(module)}
                                                        className={cn(
                                                            "w-full justify-start h-auto py-2 px-3 text-left",
                                                            "text-muted-foreground hover:text-primary hover:bg-primary/5",
                                                            activeModule?.slug === module.slug && "bg-primary/10 text-primary font-semibold"
                                                        )}
                                                    >
                                                        <div>
                                                           <p className="font-medium">{module.name}</p>
                                                           <p className="text-xs text-muted-foreground">{module.description}</p>
                                                        </div>
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </aside>

                {/* Main Content View */}
                <main className="bg-background/50 rounded-lg p-4 md:p-8">
                    {activeModule ? (
                        <RenderDetailView module={activeModule} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p>Seleccione un módulo para ver los detalles.</p>
                        </div>
                    )}
                </main>
            </div>
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

      <section>
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">¿Por Qué Elegir PLES TIC?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Nos enfocamos en resultados tangibles, construyendo alianzas tecnológicas a largo plazo para el éxito de su organización.
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
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Servicios Tecnológicos Clave</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map(({icon: Icon, title, description, details, ctaLink, ctaText}) => (
              <Link key={title} href={ctaLink || '#'} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground bg-card group-hover:animate-gradient hover:bg-[length:200%_200%]">
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
