// src/app/ples-tic/desarrollo-software/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Code, CheckCircle, Layers, Puzzle, Rocket, Zap, Users, BarChart3, Lightbulb, ShieldCheck, Settings, MessageSquare
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
  icon: <Code />,
  title: 'Desarrollo de Software a Medida',
  description: 'Transformamos sus ideas en soluciones de software potentes, personalizadas y escalables. Nuestro equipo experto utiliza las últimas tecnologías y metodologías ágiles para entregar productos de alta calidad que impulsan su negocio.',
  pointsHeading: 'Tipos de Software que Desarrollamos:',
  points: [
    { title: 'Aplicaciones Web y Móviles', text: 'Desarrollamos aplicaciones web progresivas (PWA), nativas para iOS y Android, y plataformas complejas con interfaces intuitivas y rendimiento excepcional.', icon: <Layers /> },
    { title: 'Sistemas Empresariales (ERP/CRM)', text: 'Construimos o personalizamos sistemas ERP y CRM a medida para optimizar sus flujos de trabajo, gestión de clientes y operaciones internas.', icon: <Puzzle /> },
    { title: 'Integración de APIs y Servicios', text: 'Conectamos sus sistemas existentes con servicios de terceros o desarrollamos APIs robustas para una comunicación fluida entre plataformas.', icon: <Rocket /> },
    { title: 'Modernización de Legado (Legacy)', text: 'Actualizamos y modernizamos sus aplicaciones antiguas, migrándolas a tecnologías actuales para mejorar su eficiencia, seguridad y escalabilidad.', icon: <Zap /> },
  ],
  benefitsHeading: "Beneficios de un Desarrollo a Medida:",
  benefits: [
    'Soluciones 100% Adaptadas a sus Procesos',
    'Escalabilidad y Flexibilidad para el Futuro',
    'Ventaja Competitiva en su Mercado',
    'Optimización de Procesos y Reducción de Costos',
    'Propiedad Intelectual Completa del Código',
    'Soporte y Mantenimiento Continuo Garantizado',
  ],
  formSubject: 'Consulta%20Desarrollo%20Software'
};

export default function DesarrolloSoftwarePage() {
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
                    Cuéntenos su Proyecto <ArrowRight className="ml-2 h-5 w-5" />
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
