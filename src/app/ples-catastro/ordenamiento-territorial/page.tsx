// src/app/ples-catastro/ordenamiento-territorial/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Home, Users, Map, Layers, Edit3 } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Planes de Ordenamiento Territorial (POT) - PLES Catastro',
  description: 'Desarrollamos e implementamos planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad.',
};

const serviceDetails = {
  parentLink: "/ples-catastro",
  parentName: "PLES Catastro",
  serviceSlug: "planes-ordenamiento-territorial",
  mainIcon: <Home />,
  title: 'Planes de Ordenamiento Territorial (POT)',
  description: 'Desarrollamos e implementamos planes estratégicos integrales que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad social, la protección ambiental y el desarrollo económico.',
  keyServicesHeading: 'Elementos Clave de Nuestros POT:',
  keyServices: [
    { title: 'Diagnóstico Territorial Integral', text: 'Análisis exhaustivo de las dinámicas físicas, sociales, económicas y ambientales del territorio para identificar potencialidades y problemáticas.', icon: <Map className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Participación Ciudadana Estratégica', text: 'Diseño y facilitación de procesos participativos inclusivos para asegurar la legitimidad y apropiación social del plan.', icon: <Users className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Zonificación y Usos del Suelo', text: 'Definición de zonas con usos específicos (residencial, comercial, industrial, protección, etc.) y normativas asociadas para orientar el desarrollo.', icon: <Layers className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Instrumentos de Gestión y Seguimiento', text: 'Desarrollo de herramientas y mecanismos para la implementación, monitoreo y evaluación continua del POT, asegurando su efectividad a largo plazo.', icon: <Edit3 className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
  ],
  benefitsHeading: 'Beneficios de un POT Estratégico:',
  benefits: [
    'Desarrollo Urbano y Rural Ordenado y Sostenible',
    'Mejora de la Calidad de Vida de los Habitantes',
    'Protección del Patrimonio Natural y Cultural',
    'Atracción de Inversiones y Fomento Económico',
    'Fortalecimiento de la Gobernanza Territorial',
    'Reducción de Vulnerabilidades y Riesgos',
  ],
  ctaText: 'Planifique el Futuro de su Territorio',
  formSubject: 'Consulta%20Planes%20Ordenamiento%20Territorial'
};

export default function OrdenamientoTerritorialPage() {
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
                <Card key={service.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:animate-gradient hover:bg-[length:200%_200%]">
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    {React.cloneElement(service.icon, { className: "h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" })}
                    <CardTitle className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary-foreground transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors text-sm">{service.text}</CardDescription>
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
