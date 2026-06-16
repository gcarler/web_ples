
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle, ArrowRight, Award, Banknote, BarChart3, BarChartHorizontalBig, Barcode, Bell, BookOpen, BookUser, Bot, Brain, BrainCircuit, Briefcase, Building, Building2, Calculator, Calendar, CalendarDays, Camera, CheckCircle, ChevronDown, ClipboardCheck, ClipboardEdit, ClipboardList, Clock, Cloud, CloudCog, Code, ConciergeBell, Cpu, CreditCard, Database, DraftingCompass, Edit, Eye, Factory, FileArchive, FileCheck, FileDigit, FileSearch, FileSignature, FileText, Filter, FlaskConical, FolderArchive, FolderKanban, GanttChartSquare, GitBranch, GitMerge, GitPullRequestArrow, Globe, GraduationCap, Headset, HeartPulse, HelpCircle, History, Home, Inbox, Info, KanbanSquare, KeyRound, Landmark, Layers, LayoutDashboard, LayoutTemplate, Lightbulb, Link as LinkIcon, ListOrdered, Lock, Mail, Map, MapPin, Megaphone, MessageCircle, MessagesSquare, MessageSquareDiff, MonitorSmartphone, MousePointerClick, Network, Package, PenSquare, Presentation, Printer, Receipt, Repeat, Rocket, Scale, School, Search, Send, Server, Settings, Share2, Shield, ShieldAlert, ShieldCheck, ShoppingBag, ShoppingCart, Tablet, Tags, Target, Timer, TrendingUp, Truck, UploadCloud, UserCheck, Users, Users2, UsersRound, Video, Warehouse, Workflow, Wrench, Zap
} from 'lucide-react';

