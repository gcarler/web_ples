// src/app/ples-tic/desarrollo-software/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Code, CheckCircle, Layers, Puzzle, Rocket, Zap, Users, BarChart3, Lightbulb, ShieldCheck, Settings, MonitorSmartphone, CloudCog
} from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Desarrollo de Software a Medida - PLES TIC',
  description: 'Creamos soluciones de software personalizadas, robustas y escalables que se adaptan perfectamente a sus necesidades y potencian su negocio.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  serviceSlug: "desarrollo-software",
  mainIcon: <Code />,
  title: 'Desarrollo de Software a Medida',
  description: 'Transformamos sus ideas en soluciones de software potentes, personalizadas y escalables. Nuestro equipo experto utiliza las últimas tecnologías y metodologías ágiles para entregar productos de alta calidad que impulsan su negocio.',
  keyServicesHeading: 'Tipos de Software que Desarrollamos:',
  keyServices: [
    { title: 'Aplicaciones Web y Móviles', text: 'Desarrollamos aplicaciones web progresivas (PWA), nativas (iOS/Android) y plataformas complejas con interfaces intuitivas y rendimiento excepcional.', icon: <MonitorSmartphone className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Sistemas Empresariales (ERP/CRM)', text: 'Construimos o personalizamos sistemas ERP y CRM a medida para optimizar sus flujos de trabajo, gestión de clientes y operaciones internas.', icon: <Puzzle className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Integración de APIs y Microservicios', text: 'Conectamos sus sistemas existentes, desarrollamos APIs robustas y arquitecturas de microservicios para una comunicación fluida entre plataformas.', icon: <Rocket className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Modernización de Legado (Legacy)', text: 'Actualizamos y modernizamos sus aplicaciones antiguas, migrándolas a tecnologías actuales para mejorar su eficiencia, seguridad y escalabilidad.', icon: <Zap className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
  ],
  benefitsHeading: "Beneficios de un Desarrollo a Medida:",
  benefits: [
    'Soluciones 100% Adaptadas a sus Procesos y Necesidades Únicas',
    'Mayor Escalabilidad y Flexibilidad para el Crecimiento Futuro',
    'Ventaja Competitiva Sostenible en su Mercado Específico',
    'Optimización de Procesos Operativos y Reducción de Costos',
    'Propiedad Intelectual Completa del Código Fuente Desarrollado',
    'Soporte Técnico y Mantenimiento Continuo Garantizado por Expertos',
  ],
  ctaText: 'Cuéntenos su Proyecto',
  formSubject: 'Consulta%20Desarrollo%20Software'
};

export default function DesarrolloSoftwarePage() {
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
