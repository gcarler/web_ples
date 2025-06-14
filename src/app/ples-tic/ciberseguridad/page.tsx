// src/app/ples-tic/ciberseguridad/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, ShieldCheck, CheckCircle, Fingerprint, UserCheck, Network, AlertTriangle, ShieldAlert, Bot, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Ciberseguridad Avanzada - PLES TIC',
  description: 'Protegemos sus activos digitales con estrategias de ciberseguridad proactivas, detección de amenazas y respuesta rápida a incidentes.',
};

export default function CiberseguridadPage() {
  const services = [
    {
      icon: <Fingerprint className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Auditorías y Análisis de Vulnerabilidades',
      description: 'Realizamos pentesting ético y análisis exhaustivos para identificar y mitigar brechas de seguridad en sus sistemas y aplicaciones.',
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Gestión de Identidad y Acceso (IAM/IGA)',
      description: 'Implementamos soluciones robustas para controlar quién accede a qué información, asegurando el principio de mínimo privilegio.',
    },
    {
      icon: <Network className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Seguridad Perimetral y de Endpoints',
      description: 'Desplegamos firewalls de próxima generación (NGFW), EDR, XDR y otras tecnologías para proteger su red y dispositivos.',
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Respuesta a Incidentes y Continuidad del Negocio',
      description: 'Desarrollamos planes de respuesta a incidentes (IRP) y estrategias de recuperación ante desastres (DRP) para minimizar el impacto.',
    },
  ];

  const benefits = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Protección Integral de Datos', text: 'Salvaguarde su información crítica contra robos, pérdidas y accesos no autorizados.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Reducción de Riesgos Cibernéticos', text: 'Minimice la probabilidad y el impacto de ataques e incidentes de seguridad.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Cumplimiento Normativo', text: 'Asegure la adherencia a regulaciones como GDPR, HIPAA, PCI DSS, entre otras.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Confianza del Cliente', text: 'Demuestre su compromiso con la seguridad, fortaleciendo la reputación de su marca.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Continuidad del Negocio', text: 'Mantenga sus operaciones activas incluso frente a ciberataques.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Cultura de Seguridad', text: 'Fomentamos la concienciación y capacitación de su personal en buenas prácticas.' },
  ];

  const frameworks = ['NIST Cybersecurity Framework', 'ISO 27001/27002', 'OWASP Top 10', 'MITRE ATT&CK'];
  const tools = ['SIEM (Splunk, ELK)', 'Soluciones EDR/XDR', 'Firewalls (Palo Alto, Fortinet)', 'Scanners de Vulnerabilidades (Nessus, OpenVAS)', 'Herramientas de Pentesting'];

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
          <ShieldCheck className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
            Ciberseguridad Avanzada
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            En un mundo digital cada vez más complejo, la ciberseguridad es fundamental. En PLES TIC, ofrecemos soluciones integrales para proteger sus activos más valiosos, anticipar amenazas y garantizar la resiliencia de su organización.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=ciberseguridad&subject=Consulta%20Ciberseguridad%20Avanzada">
              <span className="flex items-center">
                Fortalezca su Seguridad Hoy <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nuestros Servicios de Ciberseguridad</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Un enfoque de 360 grados para la protección de su infraestructura, datos y aplicaciones.
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
          <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Confiar su Ciberseguridad a PLES TIC?</h2>
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
          <h2 className="text-3xl font-bold mb-4">Marcos de Referencia y Herramientas</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Nos basamos en estándares internacionales y utilizamos tecnología de punta para ofrecerle la mejor protección.
          </p>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary mb-3">Marcos y Estándares</h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
                {frameworks.map((tech) => (
                <Badge key={tech} variant="default" className="text-md md:text-base px-4 py-2 shadow-sm">{tech}</Badge>
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">Tecnologías y Herramientas</h3>
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
          <ShieldAlert className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proteja su Futuro Digital</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            No espere a ser víctima de un ciberataque. Contáctenos para una evaluación de seguridad y descubra cómo podemos ayudarle a construir una defensa digital robusta.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=ciberseguridad&subject=Evaluacion%20de%20Seguridad">
              <span className="flex items-center">
                Solicitar Evaluación Gratuita <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
