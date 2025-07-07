// src/app/innovacion-estrategias/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Cpu, Lightbulb, Search, UsersRound, Layers, TrendingUp, ShieldCheck } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Innovación que Impacta, Estrategias que Perduran - PLES',
  description: 'Descubra cómo PLES combina innovación disruptiva con estrategias robustas para generar un impacto medible y construir un legado sostenible para su organización.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Innovación que Impacta, Estrategias que Perduran",
  subtitle: "Profundice en nuestro enfoque para crear soluciones a medida que impulsan el progreso y aseguran un legado sostenible para su organización.",
  mainIcon: Cpu,
  ctaLink: "/forms?subject=Consulta%20Innovacion%20Estrategias",
  ctaText: "Hablemos de su Proyecto"
};

const keyAspects = [
  {
    icon: Lightbulb,
    title: "Innovación Centrada en el Propósito",
    text: "Cada innovación busca generar un valor tangible, alineado con sus objetivos estratégicos y las necesidades de sus stakeholders."
  },
  {
    icon: Search,
    title: "Investigación y Análisis Profundo",
    text: "Basamos nuestras estrategias en una comprensión exhaustiva del contexto, las tendencias emergentes y los datos relevantes."
  },
  {
    icon: UsersRound,
    title: "Co-creación y Colaboración",
    text: "Trabajamos en estrecha colaboración con su equipo para diseñar e implementar soluciones que se apropien y se integren orgánicamente."
  },
  {
    icon: Layers,
    title: "Soluciones Integrales y Escalables",
    text: "Desarrollamos estrategias y soluciones que son robustas, adaptables y capaces de evolucionar con su organización."
  },
  {
    icon: TrendingUp,
    title: "Medición de Impacto y Sostenibilidad",
    text: "Nos enfocamos en resultados medibles y en construir capacidades para que el impacto positivo perdure en el tiempo."
  },
  {
    icon: ShieldCheck,
    title: "Gestión de Riesgos y Resiliencia",
    text: "Incorporamos la previsión y mitigación de riesgos para asegurar la viabilidad y perdurabilidad de las estrategias implementadas."
  }
];

export default function InnovacionEstrategiasPage() {
  const MainIcon = pageDetails.mainIcon;
  return (
    <div className="py-10 w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-12">
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href={pageDetails.parentLink}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary-foreground" />
              Volver a {pageDetails.parentName}
            </Link>
          </Button>
          <span className="text-muted-foreground">|</span>
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href="/">
               PLES Home
            </Link>
          </Button>
        </div>

        <section className="mb-16 py-12 md:py-20 text-center">
          <div className="relative px-4 z-10">
            <div className="inline-block p-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full mb-8 shadow-md animate-expand-in" style={{ animationFillMode: 'forwards' }}>
              <MainIcon className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {pageDetails.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {pageDetails.subtitle}
            </p>
          </div>
        </section>
      </div>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="relative w-full group min-h-[400px] md:min-h-full">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Innovación y Estrategia en PLES"
              layout="fill"
              objectFit="cover"
              data-ai-hint="innovation strategy blueprint"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              En PLES, creemos que la verdadera transformación surge de la sinergia entre la <span className="text-3xl md:text-4xl font-bold text-primary">innovación audaz</span> y las <span className="text-3xl md:text-4xl font-bold text-accent">estrategias con visión de futuro</span>. No nos conformamos con soluciones convencionales; <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">investigamos, cocreamos y aplicamos</span> enfoques disruptivos que abordan los desafíos de raíz. Nuestro compromiso es desarrollar <span className="text-primary font-semibold">soluciones a medida</span> que no solo resuelven problemas inmediatos, sino que también <span className="text-accent font-semibold">empoderan a su organización</span> para un crecimiento sostenible y la construcción de un <span className="text-[hsl(var(--ring))] font-semibold">legado perdurable</span>.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Pilares de Nuestro Enfoque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyAspects.map((aspect, index) => {
              const AspectIcon = aspect.icon;
              return (
                <Card key={index} className="group border transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent hover:animate-gradient hover:bg-[length:200%_200%]">
                  <CardHeader className="items-center text-center md:items-start md:text-left">
                    <AspectIcon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors" />
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary-foreground transition-colors">{aspect.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90 transition-colors text-sm md:text-left text-center">
                      {aspect.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="text-center mt-0 mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <Button size="lg" variant="accent" asChild className="text-lg px-8 py-4">
            <Link href={pageDetails.ctaLink}>
              <span className="flex items-center">
                {pageDetails.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
