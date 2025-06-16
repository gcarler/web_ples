// src/app/ples-catastro/actualizacion-mantenimiento/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Actualización y Mantenimiento Catastral - PLES Catastro',
  description: 'Implementamos procesos continuos y automatizados para mantener la información catastral actualizada, confiable y accesible.',
};

const serviceDetails = {
  parentLink: "/ples-catastro",
  parentName: "PLES Catastro",
  serviceSlug: "actualizacion-mantenimiento-catastral",
  icon: <FileText />, // Icon component
  title: 'Actualización y Mantenimiento Catastral',
  description: 'Implementamos procesos continuos y automatizados para mantener la información catastral actualizada, confiable y accesible.',
  pointsHeading: 'Componentes del Servicio:',
  points: [
    'Flujos de Trabajo Digitales',
    'Monitoreo de Cambios',
    'Interoperabilidad de Sistemas',
    'Capacitación de Personal',
  ],
  formSubject: 'Consulta%20Actualizacion%20Mantenimiento%20Catastral'
};

export default function ActualizacionMantenimientoPage() {
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
              <>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.pointsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto mb-12">
                  {serviceDetails.points.map((point) => (
                    <li key={point} className="flex items-start text-foreground group-hover:text-inherit">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                      <span className="text-md">{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="text-center">
              <Button size="lg" asChild className="text-lg px-8 py-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary shadow-md hover:shadow-lg transition-all">
                <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Conocer Más sobre {serviceDetails.title} <ArrowRight className="ml-2 h-5 w-5" />
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
