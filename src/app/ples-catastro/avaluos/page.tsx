
// src/app/ples-catastro/avaluos/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Scale, BarChart3, ClipboardCheck, FileText, TrendingUp } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Avalúos Masivos y Puntuales - PLES Catastro',
  description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes para una base imponible justa y una gestión eficiente de activos.',
};

const serviceDetails = {
  parentLink: "/ples-catastro",
  parentName: "PLES Catastro",
  serviceSlug: "avaluos-catastrales",
  mainIcon: Scale,
  title: 'Avalúos Masivos y Puntuales',
  description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes, tanto para procesos masivos como para avalúos individuales, asegurando una base imponible justa y una gestión eficiente de activos públicos y privados.',
  keyServicesHeading: 'Aspectos Destacados del Servicio:',
  keyServices: [
    { title: 'Modelos de Valoración Automatizada (AVM)', text: 'Desarrollo e implementación de modelos econométricos y algoritmos de IA para la valoración masiva de predios, garantizando eficiencia y consistencia.', icon: BarChart3 },
    { title: 'Análisis de Mercado Inmobiliario', text: 'Estudios detallados del comportamiento del mercado inmobiliario, identificación de zonas homogéneas físicas y geoeconómicas para fundamentar las valoraciones.', icon: TrendingUp },
    { title: 'Cumplimiento Normativo y Estándares', text: 'Aplicación de metodologías y normativas vigentes (nacionales e internacionales como IVSC) para asegurar la validez y legalidad de los avalúos.', icon: ClipboardCheck },
    { title: 'Informes Detallados y Sustentados', text: 'Generación de informes técnicos completos y comprensibles que detallan la metodología, fuentes de información y resultados de la valoración.', icon: FileText },
  ],
  benefitsHeading: 'Beneficios de Nuestros Servicios de Avalúos:',
  benefits: [
    'Base Gravable Actualizada y Equitativa para Impuestos Prediales',
    'Valoración Precisa para Transacciones Inmobiliarias',
    'Soporte Técnico para Expropiaciones y Procesos Jurídicos',
    'Optimización de la Gestión de Activos Inmobiliarios',
    'Transparencia en los Procesos de Valoración Catastral',
  ],
  ctaText: 'Solicite su Avalúo Profesional',
  formSubject: 'Consulta%20Avaluos'
};

export default function AvaluosPage() {
  const MainIcon = serviceDetails.mainIcon;
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
            <MainIcon className="h-16 w-16 text-primary" />
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
              {serviceDetails.keyServices.map((service) => {
                const ServiceIcon = service.icon;
                return (
                <Card key={service.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:animate-gradient hover:bg-[length:200%_200%]">
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <ServiceIcon className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" />
                    <CardTitle className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary-foreground transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors text-sm">{service.text}</CardDescription>
                  </div>
                </Card>
                );
              })}
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
          <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
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
