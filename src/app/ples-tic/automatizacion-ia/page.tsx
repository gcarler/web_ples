// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Brain, Zap, Bot, FileArchive, Store, Users, MessageSquare, Cpu, Settings
} from 'lucide-react'; // Added Store, Users, MessageSquare
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
      title: 'IA para la Eficiencia Operativa y Decisiones Basadas en Datos',
      text: 'Maximice la eficiencia y la toma de decisiones. Automatizamos procesos de negocio (RPA/BPA), digitalizamos y extraemos valor de sus documentos (IDP), y aplicamos modelos de Machine Learning para análisis predictivos que optimizan operaciones, finanzas y estrategias.',
      icon: <Zap className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
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
  ctaText: 'Solicita tu Diagnóstico Gratuito de IA',
  formSubject: 'Diagnostico%20Gratuito%20IA'
};

export default function AiAutomationPage() {
  return (
    <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-8 group hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link href={serviceDetails.parentLink}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary-foreground" />
            Volver a {serviceDetails.parentName}
          </Link>
        </Button>

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
                    {service.icon}
                    <CardTitle className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm">{service.text}</p>
                    </CardContent>
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

