// src/app/ples-tic/ciberseguridad/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, ShieldCheck, CheckCircle, Fingerprint, UserCheck, Network, AlertTriangle, ShieldAlert, Bot, ShieldQuestion, Users
} from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Ciberseguridad Avanzada - PLES TIC',
  description: 'Protegemos sus activos digitales con estrategias de ciberseguridad proactivas, detección de amenazas y respuesta rápida a incidentes.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  serviceSlug: "ciberseguridad",
  mainIcon: <ShieldCheck />,
  title: 'Ciberseguridad Avanzada y Resiliente',
  description: 'En un mundo digital cada vez más complejo, la ciberseguridad es fundamental. En PLES TIC, ofrecemos soluciones integrales para proteger sus activos más valiosos, anticipar amenazas y garantizar la resiliencia de su organización.',
  keyServicesHeading: 'Nuestros Servicios Estratégicos de Ciberseguridad:',
  keyServices: [
    { title: 'Auditorías y Análisis de Vulnerabilidades', text: 'Realizamos pentesting ético y análisis exhaustivos (OWASP, NIST) para identificar y mitigar brechas de seguridad en sus sistemas y aplicaciones.', icon: <Fingerprint className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Gestión de Identidad y Acceso (IAM/IGA)', text: 'Implementamos soluciones robustas (MFA, SSO, PAM) para controlar quién accede a qué información, asegurando el principio de mínimo privilegio.', icon: <UserCheck className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Seguridad Perimetral y de Endpoints (SOC)', text: 'Desplegamos firewalls de próxima generación (NGFW), EDR, XDR y SIEM para proteger su red, dispositivos y detectar amenazas en tiempo real.', icon: <Network className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Respuesta a Incidentes y Continuidad (BCP/DRP)', text: 'Desarrollamos planes de respuesta (IRP), recuperación ante desastres (DRP) y continuidad del negocio (BCP) para minimizar el impacto.', icon: <AlertTriangle className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
     { title: 'Concientización y Capacitación en Seguridad', text: 'Fortalecemos el eslabón más importante: su personal. Programas de phishing simulado y capacitación continua para crear una cultura de ciberseguridad.', icon: <Users className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
     { title: 'Consultoría y Cumplimiento Normativo', text: 'Asesoramos en la implementación de marcos de seguridad (ISO 27001, SOC 2) y el cumplimiento de regulaciones (GDPR, HIPAA, PCI DSS).', icon: <ShieldQuestion className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
  ],
  benefitsHeading: "Beneficios de Fortalecer su Ciberseguridad con PLES TIC:",
  benefits: [
    'Protección Integral de Datos Críticos y Activos Digitales',
    'Reducción Significativa de Riesgos Cibernéticos y Pérdidas Financieras',
    'Cumplimiento Normativo Nacional e Internacional',
    'Fortalecimiento de la Confianza del Cliente y la Reputación de Marca',
    'Garantía de Continuidad del Negocio ante Incidentes Graves',
    'Fomento de una Cultura Organizacional Proactiva en Seguridad',
  ],
  ctaText: 'Fortalezca su Seguridad Hoy',
  formSubject: 'Consulta%20Ciberseguridad%20Avanzada'
};

export default function CiberseguridadPage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
