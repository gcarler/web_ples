// src/app/ples-catastro/page.tsx
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Home, Scale, Users, BarChart3, FileText, Settings, Briefcase, MapPin, ShieldCheck, Lightbulb, Target, Search, TrendingUp, Layers, Database, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

const coreServices = [
  {
    icon: MapPin,
    title: 'Levantamiento Predial Multifinalitario',
    description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales, utilizando tecnología de vanguardia.',
    details: ['Cobertura Urbana y Rural', 'Tecnología GPS y Drones', 'Integración con SIG', 'Generación de Cartografía Base'],
    link: '/ples-catastro/levantamiento-predial'
  },
  {
    icon: FileText,
    title: 'Actualización y Mantenimiento Catastral',
    description: 'Implementamos procesos continuos y automatizados para mantener la información catastral actualizada, confiable y accesible.',
    details: ['Flujos de Trabajo Digitales', 'Monitoreo de Cambios', 'Interoperabilidad de Sistemas', 'Capacitación de Personal'],
    link: '/ples-catastro/actualizacion-mantenimiento'
  },
  {
    icon: Scale,
    title: 'Avalúos Masivos y Puntuales',
    description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes para una base imponible justa y una gestión eficiente de activos.',
    details: ['Modelos de Valoración Automatizada (AVM)', 'Análisis de Mercado Inmobiliario', 'Cumplimiento Normativo', 'Informes Detallados'],
    link: '/ples-catastro/avaluos'
  },
  {
    icon: Home,
    title: 'Planes de Ordenamiento Territorial (POT)',
    description: 'Desarrollamos e implementamos planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad.',
    details: ['Diagnóstico Territorial Integral', 'Participación Ciudadana Activa', 'Zonificación y Usos del Suelo', 'Instrumentos de Gestión'],
    link: '/ples-catastro/ordenamiento-territorial'
  },
];

const valuePropositions = [
  {
    icon: TrendingUp,
    title: 'Incremento de la Recaudación Fiscal',
    description: 'Un catastro actualizado y preciso optimiza la base gravable, mejorando los ingresos municipales y la inversión pública.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad Jurídica en la Tenencia',
    description: 'Formalizamos la propiedad y reducimos conflictos sobre la tierra, brindando certeza a los ciudadanos e inversionistas.',
  },
  {
    icon: Eye,
    title: 'Planificación Territorial Informada',
    description: 'Proveemos datos geoespaciales confiables para la toma de decisiones estratégicas en desarrollo urbano, infraestructura y gestión ambiental.',
  },
  {
    icon: Settings,
    title: 'Transparencia y Eficiencia en la Gestión',
    description: 'Modernizamos los procesos catastrales, haciéndolos más ágiles, transparentes y accesibles para la administración y los ciudadanos.',
  },
];

const technologies = ['SIG (QGIS, ArcGIS Pro)', 'GPS y Estaciones Totales de Alta Precisión', 'Drones y Fotogrametría Aérea', 'Bases de Datos Espaciales (PostGIS)', 'Modelos de Avalúo Automatizado (AVM)', 'Plataformas Web GIS', 'Inteligencia Artificial Geoespacial'];

