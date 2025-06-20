
// src/app/ples-consulting/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Lightbulb, Users, TrendingUp, ShieldCheck, Briefcase, Layers, BookOpen, MessageSquare, Search, Users2, BarChart3, Zap, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'PLES Consulting - Estrategia, Innovación y Transformación para el Impacto',
  description: 'Consultoría experta para diseñar e implementar estrategias que generan impacto positivo y duradero en organizaciones públicas, privadas y del sector social.',
};

export default function PlesConsultingPage() {
  const expertiseAreas = [
    {
      icon: <TrendingUp className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Planificación Estratégica y Desarrollo Organizacional',
      description: 'Facilitamos procesos de planificación y transformación para alinear sus recursos con objetivos de alto impacto, fortaleciendo la visión a largo plazo y la capacidad de adaptación.',
      details: ['Diagnóstico Organizacional 360°', 'Diseño de Modelos de Negocio Sostenibles', 'Gestión del Cambio y Cultura Organizacional', 'Optimización de Procesos y Eficiencia Operativa']
    },
    {
      icon: <Layers className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Diseño y Evaluación de Políticas Públicas',
      description: 'Apoyamos la formulación de políticas efectivas, basadas en evidencia y orientadas a resultados medibles, con un enfoque en la inclusión y la sostenibilidad.',
      details: ['Análisis de Viabilidad y Factibilidad', 'Formulación Basada en Evidencia', 'Monitoreo y Evaluación de Impacto (M&E)', 'Participación Ciudadana en Políticas']
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Innovación Social y Transformación Digital',
      description: 'Impulsamos la adopción de enfoques innovadores y tecnologías digitales para resolver desafíos sociales complejos, fomentando la colaboración y la escalabilidad.',
      details: ['Laboratorios de Innovación Social', 'Estrategias de Transformación Digital', 'Soluciones Tecnológicas con Propósito', 'Modelos de Inversión de Impacto']
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Gestión del Conocimiento y Fortalecimiento de Capacidades',
      description: 'Diseñamos e implementamos estrategias para mejorar el aprendizaje organizacional, la gestión del conocimiento y las competencias de los equipos.',
      details: ['Sistemas de Gestión del Conocimiento', 'Programas de Capacitación a Medida', 'Comunidades de Práctica y Aprendizaje', 'Evaluación de Competencias']
    },
  ];

  const differentiators = [
    { icon: <Users2 className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Enfoque Multidisciplinario', text: 'Combinamos experticia en diversas áreas para ofrecer soluciones integrales y creativas adaptadas a la complejidad de cada desafío.' },
    { icon: <Zap className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Innovación Constante', text: 'Nos mantenemos a la vanguardia de metodologías y tecnologías para proponer soluciones que no solo resuelven, sino que transforman.' },
    { icon: <BarChart3 className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Orientación a Resultados Medibles', text: 'Definimos indicadores claros y medimos el impacto de nuestras intervenciones para asegurar la generación de valor tangible.' },
    { icon: <ShieldCheck className="h-8 w-8 text-primary group-hover:text-primary-foreground" />, title: 'Compromiso Ético y Sostenible', text: 'Nuestras recomendaciones buscan la sostenibilidad a largo plazo y se basan en principios de equidad, transparencia e integridad.' },
  ];

  const methodologies = ['Design Thinking', 'Gestión Ágil de Proyectos (Scrum/Kanban)', 'Análisis de Datos Avanzado (Cualitativo y Cuantitativo)', 'Facilitación Estratégica y Co-creación', 'Marco Lógico y Teoría del Cambio', 'Investigación Acción Participativa'];

  const processSteps = [
    {
        icon: <Search className="h-10 w-10 text-primary group-hover:text-primary-foreground mx-auto mb-3"/>,
        title: "1. Diagnóstico Profundo y Escucha Activa",
        description: "Iniciamos con una inmersión total para comprender sus desafíos, contexto, necesidades y aspiraciones. Escuchamos a todas las partes interesadas y analizamos la información existente para construir una base sólida."
    },
    {
        icon: <Lightbulb className="h-10 w-10 text-primary group-hover:text-primary-foreground mx-auto mb-3"/>,
        title: "2. Co-creación de Soluciones Estratégicas",
        description: "Trabajamos de la mano con su equipo para diseñar estrategias y soluciones innovadoras y a la medida. Fomentamos la participación activa para asegurar la apropiación y la viabilidad de las propuestas."
    },
    {
        icon: <Settings className="h-10 w-10 text-primary group-hover:text-primary-foreground mx-auto mb-3"/>,
        title: "3. Implementación Ágil y Acompañamiento",
        description: "Apoyamos la puesta en marcha de las soluciones con un enfoque flexible y adaptativo. Brindamos acompañamiento continuo, transferimos capacidades y ajustamos el rumbo según sea necesario para garantizar resultados sostenibles."
    }
  ];

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
                    <Briefcase className="h-3/5 w-3/5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Part */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                PLES Consulting
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Aliados estratégicos para la innovación y la transformación. Colaboramos con organizaciones para diseñar e implementar soluciones que generan un impacto positivo y duradero.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#EstrategiaOrganizacional</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#InnovacionConProposito</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#DesarrolloSostenible</Badge>
              </div>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/forms?service=ples-consulting&subject=Consulta%20PLES%20Consulting">
                  <span className="flex items-center">
                    Conversemos Sobre sus Desafíos <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestras Áreas de Expertise</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Desde la planificación estratégica hasta la transformación digital, ofrecemos un abanico de servicios diseñados para potenciar el crecimiento y la eficiencia de su organización.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
            {expertiseAreas.map((area) => (
                <Card
                key={area.title}
                className="group bg-card hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] border-2 border-transparent hover:border-primary/50 overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:animate-gradient hover:bg-[length:200%_200%]"
                >
                <CardHeader className="flex flex-row items-start gap-4">
                    {area.icon}
                    <div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary-foreground transition-colors duration-300">{area.title}</CardTitle>
                    <CardDescription className="mt-1 text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300">{area.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                    {area.details.map(detail => (
                        <li key={detail} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 transition-colors duration-300 mr-2 shrink-0" />
                        <span className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors duration-300">{detail}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Nuestro Valor Diferencial</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item) => (
              <Card key={item.title} className="bg-card group hover:shadow-xl hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <CardTitle className="text-xl group-hover:text-primary-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Cómo Trabajamos: Nuestro Proceso Colaborativo</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Creemos en un enfoque participativo y adaptado a sus necesidades, asegurando soluciones pertinentes y sostenibles.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {processSteps.map((step) => (
                    <Card key={step.title} className="group hover:shadow-xl hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out text-center transform flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                        <CardHeader className="items-center">
                            {step.icon}
                            <CardTitle className="mt-2 text-lg group-hover:text-primary-foreground">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground group-hover:text-primary-foreground/90 text-sm">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-card shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">Metodologías y Herramientas que Potencian el Éxito</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Aplicamos un conjunto diverso de metodologías probadas y herramientas innovadoras para abordar sus desafíos desde múltiples perspectivas y asegurar resultados de alto impacto.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {methodologies.map((method) => (
              <Badge key={method} variant="outline" className="text-md md:text-lg px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">{method}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Impulsemos Juntos la Próxima Etapa de su Organización</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             Si busca un aliado estratégico para navegar la complejidad, innovar con propósito y alcanzar resultados extraordinarios, PLES Consulting es su socio ideal.
            </p>
            <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=ples-consulting&subject=Solicitud%20Asesoria%20Estrategica">
                <span className="flex items-center">
                    Contacte con Nuestros Expertos <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
