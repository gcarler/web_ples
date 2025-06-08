// src/app/ples-catastro/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Landmark, Scale, Users, BarChart3, FileText, Settings, Briefcase, MapPin, ShieldCheck, Lightbulb, Target, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'PLES Catastro - Modernización y Gestión Integral del Territorio',
  description: 'Soluciones expertas en catastro multifinalitario, ordenamiento territorial, y administración de tierras para un desarrollo eficiente, equitativo y sostenible.',
};

export default function PlesCatastroPage() {
  const services = [
    {
      icon: <MapPin className="h-10 w-10 text-primary mb-4" />,
      title: 'Levantamiento Predial Multifinalitario',
      description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales.',
    },
    {
      icon: <FileText className="h-10 w-10 text-primary mb-4" />,
      title: 'Actualización y Mantenimiento Catastral',
      description: 'Implementamos procesos continuos para mantener la información catastral actualizada y confiable.',
    },
    {
      icon: <Scale className="h-10 w-10 text-primary mb-4" />,
      title: 'Avalúos Masivos y Puntuales',
      description: 'Realizamos valoraciones de propiedades con metodologías robustas para una base imponible justa y gestión de activos.',
    },
    {
      icon: <Landmark className="h-10 w-10 text-primary mb-4" />,
      title: 'Planes de Ordenamiento Territorial',
      description: 'Desarrollamos e implementamos planes que guían el crecimiento sostenible y la ocupación eficiente del territorio.',
    },
  ];

  const benefits = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Incremento de la Recaudación Fiscal' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Seguridad Jurídica en la Tenencia' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Planificación Territorial Informada' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Transparencia y Eficiencia en la Gestión' },
  ];

  const technologies = ['SIG (Sistemas de Información Geográfica)', 'GPS y Estaciones Totales', 'Drones y Fotogrametría', 'Bases de Datos Espaciales', 'Modelos de Avalúo Automatizado (AVM)'];

  return (
    <div className="py-10 space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <Landmark className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary mb-4">PLES Catastro</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Modernización y Gestión Integral del Territorio. Soluciones expertas para un desarrollo eficiente y equitativo.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-md px-3 py-1">#CatastroMultifinalitario</Badge>
            <Badge variant="secondary" className="text-md px-3 py-1">#OrdenamientoTerritorial</Badge>
            <Badge variant="secondary" className="text-md px-3 py-1">#AdministracionDeTierras</Badge>
          </div>
          <Button size="lg" asChild>
            <Link href="/forms?service=ples-catastro">
              Descubra Nuestras Soluciones <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Nuestros Enfoques con Tabs */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Enfoques Integrales</h2>
        <Tabs defaultValue="tecnologico" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="tecnologico">Tecnológico</TabsTrigger>
            <TabsTrigger value="juridico">Jurídico y Normativo</TabsTrigger>
            <TabsTrigger value="social">Social y Participativo</TabsTrigger>
          </TabsList>
          <TabsContent value="tecnologico">
            <Card>
              <CardHeader>
                <CardTitle>Innovación Tecnológica en Catastro</CardTitle>
                <CardDescription>Utilizamos tecnología de punta para garantizar la precisión, eficiencia y accesibilidad de la información catastral.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Settings className="h-6 w-6 text-primary mt-1" />
                  <p>Implementación de Sistemas de Información Geográfica (SIG) robustos y escalables.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-6 w-6 text-primary mt-1" />
                  <p>Uso de drones, GPS de alta precisión y software especializado para levantamientos y análisis.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-primary mt-1" />
                  <p>Digitalización y automatización de procesos para una gestión catastral moderna.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="juridico">
            <Card>
              <CardHeader>
                <CardTitle>Fortalecimiento Jurídico y Normativo</CardTitle>
                <CardDescription>Asesoramos en la adecuación de marcos legales y normativos para un catastro moderno y funcional.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Scale className="h-6 w-6 text-primary mt-1" />
                  <p>Análisis y propuesta de mejoras a la legislación catastral y de ordenamiento territorial.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                  <p>Acompañamiento en la formalización de la tenencia de la tierra y regularización predial.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-6 w-6 text-primary mt-1" />
                  <p>Desarrollo de manuales y procedimientos para la gestión catastral transparente.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Enfoque Social y Participativo</CardTitle>
                <CardDescription>Involucramos a la comunidad y actores clave para asegurar la aceptación y sostenibilidad de los proyectos catastrales.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <p>Metodologías de catastro participativo y socialización de proyectos.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-6 w-6 text-primary mt-1" />
                  <p>Capacitación y transferencia de conocimiento a equipos locales.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <p>Diseño de estrategias de comunicación para informar y educar sobre la importancia del catastro.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Nuestros Servicios */}
       <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Servicios Catastrales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Beneficios de un Catastro Moderno</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center space-x-3 p-4 bg-card rounded-md shadow">
                {benefit.icon}
                <p className="font-medium text-left">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologías Aplicadas */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Tecnologías Aplicadas en Catastro</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="default" className="text-md px-4 py-2">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="text-center py-16">
        <FileText className="h-12 w-12 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Transforme la Gestión de su Territorio</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contáctenos para una evaluación y descubra cómo PLES Catastro puede ayudar a su organización a alcanzar sus objetivos de desarrollo y gestión territorial.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/forms?service=ples-catastro&subject=Consulta%20Modernizacion%20Catastral">
            Solicitar Asesoría <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
