// src/app/ples-tic/desarrollo-software/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Code, CheckCircle, Layers, Puzzle, Rocket, Zap, Users, BarChart3, Lightbulb, ShieldCheck, Settings, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Desarrollo de Software a Medida - PLES TIC',
  description: 'Creamos soluciones de software personalizadas, robustas y escalables que se adaptan perfectamente a sus necesidades y potencian su negocio.',
};

export default function DesarrolloSoftwarePage() {
  const features = [
    {
      icon: <Layers className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Aplicaciones Web y Móviles',
      description: 'Desarrollamos aplicaciones web progresivas (PWA), nativas para iOS y Android, y plataformas complejas con interfaces intuitivas y rendimiento excepcional.',
    },
    {
      icon: <Puzzle className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Sistemas Empresariales (ERP/CRM)',
      description: 'Construimos o personalizamos sistemas ERP y CRM a medida para optimizar sus flujos de trabajo, gestión de clientes y operaciones internas.',
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Integración de APIs y Servicios',
      description: 'Conectamos sus sistemas existentes con servicios de terceros o desarrollamos APIs robustas para una comunicación fluida entre plataformas.',
    },
    {
      icon: <Zap className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Modernización de Legado (Legacy)',
      description: 'Actualizamos y modernizamos sus aplicaciones antiguas, migrándolas a tecnologías actuales para mejorar su eficiencia, seguridad y escalabilidad.',
    },
  ];

  const benefits = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Soluciones 100% Adaptadas', text: 'Software diseñado específicamente para sus procesos y requisitos únicos.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Escalabilidad y Flexibilidad', text: 'Sistemas que crecen con su negocio y se adaptan a futuros cambios.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Ventaja Competitiva', text: 'Herramientas tecnológicas que le diferencian en el mercado.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Optimización de Procesos', text: 'Mayor eficiencia operativa y reducción de costos a través de la automatización.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Propiedad Intelectual', text: 'Usted es el dueño del código y la solución desarrollada.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Soporte y Mantenimiento', text: 'Acompañamiento continuo para garantizar el óptimo funcionamiento.' },
  ];

  const technologies = ['React', 'Next.js', 'Node.js', 'Python (Django/Flask)', 'Java', '.NET', 'Swift', 'Kotlin', 'Docker', 'Kubernetes', 'SQL & NoSQL DBs'];

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
          <Code className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
            Desarrollo de Software a Medida
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Transformamos sus ideas en soluciones de software potentes, personalizadas y escalables. Nuestro equipo experto utiliza las últimas tecnologías y metodologías ágiles para entregar productos de alta calidad que impulsan su negocio.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=desarrollo-software&subject=Consulta%20Desarrollo%20Software">
              <span className="flex items-center">
                Cuéntenos su Proyecto <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Tipos de Software que Desarrollamos</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Desde aplicaciones web interactivas hasta complejos sistemas empresariales, tenemos la experiencia para materializar su visión.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col bg-card">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficios de un Desarrollo a Medida</h2>
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
          <h2 className="text-3xl font-bold mb-4">Tecnologías y Frameworks</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Utilizamos un stack tecnológico moderno y probado para construir aplicaciones robustas, seguras y de alto rendimiento.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground rounded-lg shadow-inner">
        <div className="container mx-auto">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Construir su Próxima Gran Solución?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Contáctenos hoy mismo para discutir sus requerimientos y cómo podemos ayudarle a alcanzar sus objetivos tecnológicos con una solución de software a medida.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=desarrollo-software&subject=Solicitud%20Desarrollo%20Software">
              <span className="flex items-center">
                Solicitar Consulta Gratuita <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
