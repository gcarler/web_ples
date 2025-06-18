// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Brain, Zap, Bot, FileArchive, Star, CircleDollarSign, Settings, MessageSquare, Cpu
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
  keyServicesHeading: 'Aplicaciones Estratégicas de IA:',
  keyServices: [
    { title: 'Optimización de Procesos (RPA y BPA)', text: 'Automatizamos tareas repetitivas y flujos de trabajo complejos, reduciendo errores y aumentando la eficiencia operativa.', icon: <Zap className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Análisis Predictivo y Modelado', text: 'Utilizamos Machine Learning para transformar datos en insights predictivos, optimizando inventarios, demanda y personalizando experiencias.', icon: <Cpu className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Asistentes Virtuales y Chatbots Inteligentes', text: 'Implementamos soluciones de IA conversacional que resuelven dudas y gestionan solicitudes 24/7, mejorando la atención al cliente.', icon: <Bot className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Gestión Documental Avanzada (IDP)', text: 'Digitalizamos, clasificamos y extraemos información de documentos automáticamente, mejorando el acceso, la seguridad y la toma de decisiones.', icon: <FileArchive className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
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
