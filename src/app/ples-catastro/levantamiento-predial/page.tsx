// src/app/ples-catastro/levantamiento-predial/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Settings, Layers, Cpu, BarChart3, ShieldCheck, Clock, DraftingCompass, Target, Globe } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Levantamiento Predial Multifinalitario - PLES Catastro',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales, utilizando tecnología de vanguardia y el uso inteligente de la experiencia.',
};

const serviceDetails = {
  parentLink: "/ples-catastro",
  parentName: "PLES Catastro",
  serviceSlug: "levantamiento-predial",
  mainIcon: <MapPin />,
  title: 'Levantamiento Predial Multifinalitario',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales. Aplicamos <strong class="text-primary group-hover:text-accent transition-colors">el uso inteligente de la experiencia</strong>, metodologías científicas y tecnología de vanguardia para garantizar información territorial confiable, optimizar tiempos y costos, y entregar productos de alta calidad.',
  keyServicesHeading: 'Características Clave del Servicio:',
  keyServices: [ 
    { title: 'Cobertura Exhaustiva', text: 'Levantamientos detallados en zonas urbanas y rurales, adaptados a las particularidades de cada territorio.', icon: <Globe className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Tecnología de Precisión', text: 'Uso de GPS RTK/PPK, drones con sensores LiDAR/Fotogramétricos y estaciones totales robóticas para máxima exactitud.', icon: <Cpu className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Integración SIG', text: 'Compatibilidad nativa con Sistemas de Información Geográfica (SIG) y Bases de Datos Espaciales para una gestión eficiente.', icon: <Layers className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
    { title: 'Soporte a la Formalización', text: 'Asesoría técnica y metodológica para la formalización de la propiedad y regularización de la tenencia de la tierra.', icon: <DraftingCompass className="h-8 w-8 mb-2 text-primary group-hover:text-accent transition-colors" /> },
  ],
  methodologyHeading: 'Nuestra Metodología Avanzada:',
  methodology: [
    {
      icon: <Settings className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
      title: "Planificación Detallada y Científica",
      text: "Definimos alcances, seleccionamos tecnologías óptimas y diseñamos flujos de trabajo eficientes basados en análisis técnico y nuestra vasta experiencia."
    },
    {
      icon: <Target className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />,
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
    { icon: <BarChart3 className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />, title: "Base Catastral Precisa", text: "Fundamento sólido para la toma de decisiones estratégicas y gestión territorial." },
    { icon: <ShieldCheck className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />, title: "Seguridad Jurídica", text: "Facilita la formalización, reduce conflictos y optimiza la recaudación." },
    { icon: <Clock className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />, title: "Eficiencia y Ahorro", text: "Optimización de tiempos y costos operativos gracias a tecnología y experiencia." }
  ],
  ctaText: 'Solicitar Asesoría Especializada',
  formSubject: 'Consulta%20Levantamiento%20Predial'
};

export default function LevantamientoPredialPage() {
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
            <span dangerouslySetInnerHTML={{ __html: serviceDetails.description }} />
          </p>
        </section>

        {serviceDetails.keyServices && serviceDetails.keyServices.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-10 text-center">
              {serviceDetails.keyServicesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {serviceDetails.keyServices.map((service) => (
                <Card key={service.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:animate-gradient hover:bg-[length:200%_200%]">
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

        {serviceDetails.methodology && serviceDetails.methodology.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-foreground mb-10 text-center">
              {serviceDetails.methodologyHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {serviceDetails.methodology.map((item) => (
                <Card key={item.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:animate-gradient hover:bg-[length:200%_200%]">
                  <div className="flex items-start gap-4">
                    {React.cloneElement(item.icon, {className: "h-8 w-8 text-primary group-hover:text-accent transition-colors mt-1 shrink-0"})}
                    <div>
                      <CardTitle className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary-foreground transition-colors">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90 transition-colors">{item.text}</p>
                    </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {serviceDetails.benefits.map((item) => (
                 <Card key={item.title} className="p-6 group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:animate-gradient hover:bg-[length:200%_200%] text-center">
                  <div className="flex flex-col items-center">
                    {React.cloneElement(item.icon, {className:"h-8 w-8 text-primary group-hover:text-accent transition-colors mb-3"})}
                    <CardTitle className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary-foreground transition-colors">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90 transition-colors">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>
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
