// src/app/ples-tic/soluciones-cloud/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CloudCog, CheckCircle, Server, UploadCloud, Scaling, Shield, Repeat, Zap, Settings, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Soluciones Cloud y DevOps - PLES TIC',
  description: 'Impulsamos su transformación digital con arquitecturas cloud robustas, escalables y seguras, optimizadas mediante prácticas DevOps.',
};

export default function SolucionesCloudPage() {
  const services = [
    {
      icon: <UploadCloud className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Migración Estratégica a la Nube',
      description: 'Planificamos y ejecutamos migraciones a AWS, Azure o GCP, minimizando riesgos y optimizando costos y rendimiento.',
    },
    {
      icon: <Server className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Arquitecturas Nativas de la Nube',
      description: 'Diseñamos soluciones basadas en microservicios, serverless y contenedores (Docker, Kubernetes) para máxima agilidad y escalabilidad.',
    },
    {
      icon: <Repeat className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Automatización DevOps y CI/CD',
      description: 'Implementamos pipelines de Integración Continua y Entrega Continua (CI/CD) para acelerar el desarrollo y mejorar la calidad del software.',
    },
    {
      icon: <Settings className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Infraestructura como Código (IaC)',
      description: 'Gestionamos su infraestructura de forma programática (Terraform, CloudFormation) para mayor consistencia, velocidad y control.',
    },
  ];

  const benefits = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Escalabilidad Dinámica', text: 'Ajuste recursos según la demanda, pagando solo por lo que usa.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Mayor Agilidad', text: 'Despliegue aplicaciones más rápido y responda ágilmente al mercado.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Reducción de Costos', text: 'Optimice gastos de infraestructura y mantenimiento.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Seguridad Mejorada', text: 'Aproveche las robustas capacidades de seguridad de los proveedores cloud.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Alta Disponibilidad', text: 'Garantice la continuidad de su negocio con arquitecturas resilientes.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Innovación Acelerada', text: 'Acceda a servicios avanzados de IA, Big Data y IoT en la nube.' },
  ];

  const platforms = ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform (GCP)'];
  const tools = ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI/CD', 'Prometheus', 'Grafana'];


  return (
    <div className="py-10 space-y-16 px-4 sm:px-6 lg:px-8">
      <Button variant="outline" size="sm" asChild className="mb-8">
        <Link href="/ples-tic">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a PLES TIC
        </Link>
      </Button>

      <section className="relative py-20 md:py-28 bg-card shadow-xl rounded-lg overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <CloudCog className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
            Soluciones Cloud y DevOps
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Acelere su innovación y optimice sus operaciones con nuestras soluciones expertas en la nube y prácticas DevOps. Diseñamos, implementamos y gestionamos infraestructuras cloud seguras, escalables y costo-eficientes.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=soluciones-cloud&subject=Consulta%20Soluciones%20Cloud%20y%20DevOps">
              <span className="flex items-center">
                Impulse su Negocio a la Nube <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nuestros Servicios Cloud y DevOps</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Desde la migración hasta la gestión continua, le acompañamos en cada paso de su viaje a la nube.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col bg-card">
                <CardHeader className="items-center">
                  {service.icon}
                  <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficios de Adoptar la Nube con PLES TIC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-card p-6 group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  {benefit.icon}
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary-foreground mb-1">{benefit.title}</CardTitle>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{benefit.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plataformas y Herramientas que Dominamos</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Somos expertos en las principales plataformas cloud y un amplio abanico de herramientas DevOps para construir la solución perfecta para usted.
          </p>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary mb-3">Principales Proveedores Cloud</h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
                {platforms.map((tech) => (
                <Badge key={tech} variant="default" className="text-md md:text-base px-4 py-2 shadow-sm">{tech}</Badge>
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">Herramientas DevOps Clave</h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
                {tools.map((tech) => (
                <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">{tech}</Badge>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground rounded-lg shadow-inner">
        <div className="container mx-auto">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Desbloquear el Poder de la Nube?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Hable con nuestros arquitectos cloud y especialistas DevOps para diseñar una estrategia de nube que impulse su crecimiento y eficiencia.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=soluciones-cloud&subject=Estrategia%20Cloud%20y%20DevOps">
              <span className="flex items-center">
                Solicitar Asesoría Cloud <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
