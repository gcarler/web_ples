
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Gem, HeartPulse, Target, Globe, Rocket, Eye, Info } from 'lucide-react'; // Added Info icon
import Link from 'next/link';
import { Badge } from '@/components/ui/badge'; // Added Badge

export const metadata = {
  title: 'Sobre Nosotros - PLES',
  description: 'Conoce más sobre PLES, nuestra misión, visión y valores.',
};

export default function AboutPage() {
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
                <div className="absolute -left-[50%] sm:-left-[40%] md:-left-[30%] top-1/2 transform -translate-y-1/2 w-[160%] h-[160%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl flex justify-center items-center">
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

      {/* Existing Content - Moved below the new hero */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Nuestra Identidad</h2>
            <p className="text-lg mb-4">
              Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
            </p>
            <p className="text-xl font-semibold text-foreground">
              Pilares Fundamentales:
            </p>
            <div className="border rounded-lg p-8 shadow-md bg-primary text-primary-foreground mt-8 group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
                <Gem className="mr-2 h-6 w-6 group-hover:text-primary-foreground" /> <span className="group-hover:text-primary-foreground">Valores Esenciales</span>
              </h3>
              <p className="text-base group-hover:text-primary-foreground">
                Integridad como principio rector, innovación como motor de progreso y colaboración como esencia de nuestro accionar. Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
              </p>
            </div>
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
    </div>
  );
}
