// src/app/ples-crea/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Map, Brain, Lightbulb, Users, Target, ShieldCheck, BarChart3, Settings, Search, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'PLES CREA - Cartografía Inteligente para un Futuro Sostenible y Equitativo',
  description: 'En PLES CREA, fusionamos la ciencia de datos geoespaciales con una visión estratégica para ofrecer soluciones cartográficas que impulsan la resiliencia ambiental, la equidad territorial y la toma de decisiones informada.',
};

export default function PlesCreaPage() {
  const services = [
    {
      icon: <Map className="h-10 w-10 text-primary mb-4" />,
      title: 'Análisis de Vulnerabilidad y Riesgo',
      description: 'Identificamos y evaluamos riesgos climáticos y socioambientales para desarrollar estrategias de adaptación efectivas.',
    },
    {
      icon: <Brain className="h-10 w-10 text-primary mb-4" />,
      title: 'Mapeo Ecosistémico y Biodiversidad',
      description: 'Cartografiamos ecosistemas, servicios ambientales y biodiversidad para la planificación y conservación territorial.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: 'Plataformas Cartográficas Interactivas',
      description: 'Desarrollamos visores y plataformas web personalizadas para la visualización y análisis de datos geoespaciales.',
    },
    {
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
      title: 'Cartografía Social y Participativa',
      description: 'Integramos el conocimiento local y la participación comunitaria en la creación de mapas para la equidad.',
    },
  ];

  const benefits = [
    { icon: <Target className="h-6 w-6 text-green-500" />, text: 'Decisiones Basadas en Evidencia' },
    { icon: <ShieldCheck className="h-6 w-6 text-green-500" />, text: 'Planificación Territorial Resiliente' },
    { icon: <BarChart3 className="h-6 w-6 text-green-500" />, text: 'Optimización de Recursos' },
    { icon: <Users className="h-6 w-6 text-green-500" />, text: 'Participación y Equidad Fortalecidas' },
  ];

  const caseStudies = [
    {
      title: 'Atlas de Riesgo Climático Urbano',
      challenge: 'Una municipalidad necesitaba comprender las zonas más vulnerables al cambio climático para priorizar inversiones.',
      solution: 'Desarrollamos un atlas interactivo con mapas de amenaza, exposición y vulnerabilidad, facilitando la planificación urbana resiliente.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'urban risk map',
    },
    {
      title: 'Monitoreo de Cobertura Forestal',
      challenge: 'Una ONG requería una herramienta para seguir la deforestación y los esfuerzos de restauración en una reserva clave.',
      solution: 'Implementamos una plataforma con imágenes satelitales actualizadas y análisis de cambio de cobertura, mejorando la gestión de la reserva.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'forest monitoring satellite',
    },
  ];

  const technologies = ['SIG (QGIS, ArcGIS)', 'Teledetección (Sentinel, Landsat)', 'Python (GeoPandas, Rasterio)', 'Bases de Datos Espaciales (PostGIS)', 'Leaflet / Mapbox GL JS', 'IA Geoespacial'];

  return (
    <div className="py-10 space-y-12 px-4 sm:px-6 lg:px-8">
      <section className="text-center py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <Map className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary mb-4">PLES CREA</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Cartografía Inteligente para un Futuro Sostenible y Equitativo. Transformamos datos geoespaciales en decisiones estratégicas.
          </p>
          <Button size="lg" asChild>
            <Link href="/forms?service=ples-crea">
              <span className="flex items-center">
                Solicitar Consulta <ArrowRight className="ml-2" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Servicios Destacados</h2>
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

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">¿Por qué Elegir PLES CREA?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex flex-col items-center">
                {benefit.icon}
                <p className="mt-2 font-semibold text-lg">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Proyectos que Inspiran</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Card key={study.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-56 w-full">
                <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" data-ai-hint={study.imageHint} />
              </div>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-muted-foreground mb-1">Desafío:</p>
                <p className="text-sm mb-3">{study.challenge}</p>
                <p className="font-semibold text-muted-foreground mb-1">Solución PLES CREA:</p>
                <p className="text-sm">{study.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Tecnologías que Potencian Nuestras Soluciones</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-lg px-4 py-2">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">¿Qué tipo de datos utilizan para sus análisis?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Utilizamos una amplia gama de fuentes de datos, incluyendo imágenes satelitales (ópticas y radar), datos de drones, información censal, datos climáticos, modelos de elevación digital, y datos aportados por comunidades y clientes. La combinación adecuada depende de cada proyecto.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">¿Cómo garantizan la precisión y calidad de sus mapas?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Aplicamos rigurosos procesos de control de calidad, incluyendo validación en campo (cuando es posible), comparación con fuentes de referencia, y análisis estadísticos. Nuestros expertos geoespaciales siguen las mejores prácticas internacionales en cartografía y análisis de datos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">¿Pueden integrar los mapas y plataformas con nuestros sistemas existentes?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Sí, diseñamos nuestras soluciones pensando en la interoperabilidad. Podemos integrar nuestras plataformas y mapas con sus bases de datos existentes, sistemas CRM/ERP, y otras herramientas mediante APIs y formatos estándar.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="text-center py-16">
        <HelpCircle className="h-12 w-12 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Descubra el Poder de la Cartografía Inteligente</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Permítanos ayudarle a visualizar sus desafíos y oportunidades para tomar decisiones más informadas y construir un futuro más resiliente y equitativo.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/forms?service=ples-crea&subject=Consulta%20Cartografia%20Inteligente">
            <span className="flex items-center">
              Hablemos de su Proyecto <ArrowRight className="ml-2" />
            </span>
          </Link>
        </Button>
      </section>
    </div>
  );
}
