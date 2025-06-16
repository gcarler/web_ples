// src/app/ples-tic/ciberseguridad/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, ShieldCheck, CheckCircle, Fingerprint, UserCheck, Network, AlertTriangle, ShieldAlert, Bot, MessageSquare
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
  icon: <ShieldCheck />,
  title: 'Ciberseguridad Avanzada',
  description: 'En un mundo digital cada vez más complejo, la ciberseguridad es fundamental. En PLES TIC, ofrecemos soluciones integrales para proteger sus activos más valiosos, anticipar amenazas y garantizar la resiliencia de su organización.',
  pointsHeading: 'Nuestros Servicios de Ciberseguridad:',
  points: [
    { title: 'Auditorías y Análisis de Vulnerabilidades', text: 'Realizamos pentesting ético y análisis exhaustivos para identificar y mitigar brechas de seguridad en sus sistemas y aplicaciones.', icon: <Fingerprint /> },
    { title: 'Gestión de Identidad y Acceso (IAM/IGA)', text: 'Implementamos soluciones robustas para controlar quién accede a qué información, asegurando el principio de mínimo privilegio.', icon: <UserCheck /> },
    { title: 'Seguridad Perimetral y de Endpoints', text: 'Desplegamos firewalls de próxima generación (NGFW), EDR, XDR y otras tecnologías para proteger su red y dispositivos.', icon: <Network /> },
    { title: 'Respuesta a Incidentes y Continuidad del Negocio', text: 'Desarrollamos planes de respuesta (IRP) y recuperación ante desastres (DRP) para minimizar el impacto.', icon: <AlertTriangle /> },
  ],
  benefitsHeading: "Beneficios de Fortalecer su Ciberseguridad:",
  benefits: [
    'Protección Integral de Datos Críticos',
    'Reducción Significativa de Riesgos Cibernéticos',
    'Cumplimiento Normativo (GDPR, HIPAA, PCI DSS)',
    'Fortalecimiento de la Confianza del Cliente y Reputación',
    'Garantía de Continuidad del Negocio ante Incidentes',
    'Fomento de una Cultura de Seguridad Organizacional',
  ],
  formSubject: 'Consulta%20Ciberseguridad%20Avanzada'
};

export default function CiberseguridadPage() {
  return (
    <div className="py-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" size="sm" asChild className="mb-8">
          <Link href={serviceDetails.parentLink}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a {serviceDetails.parentName}
          </Link>
        </Button>

        <Card className="shadow-xl border border-border/30 hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5">
          <CardHeader className="items-center text-center pt-10 pb-8">
            {React.cloneElement(serviceDetails.icon, { className: "h-16 w-16 text-primary mb-6" })}
            <CardTitle className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2">
              {serviceDetails.title}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-3 group-hover:text-foreground/90">
              {serviceDetails.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 md:px-8 pb-10">
            {serviceDetails.points && serviceDetails.points.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.pointsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                  {serviceDetails.points.map((point) => (
                    <li key={point.title} className="flex items-start text-foreground group-hover:text-inherit">
                       {React.cloneElement(point.icon, { className: "h-7 w-7 text-green-500 mr-4 mt-1 shrink-0 group-hover:text-green-400"})}
                      <div>
                        <span className="text-md font-semibold">{point.title}</span>
                        <p className="text-sm text-muted-foreground group-hover:text-inherit/90">{point.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {serviceDetails.benefits && serviceDetails.benefits.length > 0 && (
               <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.benefitsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto">
                  {serviceDetails.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-foreground group-hover:text-inherit">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                      <span className="text-md">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="text-center mt-8">
              <Button size="lg" asChild className="text-lg px-8 py-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary shadow-md hover:shadow-lg transition-all">
                <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Fortalezca su Seguridad Hoy <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
