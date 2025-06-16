import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/DynamicSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gem, HeartPulse, Target, Globe, Rocket, Eye } from 'lucide-react';
import Link from 'next/link';

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
    <div className="w-full max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

      <section className="space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-primary">Sobre Nosotros</h1>
        <p className="text-lg mb-4">
          Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
        </p>
        <p className="text-xl font-bold">
          Pilares de Nuestra Identidad:
        </p>
         <div className="border rounded-lg p-8 shadow-md bg-primary text-primary-foreground mt-8 group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
             <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
                <Gem className="mr-2 h-6 w-6 group-hover:text-primary-foreground" /> <span className="group-hover:text-primary-foreground">Nuestros Valores Fundamentales</span>
            </h2>
             <p className="text-base group-hover:text-primary-foreground">
                 Integridad como principio rector, innovación como motor de progreso y colaboración como esencia de nuestro accionar. Estos valores se manifiestan en nuestro compromiso inquebrantable con la resiliencia ambiental y la equidad de género, buscando generar un legado significativo y duradero en cada comunidad que abrazamos.
             </p>
         </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      </section>
    </div>
  );
}
