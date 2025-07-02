// src/app/ples-tic/oficina/sitio-web/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Globe, LayoutTemplate, MonitorSmartphone, MousePointerClick, Rocket } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'OfiPles Sitio Web - Creador de Sitios Profesionales',
  description: 'Construya y gestione su presencia en línea con nuestro creador de sitios web intuitivo. Soluciones empresariales, SEO y diseño adaptable.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  mainIcon: <Globe />,
  title: 'OfiPles Sitio Web',
  description: 'Su plataforma todo-en-uno para crear, lanzar y gestionar sitios web empresariales de alto impacto. Sin necesidad de código, con resultados profesionales.',
  keyServicesHeading: 'Funcionalidades Clave',
  keyServices: [
    { title: 'Editor Visual Intuitivo', text: 'Diseñe y modifique páginas con un potente sistema de arrastrar y soltar. Vea los cambios en tiempo real y construya su sitio de forma visual.', icon: <MousePointerClick className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Plantillas Profesionales', text: 'Comience con buen pie eligiendo entre una amplia variedad de plantillas diseñadas por expertos y totalmente personalizables.', icon: <LayoutTemplate className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Diseño 100% Adaptable', text: 'Asegure que su sitio web se vea y funcione a la perfección en cualquier dispositivo: móviles, tabletas y computadoras de escritorio.', icon: <MonitorSmartphone className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Herramientas SEO Integradas', text: 'Optimice su sitio para los motores de búsqueda con nuestras herramientas integradas para gestionar títulos, metadescripciones, sitemaps y más.', icon: <Rocket className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
  ],
  benefitsHeading: 'Beneficios Principales',
  benefits: [
    'Lance su sitio web profesional en tiempo récord.',
    'Total autonomía para actualizar y gestionar su contenido sin depender de terceros.',
    'Mejore su posicionamiento en Google y atraiga más clientes.',
    'Proyecte una imagen de marca sólida, profesional y confiable.',
    'Integración nativa con otros módulos de OfiPles como Blog, Tienda y CRM.',
  ],
  ctaText: 'Empezar a Construir mi Sitio',
  formSubject: 'Consulta%20OfiPles%20Sitio%20Web'
};

export default function SitioWebPage() {
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
                    {service.icon}
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
          <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
            <Link href={`/forms?subject=${serviceDetails.formSubject}`}>
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