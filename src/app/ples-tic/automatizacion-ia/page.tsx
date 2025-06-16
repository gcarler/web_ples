// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Brain, Zap, Bot, FileArchive, Star, CircleDollarSign, Settings
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
  icon: <Brain />,
  title: 'Automatización con IA Confiable',
  description: 'No hay saltos al vacío. Transformamos tu negocio con IA probada y estratégica, optimizando tus procesos, reduciendo costos y liberando el potencial de tu equipo con soluciones implementadas por expertos.',
  pointsHeading: 'Potencial de la Automatización con IA:',
  points: [
    { title: 'Optimización de Procesos', text: 'Elimina tareas repetitivas, reduce errores y acelera flujos de trabajo clave.', icon: <Zap/> },
    { title: 'Análisis Predictivo Estratégico', text: 'Transforma tus datos en decisiones anticipadas, optimizando inventarios y personalizando experiencias.', icon: <Brain/> },
    { title: 'Atención al Cliente Inteligente', text: 'Implementa chatbots y asistentes virtuales que resuelven dudas 24/7, liberando a tu equipo.', icon: <Bot/> },
    { title: 'Gestión Documental Avanzada', text: 'Digitaliza y clasifica información automáticamente, mejorando el acceso y la seguridad.', icon: <FileArchive/> },
    { title: 'Personalización y Experiencia de Usuario', text: 'Ofrece interacciones y recomendaciones únicas, mejorando la lealtad del cliente.', icon: <Star/> },
    { title: 'Reducción de Costos Operativos', text: 'Logra ahorros significativos al automatizar tareas intensivas en mano de obra.', icon: <CircleDollarSign/> },
  ],
  formSubject: 'Diagnostico%20Gratuito%20IA'
};

export default function AiAutomationPage() {
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
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto mb-12">
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
              </>
            )}
            
            <div className="text-center">
              <Button size="lg" asChild className="text-lg px-8 py-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary shadow-md hover:shadow-lg transition-all">
                <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Solicita tu Diagnóstico Gratuito <ArrowRight className="ml-2 h-5 w-5" />
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
