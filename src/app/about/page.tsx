
'use client'; 

import { useState } from 'react'; 
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Gem, HeartPulse, Target, Globe, Rocket, Eye, Info, Shield, Lightbulb, Users as UsersIcon } from 'lucide-react'; 
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; 

const coreValues = [
  {
    id: 'colaboracion',
    name: 'Colaboración',
    icon: UsersIcon,
    explanation: "La colaboración es la esencia de nuestro accionar. Fomentamos un espíritu de trabajo en equipo sinérgico, tanto internamente como con nuestros clientes y aliados estratégicos. Creemos firmemente que la convergencia de diversas perspectivas y talentos enriquece los resultados, amplía los horizontes y es fundamental para el éxito compartido.",
  },
  {
    id: 'innovacion',
    name: 'Innovación',
    icon: Lightbulb,
    explanation: "Como motor de nuestro progreso, la innovación nos impulsa a buscar constantemente nuevas ideas, enfoques disruptivos y tecnologías de vanguardia. Abrazamos la creatividad para generar soluciones eficientes y transformadoras que aporten un valor diferencial y superen los desafíos complejos.",
  },
  {
    id: 'integridad',
    name: 'Integridad',
    icon: Shield,
    explanation: "Actuamos con honestidad, transparencia y ética profesional en todas nuestras interacciones. La integridad es el pilar que sustenta la confianza con nuestros clientes, colaboradores y la sociedad, guiando cada decisión y proyecto que emprendemos.",
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

  // Tab background colors - to match the image's visual progression
  const tabBackgrounds = [
    'bg-primary/60 hover:bg-primary/50', // Colaboración (darkest of the three)
    'bg-primary/75 hover:bg-primary/65', // Innovación (middle)
    'bg-primary/90 hover:bg-primary/80'  // Integridad (lightest)
  ];

  return (
    <div className="py-10 space-y-16"> 

      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div
                  className="absolute -left-[65%] sm:-left-[55%] md:-left-[45%] top-1/2 transform -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"
                ></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center"
                  >
                    <Info className="h-3/5 w-3/5 text-accent" /> 
                  </div>
                </div>
              </div>
            </div>

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

      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Nuestra Identidad</h2>
            <p className="text-lg mb-4">
              Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
            </p>
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

      {/* New Interactive "Nuestros Valores Fundamentales" Section based on image */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row min-h-[400px] md:min-h-[450px] shadow-2xl rounded-lg overflow-hidden border border-border bg-card">
          {/* Vertical Tabs Column */}
          <div className="flex md:flex-col md:w-20 lg:w-24">
            {coreValues.map((value, index) => (
              <button
                key={value.id}
                onClick={() => setSelectedValue(value)}
                className={cn(
                  "flex-1 md:flex-none md:h-1/3 w-full p-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-inset",
                  selectedValue.id === value.id 
                    ? 'bg-accent text-accent-foreground focus:ring-accent' 
                    : `${tabBackgrounds[index % tabBackgrounds.length]} text-primary-foreground focus:ring-primary/50`
                )}
                title={value.name}
              >
                <span
                  className="block h-full w-full"
                  style={{ 
                    writingMode: 'vertical-rl', 
                    transform: 'rotate(180deg)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textTransform: 'uppercase', 
                    fontSize: '0.8rem', // Adjusted for better fit
                    fontWeight: 600, 
                    letterSpacing: '0.075em', // Adjusted for better fit
                    lineHeight: '1.2' 
                  }}
                >
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          {/* Content Display Area */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 bg-primary text-primary-foreground relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left text-primary-foreground/90">
              NUESTROS VALORES
            </h3>
            {selectedValue && (
              <div key={selectedValue.id} className="animate-fade-in-up duration-500 flex flex-col items-center md:items-start text-center md:text-left">
                <selectedValue.icon className="h-14 w-14 md:h-16 md:w-16 text-accent mb-4 md:mb-5" />
                <h4 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">{selectedValue.name}</h4>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed max-w-lg">
                  {selectedValue.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="mt-12 text-center text-md text-muted-foreground italic max-w-3xl mx-auto px-4">
          Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
        </p>
      </section>

    </div>
  );
}
