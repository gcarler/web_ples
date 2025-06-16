// src/app/ples-catastro/levantamiento-predial/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Settings, Layers, Cpu, BarChart3, ShieldCheck, Clock } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Levantamiento Predial Multifinalitario - PLES Catastro',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales, utilizando tecnología de vanguardia y el uso inteligente de la experiencia.',
};

const serviceDetails = {
  parentLink: "/ples-catastro",
  parentName: "PLES Catastro",
  serviceSlug: "levantamiento-predial",
  icon: <MapPin />,
  title: 'Levantamiento Predial Multifinalitario',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales. Aplicamos <strong class="text-primary group-hover:text-accent transition-colors">el uso inteligente de la experiencia</strong>, metodologías científicas y tecnología de vanguardia para garantizar información territorial confiable, optimizar tiempos y costos, y entregar productos de alta calidad.',
  characteristicsHeading: 'Características Clave del Servicio:',
  characteristics: [
    'Cobertura Urbana y Rural exhaustiva.',
    'Aplicación de Tecnología GPS de alta precisión, Drones con sensores LiDAR/Fotogramétricos y Estaciones Totales Robóticas.',
    'Integración nativa con Sistemas de Información Geográfica (SIG) y Bases de Datos Espaciales.',
    'Generación de Cartografía Base y Temática detallada, precisa y actualizada.',
    'Identificación rigurosa de características físicas, jurídicas y económicas de los predios.',
    'Soporte técnico y metodológico para la formalización de la propiedad y regularización de la tenencia.',
  ],
  methodologyHeading: 'Nuestra Metodología Avanzada:',
  methodology: [
    {
      icon: <Settings className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Planificación Detallada y Científica",
      text: "Definimos alcances, seleccionamos tecnologías óptimas y diseñamos flujos de trabajo eficientes basados en análisis técnico y nuestra vasta experiencia."
    },
    {
      icon: <Layers className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Captura de Datos de Alta Precisión",
      text: "Utilizamos GPS RTK/PPK, estaciones totales robóticas y drones equipados con sensores LiDAR o fotogramétricos para garantizar la máxima exactitud en campo."
    },
    {
      icon: <Cpu className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Procesamiento y Modelado Avanzado",
      text: "Empleamos software especializado y algoritmos de IA para el procesamiento de datos, generación de Modelos Digitales de Terreno (MDT), Modelos Digitales de Superficie (MDS) y ortofotomosaicos."
    },
    {
      icon: <CheckCircle className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Integración y Validación Rigurosa",
      text: "Consolidamos información física, jurídica y económica en SIG, aplicando controles de calidad continuos para asegurar la consistencia y fiabilidad de los datos."
    }
  ],
  benefitsHeading: 'Beneficios de Nuestro Levantamiento Predial:',
  benefits: [
    {
      icon: <BarChart3 className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Base Catastral Precisa y Confiable",
      text: "Fundamento sólido para la toma de decisiones estratégicas, planificación y gestión territorial."
    },
    {
      icon: <ShieldCheck className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Seguridad Jurídica y Optimización Fiscal",
      text: "Identificación clara de predios que facilita la formalización, reduce conflictos y optimiza la recaudación."
    },
    {
      icon: <Clock className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Eficiencia y Reducción de Costos",
      text: "Gracias a la aplicación de tecnologías eficientes y nuestra experiencia probada, optimizamos los tiempos de ejecución y los costos operativos."
    }
  ],
  formSubject: 'Consulta%20Levantamiento%20Predial'
};

export default function LevantamientoPredialPage() {
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
              <span dangerouslySetInnerHTML={{ __html: serviceDetails.description }} />
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 md:px-8 pb-10">
            {serviceDetails.characteristics && serviceDetails.characteristics.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.characteristicsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto">
                  {serviceDetails.characteristics.map((point) => (
                    <li key={point} className="flex items-start text-foreground group-hover:text-inherit">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                      <span className="text-md">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {serviceDetails.methodology && serviceDetails.methodology.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.methodologyHeading}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {serviceDetails.methodology.map((item) => (
                    <div key={item.title} className="bg-background/30 group-hover:bg-card/50 p-5 rounded-lg border border-border/20 group-hover:border-primary/30">
                      <div className="flex items-center gap-3 mb-2">
                        {React.cloneElement(item.icon, {})}
                        <h4 className="text-lg font-semibold text-primary group-hover:text-accent">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-inherit/90">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {serviceDetails.benefits && serviceDetails.benefits.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.benefitsHeading}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {serviceDetails.benefits.map((item) => (
                     <div key={item.title} className="bg-background/30 group-hover:bg-card/50 p-5 rounded-lg border border-border/20 group-hover:border-primary/30 text-center">
                      {React.cloneElement(item.icon, { className:"mx-auto mb-3"})}
                      <h4 className="text-lg font-semibold text-primary group-hover:text-accent mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-inherit/90">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            <div className="text-center mt-8">
              <Button size="lg" asChild className="text-lg px-8 py-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary shadow-md hover:shadow-lg transition-all">
                <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Solicitar Asesoría Especializada <ArrowRight className="ml-2 h-5 w-5" />
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
