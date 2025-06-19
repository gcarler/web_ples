
'use client'; // Add 'use client' for useState hook

import { useState }
from 'react'; // Import useState
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Gem, HeartPulse, Target, Globe, Rocket, Eye, Info, Shield, Lightbulb, Users as UsersIcon } from 'lucide-react'; // Added Shield, Lightbulb, UsersIcon
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Import cn

// metadata cannot be used in client components, move to a parent server component or layout if needed globally.
// export const metadata = {
//   title: 'Sobre Nosotros - PLES',
//   description: 'Conoce más sobre PLES, nuestra misión, visión y valores.',
// };

const coreValues = [
  {
    id: 'integridad',
    name: 'Integridad',
    icon: Shield,
    explanation: "Actuamos con honestidad, transparencia y ética profesional en todas nuestras interacciones. La integridad es el pilar que sustenta la confianza con nuestros clientes, colaboradores y la sociedad, guiando cada decisión y proyecto que emprendemos.",
  },
  {
    id: 'innovacion',
    name: 'Innovación',
    icon: Lightbulb,
    explanation: "Como motor de nuestro progreso, la innovación nos impulsa a buscar constantemente nuevas ideas, enfoques disruptivos y tecnologías de vanguardia. Abrazamos la creatividad para generar soluciones eficientes y transformadoras que aporten un valor diferencial y superen los desafíos complejos.",
  },
  {
    id: 'colaboracion',
    name: 'Colaboración',
    icon: UsersIcon,
    explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos un espíritu de trabajo en equipo sinérgico, tanto internamente como con nuestros clientes y aliados estratégicos. Creemos firmemente que la convergencia de diversas perspectivas y talentos enriquece los resultados, amplía los horizontes y es fundamental para el éxito compartido.",
  },
];

export default function AboutPage() {
  const [selectedValue, setSelectedValue] = useState(coreValues[0]);

  const sections = [
    {
      title: 'Nuestra Esencia',
      content: 'Comprendiendo quienes somos.',
      link: '/about/esencia',
      icon: HeartPulse,
    },
    {
      title: 'Nuestro Propósito',
      content: 'Explorando nuestro motor.',
      link: '/about/proposito',
      icon: Target,
    },
    {
      title: 'Colaboración Global',
      content: 'Conoce cómo trabajamos.',
      link: '/about/colaboracion',
      icon: Globe,
    },
    {
      title: 'Nuestra Misión',
      content: 'Guiando nuestras acciones.',
      link: '/about/mision',
      icon: Rocket,
    },
    {
      title: 'Nuestra Visión',
      content: 'Definiendo nuestro horizonte.',
      link: '/about/vision',
      icon: Eye,
    },
  ];

  return (
    <div className="py-10 space-y-16"> {/* Main container for full-width sections */}
      {/* New Hero Section */}
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
                    <Info className="h-3/5 w-3/5 text-accent" /> {/* Icon for About Us */}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Part */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                Sobre PLES
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Fusionamos visión global y enfoque multidisciplinario para construir un legado de impacto y sostenibilidad.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#VisiónGlobal</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Innovación</Badge>
                <Badge variant="default" className="text-md px-4 py-2 shadow-md">#Sostenibilidad</Badge>
              </div>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/about/esencia">
                  <span className="flex items-center">
                    Nuestra Historia <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Content - Section with "Nuestra Identidad" and Dynamic Sections */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Nuestra Identidad</h2>
            <p className="text-lg mb-4">
              Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
            </p>
            {/* This old "Valores Esenciales" div will be replaced by the new section below */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <CardContent className="p-0">
                  <DynamicSection {...section} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Interactive "Nuestros Valores Fundamentales" Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-muted/30 rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
          Nuestros Valores Fundamentales
        </h2>
        <div className="max-w-5xl mx-auto md:flex md:space-x-12">
          {/* Left Column: Vertical Value "Tabs" */}
          <div className="flex md:flex-col justify-around md:justify-start md:space-y-4 mb-8 md:mb-0 md:w-1/4">
            {coreValues.map((value) => (
              <button
                key={value.id}
                onClick={() => setSelectedValue(value)}
                className={cn(
                  "text-xl md:text-2xl font-semibold p-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "text-center md:text-left w-full",
                  selectedValue.id === value.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                )}
              >
                {value.name}
              </button>
            ))}
          </div>

          {/* Right Column: Content Display */}
          <div className="md:w-3/4">
            <Card className="p-6 md:p-8 shadow-xl border-border min-h-[280px] flex flex-col justify-center bg-card">
              {selectedValue && (
                <div key={selectedValue.id} className="animate-fade-in-up duration-500">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left mb-4">
                    <selectedValue.icon className="h-12 w-12 md:h-14 md:w-14 text-primary mb-3 sm:mb-0 sm:mr-5 shrink-0" />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">{selectedValue.name}</h3>
                      <p className="text-md md:text-lg text-foreground/80 leading-relaxed">
                        {selectedValue.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
            <p className="mt-8 text-center text-md text-muted-foreground italic max-w-3xl mx-auto">
              Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
