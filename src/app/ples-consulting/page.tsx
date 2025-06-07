// src/app/ples-consulting/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Lightbulb, Users, TrendingUp, ShieldCheck, Briefcase, Layers, BookOpen, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'PLES Consulting - Estrategia, Innovación y Transformación para el Impacto',
  description: 'Consultoría experta para diseñar e implementar estrategias que generan impacto positivo y duradero en organizaciones públicas, privadas y del sector social.',
};

export default function PlesConsultingPage() {
  const expertiseAreas = [
    {
      icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
      title: 'Planificación Estratégica y Desarrollo Organizacional',
      description: 'Facilitamos procesos de planificación y transformación para alinear sus recursos con objetivos de alto impacto.',
    },
    {
      icon: <Layers className="h-10 w-10 text-primary mb-4" />,
      title: 'Diseño y Evaluación de Políticas Públicas',
      description: 'Apoyamos la formulación de políticas efectivas, basadas en evidencia y orientadas a resultados medibles.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary mb-4" />,
      title: 'Innovación Social y Transformación Digital',
      description: 'Impulsamos la adopción de enfoques innovadores y tecnologías digitales para resolver desafíos sociales complejos.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary mb-4" />,
      title: 'Gestión del Conocimiento y Fortalecimiento de Capacidades',
      description: 'Diseñamos e implementamos estrategias para mejorar el aprendizaje organizacional y las competencias de los equipos.',
    },
  ];

  const differentiators = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Enfoque Multidisciplinario y Visión Global' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Soluciones Co-creadas y Adaptadas al Contexto' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Compromiso con la Sostenibilidad y la Equidad' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500" />, text: 'Resultados Medibles y de Impacto Duradero' },
  ];

  const methodologies = ['Design Thinking', 'Gestión Ágil de Proyectos', 'Análisis de Datos Cualitativos y Cuantitativos', 'Facilitación Estratégica', 'Marco Lógico'];

  return (
    <div className="py-10 space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <Briefcase className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary mb-4">PLES Consulting</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Estrategia, Innovación y Transformación para el Impacto. Colaboramos con organizaciones para generar un cambio positivo y duradero.
          </p>
           <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-md px-3 py-1">#Estrategia</Badge>
            <Badge variant="secondary" className="text-md px-3 py-1">#Innovacion</Badge>
            <Badge variant="secondary" className="text-md px-3 py-1">#DesarrolloSostenible</Badge>
          </div>
          <Button size="lg" asChild>
            <Link href="/forms?service=ples-consulting">
              Conversemos Sobre sus Desafíos <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Áreas de Expertise */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Nuestras Áreas de Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area) => (
            <Card key={area.title} className="text-center hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                {area.icon}
                <CardTitle>{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{area.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Nuestro Valor Diferencial */}
      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Nuestro Valor Diferencial</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {differentiators.map((item) => (
              <div key={item.text} className="flex items-start space-x-4 p-4">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.text}</h3>
                  <p className="text-muted-foreground text-sm">Impulsamos soluciones que no solo resuelven problemas actuales, sino que también construyen capacidades para el futuro, asegurando un legado de progreso y bienestar.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Cómo Trabajamos */}
      <section className="py-12">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Cómo Trabajamos: Nuestro Proceso Colaborativo</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <Search className="h-8 w-8 text-primary"/>
                            <CardTitle className="text-xl">1. Diagnóstico y Escucha Activa</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Comprendemos a fondo sus desafíos, contexto y aspiraciones a través de un diálogo abierto y análisis profundo.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <Lightbulb className="h-8 w-8 text-primary"/>
                            <CardTitle className="text-xl">2. Co-creación de Soluciones</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Diseñamos estrategias y soluciones innovadoras de manera conjunta, integrando su conocimiento con nuestra experiencia.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="h-8 w-8 text-primary"/>
                            <CardTitle className="text-xl">3. Implementación y Acompañamiento</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Apoyamos la puesta en marcha de las soluciones, asegurando la transferencia de capacidades y el logro de resultados sostenibles.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Metodologías y Herramientas */}
      <section className="py-12 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Metodologías y Herramientas que Aplicamos</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {methodologies.map((method) => (
              <Badge key={method} variant="outline" className="text-lg px-4 py-2 border-primary text-primary">{method}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="text-center py-16">
        <MessageSquare className="h-12 w-12 text-accent mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Impulsemos Juntos la Transformación</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Si busca un aliado estratégico para enfrentar sus desafíos más complejos y generar un impacto significativo, PLES Consulting es su socio ideal.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/forms?service=ples-consulting&subject=Consulta%20Estrategica">
            Contacte con Nuestros Expertos <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