export default function PlesCatastroPage() {

  return (
    <div className="space-y-16">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            {/* Left Visual Part */}
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center"
                  >
                    <Home className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Part */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES Catastro
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Innovación en gestión territorial para un desarrollo <strong className="text-accent">eficiente y sostenible</strong>. Con el <strong className="text-primary">uso inteligente de la experiencia</strong> y <strong className="text-accent">tecnología de vanguardia</strong>, ofrecemos <strong className="text-primary">precisión</strong>, optimizamos costos y garantizamos la más alta <strong className="text-accent">calidad</strong>.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#CatastroMultifinalitario</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#OrdenamientoTerritorial</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#AdministracionDeTierras</Badge>
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-catastro&subject=Consulta%20PLES%20Catastro`}>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestra Propuesta de Valor</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((vp) => {
              const VPIcon = vp.icon;
              return (
                <Card key={vp.title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                  <CardHeader className="items-center">
                    <VPIcon className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
                    <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{vp.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90">{vp.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Servicios Catastrales Estratégicos</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service) => {
              const ServiceIcon = service.icon;
              return (
              <Link key={service.title} href={service.link} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <ServiceIcon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                        <div>
                        <CardTitle className="text-xl group-hover:text-primary-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{service.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                        {service.details.map(detail => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 mr-2 shrink-0" />
                            {detail}
                            </li>
                        ))}
                        </ul>
                        {service.link && (
                          <div className="mt-4 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                                Ver Detalles <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            )})}
            </div>
        </div>
      </section>

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestros Enfoques Integrales</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Combinamos rigor científico, innovación tecnológica y un profundo entendimiento del marco jurídico y social para ofrecer soluciones catastrales completas y efectivas. Creemos en <strong className="text-primary">el uso inteligente de la experiencia</strong> para optimizar procesos, reducir costos y entregar productos de la más alta calidad.
          </p>
          <Tabs defaultValue="tecnologico" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="tecnologico" className="py-3 text-base">Innovación Tecnológica</TabsTrigger>
              <TabsTrigger value="juridico" className="py-3 text-base">Fortalecimiento Jurídico</TabsTrigger>
              <TabsTrigger value="social" className="py-3 text-base">Participación Social</TabsTrigger>
            </TabsList>
            <TabsContent value="tecnologico">
              <Card className="shadow-lg border-primary border-2 group hover:shadow-2xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="h-8 w-8 text-primary group-hover:text-accent"/>
                    <CardTitle className="text-2xl group-hover:text-primary">Tecnología al Servicio del Territorio</CardTitle>
                  </div>
                  <CardDescription className="group-hover:text-foreground">Utilizamos herramientas de vanguardia para garantizar la precisión, eficiencia y accesibilidad de la información catastral.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Layers className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Sistemas de Información Geográfica (SIG):</strong> Implementación de plataformas robustas y escalables para análisis espacial y gestión de datos.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Database className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Tecnologías de Captura Avanzada:</strong> Uso de drones, GPS de alta precisión y software especializado para levantamientos y modelado 3D.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Lightbulb className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Automatización e IA Geoespacial:</strong> Digitalización de procesos y aplicación de inteligencia artificial para una gestión catastral moderna, eficiente y que reduce tiempos operativos.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="juridico">
              <Card className="shadow-lg border-primary border-2 group hover:shadow-2xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="h-8 w-8 text-primary group-hover:text-accent"/>
                    <CardTitle className="text-2xl group-hover:text-primary">Marco Legal Sólido y Actualizado</CardTitle>
                  </div>
                  <CardDescription className="group-hover:text-foreground">Asesoramos en la adecuación de marcos legales y normativos para un catastro moderno, funcional y que brinde seguridad jurídica, aplicando nuestra experiencia para optimizar los procesos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <FileText className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Análisis y Propuestas Normativas:</strong> Mejora de la legislación catastral y de ordenamiento territorial, con base en las mejores prácticas y la experiencia acumulada.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <ShieldCheck className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Formalización y Regularización Predial:</strong> Acompañamiento en la titulación y saneamiento de la tenencia de la tierra, agilizando trámites y asegurando la calidad jurídica.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Briefcase className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Procedimientos Transparentes y Eficientes:</strong> Desarrollo de manuales y protocolos para una gestión catastral clara, auditable y que reduce la burocracia.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="social">
              <Card className="shadow-lg border-primary border-2 group hover:shadow-2xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-8 w-8 text-primary group-hover:text-accent"/>
                    <CardTitle className="text-2xl group-hover:text-primary">Catastro con Enfoque Humano</CardTitle>
                  </div>
                  <CardDescription className="group-hover:text-foreground">Involucramos a la comunidad y actores clave para asegurar la aceptación, sostenibilidad y equidad de los proyectos catastrales, construyendo sobre la experiencia local.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Users className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Catastro Participativo:</strong> Metodologías de inclusión y socialización de proyectos con las comunidades locales, generando confianza y apropiación.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Lightbulb className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Fortalecimiento de Capacidades:</strong> Capacitación y transferencia de conocimiento técnico y metodológico a equipos locales y ciudadanos.</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-md group-hover:bg-card/30">
                    <Search className="h-6 w-6 text-primary group-hover:text-accent mt-1 shrink-0" />
                    <p><strong className="text-foreground group-hover:text-foreground">Comunicación Estratégica y Transparente:</strong> Diseño de campañas para informar y educar sobre la importancia y beneficios del catastro, asegurando la claridad y accesibilidad de la información.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1 mb-16">Tecnologías y Herramientas de Vanguardia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Combinamos conocimiento experto con las herramientas más avanzadas para ofrecer resultados superiores en cada proyecto catastral, asegurando la eficiencia y la calidad de los productos finales.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-lg px-4 py-2 border-primary text-primary shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent hover:scale-105">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <FileText className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme la Gestión de su Territorio con PLES Catastro</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Contáctenos para una evaluación personalizada y descubra cómo nuestras soluciones pueden ayudar a su organización a alcanzar sus objetivos de desarrollo y gestión territorial de manera eficiente y sostenible, aprovechando nuestra experiencia para optimizar sus recursos.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-catastro&subject=Consulta%20Modernizacion%20Catastral`}>
                <span className="flex items-center">
                    Solicitar Asesoría Especializada <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
