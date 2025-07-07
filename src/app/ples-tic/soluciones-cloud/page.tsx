
// src/app/ples-tic/soluciones-cloud/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CloudCog, CheckCircle, Server, UploadCloud, Shield, Repeat, GitBranch, Database, Scaling
} from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Soluciones Cloud y DevOps - PLES TIC',
  description: 'Impulsamos su transformación digital con arquitecturas cloud robustas, escalables y seguras, optimizadas mediante prácticas DevOps.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  serviceSlug: "soluciones-cloud",
  mainIcon: CloudCog,
  title: 'Soluciones Cloud Estratégicas y DevOps',
  description: 'Acelere su innovación y optimice sus operaciones con nuestras soluciones expertas en la nube (AWS, Azure, GCP) y prácticas DevOps. Diseñamos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes.',
  keyServicesHeading: 'Nuestros Servicios Cloud y DevOps:',
  keyServices: [
    { title: 'Migración Estratégica a la Nube', text: 'Planificamos y ejecutamos migraciones eficientes y seguras a AWS, Azure o GCP, minimizando riesgos y optimizando costos y rendimiento.', icon: UploadCloud },
    { title: 'Arquitecturas Nativas de la Nube', text: 'Diseñamos soluciones basadas en microservicios, serverless y contenedores (Docker, Kubernetes) para máxima agilidad, resiliencia y escalabilidad.', icon: Server },
    { title: 'Automatización DevOps (CI/CD)', text: 'Implementamos pipelines de Integración Continua y Entrega Continua (CI/CD) para acelerar el desarrollo, mejorar la calidad y la frecuencia de los despliegues.', icon: Repeat },
    { title: 'Infraestructura como Código (IaC)', text: 'Gestionamos su infraestructura de forma programática (Terraform, CloudFormation, Ansible) para mayor consistencia, velocidad, control de versiones y reproducibilidad.', icon: GitBranch },
     { title: 'Optimización de Costos en la Nube (FinOps)', text: 'Analizamos y optimizamos sus gastos en la nube, identificando ahorros y asegurando el uso eficiente de los recursos.', icon: Scaling },
    { title: 'Bases de Datos y Almacenamiento en la Nube', text: 'Diseñamos e implementamos soluciones de bases de datos (SQL, NoSQL) y almacenamiento escalables, seguras y de alto rendimiento en la nube.', icon: Database },
  ],
  benefitsHeading: "Beneficios de Adoptar la Nube con PLES TIC:",
  benefits: [
    'Escalabilidad Dinámica y Flexibilidad para Adaptarse a la Demanda',
    'Mayor Agilidad en Despliegues y Rápida Respuesta al Mercado',
    'Reducción de Costos de Infraestructura Física y Mantenimiento',
    'Seguridad Mejorada con Capacidades Robustas de Proveedores Cloud',
    'Alta Disponibilidad, Resiliencia y Continuidad del Negocio',
    'Acceso a Innovación Acelerada con Servicios Avanzados (IA, Big Data)',
  ],
  ctaText: 'Impulse su Negocio a la Nube',
  formSubject: 'Consulta%20Soluciones%20Cloud%20y%20DevOps'
};

export default function SolucionesCloudPage() {
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