const ofiPlesModules = {
    "Interacci?n con Cliente": {
        icon: UsersRound,
        description: "Herramientas para construir y gestionar su presencia en l?nea de manera integral.",
        items: [
          { name: "Plataforma Web", slug: "sitio-web", description: "Creador de sitios web empresariales", details: {
              mainIcon: Globe,
              title: 'Ofi-Ples Plataforma Web',
              description: 'Su plataforma todo-en-uno para crear, lanzar y gestionar sitios web empresariales de alto impacto. Sin necesidad de c?digo, con resultados profesionales.',
              keyServices: [
                { title: 'Editor Visual Intuitivo', text: 'Dise?e y modifique p?ginas con un potente sistema de arrastrar y soltar. Vea los cambios en tiempo real y construya su sitio de forma visual.', icon: MousePointerClick },
                { title: 'Plantillas Profesionales', text: 'Comience con buen pie eligiendo entre una amplia variedad de plantillas dise?adas por expertos y totalmente personalizables.', icon: LayoutTemplate },
                { title: 'Dise?o 100% Adaptable', text: 'Asegure que su sitio web se vea y funcione a la perfecci?n en cualquier dispositivo: m?viles, tabletas y computadoras de escritorio.', icon: MonitorSmartphone },
                { title: 'Herramientas SEO Integradas', text: 'Optimice su sitio para los motores de b?squeda con nuestras herramientas integradas para gestionar t?tulos, metadescripciones, sitemaps y m?s.', icon: Rocket },
              ],
              benefits: [
                'Lance su sitio web profesional en tiempo r?cord.',
                'Total autonom?a para actualizar y gestionar su contenido sin depender de terceros.',
                'Mejore su posicionamiento en Google y atraiga m?s clientes.',
                'Proyecte una imagen de marca s?lida, profesional y confiable.',
                'Integraci?n nativa con otros m?dulos de Ofi-Ples como Blog, Tienda y CRM.',
              ],
              ctaText: "Empezar a Construir mi Sitio",
              formSubject: "Consulta%20OfiPles%20Plataforma%20Web"
            }
          },
          { name: "Comercio Electr?nico", slug: "comercio-electronico", description: "Vende tus productos en l?nea", details: {
              mainIcon: ShoppingCart,
              title: 'Ofi-Ples Comercio Electr?nico',
              description: 'La soluci?n completa para lanzar y escalar su tienda en l?nea. Gestione productos, procese pagos y administre pedidos desde una ?nica plataforma integrada.',
              keyServices: [
                  { title: 'Cat?logo de Productos Avanzado', text: 'Gestione productos ilimitados, variantes (talla, color), inventario y precios de forma centralizada.', icon: ListOrdered },
                  { title: 'Pasarelas de Pago Seguras', text: 'Integre m?ltiples m?todos de pago locales e internacionales para ofrecer una experiencia de compra sin fricciones.', icon: CreditCard },
                  { title: 'Gesti?n de Pedidos y Env?os', text: 'Administre todo el ciclo de vida del pedido, desde la compra hasta la entrega, con seguimiento y notificaciones autom?ticas.', icon: Package },
                  { title: 'Herramientas de Marketing', text: 'Cree cupones de descuento, promociones y campa?as de recuperaci?n de carritos abandonados para impulsar sus ventas.', icon: Megaphone }
              ],
              benefits: [
                  'Venda sus productos 24/7 y alcance un mercado global.',
                  'Gesti?n de inventario centralizada que evita sobreventas.',
                  'Ofrezca una experiencia de compra segura y profesional.',
                  'Aumente la conversi?n con herramientas de marketing integradas.',
                  'Obtenga reportes detallados de ventas y rendimiento de productos.'
              ],
              ctaText: 'Comience a Vender en L?nea',
              formSubject: 'Consulta%20OfiPles%20Comercio%20Electronico'
          } },
          { name: "Blog", slug: "blog", description: "Publica entradas, anuncios y noticias", details: {
              mainIcon: Edit,
              title: 'Ofi-Ples Blog',
              description: 'Atraiga y fidelice a su audiencia con contenido de valor. Nuestro m?dulo de blog le permite crear, gestionar y optimizar sus publicaciones para llegar a m?s personas.',
              keyServices: [
                  { title: 'Editor de Contenido Avanzado', text: 'Cree art?culos atractivos con un editor intuitivo que soporta texto enriquecido, im?genes, videos y c?digo embebido.', icon: FileText },
                  { title: 'Gesti?n de Categor?as y Etiquetas', text: 'Organice su contenido de manera l?gica para mejorar la navegaci?n del usuario y la estructura de su sitio.', icon: Tags },
                  { title: 'Optimizaci?n SEO Integrada', text: 'Herramientas para personalizar URLs, metadatos y asegurar que su contenido sea amigable para los motores de b?squeda.', icon: BarChart3 },
                  { title: 'Programaci?n de Publicaciones', text: 'Planifique su calendario de contenidos y programe sus art?culos para que se publiquen autom?ticamente en la fecha y hora deseadas.', icon: CalendarDays }
              ],
              benefits: [
                  'Posicione su marca como un referente en su industria.',
                  'Atraiga tr?fico org?nico a su sitio web a trav?s de contenido relevante.',
                  'Fomente una comunidad alrededor de su marca.',
                  'Mejore el SEO de su sitio web de forma continua.',
                  'Genere leads y oportunidades de negocio a trav?s de su contenido.'
              ],
              ctaText: 'Empiece a Escribir su Historia',
              formSubject: 'Consulta%20OfiPles%20Blog'
          } },
          { name: "Foro", slug: "foro", description: "Gestiona un foro para preguntas frecuentes", details: {
              mainIcon: MessagesSquare,
              title: 'Ofi-Ples Foro',
              description: 'Cree una comunidad activa donde sus clientes y usuarios puedan interactuar, resolver dudas y compartir conocimientos. Fomente el engagement y reduzca la carga de soporte.',
              keyServices: [
                  { title: 'Creaci?n de Temas y Categor?as', text: 'Estructure su foro en categor?as y sub-foros para mantener las conversaciones organizadas y f?ciles de encontrar.', icon: FolderKanban },
                  { title: 'Perfiles de Usuario y Reputaci?n', text: 'Permita que los usuarios personalicen sus perfiles y gane reputaci?n a trav?s de sus contribuciones, incentivando la participaci?n.', icon: Users },
                  { title: 'Herramientas de Moderaci?n', text: 'Mantenga un ambiente sano y productivo con herramientas para moderar contenido, gestionar usuarios y prevenir el spam.', icon: Shield },
                  { title: 'Notificaciones y Suscripciones', text: 'Los usuarios pueden suscribirse a temas de su inter?s y recibir notificaciones de nuevas respuestas, manteniendo la comunidad activa.', icon: Bell }
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
          { name: "eLearning", slug: "elearning", description: "Gestiona y publica tus cursos", details: {
              mainIcon: GraduationCap,
              title: 'Ofi-Ples eLearning',
              description: 'Transforme su conocimiento en cursos en l?nea. Nuestra plataforma le permite crear, vender y gestionar experiencias de aprendizaje impactantes para su audiencia.',
              keyServices: [
                  { title: 'Constructor de Cursos Intuitivo', text: 'Estructure sus cursos con lecciones, videos, documentos, y otros recursos multimedia de forma sencilla.', icon: Layers },
                  { title: 'Evaluaciones y Cuestionarios', text: 'Cree quizzes y ex?menes para evaluar el progreso de los estudiantes y reforzar el aprendizaje.', icon: ClipboardCheck },
                  { title: 'Seguimiento del Progreso del Alumno', text: 'Monitoree el avance de cada estudiante, vea qu? lecciones han completado y qu? calificaciones han obtenido.', icon: BarChart3 },
                  { title: 'Certificados Personalizables', text: 'Emita certificados de finalizaci?n autom?ticamente a los estudiantes que completen sus cursos, a?adiendo valor a su oferta.', icon: Award }
              ],
              benefits: [
                  'Monetice su conocimiento y experiencia.',
                  'Ofrezca formaci?n a sus clientes, empleados o a una audiencia global.',
                  'Automatice el proceso de inscripci?n, pago y certificaci?n.',
                  'Cree una experiencia de aprendizaje profesional y atractiva.',
                  'Escale su oferta formativa sin limitaciones geogr?ficas.'
              ],
              ctaText: 'Cree su Academia en L?nea',
              formSubject: 'Consulta%20OfiPles%20eLearning'
          } },
          { name: "Chat en Vivo", slug: "chat-en-vivo", description: "Chatea con los visitantes de tu sitio web", details: {
              mainIcon: MessageCircle,
              title: 'Ofi-Ples Chat en Vivo',
              description: 'Conecte instant?neamente con los visitantes de su sitio web para resolver dudas, capturar leads y mejorar la conversi?n. No deje que un cliente potencial se vaya con preguntas sin responder.',
              keyServices: [
                  { title: 'Comunicaci?n en Tiempo Real', text: 'Interact?e en vivo con los visitantes, gui?ndolos a trav?s de su sitio y respondiendo preguntas al instante.', icon: Zap },
                  { title: 'Asistente IA (Opcional)', text: 'Configure un bot para que responda preguntas frecuentes 24/7 y califique leads, pasando solo las conversaciones importantes a su equipo.', icon: Bot },
                  { title: 'Historial de Conversaciones', text: 'Guarde todas las interacciones para un seguimiento posterior, asegurando un contexto completo en futuras conversaciones.', icon: ClipboardList },
                  { title: 'Disparadores y Mensajes Proactivos', text: 'Inicie conversaciones autom?ticamente basadas en el comportamiento del visitante, como el tiempo en una p?gina o una acci?n espec?fica.', icon: Target }
              ],
              benefits: [
                  'Aumente la tasa de conversi?n resolviendo dudas en el momento de la compra.',
                  'Mejore dr?sticamente la satisfacci?n del cliente con soporte inmediato.',
                  'Capture m?s leads cualificados directamente desde su sitio web.',
                  'Entienda mejor las necesidades y puntos de dolor de sus visitantes.',
                  'Ofrezca un canal de comunicaci?n moderno y preferido por muchos usuarios.'
              ],
              ctaText: 'Active su Chat en Vivo',
              formSubject: 'Consulta%20OfiPles%20Chat%20en%20Vivo'
          } }
        ]
    },
    "Ventas": {
        icon: ShoppingCart,
        description: "Optimice todo su ciclo de ventas, desde la captaci?n de clientes hasta la facturaci?n final.",
        items: [
          { name: "CRM", slug: "crm", description: "Gestiona tus leads y cierra oportunidades", details: {
              mainIcon: Users,
              title: 'Ofi-Ples CRM (Gesti?n de Relaciones con el Cliente)',
              description: 'Centralice la gesti?n de sus clientes y oportunidades de venta. Obtenga una vista 360° de cada interacci?n y optimice su proceso comercial para cerrar m?s negocios, m?s r?pido.',
              keyServices: [
                  { title: 'Gesti?n de Contactos y Empresas', text: 'Mantenga una base de datos centralizada y limpia de todos sus prospectos, clientes y las organizaciones a las que pertenecen.', icon: Users2 },
                  { title: 'Pipeline de Ventas Visual', text: 'Visualice y gestione sus oportunidades de negocio a trav?s de etapas personalizables en un tablero Kanban intuitivo.', icon: KanbanSquare },
                  { title: 'Registro de Actividades', text: 'Registre todas las interacciones (llamadas, reuniones, correos) asociadas a un contacto u oportunidad para un seguimiento completo.', icon: ClipboardList },
                  { title: 'Automatizaci?n y Recordatorios', text: 'Configure recordatorios autom?ticos para seguimientos y automatice tareas repetitivas para que su equipo se enfoque en vender.', icon: Clock }
              ],
              benefits: [
                  'Nunca pierda una oportunidad de venta por falta de seguimiento.',
                  'Mejore la colaboraci?n y visibilidad dentro de su equipo de ventas.',
                  'Tome decisiones basadas en datos con reportes de rendimiento precisos.',
                  'Aumente la productividad de su equipo comercial.',
                  'Construya relaciones m?s s?lidas y duraderas con sus clientes.'
              ],
              ctaText: 'Optimice su Proceso de Ventas',
              formSubject: 'Consulta%20OfiPles%20CRM'
          } },
          { name: "Ventas", slug: "ventas", description: "De cotizaciones a facturas", details: {
              mainIcon: FileText,
              title: 'Ofi-Ples Ventas',
              description: 'Agilice su proceso de ventas con una herramienta que le permite crear y enviar cotizaciones profesionales, gestionar pedidos y convertirlos en facturas con un solo clic.',
              keyServices: [
                  { title: 'Creaci?n de Cotizaciones', text: 'Genere cotizaciones personalizadas y profesionales con su marca, productos y precios en minutos.', icon: ClipboardEdit },
                  { title: 'Gesti?n de Pedidos de Venta', text: 'Convierta cotizaciones aprobadas en pedidos de venta, activando los procesos de log?stica y facturaci?n.', icon: Package },
                  { title: 'Listas de Precios M?ltiples', text: 'Defina diferentes listas de precios por tipo de cliente, volumen o regi?n, y apl?quelas autom?ticamente.', icon: BarChart3 },
                  { title: 'Integraci?n con CRM e Inventario', text: 'Conectado nativamente con su CRM para obtener datos del cliente y con Inventario para verificar disponibilidad de stock.', icon: GitMerge }
              ],
              benefits: [
                  'Reduzca el tiempo necesario para crear y enviar cotizaciones.',
                  'Evite errores manuales y asegure la consistencia en sus precios.',
                  'Mejore la comunicaci?n entre los equipos de ventas y log?stica.',
                  'Ofrezca una experiencia profesional y ?gil a sus clientes.',
                  'Tenga una visibilidad clara del flujo de pedidos y ventas pendientes.'
              ],
              ctaText: 'Agilice sus Cotizaciones',
              formSubject: 'Consulta%20OfiPles%20Ventas'
          } },
          { name: "Punto de Venta", slug: "punto-de-venta", description: "Interfaz para tiendas y restaurantes", details: {
              mainIcon: Tablet,
              title: 'Ofi-Ples Punto de Venta (POS)',
              description: 'Una interfaz de punto de venta r?pida, intuitiva y potente para su tienda f?sica o restaurante. Funciona en cualquier dispositivo y se integra perfectamente con su inventario y contabilidad.',
              keyServices: [
                  { title: 'Interfaz R?pida y T?ctil', text: 'Dise?ado para la velocidad, con una interfaz limpia y optimizada para pantallas t?ctiles que minimiza los clics.', icon: MousePointerClick },
                  { title: 'Gesti?n de Pagos M?ltiples', text: 'Acepte efectivo, tarjetas de cr?dito/d?bito y otros m?todos de pago de forma integrada y segura.', icon: CreditCard },
                  { title: 'Integraci?n de Hardware', text: 'Compatible con impresoras de recibos, lectores de c?digos de barras y cajones de dinero para una operaci?n fluida.', icon: Printer },
                  { title: 'Sincronizaci?n en Tiempo Real', text: 'Las ventas actualizan autom?ticamente su inventario y registros contables, proporcionando datos precisos al instante.', icon: Zap }
              ],
              benefits: [
                  'Acelere el proceso de cobro y reduzca las colas.',
                  'Mantenga su inventario siempre actualizado, tanto en tienda f?sica como online.',
                  'Simplifique la contabilidad con la conciliaci?n autom?tica de ventas.',
                  'Funciona incluso con conexiones a internet intermitentes.',
                  'Obtenga reportes detallados de ventas por tienda, empleado o producto.'
              ],
              ctaText: 'Modernice su Punto de Venta',
              formSubject: 'Consulta%20OfiPles%20Punto%20de%20Venta'
          } },
          { name: "Suscripciones", slug: "suscripciones", description: "Facturas recurrentes y renovaciones", details: {
              mainIcon: Repeat,
              title: 'Ofi-Ples Suscripciones',
              description: 'Gestione modelos de negocio basados en ingresos recurrentes. Automatice la facturaci?n, gestione planes y suscripciones, y reduzca la p?rdida de clientes (churn).',
              keyServices: [
                  { title: 'Facturaci?n Recurrente Autom?tica', text: 'Configure planes y deje que el sistema genere y env?e facturas autom?ticamente seg?n la periodicidad definida (mensual, anual, etc.).', icon: Zap },
                  { title: 'Gesti?n de Planes y Actualizaciones', text: 'Cree diferentes niveles de planes y permita que los clientes mejoren (upgrade) o reduzcan (downgrade) su suscripci?n f?cilmente.', icon: Layers },
                  { title: 'Manejo de Pagos Fallidos (Dunning)', text: 'Automatice el proceso de reintento de cobro y notificaciones para pagos fallidos, reduciendo el churn involuntario.', icon: AlertTriangle },
                  { title: 'M?tricas Clave de Suscripci?n (MRR, Churn)', text: 'Obtenga un tablero con las m?tricas m?s importantes para su negocio de suscripci?n, como Ingreso Mensual Recurrente y tasa de abandono.', icon: BarChart3 }
              ],
              benefits: [
                  'Asegure un flujo de caja predecible con ingresos recurrentes.',
                  'Reduzca la carga administrativa asociada a la facturaci?n manual.',
                  'Mejore la retenci?n de clientes con una gesti?n profesional.',
                  'Facilite el crecimiento y la escalabilidad de su modelo de negocio.',
                  'Tome decisiones estrat?gicas basadas en m?tricas de suscripci?n precisas.'
              ],
              ctaText: 'Automatice sus Ingresos Recurrentes',
              formSubject: 'Consulta%20OfiPles%20Suscripciones'
          } },
          { name: "Alquiler", slug: "alquiler", description: "Gestiona contratos y disponibilidad", details: {
              mainIcon: KeyRound,
              title: 'Ofi-Ples Alquiler',
              description: 'Una soluci?n completa para gestionar su negocio de alquiler. Controle la disponibilidad de sus productos, gestione contratos y programe recogidas y devoluciones desde un solo lugar.',
              keyServices: [
                  { title: 'Calendario de Disponibilidad Visual', text: 'Vea la disponibilidad de sus productos de alquiler en un calendario tipo Gantt, evitando reservas duplicadas.', icon: Calendar },
                  { title: 'Gesti?n de Contratos de Alquiler', text: 'Cree, env?e y gestione contratos de alquiler, incluyendo t?rminos, condiciones y firmas electr?nicas.', icon: FileSignature },
                  { title: 'Programaci?n de Entregas y Recogidas', text: 'Organice la log?stica de sus alquileres, asignando fechas y responsables para las entregas y devoluciones.', icon: Truck },
                  { title: 'Facturaci?n Flexible', text: 'Genere facturas autom?ticamente al inicio, al final o durante el per?odo de alquiler, seg?n sus reglas de negocio.', icon: Receipt }
              ],
              benefits: [
                  'Maximice la utilizaci?n de sus productos de alquiler.',
                  'Simplifique la gesti?n administrativa y contractual.',
                  'Ofrezca una experiencia de reserva clara y sin errores a sus clientes.',
                  'Mejore la planificaci?n log?stica y la eficiencia operativa.',
                  'Total integraci?n con los m?dulos de Ventas y Contabilidad.'
              ],
              ctaText: 'Optimice su Negocio de Alquiler',
              formSubject: 'Consulta%20OfiPles%20Alquiler'
          } }
        ]
    },
    "Finanzas": {
        icon: Landmark,
        description: "Controle la salud financiera de su empresa con herramientas contables y de facturaci?n robustas.",
        items: [
          { name: "Contabilidad", slug: "contabilidad", description: "Gestiona tu contabilidad financiera", details: {
              mainIcon: BookUser,
              title: 'Ofi-Ples Contabilidad',
              description: 'Un sistema contable completo y flexible que simplifica la gesti?n financiera de su empresa, automatiza asientos y genera informes precisos para el cumplimiento y la toma de decisiones.',
              keyServices: [
                  { title: 'Plan de Cuentas Personalizable', text: 'Adapte el plan de cuentas a la estructura de su empresa y a las normativas locales.', icon: Settings },
                  { title: 'Automatizaci?n de Asientos Contables', text: 'Los asientos se generan autom?ticamente a partir de facturas, pagos, gastos y movimientos de inventario.', icon: Zap },
                  { title: 'Informes Financieros en Tiempo Real', text: 'Genere balances, estados de resultados, libros mayores y otros informes financieros con datos siempre actualizados.', icon: BarChart3 },
                  { title: 'Conciliaci?n Bancaria Inteligente', text: 'Importe extractos bancarios y concilie transacciones de forma r?pida y sencilla con sugerencias autom?ticas.', icon: GitMerge }
              ],
              benefits: [
                  'Asegure el cumplimiento de las normativas fiscales y contables.',
                  'Reduzca el tiempo dedicado a tareas contables manuales.',
                  'Obtenga una visi?n clara y precisa de la salud financiera de su empresa.',
                  'Facilite las auditor?as con informaci?n organizada y trazable.',
                  'Tome decisiones estrat?gicas basadas en informes financieros confiables.'
              ],
              ctaText: 'Simplifique su Contabilidad',
              formSubject: 'Consulta%20OfiPles%20Contabilidad'
          } },
          { name: "Facturaci?n", slug: "facturacion", description: "Facturas y pagos", details: {
              mainIcon: Receipt,
              title: 'Ofi-Ples Facturaci?n',
              description: 'Cree y env?e facturas profesionales, gestione pagos y haga seguimiento de sus cuentas por cobrar de manera eficiente. Integrado con su contabilidad para una gesti?n impecable.',
              keyServices: [
                  { title: 'Creaci?n R?pida de Facturas', text: 'Genere facturas a partir de pedidos de venta, hojas de horas o de forma manual con plantillas personalizables.', icon: FileDigit },
                  { title: 'Seguimiento de Pagos', text: 'Registre pagos parciales o completos, y vea f?cilmente el estado de cada factura (borrador, enviada, pagada, vencida).', icon: CheckCircle },
                  { title: 'Recordatorios de Pago Autom?ticos', text: 'Configure y automatice el env?o de correos de recordatorio para facturas vencidas, mejorando el flujo de caja.', icon: Clock },
                  { title: 'Facturaci?n Electr?nica (Opcional)', text: 'Cumpla con la normativa de facturaci?n electr?nica de su pa?s mediante integraciones con proveedores autorizados.', icon: Cloud }
              ],
              benefits: [
                  'Acelere su ciclo de cobro y mejore su flujo de caja.',
                  'Proyecte una imagen profesional con facturas claras y personalizadas.',
                  'Reduzca el tiempo administrativo dedicado al seguimiento de pagos.',
                  'Mantenga un registro claro y organizado de todas sus transacciones.',
                  'Evite errores con la creaci?n de facturas a partir de datos existentes.'
              ],
              ctaText: 'Optimice su Facturaci?n',
              formSubject: 'Consulta%20OfiPles%20Facturacion'
          } },
          { name: "Gastos", slug: "gastos", description: "Gestiona los gastos de tus empleados", details: {
              mainIcon: CreditCard,
              title: 'Ofi-Ples Gastos',
              description: 'Simplifique el proceso de reporte y aprobaci?n de gastos de los empleados. Desde la captura del recibo hasta el reembolso y la contabilizaci?n, todo en un flujo de trabajo digital.',
              keyServices: [
                  { title: 'Reporte de Gastos Simplificado', text: 'Los empleados pueden registrar gastos f?cilmente, incluso tomando una foto del recibo desde su m?vil.', icon: Camera },
                  { title: 'Flujos de Aprobaci?n Personalizables', text: 'Defina flujos de aprobaci?n multinivel. Los gerentes pueden aprobar o rechazar gastos desde cualquier dispositivo.', icon: Workflow },
                  { title: 'Integraci?n con Contabilidad', text: 'Una vez aprobados, los gastos generan autom?ticamente los asientos contables correspondientes, listos para su reembolso.', icon: GitMerge },
                  { title: 'Gesti?n de Adelantos y Reembolsos', text: 'Controle los adelantos de efectivo y gestione los reembolsos a empleados de manera centralizada.', icon: Banknote }
              ],
              benefits: [
                  'Ahorre tiempo a sus empleados y gerentes en la gesti?n de gastos.',
                  'Mejore el control y la visibilidad sobre los gastos de la empresa.',
                  'Elimine el papeleo y los procesos manuales.',
                  'Acelere el proceso de reembolso a los empleados.',
                  'Asegure que los gastos se registren correctamente en la contabilidad.'
              ],
              ctaText: 'Digitalice la Gesti?n de Gastos',
              formSubject: 'Consulta%20OfiPles%20Gastos'
          } },
          { name: "Documentos", slug: "documentos", description: "Gesti?n de documentos", details: {
              mainIcon: FolderArchive,
              title: 'Ofi-Ples Documentos',
              description: 'Un sistema de gesti?n documental colaborativo y seguro. Organice, comparta y controle el acceso a todos los archivos de su empresa en un espacio de trabajo centralizado.',
              keyServices: [
                  { title: 'Organizaci?n por Espacios de Trabajo', text: 'Cree carpetas y subcarpetas para organizar sus documentos por proyecto, departamento o cualquier otra estructura l?gica.', icon: FolderKanban },
                  { title: 'Control de Versiones', text: 'Mantenga un historial de cambios para cada documento, permiti?ndole revisar y restaurar versiones anteriores f?cilmente.', icon: GitMerge },
                  { title: 'Compartir de Forma Segura', text: 'Comparta archivos y carpetas con usuarios internos o externos mediante enlaces seguros con fecha de vencimiento.', icon: Share2 },
                  { title: 'Flujos de Trabajo de Aprobaci?n', text: 'Defina flujos de aprobaci?n para documentos que requieran revisi?n, como contratos o pol?ticas internas.', icon: Workflow }
              ],
              benefits: [
                  'Centralice todos sus documentos en una ?nica fuente de verdad.',
                  'Mejore la colaboraci?n y evite la duplicaci?n de archivos.',
                  'Asegure que su equipo siempre trabaje con la ?ltima versi?n de un documento.',
                  'Controle qui?n puede ver, editar y compartir informaci?n sensible.',
                  'Acceda a sus archivos desde cualquier lugar y dispositivo.'
              ],
              ctaText: 'Centralice sus Documentos',
              formSubject: 'Consulta%20OfiPles%20Documentos'
          } },
          { name: "Firma Electr?nica", slug: "firma-electronica", description: "Firma documentos en l?nea", details: {
              mainIcon: PenSquare,
              title: 'Ofi-Ples Firma Electr?nica',
              description: 'Acelere sus acuerdos y contratos. Env?e, firme y gestione documentos de forma electr?nica con plena validez legal, sin necesidad de imprimir ni escanear.',
              keyServices: [
                  { title: 'Env?o F?cil para Firma', text: 'Suba un documento PDF, arrastre y suelte los campos de firma y env?elo a una o varias personas para que lo firmen.', icon: Send },
                  { title: 'Firma desde Cualquier Dispositivo', text: 'Los firmantes pueden revisar y firmar documentos desde su computadora, tableta o smartphone de forma intuitiva.', icon: MousePointerClick },
                  { title: 'Pista de Auditor?a Completa', text: 'Cada acci?n (env?o, visualizaci?n, firma) queda registrada con fecha, hora y direcci?n IP, garantizando la trazabilidad.', icon: FileCheck },
                  { title: 'Plantillas Reutilizables', text: 'Guarde documentos de uso frecuente como plantillas para agilizar el env?o de contratos o acuerdos est?ndar.', icon: LayoutTemplate }
              ],
              benefits: [
                  'Reduzca dr?sticamente el tiempo para cerrar acuerdos.',
                  'Elimine los costos asociados a la impresi?n, env?o y almacenamiento de papel.',
                  'Mejore la experiencia de sus clientes, socios y empleados.',
                  'Aumente la seguridad y el control sobre sus documentos importantes.',
                  'Contribuya a la sostenibilidad reduciendo el consumo de papel.'
              ],
              ctaText: 'Acelere sus Contratos',
              formSubject: 'Consulta%20OfiPles%20Firma%20Electronica'
          } }
        ]
    },
    "Operaciones": {
        icon: Warehouse,
        description: "Gestione eficientemente su cadena de suministro, producci?n y control de calidad.",
        items: [
          { name: "Inventario", slug: "inventario", description: "Gestiona tu inventario y log?stica", details: {
              mainIcon: Warehouse,
              title: 'Ofi-Ples Inventario',
              description: 'Optimice toda su cadena de suministro con un sistema de gesti?n de inventario de doble entrada. Controle cada movimiento, desde la recepci?n hasta la entrega al cliente.',
              keyServices: [
                  { title: 'Trazabilidad Completa', text: 'Rastree cada producto con n?meros de serie o lotes, desde su origen hasta su destino final.', icon: Barcode },
                  { title: 'Gesti?n Multi-Almac?n', text: 'Administre el stock en m?ltiples almacenes y ubicaciones, y defina reglas de reabastecimiento entre ellos.', icon: Building2 },
                  { title: 'Rutas Log?sticas Avanzadas', text: 'Configure reglas para automatizar las transferencias, como el cross-docking o el dropshipping.', icon: Workflow },
                  { title: 'Valoraci?n de Inventario', text: 'Utilice m?todos de costeo como FIFO o Costo Promedio, y obtenga informes de valoraci?n en tiempo real.', icon: Calculator }
              ],
              benefits: [
                  'Reduzca los quiebres de stock y el exceso de inventario.',
                  'Aumente la eficiencia de sus operaciones de almac?n.',
                  'Mejore la precisi?n de su inventario y reduzca las p?rdidas.',
                  'Obtenga una visibilidad completa de su cadena de suministro.',
                  'Tome decisiones de compra m?s inteligentes basadas en datos reales.'
              ],
              ctaText: 'Controle su Inventario',
              formSubject: 'Consulta%20OfiPles%20Inventario'
          } },
          { name: "Manufactura", slug: "manufactura", description: "?rdenes de fabricaci?n y listas de materiales", details: {
              mainIcon: Factory,
              title: 'Ofi-Ples Manufactura (MRP)',
              description: 'Planifique, programe y controle su producci?n de principio a fin. Gestione listas de materiales, ?rdenes de fabricaci?n y centros de trabajo para optimizar su planta.',
              keyServices: [
                  { title: 'Listas de Materiales (BoM)', text: 'Cree y gestione listas de materiales de m?ltiples niveles y versiones para sus productos.', icon: ClipboardList },
                  { title: 'Planificaci?n y ?rdenes de Producci?n', text: 'Genere ?rdenes de fabricaci?n y controle el consumo de materiales y el tiempo de producci?n.', icon: GanttChartSquare },
                  { title: 'Gesti?n de Centros de Trabajo', text: 'Organice su planta en centros de trabajo, defina sus capacidades y siga el rendimiento de cada uno.', icon: Settings },
                  { title: 'Informes de Producci?n', text: 'Analice la eficiencia de su producci?n, los costos y los tiempos con informes detallados.', icon: BarChart3 }
              ],
              benefits: [
                  'Optimice la planificaci?n de sus necesidades de materiales (MRP).',
                  'Mejore la eficiencia y la productividad de su planta.',
                  'Reduzca los tiempos de ciclo y los costos de producci?n.',
                  'Obtenga visibilidad en tiempo real del estado de cada orden de fabricaci?n.',
                  'Facilite la toma de decisiones con datos de producci?n precisos.'
              ],
              ctaText: 'Optimice su Producci?n',
              formSubject: 'Consulta%20OfiPles%20Manufactura'
          } },
          { name: "PLM", slug: "plm", description: "Gesti?n del Ciclo de Vida del Producto", details: {
              mainIcon: GitPullRequestArrow,
              title: 'Ofi-Ples Gesti?n del Ciclo de Vida del Producto (PLM)',
              description: 'Plataforma colaborativa para gestionar todo el ciclo de vida de un producto, desde su concepci?n y dise?o hasta su fabricaci?n y eventual retirada del mercado.',
              keyServices: [
                  { title: 'Gesti?n de Versiones (LdM/BOM)', text: 'Cree y gestione listas de materiales (LdM) de m?ltiples niveles y versiones, y controle los cambios con un sistema de versionado.', icon: GitMerge },
                  { title: '?rdenes de Cambio de Ingenier?a (ECO)', text: 'Gestione los procesos de cambio de ingenier?a de manera controlada, asegurando que todas las partes interesadas aprueben las modificaciones.', icon: ClipboardCheck },
                  { title: 'Centralizaci?n de Documentaci?n T?cnica', text: 'Vincule planos, especificaciones y otros documentos t?cnicos a cada versi?n del producto, asegurando una ?nica fuente de verdad.', icon: FileArchive },
                  { title: 'Flujos de Aprobaci?n Colaborativos', text: 'Defina flujos de trabajo para la revisi?n y aprobaci?n de nuevos dise?os o cambios, involucrando a los equipos de ingenier?a, calidad y producci?n.', icon: Workflow }
              ],
              benefits: [
                  'Acelera el tiempo de lanzamiento de nuevos productos al mercado (time-to-market).',
                  'Reduce errores y costos asociados a cambios de dise?o no controlados.',
                  'Mejora la colaboraci?n entre los equipos de dise?o, ingenier?a y producci?n.',
                  'Asegura que la fabricaci?n siempre utilice la versi?n m?s reciente y aprobada de un dise?o.',
                  'Proporciona una trazabilidad completa del historial de cambios de un producto.'
              ],
              ctaText: 'Controle el Ciclo de Vida',
              formSubject: 'Consulta%20OfiPles%20PLM'
          } },
          { name: "Compra", slug: "compra", description: "Gesti?n de compras y proveedores", details: {
              mainIcon: ShoppingBag,
              title: 'Ofi-Ples Compra',
              description: 'Automatice y optimice todo el ciclo de aprovisionamiento, desde la identificaci?n de una necesidad hasta el pago al proveedor (procure-to-pay).',
              keyServices: [
                  { title: 'Solicitudes de Cotizaci?n (RFQ)', text: 'Gestione solicitudes de cotizaci?n a m?ltiples proveedores y compare sus ofertas de manera estandarizada.', icon: FileText },
                  { title: '?rdenes de Compra y Aprobaciones', text: 'Cree y env?e ?rdenes de compra, y gestione flujos de aprobaci?n para controlar el gasto.', icon: CheckCircle },
                  { title: 'Gesti?n de Proveedores', text: 'Mantenga una base de datos de sus proveedores, gestione sus acuerdos de compra y eval?e su rendimiento.', icon: Users },
                  { title: 'Recepci?n y Verificaci?n de Mercanc?a', text: 'Controle la recepci?n de productos en su almac?n, comparando la entrega con la orden de compra.', icon: Package }
              ],
              benefits: [
                  'Reduce los costos de adquisici?n a trav?s de una mejor negociaci?n y comparaci?n.',
                  'Aumenta la eficiencia del proceso de compra gracias a la automatizaci?n.',
                  'Mejora el control sobre los gastos y el cumplimiento de las pol?ticas de compra.',
                  'Fortalece las relaciones con los proveedores a trav?s de una comunicaci?n transparente.',
                  'Asegura el suministro oportuno de bienes y servicios.'
              ],
              ctaText: 'Optimice sus Compras',
              formSubject: 'Consulta%20OfiPles%20Compra'
          } },
          { name: "Mantenimiento", slug: "mantenimiento", description: "Mantenimiento preventivo y correctivo", details: {
              mainIcon: Wrench,
              title: 'Ofi-Ples Mantenimiento',
              description: 'Maximice la disponibilidad y la fiabilidad de sus activos productivos, como maquinaria y equipos, a trav?s de una estrategia de mantenimiento proactiva.',
              keyServices: [
                  { title: 'Gesti?n de Equipos y Activos', text: 'Mantenga un registro centralizado de todos sus equipos, incluyendo su historial de mantenimiento y documentaci?n t?cnica.', icon: Briefcase },
                  { title: 'Mantenimiento Preventivo', text: 'Planifique y programe actividades de mantenimiento basadas en el tiempo o en el uso para prevenir aver?as.', icon: Calendar },
                  { title: 'Mantenimiento Correctivo', text: 'Gestione las solicitudes de mantenimiento cuando se produce una aver?a, desde la creaci?n del ticket hasta la resoluci?n.', icon: AlertTriangle },
                  { title: 'Informes de Rendimiento de Equipos', text: 'Analice m?tricas como el tiempo medio entre fallos (MTBF) y el tiempo medio de reparaci?n (MTTR) para optimizar su estrategia.', icon: BarChart3 }
              ],
              benefits: [
                  'Reduce los costos asociados a las reparaciones de emergencia.',
                  'Minimiza los tiempos de inactividad no planificados de la producci?n.',
                  'Prolonga la vida ?til de sus activos m?s importantes.',
                  'Mejora la seguridad en la planta de producci?n.',
                  'Permite pasar a un modelo de mantenimiento predictivo (PdM).'
              ],
              ctaText: 'Maximice la Vida de sus Activos',
              formSubject: 'Consulta%20OfiPles%20Mantenimiento'
          } },
          { name: "Calidad", slug: "calidad", description: "Control de calidad y no conformidades", details: {
              mainIcon: ShieldCheck,
              title: 'Ofi-Ples Calidad',
              description: 'Integre la gesti?n de la calidad en todos sus procesos operativos para asegurar que los productos cumplan con las especificaciones y reducir los costos de no calidad.',
              keyServices: [
                  { title: 'Planes de Control de Calidad', text: 'Defina los puntos de inspecci?n y las pruebas de calidad que se deben realizar en diferentes etapas (recepci?n, producci?n, etc.).', icon: ClipboardCheck },
                  { title: 'Gesti?n de Alertas de Calidad', text: 'Registre y gestione las no conformidades, activando flujos de trabajo para su an?lisis y resoluci?n.', icon: Bell },
                  { title: 'An?lisis de Causa Ra?z', text: 'Utilice herramientas de calidad para identificar la causa ra?z de los problemas y definir acciones correctivas y preventivas.', icon: BrainCircuit },
                  { title: 'Informes de Calidad', text: 'Analice las tendencias de la calidad, los costos de no calidad y el rendimiento de los proveedores.', icon: BarChart3 }
              ],
              benefits: [
                  'Mejora la calidad y la consistencia de sus productos.',
                  'Reduce el desperdicio, el retrabajo y las devoluciones.',
                  'Aumenta la satisfacci?n y la confianza de sus clientes.',
                  'Facilita el cumplimiento de normativas y certificaciones como ISO 9001.',
                  'Fomenta una cultura de mejora continua en toda la organizaci?n.'
              ],
              ctaText: 'Asegure su Calidad',
              formSubject: 'Consulta%20OfiPles%20Calidad'
          } }
        ]
    },
    "Recursos Humanos": {
        icon: Users2,
        description: "Administre el ciclo de vida completo de sus empleados, desde la contrataci?n hasta la evaluaci?n.",
        items: [
          { name: "Empleados", slug: "empleados", description: "Centraliza la informaci?n de tus empleados", details: {
              mainIcon: Users,
              title: 'Ofi-Ples Empleados',
              description: 'Centralice toda la informaci?n de su equipo en un solo lugar. Gestione perfiles, contratos, ausencias y mucho m?s, de forma segura y accesible.',
              keyServices: [
                  { title: 'Directorio de Empleados', text: 'Mantenga una base de datos centralizada con toda la informaci?n relevante de cada empleado, desde datos de contacto hasta roles y departamentos.', icon: Users2 },
                  { title: 'Gesti?n de Contratos', text: 'Administre los contratos de sus empleados, con alertas autom?ticas para fechas de vencimiento y renovaciones.', icon: FileSignature },
                  { title: 'Control de Asistencia y Ausencias', text: 'Registre las ausencias (vacaciones, bajas m?dicas) y realice un seguimiento de la asistencia de forma sencilla.', icon: CalendarDays },
                  { title: 'Portal del Empleado', text: 'Ofrezca a sus empleados un portal de autoservicio donde pueden consultar su informaci?n, solicitar ausencias y m?s.', icon: UserCheck }
              ],
              benefits: [
                  'Tenga toda la informaci?n de RRHH organizada y accesible.',
                  'Reduzca la carga administrativa del departamento de RRHH.',
                  'Mejore la comunicaci?n y la transparencia con sus empleados.',
                  'Asegure el cumplimiento de las pol?ticas de la empresa.',
                  'Facilite la incorporaci?n (onboarding) de nuevos empleados.'
              ],
              ctaText: 'Gestione su Talento',
              formSubject: 'Consulta%20OfiPles%20Empleados'
          } },
          { name: "Reclutamiento", slug: "reclutamiento", description: "Monitorea tu flujo de reclutamiento", details: {
              mainIcon: Briefcase,
              title: 'Ofi-Ples Reclutamiento',
              description: 'Atraiga y contrate al mejor talento. Gestione todo su proceso de selecci?n, desde la publicaci?n de ofertas hasta la contrataci?n, en una plataforma colaborativa.',
              keyServices: [
                  { title: 'Portal de Empleo Personalizado', text: 'Publique sus ofertas de trabajo en una p?gina de empleo con su propia marca, integrada en su sitio web.', icon: Megaphone },
                  { title: 'Pipeline de Candidatos Visual', text: 'Organice a los candidatos en etapas (nuevo, entrevista, oferta) en un tablero Kanban para un seguimiento claro.', icon: KanbanSquare },
                  { title: 'Base de Datos de Talentos', text: 'Construya su propio banco de talentos con los perfiles de todos los candidatos que han aplicado.', icon: Database },
                  { title: 'Comunicaci?n y Programaci?n', text: 'Env?e correos autom?ticos, programe entrevistas y comun?quese con los candidatos directamente desde la plataforma.', icon: Mail }
              ],
              benefits: [
                  'Optimice y acelere su proceso de contrataci?n.',
                  'Mejore la experiencia de los candidatos.',
                  'Fomente la colaboraci?n entre reclutadores y gerentes contratantes.',
                  'Tome decisiones de contrataci?n m?s informadas.',
                  'Construya una marca empleadora s?lida.'
              ],
              ctaText: 'Atraiga al Mejor Talento',
              formSubject: 'Consulta%20OfiPles%20Reclutamiento'
          } },
          { name: "Evaluaciones", slug: "evaluaciones", description: "Eval?a a tus empleados", details: {
              mainIcon: ClipboardCheck,
              title: 'Ofi-Ples Evaluaciones',
              description: 'Fomente una cultura de mejora continua con un sistema de evaluaci?n del desempe?o flexible y colaborativo. Defina objetivos, recopile feedback y cree planes de desarrollo.',
              keyServices: [
                  { title: 'Evaluaciones Peri?dicas', text: 'Programe y realice evaluaciones de desempe?o (anuales, semestrales) con formularios y flujos de trabajo personalizables.', icon: Calendar },
                  { title: 'Feedback 360°', text: 'Recopile retroalimentaci?n de pares, gerentes y subordinados para obtener una visi?n completa del desempe?o de cada empleado.', icon: UsersRound },
                  { title: 'Definici?n de Objetivos (OKRs)', text: 'Establezca y d? seguimiento a los objetivos individuales y de equipo, aline?ndolos con la estrategia de la empresa.', icon: Target },
                  { title: 'Planes de Desarrollo Individual', text: 'Cree planes de acci?n y desarrollo basados en los resultados de las evaluaciones para potenciar el crecimiento de su talento.', icon: TrendingUp }
              ],
              benefits: [
                  'Alinee los objetivos individuales con los de la empresa.',
                  'Fomente una comunicaci?n abierta y constructiva sobre el desempe?o.',
                  'Identifique y desarrolle el talento interno.',
                  'Tome decisiones justas y basadas en datos sobre promociones y compensaci?n.',
                  'Aumente la motivaci?n y el compromiso de los empleados.'
              ],
              ctaText: 'Potencie el Desempe?o',
              formSubject: 'Consulta%20OfiPles%20Evaluaciones'
          } }
        ]
    },
    "Marketing": {
        icon: Megaphone,
        description: "Cree, automatice y mida sus campa?as de marketing para llegar a su p?blico objetivo.",
        items: [
            { name: "Marketing por Correo Electr?nico", slug: "email-marketing", description: "Dise?a, env?a y monitorea correos electr?nicos", details: {
                mainIcon: Mail,
                title: 'Ofi-Ples Marketing por Correo Electr?nico',
                description: 'Cree y env?e campa?as de email marketing impactantes. Desde newsletters hasta promociones, nuestra herramienta le ayuda a conectar con su audiencia y obtener resultados medibles.',
                keyServices: [
                    { title: 'Editor de Arrastrar y Soltar', text: 'Dise?e correos visualmente atractivos sin necesidad de c?digo, utilizando un editor intuitivo y plantillas profesionales.', icon: LayoutTemplate },
                    { title: 'Segmentaci?n de Audiencias', text: 'Env?e el mensaje correcto a la persona correcta segmentando sus listas de contactos en base a sus intereses y comportamiento.', icon: Filter },
                    { title: 'Informes y Anal?ticas', text: 'Mida el ?xito de sus campa?as con m?tricas clave como tasas de apertura, clics y conversiones.', icon: BarChart3 },
                    { title: 'Pruebas A/B', text: 'Optimice sus resultados probando diferentes asuntos, contenidos o llamadas a la acci?n para ver qu? funciona mejor.', icon: FlaskConical }
                ],
                benefits: [
                    'Mantenga a su audiencia informada y comprometida.',
                    'Genere tr?fico a su sitio web y aumente las ventas.',
                    'Construya relaciones duraderas con sus clientes.',
                    'Personalice la comunicaci?n a gran escala.',
                    'Obtenga un alto retorno de la inversi?n en sus esfuerzos de marketing.'
                ],
                ctaText: 'Cree su Pr?xima Campa?a',
                formSubject: 'Consulta%20OfiPles%20Marketing%20por%20Correo'
            } }
        ]
    },
    "Servicios": {
        icon: ConciergeBell,
        description: "Gestione proyectos, soporte y servicios de campo con herramientas dise?adas para la eficiencia.",
        items: [
          { name: "Proyecto", slug: "proyecto", description: "Organiza y planea tus proyectos", details: {
              mainIcon: Briefcase,
              title: 'Ofi-Ples Proyecto',
              description: 'Planifique, siga y gestione sus proyectos de forma colaborativa. Obtenga una visi?n clara del progreso, gestione recursos y asegure entregas a tiempo y dentro del presupuesto.',
              keyServices: [
                  { title: 'Vista de Tareas (Kanban, Gantt)', text: 'Visualice sus proyectos y tareas en diferentes formatos, como tableros Kanban, diagramas de Gantt y listas.', icon: KanbanSquare },
                  { title: 'Gesti?n de Hojas de Horas', text: 'Registre el tiempo dedicado a cada tarea para un seguimiento preciso de los costos y la rentabilidad del proyecto.', icon: Clock },
                  { title: 'An?lisis de Rentabilidad', text: 'Compare los costos planificados con los reales y analice la rentabilidad de cada proyecto con informes detallados.', icon: BarChart3 },
                  { title: 'Colaboraci?n en Tareas', text: 'Comun?quese con su equipo, comparta documentos y siga el progreso directamente en cada tarea del proyecto.', icon: MessageSquareDiff }
              ],
              benefits: [
                  'Mejore la visibilidad y el control sobre todos sus proyectos.',
                  'Asegure que los proyectos se entreguen a tiempo y dentro del presupuesto.',
                  'Fomente la colaboraci?n y la comunicaci?n dentro del equipo.',
                  'Optimice la asignaci?n de recursos.',
                  'Tome decisiones informadas basadas en datos de proyecto en tiempo real.'
              ],
              ctaText: 'Organice sus Proyectos',
              formSubject: 'Consulta%20OfiPles%20Proyecto'
          } },
          { name: "Soporte al Cliente", slug: "soporte-cliente", description: "Monitorea y soluciona tickets", details: {
              mainIcon: Headset,
              title: 'Ofi-Ples Soporte al Cliente',
              description: 'Ofrezca un servicio de atenci?n al cliente excepcional. Gestione, priorice y resuelva todas las solicitudes de sus clientes desde una plataforma multicanal.',
              keyServices: [
                  { title: 'Sistema de Tickets Multicanal', text: 'Centralice las solicitudes de soporte recibidas por correo electr?nico, tel?fono o chat en vivo en un ?nico sistema de tickets.', icon: Inbox },
                  { title: 'Acuerdos de Nivel de Servicio (SLA)', text: 'Defina y monitoree los tiempos de respuesta y resoluci?n para garantizar un servicio de alta calidad y cumplir con sus promesas.', icon: Timer },
                  { title: 'Base de Conocimiento (Helpdesk)', text: 'Cree una base de conocimiento con art?culos y gu?as para que los clientes puedan resolver sus dudas por s? mismos.', icon: HelpCircle },
                  { title: 'Informes de Rendimiento', text: 'Analice el rendimiento de su equipo de soporte con m?tricas como el tiempo de primera respuesta, satisfacci?n del cliente y m?s.', icon: BarChart3 }
              ],
              benefits: [
                  'Mejore la satisfacci?n y la lealtad de sus clientes.',
                  'Aumente la eficiencia de su equipo de soporte.',
                  'No pierda nunca una solicitud de cliente.',
                  'Reduzca el volumen de tickets recurrentes con una buena base de conocimiento.',
                  'Obtenga informaci?n valiosa sobre las necesidades y problemas de sus clientes.'
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
        description: "Software integral para la gesti?n catastral con enfoque multiprop?sito.",
        items: [
            { name: "Administraci?n de Tr?mites", slug: "catastrogob-tramites", description: "Formaci?n, actualizaci?n y conservaci?n.", details: {
                mainIcon: FileText,
                title: 'Administraci?n de Tr?mites Catastrales',
                description: 'Gestione de manera integral los tr?mites de formaci?n, actualizaci?n y conservaci?n catastral, asegurando el cumplimiento del modelo LADM_COL y la eficiencia operativa.',
                keyServices: [
                  { title: 'Flujos de Trabajo Digitales', text: 'Automatice y estandarice los procesos para cada tipo de tr?mite, desde la solicitud hasta la resoluci?n, reduciendo tiempos y errores.', icon: Workflow },
                  { title: 'Gesti?n Documental Integrada', text: 'Asocie todos los documentos soporte (planos, escrituras) a cada tr?mite, creando un expediente digital completo y auditable.', icon: FolderArchive },
                  { title: 'Notificaciones y Seguimiento', text: 'Mantenga informados a los ciudadanos y funcionarios sobre el estado de sus tr?mites con notificaciones autom?ticas.', icon: Bell },
                  { title: 'Tablero de Control', text: 'Visualice la carga de trabajo, los tiempos de respuesta y los cuellos de botella para una gesti?n proactiva.', icon: LayoutDashboard }
                ],
                benefits: [
                  'Reducci?n dr?stica de los tiempos de respuesta en tr?mites.',
                  'Mayor transparencia para el ciudadano y los entes de control.',
                  'Eliminaci?n del papeleo y los archivos f?sicos.',
                  'Garant?a de cumplimiento normativo en cada paso del proceso.',
                  'Mejora en la productividad del equipo catastral.'
                ],
                ctaText: 'Optimice sus Tr?mites',
                formSubject: 'Consulta%20CatastroGob%20Tramites'
            }},
            { name: "M?dulo SIG", slug: "catastrogob-sig", description: "An?lisis espacial y visualizaci?n.", details: {
                mainIcon: Map,
                title: 'M?dulo de Sistema de Informaci?n Geogr?fica (SIG)',
                description: 'Un potente motor geoespacial para la visualizaci?n, edici?n y an?lisis de la informaci?n predial. Conecte los datos alfanum?ricos con su representaci?n en el territorio.',
                keyServices: [
                    { title: 'Visualizador Cartogr?fico Web', text: 'Explore la cartograf?a base, capas tem?ticas y la informaci?n de los predios en un mapa interactivo y r?pido.', icon: Globe },
                    { title: 'Herramientas de Edici?n y Digitalizaci?n', text: 'Cree y modifique la geometr?a de los predios con herramientas de alta precisi?n, manteniendo la topolog?a de la red.', icon: DraftingCompass },
                    { title: 'An?lisis Espacial', text: 'Realice consultas espaciales complejas, an?lisis de proximidad, superposici?n de capas y generaci?n de mapas tem?ticos.', icon: BrainCircuit },
                    { title: 'Integraci?n con Servicios WMS/WFS', text: 'Conecte y consuma servicios de la Infraestructura Colombiana de Datos Espaciales (ICDE) y otras fuentes externas.', icon: GitMerge }
                ],
                benefits: [
                    'Toma de decisiones basada en la ubicaci?n y el contexto territorial.',
                    'Facilita la identificaci?n de inconsistencias entre datos f?sicos y jur?dicos.',
                    'Potente herramienta para la planificaci?n urbana y el ordenamiento territorial.',
                    'Acceso democr?tico a la informaci?n geoespacial para distintas ?reas del municipio.',
                    'Mejora la calidad y precisi?n de la base de datos catastral.'
                ],
                ctaText: 'Potencie su An?lisis Espacial',
                formSubject: 'Consulta%20CatastroGob%20SIG'
            }},
            { name: "Gesti?n F?sica y Jur?dica", slug: "catastrogob-gestion", description: "Control completo de cada predio.", details: {
                mainIcon: Building,
                title: 'Gesti?n F?sica y Jur?dica del Predio',
                description: 'El coraz?n del catastro. Un repositorio centralizado que almacena y relaciona toda la informaci?n f?sica, jur?dica y econ?mica de cada predio del territorio.',
                keyServices: [
                  { title: 'Ficha Predial Integral', text: 'Consulte en una ?nica vista toda la informaci?n del predio: propietarios, ?reas, construcciones, aval?os y m?s.', icon: FileSearch },
                  { title: 'Historial de Mutaciones', text: 'Mantenga un registro completo de todos los cambios que ha sufrido un predio a lo largo del tiempo, garantizando la trazabilidad.', icon: History },
                  { title: 'Gesti?n de Propietarios y Tenencia', text: 'Administre la informaci?n de propietarios, poseedores y ocupantes, y los diferentes tipos de tenencia de la tierra.', icon: Users },
                  { title: 'Componente Econ?mico', text: 'Registre y gestione los aval?os catastrales, las zonas homog?neas y los elementos que determinan el valor del predio.', icon: Banknote }
                ],
                benefits: [
                  'Base de datos unificada y consistente para toda la entidad territorial.',
                  'Garantiza la seguridad jur?dica de la propiedad.',
                  'Fundamento para una liquidaci?n justa y equitativa del impuesto predial.',
                  'Informaci?n confiable para la planificaci?n y la inversi?n p?blica.',
                  'Facilita la interoperabilidad con otras entidades como Notariado y Registro.'
                ],
                ctaText: 'Centralice la Informaci?n Predial',
                formSubject: 'Consulta%20CatastroGob%20Gestion'
            }}
        ]
    },
    "SiatGob": {
        icon: Briefcase,
        description: "Soluci?n avanzada para la administraci?n del territorio a nivel municipal.",
        items: [
            { name: "Ordenamiento Territorial", slug: "siatgob-ordenamiento", description: "Gesti?n de licencias y seguimiento.", details: {
                mainIcon: Building2,
                title: 'Ordenamiento Territorial',
                description: 'Gestione el desarrollo y uso del suelo de su municipio de acuerdo a su Plan de Ordenamiento Territorial (POT). Controle licencias, usos permitidos y seguimiento a las normativas urban?sticas.',
                keyServices: [
                  { title: 'Gesti?n de Licencias Urban?sticas', text: 'Digitalice el tr?mite de licencias de construcci?n, parcelaci?n y urbanismo, desde la solicitud hasta la expedici?n.', icon: FileSignature },
                  { title: 'Consulta de Usos del Suelo', text: 'Permita a ciudadanos y funcionarios consultar f?cilmente los usos permitidos y la normativa aplicable para cualquier predio.', icon: Search },
                  { title: 'Seguimiento a Planes Parciales', text: 'Monitoree el avance y cumplimiento de los planes parciales y otros instrumentos de planificaci?n y gesti?n del suelo.', icon: GanttChartSquare },
                  { title: 'Inspecci?n, Vigilancia y Control', text: 'Gestione las visitas de inspecci?n y los procesos por infracciones urban?sticas en una plataforma centralizada.', icon: ShieldAlert }
                ],
                benefits: [
                  'Asegura un crecimiento urbano ordenado y planificado.',
                  'Ofrece transparencia y agilidad en los tr?mites urban?sticos.',
                  'Facilita el control y seguimiento al cumplimiento de la normativa.',
                  'Proporciona herramientas para la toma de decisiones en planificaci?n.',
                  'Mejora la comunicaci?n entre la administraci?n y los constructores.'
                ],
                ctaText: 'Planifique su Territorio',
                formSubject: 'Consulta%20SiatGob%20Ordenamiento'
            }}
        ]
    },
    "OfiGob": {
        icon: LayoutDashboard,
        description: "Suite que integra y gestiona las dimensiones del Modelo Integrado de Planeaci?n y Gesti?n (MIPG).",
        items: [
            { name: "Talento Humano", slug: "ofigob-th", description: "Gesti?n del ciclo de vida, desarrollo y desempe?o del servidor p?blico.", details: {
                mainIcon: Users2,
                title: 'Gesti?n del Talento Humano',
                description: 'Plataforma para administrar el ciclo completo del servidor p?blico, desde la vinculaci?n hasta el retiro, fomentando el desarrollo y evaluando el desempe?o para un servicio p?blico de excelencia.',
                keyServices: [
                  { title: 'Ciclo de Vida del Servidor', text: 'Gestione los procesos de reclutamiento, selecci?n, vinculaci?n, onboarding y retiro.', icon: Workflow },
                  { title: 'Desarrollo y Gesti?n', text: 'Administre perfiles de cargo, cat?logo de competencias y planes de capacitaci?n.', icon: GraduationCap },
                  { title: 'Desempe?o y Bienestar', text: 'Realice evaluaciones formales, concierte objetivos, gestione planes de mejora (PIPs) y fomente el bienestar.', icon: ClipboardCheck },
                  { title: 'Cumplimiento y Estrategia', text: 'Asegure el cumplimiento de la normatividad GETH y alinee la planeaci?n estrat?gica del talento humano.', icon: Target }
                ],
                benefits: [
                  'Optimiza procesos de reclutamiento y selecci?n.',
                  'Fomenta el desarrollo profesional y la retenci?n del talento.',
                  'Alinea el desempe?o individual con los objetivos institucionales.',
                  'Garantiza el cumplimiento normativo en la gesti?n de personal.',
                ],
                ctaText: "Potenciar el Talento Humano",
                formSubject: "Consulta%20OfiGob%20Talento%20Humano"
            }},
            { name: "Direccionamiento Estrat?gico y Planeaci?n", slug: "ofigob-planeacion", description: "Definici?n, seguimiento y control de objetivos, planes y proyectos institucionales.", details: {
                mainIcon: Target,
                title: 'Direccionamiento Estrat?gico y Planeaci?n',
                description: 'Herramienta para traducir la estrategia en acci?n. Gestione objetivos, planes institucionales, planes de trabajo y realice an?lisis DOFA para una planeaci?n coherente y efectiva.',
                keyServices: [
                  { title: 'Gesti?n de Objetivos Estrat?gicos', text: 'Defina y de seguimiento a los objetivos de la entidad, con asistencia de IA para su formulaci?n.', icon: Rocket },
                  { title: 'Formulaci?n y Seguimiento de Planes', text: 'Gestione planes institucionales y de acci?n, monitoreando su avance en tiempo real.', icon: GanttChartSquare },
                  { title: 'Administraci?n de Planes de Trabajo', text: 'Desglose los planes en tareas concretas y asigne responsables para una ejecuci?n efectiva.', icon: KanbanSquare },
                  { title: 'An?lisis Estrat?gico', text: 'Realice an?lisis DOFA y otras matrices estrat?gicas para informar la toma de decisiones.', icon: Search }
                ],
                benefits: [
                  'Asegura la alineaci?n de toda la entidad con la visi?n estrat?gica.',
                  'Mejora la visibilidad y el seguimiento del avance de los planes.',
                  'Facilita la toma de decisiones basada en datos de ejecuci?n.',
                  'Potencia la planificaci?n con herramientas de an?lisis y asistencia de IA.',
                ],
                ctaText: "Definir la Estrategia",
                formSubject: "Consulta%20OfiGob%20Planeacion"
            }},
             { name: "Gesti?n con Valores para Resultados", slug: "ofigob-gvr", description: "Optimizaci?n de procesos, gesti?n de PQR, riesgos y proveedores.", details: {
                mainIcon: ShieldCheck,
                title: 'Gesti?n con Valores para Resultados',
                description: 'M?dulo para optimizar la operaci?n interna, mejorar el servicio al ciudadano y gestionar los riesgos. Centraliza la gesti?n de procesos, PQR, proveedores y cumplimiento normativo.',
                keyServices: [
                  { title: 'Gesti?n de Procesos y Procedimientos', text: 'Mapee, documente y optimice los procesos internos de la entidad.', icon: Workflow },
                  { title: 'Sistema de PQR con IA', text: 'Gestione peticiones, quejas y reclamos con un asistente de IA para la generaci?n de respuestas.', icon: Headset },
                  { title: 'Gesti?n de Riesgos Operacionales', text: 'Identifique, eval?e y gestione los riesgos operativos a trav?s de matrices especializadas.', icon: AlertTriangle },
                  { title: 'Registro y Evaluaci?n de Proveedores', text: 'Mantenga una base de datos de proveedores y eval?e su desempe?o.', icon: Truck }
                ],
                benefits: [
                  'Aumenta la eficiencia y estandarizaci?n de los procesos internos.',
                  'Mejora los tiempos y la calidad de respuesta a los ciudadanos.',
                  'Permite una gesti?n proactiva de los riesgos operacionales.',
                  'Fortalece la relaci?n y el control sobre la cadena de suministro.',
                ],
                ctaText: "Optimizar la Gesti?n Interna",
                formSubject: "Consulta%20OfiGob%20GVR"
            }},
            { name: "Evaluaci?n de Resultados", slug: "ofigob-evaluacion", description: "Medici?n del desempe?o a trav?s de indicadores, autoevaluaciones e informes.", details: {
                mainIcon: BarChartHorizontalBig,
                title: 'Evaluaci?n de Resultados',
                description: 'Mida el impacto de su gesti?n. Esta herramienta permite definir y seguir indicadores de desempe?o, realizar autoevaluaciones institucionales y generar informes detallados con asistencia de IA.',
                keyServices: [
                  { title: 'Gesti?n de Indicadores de Desempe?o', text: 'Defina y monitoree los KPIs de la entidad, con tableros de control visuales.', icon: BarChart3 },
                  { title: 'Autoevaluaciones de Gesti?n', text: 'Realice autoevaluaciones de pol?ticas y gesti?n para identificar ?reas de mejora.', icon: ClipboardCheck },
                  { title: 'Generador de Informes con IA', text: 'Utilice un asistente de IA para crear informes de gesti?n y resultados de forma autom?tica.', icon: Bot }
                ],
                benefits: [
                  'Permite una toma de decisiones basada en resultados medibles.',
                  'Fomenta una cultura de mejora continua y rendici?n de cuentas.',
                  'Simplifica la generaci?n de informes complejos.',
                  'Proporciona una visi?n clara del cumplimiento de los objetivos.',
                ],
                ctaText: "Medir y Evaluar Resultados",
                formSubject: "Consulta%20OfiGob%20Evaluacion"
            }},
            { name: "Informaci?n y Comunicaci?n", slug: "ofigob-ic", description: "Gesti?n documental centralizada y herramientas de comunicaci?n interna.", details: {
                mainIcon: MessageCircle,
                title: 'Informaci?n y Comunicaci?n',
                description: 'Asegure un flujo de informaci?n eficiente y seguro dentro de su entidad. Centralice la gesti?n documental y optimice los canales de comunicaci?n interna.',
                keyServices: [
                  { title: 'Gesti?n Documental', text: 'Utilice un repositorio centralizado para todos los documentos de la entidad.', icon: FolderArchive },
                  { title: 'Asistente IA para Documentos', text: 'Encuentre y resuma informaci?n clave en grandes vol?menes de documentos con IA.', icon: FileSearch },
                  { title: 'Comunicaci?n Interna', text: 'Gestione boletines, noticias y comunicados internos para mantener a todo el personal informado.', icon: Megaphone }
                ],
                benefits: [
                  'Centraliza y protege el patrimonio documental de la entidad.',
                  'Agiliza la b?squeda y recuperaci?n de informaci?n.',
                  'Mejora la efectividad de la comunicaci?n interna.',
                  'Garantiza que toda la entidad est? informada y alineada.',
                ],
                ctaText: "Mejorar la Comunicaci?n",
                formSubject: "Consulta%20OfiGob%20IC"
            }},
            { name: "Gesti?n del Conocimiento y la Innovaci?n", slug: "ofigob-gci", description: "Repositorio de conocimiento, gesti?n de innovaci?n y acciones de mejora.", details: {
                mainIcon: BrainCircuit,
                title: 'Gesti?n del Conocimiento y la Innovaci?n',
                description: 'Capitalice el saber hacer de su entidad. Este m?dulo permite crear un repositorio de conocimiento, gestionar iniciativas de innovaci?n y dar seguimiento a las acciones de mejora continua.',
                keyServices: [
                  { title: 'Repositorio de Conocimiento', text: 'Centralice lecciones aprendidas, buenas pr?cticas y conocimiento t?cnico.', icon: Database },
                  { title: 'Gesti?n de Iniciativas de Innovaci?n', text: 'Canalice y gestione las ideas y proyectos de innovaci?n de su equipo.', icon: Lightbulb },
                  { title: 'Seguimiento de Acciones de Mejora', text: 'Asegure que las oportunidades de mejora identificadas se conviertan en acciones concretas.', icon: CheckCircle }
                ],
                benefits: [
                  'Evita la p?rdida de conocimiento cr?tico.',
                  'Fomenta una cultura de innovaci?n y colaboraci?n.',
                  'Sistematiza el proceso de mejora continua.',
                  'Convierte las lecciones aprendidas en activos institucionales.',
                ],
                ctaText: "Fomentar la Innovaci?n",
                formSubject: "Consulta%20OfiGob%20GCI"
            }},
            { name: "Control Interno", slug: "ofigob-ci", description: "Gesti?n de auditor?as, riesgos de control y matrices de cumplimiento.", details: {
                mainIcon: Shield,
                title: 'Control Interno (MECI)',
                description: 'Fortalezca el Sistema de Control Interno (SCI) de su entidad. Gestione auditor?as, eval?e riesgos de control y asegure el cumplimiento a trav?s de matrices especializadas.',
                keyServices: [
                  { title: 'Gesti?n de Auditor?as', text: 'Planifique y ejecute el plan de auditor?as y gestione los hallazgos.', icon: ClipboardList },
                  { title: 'Gesti?n de Riesgos de Control', text: 'Identifique y valore los riesgos de control y corrupci?n.', icon: AlertTriangle },
                  { title: 'Matriz de Cumplimiento', text: 'Asegure el seguimiento al cumplimiento normativo de la entidad.', icon: FileCheck },
                  { title: 'Autoevaluaciones del SCI', text: 'Realice autoevaluaciones peri?dicas del sistema de control interno.', icon: UserCheck }
                ],
                benefits: [
                  'Asegura el cumplimiento del Modelo Est?ndar de Control Interno (MECI).',
                  'Fortalece la cultura de autocontrol en la entidad.',
                  'Permite una gesti?n proactiva de los riesgos de control y corrupci?n.',
                  'Sistematiza y facilita el proceso de auditor?a interna.',
                ],
                ctaText: "Fortalecer el Control Interno",
                formSubject: "Consulta%20OfiGob%20CI"
            }},
            { name: "Administraci?n del Sistema", slug: "ofigob-admin", description: "Configuraci?n central, gesti?n de usuarios y administraci?n de roles y permisos.", details: {
                mainIcon: Wrench,
                title: 'Administraci?n del Sistema',
                description: 'El centro de control de OfiGob. Gestione usuarios, defina roles y permisos detallados, y configure los par?metros generales del sistema para adaptarlo a su entidad.',
                keyServices: [
                  { title: 'Gesti?n de Usuarios', text: 'Cree y administre las cuentas de usuario de la plataforma.', icon: Users },
                  { title: 'Gesti?n de Roles y Permisos', text: 'Defina perfiles de acceso granulares para cada m?dulo y funcionalidad.', icon: Lock }
                ],
                benefits: [
                  'Control total sobre la seguridad y el acceso a la informaci?n.',
                  'Flexibilidad para adaptar la plataforma a la estructura de la entidad.',
                  'Facilita la administraci?n centralizada de toda la suite.',
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
                description: "Visualice en tiempo real los indicadores m?s importantes de la gesti?n educativa y el rendimiento institucional.",
                keyServices: [
                  { title: "Resumen de Avances del PMI", text: "Monitoree el progreso de sus planes de mejoramiento de un solo vistazo.", icon: TrendingUp },
                  { title: "Alertas de Autoevaluaci?n", text: "Reciba notificaciones sobre plazos y tareas pendientes del proceso de autoevaluaci?n.", icon: Bell },
                  { title: "Estado de Proyectos Transversales", text: "Vea el estado actual de los proyectos pedag?gicos institucionales.", icon: GitMerge },
                  { title: "Indicadores de Formaci?n Docente", text: "Analice la cobertura y el impacto de los planes de capacitaci?n.", icon: GraduationCap }
                ],
                benefits: [
                  "Visi?n 360° de la gesti?n educativa.",
                  "Toma de decisiones ?gil y basada en datos.",
                  "Identificaci?n r?pida de ?reas cr?ticas.",
                  "Comunicaci?n efectiva de resultados a la comunidad."
                ],
                ctaText: "Explorar Tablero",
                formSubject: "Consulta%20GeGob%20Tablero"
            }},
            { name: "PEI", slug: "gegob-pei", description: "Gesti?n del Proyecto Educativo Institucional.", details: {
                mainIcon: FileText,
                title: "Proyecto Educativo Institucional (PEI)",
                description: "Gestione y articule el documento maestro que gu?a la identidad y el quehacer de la instituci?n educativa.",
                keyServices: [
                  { title: "Constructor y Editor del Documento PEI", text: "Utilice un editor colaborativo para construir y mantener actualizado el PEI.", icon: ClipboardEdit },
                  { title: "Alineaci?n con PMI y Autoevaluaci?n", text: "Asegure la coherencia entre el PEI, los planes de mejora y los resultados del diagn?stico.", icon: LinkIcon },
                  { title: "Control de Versiones y Repositorio Hist?rico", text: "Mantenga un registro de los cambios y acceda a versiones anteriores del documento.", icon: History },
                  { title: "Publicaci?n y Socializaci?n del PEI", text: "Comparta f?cilmente el documento con la comunidad educativa y entes de control.", icon: Share2 }
                ],
                benefits: [
                  "Asegura la coherencia y visi?n a largo plazo de la instituci?n.",
                  "Facilita la participaci?n de la comunidad educativa en su construcci?n.",
                  "Simplifica las actualizaciones y revisiones peri?dicas.",
                  "Mantiene un registro hist?rico organizado y accesible."
                ],
                ctaText: "Gestionar PEI",
                formSubject: "Consulta%20GeGob%20PEI"
            }},
            { name: "SIE", slug: "gegob-sie", description: "Sistema Institucional de Evaluaci?n.", details: {
                mainIcon: Award,
                title: "Sistema Institucional de Evaluaci?n (SIE)",
                description: "Defina y administre los criterios y metodolog?as de evaluaci?n de los estudiantes, en cumplimiento con la normativa vigente.",
                keyServices: [
                  { title: "Configuraci?n de Escalas de Valoraci?n", text: "Personalice las escalas de calificaci?n (cuantitativas o cualitativas) seg?n el PEI.", icon: Settings },
                  { title: "Definici?n de Criterios de Promoci?n", text: "Establezca las reglas claras para la promoci?n de los estudiantes al siguiente grado.", icon: CheckCircle },
                  { title: "Gesti?n de Planes de Apoyo y Nivelaci?n", text: "Documente y d? seguimiento a las estrategias de apoyo para estudiantes con dificultades.", icon: HelpCircle },
                  { title: "Generaci?n de Informes de Rendimiento", text: "Cree informes consolidados sobre el rendimiento acad?mico para an?lisis institucional.", icon: BarChart3 }
                ],
                benefits: [
                  "Garantiza un proceso de evaluaci?n transparente, justo y equitativo.",
                  "Facilita la comunicaci?n de los criterios de evaluaci?n a toda la comunidad.",
                  "Sistematiza el seguimiento al desempe?o de los estudiantes.",
                  "Cumple con los requisitos normativos del Ministerio de Educaci?n."
                ],
                ctaText: "Configurar SIE",
                formSubject: "Consulta%20GeGob%20SIE"
            }},
            { name: "Autoevaluaci?n", slug: "gegob-autoevaluacion", description: "Diagn?stico y an?lisis institucional.", details: {
                mainIcon: BarChart3,
                title: 'Autoevaluaci?n Institucional',
                description: 'Gu?a a las instituciones en un proceso estructurado de autodiagn?stico para identificar fortalezas y oportunidades de mejora en todas sus ?reas de gesti?n.',
                keyServices: [
                  { title: "Motor de Diagn?stico Personalizable", text: "Cree y aplique instrumentos de autoevaluaci?n basados en las gu?as del MEN o en sus propios marcos de calidad.", icon: Settings },
                  { title: "Recopilaci?n de Evidencias", text: "Permita adjuntar documentos y evidencias que soporten las valoraciones en cada uno de los componentes.", icon: FileArchive },
                  { title: "Visualizaci?n Gr?fica de Resultados", text: "Analice los resultados con gr?ficos de radar y barras que facilitan la identificaci?n de ?reas cr?ticas.", icon: BarChartHorizontalBig },
                  { title: "Generaci?n Autom?tica de Informes", text: "Produzca informes de autoevaluaci?n consolidados listos para ser presentados a la comunidad y entes de control.", icon: Presentation }
                ],
                benefits: [
                  'Fomenta una cultura de reflexi?n y mejora continua.',
                  'Proporciona una base objetiva para la toma de decisiones.',
                  'Simplifica y estandariza el proceso de autoevaluaci?n anual.',
                  'Facilita la preparaci?n para auditor?as y certificaciones de calidad.'
                ],
                ctaText: "Iniciar Autoevaluaci?n",
                formSubject: "Consulta%20GeGob%20Autoevaluacion"
            }},
            { name: "Evaluaciones Externas", slug: "gegob-eval-externas", description: "An?lisis de resultados de pruebas.", details: {
                mainIcon: BarChartHorizontalBig,
                title: "An?lisis de Evaluaciones Externas",
                description: "Importe, visualice y analice los resultados de pruebas estandarizadas (como las Pruebas Saber) para complementar el diagn?stico institucional y orientar las estrategias pedag?gicas.",
                keyServices: [
                  { title: "Carga Masiva de Resultados de Pruebas", text: "Importe f?cilmente los archivos de resultados proporcionados por el ICFES u otras entidades.", icon: UploadCloud },
                  { title: "Tableros de Comparaci?n Hist?rica", text: "Analice la evoluci?n de los resultados de la instituci?n a lo largo del tiempo.", icon: TrendingUp },
                  { title: "An?lisis Comparativo", text: "Compare el rendimiento de la instituci?n con promedios nacionales, regionales y de entidades similares.", icon: UsersRound },
                  { title: "Identificaci?n de Fortalezas y Debilidades", text: "Desglose los resultados por ?rea, competencia y componente para un an?lisis detallado.", icon: Search }
                ],
                benefits: [
                  "Complementa la autoevaluaci?n con una mirada objetiva y externa.",
                  "Permite tomar decisiones pedag?gicas y curriculares basadas en datos.",
                  "Facilita el seguimiento al impacto de las estrategias de mejora acad?mica.",
                  "Proporciona informaci?n valiosa para la rendici?n de cuentas."
                ],
                ctaText: "Analizar Resultados",
                formSubject: "Consulta%20GeGob%20EvalExternas"
            }},
            { name: "PMI", slug: "gegob-pmi", description: "Planes de Mejoramiento Institucional.", details: {
                mainIcon: Lightbulb,
                title: "Planes de Mejoramiento Institucional (PMI)",
                description: "Transforme los hallazgos del diagn?stico en acciones concretas. Defina objetivos, actividades, responsables y plazos para cerrar las brechas identificadas.",
                keyServices: [
                  { title: "Conexi?n Directa con Autoevaluaci?n", text: "Cree objetivos de mejora a partir de los resultados de la autoevaluaci?n, asegurando la coherencia.", icon: LinkIcon },
                  { title: "Formulaci?n de Proyectos y Actividades", text: "Estructure su plan con proyectos, actividades, metas, responsables y cronogramas claros.", icon: GanttChartSquare },
                  { title: "Seguimiento y Registro de Avances", text: "Monitoree el progreso de cada actividad y registre los avances para una gesti?n efectiva del plan.", icon: ClipboardCheck },
                  { title: "Banco de Buenas Pr?cticas", text: "Acceda a un repositorio de estrategias exitosas para inspirar y guiar la formulaci?n de sus planes.", icon: BrainCircuit }
                ],
                benefits: [
                  "Asegura que los planes de mejoramiento respondan a necesidades reales.",
                  "Facilita el seguimiento y control a la ejecuci?n de las mejoras.",
                  "Promueve la colaboraci?n y la asignaci?n clara de responsabilidades.",
                  "Proporciona una hoja de ruta clara para la mejora continua."
                ],
                ctaText: "Construir PMI",
                formSubject: "Consulta%20GeGob%20PMI"
            }},
            { name: "Proyectos Transversales", slug: "gegob-proyectos", description: "Gesti?n de proyectos curriculares.", details: {
                mainIcon: GitMerge,
                title: "Gesti?n de Proyectos Transversales",
                description: "Planifique y d? seguimiento a los proyectos pedag?gicos que articulan diferentes ?reas del conocimiento (ambiental, sexualidad, derechos humanos, etc.).",
                keyServices: [
                  { title: "Banco de Proyectos Institucionales", text: "Centralice la informaci?n y documentaci?n de todos los proyectos transversales.", icon: Briefcase },
                  { title: "Planificaci?n de Actividades y Recursos", text: "Asigne responsables, fechas y recursos para cada actividad de los proyectos.", icon: CalendarDays },
                  { title: "Registro de Evidencias y Resultados", text: "Documente el impacto y los productos de cada proyecto con un repositorio de evidencias.", icon: FileArchive },
                  { title: "Articulaci?n con el PEI y Planes de ?rea", text: "Asegure que los proyectos est?n alineados con la propuesta pedag?gica de la instituci?n.", icon: LinkIcon }
                ],
                benefits: [
                  "Centraliza y organiza la informaci?n de los proyectos pedag?gicos.",
                  "Facilita la colaboraci?n entre docentes de diferentes ?reas.",
                  "Permite visibilizar y comunicar el impacto de estos proyectos.",
                  "Asegura el cumplimiento de los requerimientos normativos vigentes."
                ],
                ctaText: "Gestionar Proyectos",
                formSubject: "Consulta%20GeGob%20Proyectos"
            }},
            { name: "Formaci?n Docente", slug: "gegob-formacion", description: "Planes de capacitaci?n para docentes.", details: {
                mainIcon: GraduationCap,
                title: "Formaci?n y Desarrollo Docente",
                description: "Dise?e y gestione el plan de formaci?n continua para su equipo docente, alineado a las necesidades identificadas en la autoevaluaci?n y el PMI.",
                keyServices: [
                  { title: "Detecci?n de Necesidades de Formaci?n", text: "Identifique las ?reas de capacitaci?n prioritarias a partir de los resultados de la evaluaci?n.", icon: Search },
                  { title: "Cat?logo de Cursos y Capacitaciones", text: "Organice la oferta de formaci?n interna y externa disponible para los docentes.", icon: ListOrdered },
                  { title: "Registro de Asistencia y Participaci?n", text: "Lleve un control de la participaci?n de los docentes en las diferentes actividades de formaci?n.", icon: UserCheck },
                  { title: "Seguimiento al Impacto de la Formaci?n", text: "Eval?e c?mo la capacitaci?n se traduce en mejores pr?cticas en el aula.", icon: TrendingUp }
                ],
                benefits: [
                  "Potencia las competencias y habilidades del equipo docente.",
                  "Asegura que la inversi?n en formaci?n sea pertinente y estrat?gica.",
                  "Mantiene un registro hist?rico de la capacitaci?n recibida por cada docente.",
                  "Contribuye directamente a la mejora de la calidad educativa."
                ],
                ctaText: "Planificar Formaci?n",
                formSubject: "Consulta%20GeGob%20Formacion"
            }},
            { name: "Autorizaci?n Institucional", slug: "gegob-autorizacion", description: "Gesti?n de licencias y autorizaciones.", details: {
                mainIcon: ShieldCheck,
                title: "Autorizaci?n Institucional",
                description: "Gestione los procesos de solicitud y renovaci?n de licencias de funcionamiento y autorizaciones oficiales ante las secretar?as de educaci?n.",
                keyServices: [
                  { title: "Checklist de Requisitos Normativos", text: "Asegure el cumplimiento de todos los requisitos legales y documentales para cada tr?mite.", icon: ClipboardCheck },
                  { title: "Carga y Gesti?n de Documentos Soporte", text: "Centralice y organice toda la documentaci?n necesaria para los procesos de autorizaci?n.", icon: UploadCloud },
                  { title: "Seguimiento al Estado del Tr?mite", text: "Monitoree en qu? etapa se encuentra cada solicitud ante la entidad competente.", icon: Workflow },
                  { title: "Alertas de Vencimiento de Licencias", text: "Reciba notificaciones autom?ticas para iniciar los procesos de renovaci?n a tiempo.", icon: Bell }
                ],
                benefits: [
                  "Simplifica y agiliza los complejos procesos de licenciamiento.",
                  "Reduce el riesgo de incumplimiento normativo.",
                  "Evita la operaci?n sin las autorizaciones vigentes.",
                  "Centraliza toda la documentaci?n legal de la instituci?n en un solo lugar."
                ],
                ctaText: "Gestionar Autorizaciones",
                formSubject: "Consulta%20GeGob%20Autorizacion"
            }},
            { name: "Administraci?n", slug: "gegob-admin", description: "Configuraci?n del sistema.", details: {
                mainIcon: Settings,
                title: "Administraci?n del Sistema",
                description: "M?dulo de configuraci?n general de la plataforma GeGob, gesti?n de usuarios, roles y par?metros institucionales.",
                keyServices: [
                  { title: 'Gesti?n de Usuarios y Permisos', text: 'Cree usuarios y asigne roles para controlar el acceso a los diferentes m?dulos y funcionalidades.', icon: Users },
                  { title: 'Configuraci?n del A?o Lectivo', text: 'Defina los par?metros del a?o escolar, periodos acad?micos y calendarios.', icon: Calendar },
                  { title: 'Personalizaci?n de Par?metros', text: 'Adapte la plataforma a la realidad de su instituci?n, configurando sedes, jornadas, etc.', icon: Wrench },
                  { title: 'Auditor?a de Acciones en el Sistema', text: 'Realice un seguimiento de las acciones importantes realizadas por los usuarios en la plataforma.', icon: History }
                ],
                benefits: [
                  "Control total sobre la seguridad y el acceso a la informaci?n.",
                  "Flexibilidad para adaptar la plataforma a las particularidades de la instituci?n.",
                  "Facilita la administraci?n t?cnica de la plataforma.",
                  "Garantiza la trazabilidad de las acciones y cambios en el sistema."
                ],
                ctaText: "Configurar Sistema",
                formSubject: "Consulta%20GeGob%20Admin"
            }}
        ]
    },
    "GestorDoc": {
        icon: FileArchive,
        description: "Soluci?n completa de gesti?n documental que cumple con la Ley 594 de 2000.",
        items: [
           { name: "Administraci?n de Consultas", slug: "gestordoc-consultas", description: "Gesti?n de solicitudes de consulta de documentos.", details: {
                mainIcon: HelpCircle,
                title: 'M?DULO ADMINISTRACI?N DE CONSULTAS',
                description: 'Gestione solicitudes de consulta de documentos de manera presencial o virtual, proporcionando un medio eficiente para acceder a la informaci?n requerida.',
                keyServices: [
                  { title: 'Solicitud y Respuesta a Consultas', text: 'Permite a los usuarios solicitar y a los funcionarios responder consultas de manera eficiente, tanto virtual como presencial.', icon: MessageCircle },
                  { title: 'Mantenimiento y Devoluci?n', text: 'Mantenga y devuelva consultas, asegurando una gesti?n transparente y efectiva del proceso.', icon: Repeat },
                  { title: 'Identificador ?nico (FUID)', text: 'Asigna un FUID a cada consulta para un seguimiento y registro ordenado.', icon: Barcode },
                  { title: 'Consulta de Hoja de Control', text: 'Visualice la hoja de control para un seguimiento detallado del estado y la ubicaci?n de las consultas.', icon: FileSearch }
                ],
                benefits: [
                  'Agiliza el acceso a la informaci?n requerida.',
                  'Garantiza una gesti?n transparente y ordenada de las consultas.',
                  'Facilita el seguimiento y registro de todas las interacciones.',
                  'Mejora la atenci?n y satisfacci?n del usuario.'
                ],
                ctaText: 'Optimice sus Consultas',
                formSubject: 'Consulta%20GestorDoc%20Consultas'
            }},
            { name: "Gesti?n de Formatos y TRD", slug: "gestordoc-formatos", description: "Organizaci?n y clasificaci?n documental.", details: {
                mainIcon: GanttChartSquare,
                title: 'M?DULO FORMATOS',
                description: 'Organice, clasifique y gestione el ciclo de vida de sus documentos de acuerdo con las normativas legales, utilizando las Tablas de Retenci?n Documental (TRD).',
                keyServices: [
                  { title: 'Series y Subseries', text: 'Organice los documentos en conjuntos l?gicos para facilitar su clasificaci?n y recuperaci?n dentro del sistema.', icon: Layers },
                  { title: 'Tabla de Retenci?n Documental (TRD)', text: 'Establezca plazos de conservaci?n y disposici?n final de los documentos cumpliendo con la regulaci?n.', icon: Timer },
                  { title: 'Tipos de Documento y Registro FUID', text: 'Asigne un identificador ?nico (FUID) a cada documento para garantizar su unicidad y seguimiento.', icon: Barcode },
                  { title: 'Hoja de Control Documental', text: 'Lleve un registro detallado del estado y ubicaci?n de cada documento para una gesti?n eficiente.', icon: FileCheck }
                ],
                benefits: [
                  'Cumplimiento de la Ley General de Archivos.',
                  'Organizaci?n documental l?gica y eficiente.',
                  'Control preciso sobre el ciclo de vida de los documentos.',
                  'Facilita auditor?as y procesos de consulta.'
                ],
                ctaText: 'Implemente sus TRD',
                formSubject: 'Consulta%20GestorDoc%20Formatos'
            }},
            { name: "Administraci?n del Sistema", slug: "gestordoc-sistemas", description: "Control de acceso y seguridad.", details: {
                mainIcon: Settings,
                title: 'M?DULO SISTEMAS',
                description: 'Controle y personalice el sistema de gesti?n documental. Gestione usuarios, perfiles, permisos y dependencias para un entorno seguro y adaptado a su organizaci?n.',
                keyServices: [
                  { title: 'Gesti?n de Usuarios y Perfiles', text: 'Cree y administre usuarios y perfiles, asignando roles y privilegios espec?ficos.', icon: Users },
                  { title: 'Gesti?n de Permisos y Acceso', text: 'Determine qu? acciones puede realizar cada usuario y configure pol?ticas de seguridad.', icon: Lock },
                  { title: 'Administraci?n de Dependencias', text: 'Facilite la gesti?n y configuraci?n de las dependencias entre diferentes ?reas o unidades organizativas.', icon: GitBranch }
                ],
                benefits: [
                  'Entorno seguro y controlado para su patrimonio documental.',
                  'Flexibilidad para adaptar los permisos a su estructura organizativa.',
                  'Gesti?n centralizada de la seguridad y el acceso.',
                  'Trazabilidad de las acciones realizadas en el sistema.'
                ],
                ctaText: 'Controle su Sistema',
                formSubject: 'Consulta%20GestorDoc%20Sistemas'
            }}
        ]
    },
    "PaeGob": {
        icon: School,
        description: "Soluci?n tecnol?gica para optimizar la gesti?n y supervisi?n del Programa de Alimentaci?n Escolar (PAE).",
        items: [
            { name: "Gesti?n de Beneficiarios", slug: "paegob-beneficiarios", description: "Focalizaci?n de estudiantes.", details: {
                mainIcon: Users2,
                title: 'Gesti?n de Beneficiarios del PAE',
                description: 'Asegure que el Programa de Alimentaci?n Escolar llegue a quienes m?s lo necesitan. Gestione la focalizaci?n, inscripci?n y seguimiento de los estudiantes beneficiarios de forma eficiente.',
                keyServices: [
                  { title: 'Focalizaci?n y Caracterizaci?n', text: 'Importe y gestione la matr?cula oficial (SIMAT) y aplique criterios de focalizaci?n para identificar a los beneficiarios.', icon: Filter },
                  { title: 'Registro y Novedades', text: 'Administre el registro de estudiantes en el programa y gestione las novedades como traslados o retiros.', icon: UserCheck },
                  { title: 'Control de Cupos por Sede', text: 'Asigne y controle el n?mero de cupos del programa para cada instituci?n y sede educativa.', icon: Building },
                  { title: 'Informes de Cobertura', text: 'Genere reportes detallados sobre la cobertura del programa, el n?mero de beneficiarios y su caracterizaci?n.', icon: BarChart3 }
                ],
                benefits: [
                  'Garantiza una asignaci?n equitativa y transparente de los cupos.',
                  'Mantiene una base de datos de beneficiarios actualizada y confiable.',
                  'Facilita la generaci?n de informes para el Ministerio de Educaci?n.',
                  'Reduce el riesgo de errores y duplicidades en la asignaci?n.',
                  'Permite un seguimiento preciso de la poblaci?n atendida.'
                ],
                ctaText: 'Optimice su Focalizaci?n',
                formSubject: 'Consulta%20PaeGob%20Beneficiarios'
            }},
            { name: "Validaci?n de Entregas", slug: "paegob-entregas", description: "Control con firma digital.", details: {
                mainIcon: FileCheck,
                title: 'Validaci?n de Entregas y Reportes del PAE',
                description: 'Controle y supervise la entrega de las raciones alimentarias en cada sede educativa. Nuestra plataforma digitaliza el proceso de validaci?n, garantizando transparencia y trazabilidad.',
                keyServices: [
                  { title: 'Reporte Diario de Entrega', text: 'Los operadores registran diariamente el n?mero de raciones entregadas en cada sede a trav?s de una aplicaci?n m?vil.', icon: Tablet },
                  { title: 'Validaci?n con Firma Digital', text: 'El rector o coordinador de cada sede valida la informaci?n reportada mediante una firma digital, dando fe de la entrega.', icon: PenSquare },
                  { title: 'Consolidaci?n Autom?tica', text: 'El sistema consolida autom?ticamente los reportes diarios para generar los informes mensuales requeridos por la auditor?a.', icon: Zap },
                  { title: 'Registro de No Conformidades', text: 'Permita que las sedes reporten cualquier incidencia o no conformidad con el servicio de forma inmediata.', icon: AlertTriangle }
                ],
                benefits: [
                  'Elimina el uso de planillas f?sicas y reduce errores manuales.',
                  'Proporciona evidencia digital y trazabilidad de cada entrega.',
                  'Agiliza la consolidaci?n de informes y el proceso de auditor?a.',
                  'Mejora el control y la supervisi?n del programa por parte de la entidad territorial.',
                  'Aumenta la transparencia en la ejecuci?n de los recursos del PAE.'
                ],
                ctaText: 'Digitalice su Supervisi?n',
                formSubject: 'Consulta%20PaeGob%20Entregas'
            }}
        ]
    },
    "EduGob": {
        icon: BookOpen,
        description: "Plataforma enfocada en la gesti?n escolar y acad?mica del d?a a d?a.",
        items: [
            { name: "Gesti?n Acad?mica", slug: "edugob-academica", description: "Carreras, cursos, calificaciones.", details: {
                mainIcon: GraduationCap,
                title: 'Gesti?n Acad?mica',
                description: 'El n?cleo de su instituci?n educativa. Gestione todo el ciclo acad?mico, desde la oferta de cursos y la matr?cula, hasta el registro de calificaciones y el control de asistencia.',
                keyServices: [
                  { title: 'Administraci?n de Cursos y Materias', text: 'Cree y configure la estructura acad?mica de su instituci?n, incluyendo programas, planes de estudio y asignaturas.', icon: Layers },
                  { title: 'Matr?cula y Gesti?n de Estudiantes', text: 'Administre el proceso de inscripci?n y matr?cula de estudiantes, asign?ndolos a sus respectivos cursos y grupos.', icon: Users2 },
                  { title: 'Registro de Calificaciones', text: 'Permita que los docentes registren las calificaciones de los estudiantes de forma segura y centralizada.', icon: ClipboardEdit },
                  { title: 'Control de Asistencia', text: 'Lleve un registro detallado de la asistencia de los estudiantes a clases, generando alertas y reportes.', icon: CheckCircle }
                ],
                benefits: [
                  'Centraliza y estandariza la informaci?n acad?mica.',
                  'Simplifica los procesos administrativos para docentes y personal.',
                  'Proporciona a estudiantes y padres acceso a la informaci?n acad?mica.',
                  'Genera datos confiables para el seguimiento del rendimiento estudiantil.',
                  'Facilita la generaci?n de boletines, certificados y reportes.'
                ],
                ctaText: 'Organice su Gesti?n Acad?mica',
                formSubject: 'Consulta%20EduGob%20Academica'
            }}
        ]
    },
    "InfoGob": {
        icon: Info,
        description: "Plataforma enfocada en la transparencia y la rendici?n de cuentas para la gesti?n de proyectos.",
        items: [
            { name: "Seguimiento y Monitoreo", slug: "infogob-seguimiento", description: "Visualizaci?n de avances y resultados.", details: {
                mainIcon: Presentation,
                title: 'Transparencia y Seguimiento de Proyectos (InfoGob)',
                description: 'Fortalezca la confianza ciudadana con una plataforma que permite la visualizaci?n p?blica y el seguimiento del avance f?sico y financiero de los proyectos de inversi?n.',
                keyServices: [
                  { title: 'Visor P?blico de Proyectos', text: 'Ofrezca a la ciudadan?a un portal interactivo para consultar informaci?n detallada de cada proyecto: objetivos, presupuesto, avances y contratistas.', icon: Eye },
                  { title: 'Reporte de Avances por Contratistas', text: 'Facilite a los ejecutores el reporte peri?dico de avances f?sicos y financieros a trav?s de una interfaz sencilla.', icon: UploadCloud },
                  { title: 'Componente Geogr?fico (SIG)', text: 'Ubique cada proyecto en un mapa, permitiendo a los ciudadanos ver las inversiones que se est?n realizando en su comunidad.', icon: MapPin },
                  { title: 'Participaci?n Ciudadana', text: 'Habilite espacios como foros y encuestas para que la comunidad pueda opinar y hacer seguimiento a los proyectos de su inter?s.', icon: UsersRound }
                ],
                benefits: [
                  'Aumenta la transparencia y la confianza en la gesti?n p?blica.',
                  'Empodera a los ciudadanos con informaci?n clara y accesible.',
                  'Facilita la rendici?n de cuentas por parte de la administraci?n.',
                  'Permite un control social m?s efectivo sobre la inversi?n p?blica.',
                  'Mejora la comunicaci?n entre el gobierno y la comunidad.'
                ],
                ctaText: 'Fomente la Transparencia',
                formSubject: 'Consulta%20InfoGob'
            }}
        ]
    }
};

const RenderDetailView = ({ module }: { module: any }) => {
    const { details } = module;
    if (!details) {
         return (
            <div className="p-8 text-center text-muted-foreground">
                <p>Detalles no disponibles para este m?dulo.</p>
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
                        {details.ctaText || 'Solicitar Informaci?n'} <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                    </Link>
                </Button>
            </section>
        </div>
    );
};

export const InteractiveSoftwareSuites = () => {
    const [activeTab, setActiveTab] = useState('empresarial');
    const [activeModule, setActiveModule] = useState<any | null>(null);

    const currentSuiteData = useMemo(() => activeTab === 'empresarial' ? ofiPlesModules : gobPlesModules, [activeTab]);

    useEffect(() => {
        const firstCategoryKey = Object.keys(currentSuiteData)[0];
        if (firstCategoryKey && currentSuiteData[firstCategoryKey]?.items.length > 0) {
            const firstModule = currentSuiteData[firstCategoryKey].items[0];
            setActiveModule(firstModule);
        } else {
            setActiveModule(null);
        }
    }, [currentSuiteData]);

    return (
      <section className="w-full bg-card text-card-foreground">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Dos Grandes Suites de Software</h2>
            </div>
            
            <div className="mb-8 flex justify-start">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
                    <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="empresarial" className="py-2 text-base">Suite Empresarial - OfiPles</TabsTrigger>
                        <TabsTrigger value="gubernamental" className="py-2 text-base">Suite Gubernamental - GobPles</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 min-h-[600px]">
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

                <main className="bg-background/50 rounded-lg p-4 md:p-8">
                    {activeModule ? (
                        <RenderDetailView module={activeModule} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <p>Seleccione un m?dulo para ver los detalles.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
      </section>
    );
}
