
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
      icon: <Map className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Análisis de Vulnerabilidad y Riesgo',
      description: 'Identificamos y evaluamos riesgos climáticos y socioambientales para desarrollar estrategias de adaptación efectivas.',
    },
    {
      icon: <Brain className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Mapeo Ecosistémico y Biodiversidad',
      description: 'Cartografiamos ecosistemas, servicios ambientales y biodiversidad para la planificación y conservación territorial.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Plataformas Cartográficas Interactivas',
      description: 'Desarrollamos visores y plataformas web personalizadas para la visualización y análisis de datos geoespaciales.',
    },
    {
      icon: <Users className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Cartografía Social y Participativa',
      description: 'Integramos el conocimiento local y la participación comunitaria en la creación de mapas para la equidad.',
    },
  ];

  const benefits = [
    { icon: <Target className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Decisiones Basadas en Evidencia', text: 'Información geoespacial precisa para fundamentar sus estrategias y acciones.' },
    { icon: <ShieldCheck className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Planificación Resiliente', text: 'Herramientas para anticipar y mitigar riesgos, adaptándose al cambio.' },
    { icon: <BarChart3 className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Optimización de Recursos', text: 'Identifique áreas prioritarias y optimice la asignación de recursos e inversiones.' },
    { icon: <Users className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Participación y Equidad', text: 'Fomentamos la inclusión de comunidades en la construcción del territorio.' },
  ];

  const caseStudies = [
    {
      title: 'Atlas de Riesgo Climático Urbano',
      challenge: 'Una municipalidad necesitaba comprender las zonas más vulnerables al cambio climático para priorizar inversiones.',
      solution: 'Desarrollamos un atlas interactivo con mapas de amenaza, exposición y vulnerabilidad, facilitando la planificación urbana resiliente.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'urban risk map',
      tags: ['Análisis de Riesgo', 'SIG Urbano', 'Adaptación Climática']
    },
    {
      title: 'Monitoreo de Cobertura Forestal con Teledetección',
      challenge: 'Una ONG requería una herramienta para seguir la deforestación y los esfuerzos de restauración en una reserva clave.',
      solution: 'Implementamos una plataforma con imágenes satelitales actualizadas y análisis de cambio de cobertura, mejorando la gestión de la reserva.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'drone survey',
      tags: ['Teledetección', 'Conservación', 'Monitoreo Ambiental']
    },
  ];

  const technologies = ['SIG (QGIS, ArcGIS Pro, Google Earth Engine)', 'Teledetección (Sentinel, Landsat, Planet)', 'Python (GeoPandas, Rasterio, Scikit-learn)', 'Bases de Datos Espaciales (PostGIS)', 'Plataformas Web GIS (Leaflet, Mapbox GL JS)', 'Inteligencia Artificial Geoespacial', 'Estándares OGC (WMS, WFS, WCS)'];

  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            {/* Left Visual Part */}
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute -left-[65%] sm:-left-[55%] md:-left-[45%] top-1/2 transform -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center"
                  >
                    <Map className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Part */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES CREA
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Cartografía Inteligente para un Futuro Sostenible y Equitativo. En PLES CREA, fusionamos la ciencia de datos geoespaciales con una visión estratégica para ofrecer soluciones cartográficas que impulsan la resiliencia ambiental, la equidad territorial y la toma de decisiones informada.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#DatosGeoespaciales</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#SostenibilidadAmbiental</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#EquidadTerritorial</Badge>
              </div>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/forms?service=ples-crea&subject=Consulta%20PLES%20CREA">
                  <span className="flex items-center">
                    Descubra Nuestras Soluciones <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Servicios Destacados</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Soluciones geoespaciales innovadoras para abordar los desafíos ambientales y sociales más apremiantes.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
                <Card key={service.title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
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

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Beneficios de Trabajar con PLES CREA</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out text-center hover:animate-gradient hover:bg-[length:200%_200%]">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <CardTitle className="text-lg group-hover:text-primary-foreground mb-2">{benefit.title}</CardTitle>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{benefit.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Proyectos que Inspiran: Casos de Estudio</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
                <Card key={study.title} className="overflow-hidden group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                <div className="relative h-56 w-full">
                    <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" data-ai-hint={study.imageHint} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                        {study.imageHint === 'drone survey' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 drop-shadow-lg">
                                <path d="M12 18.5A2.5 2.5 0 0 1 9.5 21a2.5 2.5 0 0 1-2.4-3.5"/><path d="M12 18.5A2.5 2.5 0 0 0 14.5 21a2.5 2.5 0 0 0 2.4-3.5"/>
                                <path d="M12 3.5A2.5 2.5 0 0 1 14.5 1a2.5 2.5 0 0 1 2.4 3.5"/><path d="M12 3.5A2.5 2.5 0 0 0 9.5 1a2.5 2.5 0 0 0-2.4 3.5"/>
                                <path d="M12 12v-5"/><path d="M12 12v5"/><path d="M12 12H7"/><path d="M12 12h5"/>
                                <circle cx="12" cy="12" r="2.5"/>
                            </svg>
                        )}
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary-foreground">{study.title}</CardTitle>
                    <div className="mt-2">
                        {study.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2 mb-2 group-hover:bg-primary-foreground/20 group-hover:text-accent-foreground">{tag}</Badge>)}
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Desafío:</p>
                        <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.challenge}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Solución PLES CREA:</p>
                        <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                        <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                            <Link href="/forms?subject=Mas%20Informacion%20Caso%20Estudio%20CREA">
                                <span className="flex items-center">
                                    Conocer Más <ArrowRight className="ml-1 h-4 w-4"/>
                                </span>
                            </Link>
                        </Button>
                    </div>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-card shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Tecnologías que Potencian Nuestras Soluciones</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Dominamos un amplio espectro de herramientas geoespaciales y de análisis de datos para ofrecer resultados precisos y visualizaciones impactantes.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Preguntas Frecuentes (FAQ)</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:text-primary">¿Qué tipo de datos utilizan para sus análisis?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Utilizamos una amplia gama de fuentes de datos, incluyendo imágenes satelitales (ópticas y radar), datos de drones (LiDAR, fotogrametría), información censal, datos climáticos, modelos de elevación digital, cartografía existente y datos aportados por comunidades y clientes. La combinación adecuada depende de los objetivos específicos de cada proyecto.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg hover:text-primary">¿Cómo garantizan la precisión y calidad de sus mapas y análisis?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Aplicamos rigurosos procesos de control de calidad en cada etapa, desde la adquisición y procesamiento de datos hasta el análisis y la visualización. Esto incluye validación en campo (cuando es factible), comparación con fuentes de referencia independientes, y análisis estadísticos de incertidumbre. Nuestros expertos geoespaciales siguen las mejores prácticas internacionales en cartografía y análisis de datos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:text-primary">¿Pueden integrar los mapas y plataformas con nuestros sistemas existentes?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Sí, diseñamos nuestras soluciones pensando en la interoperabilidad. Podemos integrar nuestras plataformas y mapas con sus bases de datos existentes, sistemas CRM/ERP, y otras herramientas mediante APIs (REST, GraphQL), servicios web geoespaciales (WMS, WFS) y formatos de datos estándar (GeoJSON, Shapefile, GeoPackage, etc.).
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg hover:text-primary">¿Qué implica la "Cartografía Social y Participativa"?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Este enfoque involucra activamente a las comunidades locales y otros actores relevantes en el proceso de mapeo. Se valora y se integra el conocimiento local, las percepciones y las prioridades de la comunidad en la creación de mapas. Esto no solo enriquece la información geoespacial, sino que también fomenta la apropiación de los resultados y promueve soluciones más equitativas y sostenibles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Descubra el Poder de la Cartografía Inteligente</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
              Permítanos ayudarle a visualizar sus desafíos y oportunidades para tomar decisiones más informadas y construir un futuro más resiliente y equitativo.
            </p>
            <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=ples-crea&subject=Consulta%20Cartografia%20Inteligente">
                <span className="flex items-center">
                    Hablemos de su Proyecto <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
