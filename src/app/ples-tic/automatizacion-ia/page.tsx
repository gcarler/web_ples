// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Brain, Zap, Bot, FileArchive, Store, Users, MessageSquare, Cpu, Settings, Search, UsersRound, TrendingUp, FileSearch, ClipboardEdit
} from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Automatización con IA Confiable - PLES TIC',
  description: 'Transformamos tu negocio con IA probada y estratégica. Optimizamos procesos, reducimos costos y liberamos el potencial de tu equipo.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  serviceSlug: "automatizacion-ia",
  mainIcon: <Brain />,
  title: 'Automatización Inteligente con IA',
  description: 'No hay saltos al vacío. Transformamos tu negocio con Inteligencia Artificial probada y estratégica, optimizando tus procesos, reduciendo costos y liberando el potencial de tu equipo con soluciones implementadas por expertos.',
  keyServicesHeading: 'Descubra Cómo la IA Transforma Áreas Clave de su Negocio:',
  keyServices: [
    {
      title: 'IA para la Excelencia en la Experiencia del Cliente',
      text: 'Transforme cada interacción en una oportunidad. Implementamos asistentes virtuales y chatbots avanzados para soporte 24/7, personalización de ofertas y análisis de sentimiento en tiempo real, mejorando la satisfacción y fidelizando a sus clientes.',
      icon: <MessageSquare className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: 'IA para la Optimización Inteligente de Tiendas y Retail',
      text: 'Revolucione su operación minorista. Usamos IA para predecir la demanda con precisión, optimizar la gestión de inventarios, personalizar las recomendaciones de productos en tienda y online, y analizar el flujo de clientes para mejorar la disposición y las ventas.',
      icon: <Store className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: 'IA para la Gestión Estratégica del Talento Humano',
      text: 'Potencie su equipo de RRHH con IA. Desde el reclutamiento inteligente con filtrado avanzado de CVs y chatbots para candidatos, hasta el análisis predictivo de desempeño y la identificación de necesidades de desarrollo, optimizando cada etapa del ciclo de vida del empleado.',
      icon: <Users className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: 'Automatización de Procesos con IA (RPA/BPA)',
      text: 'Optimice flujos de trabajo repetitivos mediante Robots de Software (RPA) y la gestión inteligente de procesos de negocio (BPA), potenciados con IA para tareas más complejas y toma de decisiones autónoma.',
      icon: <Zap className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: 'Desarrollo de Modelos de Machine Learning a Medida',
      text: 'Creamos y entrenamos modelos de ML personalizados (predictivos, clasificación, clustering) para resolver problemas específicos de su negocio, desde la previsión de demanda hasta la detección de anomalías.',
      icon: <Brain className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
    {
      title: 'Procesamiento Inteligente de Documentos (IDP)',
      text: 'Extraiga y estructure automáticamente datos de documentos no estructurados (facturas, contratos, formularios) utilizando OCR, NLP y ML, reduciendo la entrada manual y errores.',
      icon: <FileArchive className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
    },
  ],
  benefitsHeading: 'Beneficios de la Automatización con IA:',
  benefits: [
    'Incremento Exponencial de la Productividad y Eficiencia',
    'Reducción Significativa de Costos Operativos y Errores Humanos',
    'Mejora en la Toma de Decisiones Basada en Datos y Predicciones',
    'Experiencias de Cliente Personalizadas y Mejoradas',
    'Liberación del Talento Humano para Tareas de Mayor Valor Estratégico',
    'Escalabilidad y Adaptabilidad a las Demandas del Mercado',
  ],
  caseStudiesHeading: 'Estudios de Caso: La Transformación en Acción',
  caseStudies: [
    {
      title: 'Transformación del Soporte al Cliente con IA',
      icon: <MessageSquare />,
      sections: [
        {
          subtitle: 'El Desafío: Soporte Manual y Lento',
          description: 'Una empresa de servicios enfrentaba altos volúmenes de consultas, resultando en largos tiempos de espera, costos operativos elevados y baja satisfacción del cliente debido a la dependencia de agentes humanos para todas las interacciones.',
          points: ['Tiempos de respuesta promedio de más de 15 minutos.', 'Altos costos de personal en el contact center.', 'Inconsistencia en las respuestas proporcionadas.', 'Dificultad para escalar durante picos de demanda.'],
          sectionIcon: <UsersRound className="h-7 w-7 text-primary" />,
        },
        {
          subtitle: 'La Solución: Plataforma de Soporte Potenciada por IA',
          description: 'Se implementó un sistema de IA que incluía chatbots para respuestas instantáneas a preguntas frecuentes, análisis de sentimiento para priorizar casos urgentes y enrutamiento inteligente de tickets a los agentes especializados. Los modelos de NLP fueron entrenados con datos históricos para comprender las intenciones del cliente.',
          points: ['Chatbots con NLP para atención 24/7.', 'Análisis de sentimiento en tiempo real.', 'Enrutamiento inteligente de consultas complejas.', 'Base de conocimiento auto-actualizable para el chatbot.'],
          sectionIcon: <Bot className="h-7 w-7 text-primary" />,
        },
        {
          subtitle: 'Resultados: Eficiencia y Clientes Satisfechos',
          description: 'La implementación de IA revolucionó el soporte al cliente, generando un impacto medible y positivo en múltiples frentes.',
          points: [
            'Reducción del 60% en el tiempo promedio de respuesta.',
            'Disminución de los costos operativos del contact center en un 35%.',
            'Aumento del 25% en los índices de satisfacción del cliente (CSAT).',
            'Liberación del 40% del tiempo de los agentes para enfocarse en casos complejos y de alto valor.'
          ],
          sectionIcon: <TrendingUp className="h-7 w-7 text-primary" />,
        }
      ]
    },
    {
      title: 'Optimización del Procesamiento de Facturas con IA',
      icon: <FileSearch />,
      sections: [
        {
          subtitle: 'El Desafío: Procesamiento Manual de Facturas',
          description: 'Una compañía gestionaba miles de facturas de proveedores mensualmente, un proceso manual propenso a errores, costoso en tiempo y recursos, y que generaba retrasos en los pagos.',
          points: ['Promedio de 5-7 minutos para procesar cada factura.', 'Tasa de error del 8% en la entrada de datos.', 'Visibilidad limitada del flujo de caja y pagos pendientes.', 'Altos costos asociados a la mano de obra manual.'],
          sectionIcon: <ClipboardEdit className="h-7 w-7 text-primary" />,
        },
        {
          subtitle: 'La Solución: Procesamiento Inteligente de Documentos (IDP)',
          description: 'Se desplegó una solución de IDP con IA que utilizaba OCR (Reconocimiento Óptico de Caracteres) para digitalizar facturas, NLP para entender el contenido y ML para extraer datos clave (proveedor, montos, fechas, ítems) y validarlos contra órdenes de compra.',
          points: ['Implementación de OCR avanzado para alta precisión.', 'Modelos de Machine Learning para extracción y validación de datos.', 'Integración con el sistema ERP existente.', 'Flujo de aprobación automatizado para facturas validadas.'],
          sectionIcon: <Cpu className="h-7 w-7 text-primary" />,
        },
        {
          subtitle: 'Resultados: Agilidad Financiera y Reducción de Errores',
          description: 'La automatización inteligente del procesamiento de facturas optimizó drásticamente las operaciones financieras.',
          points: [
            'Reducción del tiempo de procesamiento por factura a menos de 1 minuto.',
            'Disminución de la tasa de error en la entrada de datos a menos del 1%.',
            'Mejora del 90% en la velocidad de procesamiento general.',
            'Ahorro anual estimado de 50,000 USD en costos operativos.'
          ],
          sectionIcon: <TrendingUp className="h-7 w-7 text-primary" />,
        }
      ]
    }
  ],
  ctaText: 'Solicita tu Diagnóstico Gratuito de IA',
  formSubject: 'Diagnostico%20Gratuito%20IA'
};

