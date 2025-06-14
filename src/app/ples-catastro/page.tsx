// src/app/ples-catastro/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Landmark, Scale, Users, BarChart3, FileText, Settings, Briefcase, MapPin, ShieldCheck, Lightbulb, Target, Search, TrendingUp, Layers, Database, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'PLES Catastro - Soluciones Innovadoras para la Gestión Territorial',
  description: 'Transformamos la gestión del territorio con catastro multifinalitario, ordenamiento territorial avanzado y administración de tierras moderna para un desarrollo sostenible, equitativo y eficiente.',
};

export default function PlesCatastroPage() {
  const coreServices = [
    {
      icon: <MapPin className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Levantamiento Predial Multifinalitario',
      description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales, utilizando tecnología de vanguardia.',
      details: ['Cobertura Urbana y Rural', 'Tecnología GPS y Drones', 'Integración con SIG', 'Generación de Cartografía Base'],
      link: '/ples-catastro/levantamiento-predial'
    },
    {
      icon: <FileText className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Actualización y Mantenimiento Catastral',
      description: 'Implementamos procesos continuos y automatizados para mantener la información catastral actualizada, confiable y accesible.',
      details: ['Flujos de Trabajo Digitales', 'Monitoreo de Cambios', 'Interoperabilidad de Sistemas', 'Capacitación de Personal'],
      link: '/ples-catastro/actualizacion-mantenimiento'
    },
    {
      icon: <Scale className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Avalúos Masivos y Puntuales',
      description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes para una base imponible justa y una gestión eficiente de activos.',
      details: ['Modelos de Valoración Automatizada (AVM)', 'Análisis de Mercado Inmobiliario', 'Cumplimiento Normativo', 'Informes Detallados'],
      link: '/ples-catastro/avaluos'
    },
    {
      icon: <Landmark className="h-8 w-8 text-primary group-hover:text-primary-foreground" />,
      title: 'Planes de Ordenamiento Territorial (POT)',
      description: 'Desarrollamos e implementamos planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad.',
      details: ['Diagnóstico Territorial Integral', 'Participación Ciudadana Activa', 'Zonificación y Usos del Suelo', 'Instrumentos de Gestión'],
      link: '/ples-catastro/ordenamiento-territorial'
    },
  ];

  const valuePropositions = [
    {
      icon: <TrendingUp className="h-10 w-10 text-accent group-hover:text-primary-foreground" />,
      title: 'Incremento de la Recaudación Fiscal',
      description: 'Un catastro actualizado y preciso optimiza la base gravable, mejorando los ingresos municipales y la inversión pública.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-accent group-hover:text-primary-foreground" />,
      title: 'Seguridad Jurídica en la Tenencia',
      description: 'Formalizamos la propiedad y reducimos conflictos sobre la tierra, brindando certeza a los ciudadanos e inversionistas.',
    },
    {
      icon: <Eye className="h-10 w-10 text-accent group-hover:text-primary-foreground" />,
      title: 'Planificación Territorial Informada',
      description: 'Proveemos datos geoespaciales confiables para la toma de decisiones estratégicas en desarrollo urbano, infraestructura y gestión ambiental.',
    },
    {
      icon: <Settings className="h-10 w-10 text-accent group-hover:text-primary-foreground" />,
      title: 'Transparencia y Eficiencia en la Gestión',
      description: 'Modernizamos los procesos catastrales, haciéndolos más ágiles, transparentes y accesibles para la administración y los ciudadanos.',
    },
  ];

  const impactFigures = [
    { figure: "+30%", label: "Precisión en Levantamientos", icon: <Target className="h-8 w-8 text-primary group-hover:text-primary-foreground"/> },
    { figure: "25%", label: "Reducción en Tiempos de Trámite", icon: <FileText className="h-8 w-8 text-primary group-hover:text-primary-foreground"/> },
    { figure: "150+", label: "Municipios Asesorados", icon: <Briefcase className="h-8 w-8 text-primary group-hover:text-primary-foreground"/> },
  ];

  const caseStudies = [
    {
      title: 'Modernización Catastral Integral Ciudad XYZ',
      challenge: 'Una ciudad con información catastral desactualizada, baja recaudación y procesos manuales lentos.',
      solution: 'Implementamos un levantamiento multifinalitario, sistema de información catastral moderno, y capacitación del personal. Se logró un aumento del 20% en la recaudación y reducción de trámites.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'city modernization map',
      tags: ['Catastro Urbano', 'SIG', 'Recaudación']
    },
    {
      title: 'Plan de Ordenamiento Territorial Región ABC',
      challenge: 'Crecimiento desordenado, conflictos de uso de suelo y falta de visión a largo plazo para el desarrollo regional.',
      solution: 'Se elaboró un POT participativo, con zonificación basada en análisis multicriterio y una plataforma de seguimiento de indicadores. Se fortaleció la gobernanza territorial.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'territorial planning region',
      tags: ['Ordenamiento Territorial', 'Participación Ciudadana', 'Sostenibilidad']
    },
  ];

  const technologies = ['SIG (QGIS, ArcGIS Pro)', 'GPS y Estaciones Totales de Alta Precisión', 'Drones y Fotogrametría Aérea', 'Bases de Datos Espaciales (PostGIS)', 'Modelos de Avalúo Automatizado (AVM)', 'Plataformas Web GIS', 'Inteligencia Artificial Geoespacial'];

  return (
    <div className="py-10 space-y-16 px-4 sm:px-6 lg:px-8">
      <section className="relative py-20 md:py-28 rounded-lg overflow-hidden bg-card shadow-xl">
        <div className="container mx-auto text-center relative z-10">
          <Landmark className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">PLES Catastro</h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-3xl mx-auto">
            Transformamos la gestión del territorio con soluciones catastrales innovadoras, promoviendo un desarrollo eficiente, equitativo y sostenible.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Badge variant="default" className="text-md px-4 py-2 shadow-md">#CatastroMultifinalitario</Badge>
            <Badge variant="default" className="text-md px-4 py-2 shadow-md">#OrdenamientoTerritorial</Badge>
            <Badge variant="default" className="text-md px-4 py-2 shadow-md">#AdministracionDeTierras</Badge>
          </div>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=ples-catastro&subject=Consulta%20PLES%20Catastro">
              <span className="flex items-center">
                Descubra Nuestras Soluciones <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Nuestra Propuesta de Valor</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePropositions.map((vp) => (
            <Card key={vp.title} className="text-center group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col">
              <CardHeader className="items-center">
                {vp.icon}
                <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{vp.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground group-hover:text-primary-foreground/90">{vp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Servicios Catastrales Estratégicos</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {coreServices.map((service) => (
              <Link key={service.title} href={service.link} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-gradient-to-b group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
                    <CardHeader className="flex flex-row items-start gap-4">
                        {service.icon}
                        <div>
                        <CardTitle className="text-xl group-hover:text-primary-foreground">{service.title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{service.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                        {service.details.map(detail => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-primary-foreground mr-2 shrink-0" />
                            {detail}
                            </li>
                        ))}
                        </ul>
                         <div className="mt-4 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                                Ver Detalles <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                        </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Nuestros Enfoques Integrales</h2>
        <Tabs defaultValue="tecnologico" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
            <TabsTrigger value="tecnologico" className="py-3 text-base">Innovación Tecnológica</TabsTrigger>
            <TabsTrigger value="juridico" className="py-3 text-base">Fortalecimiento Jurídico</TabsTrigger>
            <TabsTrigger value="social" className="py-3 text-base">Participación Social</TabsTrigger>
          </TabsList>
          <TabsContent value="tecnologico">
            <Card className="shadow-lg border-primary border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="h-8 w-8 text-primary"/>
                  <CardTitle className="text-2xl">Tecnología al Servicio del Territorio</CardTitle>
                </div>
                <CardDescription>Utilizamos herramientas de vanguardia para garantizar la precisión, eficiencia y accesibilidad de la información catastral.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Layers className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Sistemas de Información Geográfica (SIG):</strong> Implementación de plataformas robustas y escalables para análisis espacial y gestión de datos.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Database className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Tecnologías de Captura Avanzada:</strong> Uso de drones, GPS de alta precisión y software especializado para levantamientos y modelado 3D.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Lightbulb className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Automatización e IA:</strong> Digitalización de procesos y aplicación de inteligencia artificial para una gestión catastral moderna y eficiente.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="juridico">
            <Card className="shadow-lg border-primary border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="h-8 w-8 text-primary"/>
                  <CardTitle className="text-2xl">Marco Legal Sólido y Actualizado</CardTitle>
                </div>
                <CardDescription>Asesoramos en la adecuación de marcos legales y normativos para un catastro moderno, funcional y que brinde seguridad jurídica.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <FileText className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Análisis y Propuestas Normativas:</strong> Mejora de la legislación catastral y de ordenamiento territorial.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <ShieldCheck className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Formalización y Regularización Predial:</strong> Acompañamiento en la titulación y saneamiento de la tenencia de la tierra.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Briefcase className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Procedimientos Transparentes:</strong> Desarrollo de manuales y protocolos para una gestión catastral clara y auditable.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="social">
            <Card className="shadow-lg border-primary border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-primary"/>
                  <CardTitle className="text-2xl">Catastro con Enfoque Humano</CardTitle>
                </div>
                <CardDescription>Involucramos a la comunidad y actores clave para asegurar la aceptación, sostenibilidad y equidad de los proyectos catastrales.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Users className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Catastro Participativo:</strong> Metodologías de inclusión y socialización de proyectos con las comunidades locales.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Lightbulb className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Fortalecimiento de Capacidades:</strong> Capacitación y transferencia de conocimiento a equipos locales y ciudadanos.</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-background rounded-md">
                  <Search className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <p><strong className="text-foreground">Comunicación Estratégica:</strong> Diseño de campañas para informar y educar sobre la importancia y beneficios del catastro.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

       <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Impacto en Cifras (Simulado)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactFigures.map((figure) => (
              <Card key={figure.label} className="p-6 group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
                <div className="flex justify-center mb-4">{figure.icon}</div>
                <p className="text-4xl font-bold text-primary group-hover:text-primary-foreground mb-2">{figure.figure}</p>
                <p className="text-muted-foreground group-hover:text-primary-foreground/90">{figure.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Casos de Estudio Aplicados</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.title} className="overflow-hidden group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col">
                <div className="relative h-56 w-full">
                  <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" data-ai-hint={study.imageHint} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Solución PLES Catastro:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                        <Link href="/forms?subject=Mas%20Informacion%20Caso%20Estudio%20Catastro">
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

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tecnologías y Herramientas de Vanguardia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Combinamos conocimiento experto con las herramientas más avanzadas para ofrecer resultados superiores en cada proyecto catastral.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-lg px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground rounded-lg shadow-inner">
        <div className="container mx-auto">
            <FileText className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transforme la Gestión de su Territorio con PLES Catastro</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Contáctenos para una evaluación personalizada y descubra cómo nuestras soluciones pueden ayudar a su organización a alcanzar sus objetivos de desarrollo y gestión territorial de manera eficiente y sostenible.
            </p>
            <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=ples-catastro&subject=Consulta%20Modernizacion%20Catastral">
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