export default function AiAutomationPage() {
  return (
    <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href={serviceDetails.parentLink}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary-foreground" />
              Volver a {serviceDetails.parentName}
            </Link>
          </Button>
          <span className="text-muted-foreground">|</span>
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href="/">
               PLES Home
            </Link>
          </Button>
        </div>

        <section className="text-center mb-16">
          <div className="inline-block p-4 bg-primary/10 rounded-lg mb-6">
            {React.cloneElement(serviceDetails.mainIcon, { className: "h-16 w-16 text-primary" })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
            {serviceDetails.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {serviceDetails.description}
          </p>
        </section>

        {serviceDetails.keyServices && serviceDetails.keyServices.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-10 text-center">
              {serviceDetails.keyServicesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {serviceDetails.keyServices.map((service) => (
                <Card key={service.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-accent/5">
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    {React.cloneElement(service.icon, { className: "h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" })}
                    <CardTitle className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm">{service.text}</CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {serviceDetails.benefits && serviceDetails.benefits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-10 text-center">
              {serviceDetails.benefitsHeading}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
              {serviceDetails.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start text-foreground p-2 rounded-md transition-colors hover:bg-muted/50 hover:text-primary">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 shrink-0" />
                  <span className="text-md">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {serviceDetails.caseStudies && serviceDetails.caseStudies.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
              {serviceDetails.caseStudiesHeading}
            </h2>
            <div className="space-y-12">
              {serviceDetails.caseStudies.map((study) => (
                <Card key={study.title} className="overflow-hidden shadow-lg border group hover:shadow-2xl transition-all duration-300 ease-in-out hover:border-primary/30">
                  <CardHeader className="bg-muted/30 p-6">
                    <div className="flex items-center gap-3">
                       {React.cloneElement(study.icon, { className: "h-10 w-10 text-primary group-hover:text-accent transition-colors" })}
                      <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">{study.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {study.sections.map((section, index) => (
                        <div key={section.subtitle} className={`p-6 ${index < study.sections.length -1 ? 'lg:border-r border-border' : ''} ${index > 0 ? 'border-t border-border lg:border-t-0' : ''}`}>
                          <div className="flex items-center gap-3 mb-3">
                            {section.sectionIcon}
                            <h4 className="text-lg font-semibold text-foreground">{section.subtitle}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                          <ul className="space-y-1.5">
                            {section.points.map(point => (
                              <li key={point} className="flex items-start text-sm text-foreground">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
            
        <section className="text-center">
          <Button size="lg" asChild className="text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-transform">
            <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
              <span className="flex items-center">
                {serviceDetails.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
