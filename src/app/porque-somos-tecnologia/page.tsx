// src/app/porque-somos-tecnologia/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Cpu, Code, CloudCog, Database, Bot, ShieldCheck, MonitorSmartphone } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Por Qué Somos Tecnología - PLES',
  description: 'Descubra cómo aplicamos herramientas de vanguardia y desarrollamos soluciones robustas para catalizar la eficiencia y la escala.',
};

const pageDetails = {
  parentLink: "/about",
  parentName: "Sobre Nosotros",
  title: "Por Qué Somos Tecnología",
  subtitle: "Herramientas de vanguardia como catalizadores de la eficiencia y la escala.",
  mainIcon: Cpu,
  ctaLink: "/ples-tic",
  ctaText: "Vea Nuestras Soluciones"
};

const tecnologiaPoints = [
  {
    icon: Code,
    title: "Desarrollo de Soluciones a Medida",
    text: "Construimos software y plataformas robustas, escalables y seguras que se adaptan a las necesidades específicas de cada desafío que abordamos."
  },
  {
    icon: CloudCog,
    title: "Infraestructura Cloud y Escalabilidad",
    text: "Aprovechamos el poder de la nube para ofrecer soluciones flexibles, resilientes y costo-eficientes que crecen y se adaptan junto a nuestros clientes."
  },
  {
    icon: Database,
    title: "Gestión Inteligente de Datos",
    text: "Diseñamos y gestionamos arquitecturas de datos que convierten la información en un activo estratégico para la toma de decisiones en tiempo real."
  },
  {
    icon: Bot,
    title: "Automatización e Inteligencia Artificial",
    text: "Implementamos IA y automatización para optimizar procesos complejos, reducir tareas repetitivas y liberar el valioso potencial del talento humano."
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y Fiabilidad por Diseño",
    text: "La ciberseguridad es un pilar fundamental en cada solución que desarrollamos, protegiendo los activos de nuestros clientes y la confianza de sus usuarios."
  },
  {
    icon: MonitorSmartphone,
    title: "Experiencias de Usuario Intuitivas",
    text: "Priorizamos el diseño de interfaces limpias, accesibles e intuitivas que facilitan la adopción y el uso efectivo de cada herramienta tecnológica que creamos."
  }
];

export default function PorqueSomosTecnologiaPage() {
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
              alt="Equipo de tecnología de PLES trabajando en servidores"
              layout="fill"
              objectFit="cover"
              data-ai-hint="technology server room"
              className="transform transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </div>
          <div className="text-left py-12 px-6 md:px-12 lg:px-16 flex items-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Para nosotros, la <span className="text-3xl md:text-4xl font-bold text-primary">tecnología</span> es el motor que transforma las <span className="text-2xl md:text-3xl font-semibold text-accent">estrategias en realidad</span>. No solo adoptamos las herramientas más avanzadas, sino que las <span className="text-xl md:text-2xl font-medium text-[hsl(var(--ring))]">integramos</span> y <span className="text-xl md:text-2xl font-medium text-primary">personalizamos</span> para construir ecosistemas digitales <span className="text-2xl md:text-3xl font-semibold text-accent">coherentes, seguros y eficientes</span>. Nuestro dominio tecnológico nos permite crear soluciones que no solo funcionan, sino que <span className="text-2xl md:text-3xl font-semibold text-primary">escalan, perduran y evolucionan</span>.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            Nuestras Capacidades Tecnológicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tecnologiaPoints.map((point, index) => {
              const PointIcon = point.icon;
              return (
                <Card key={index} className="group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 ease-in-out transform hover:scale-[1.03] border">
                  <CardHeader className="items-center text-center md:items-start md:text-left">
                    <PointIcon className="h-10 w-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors text-sm md:text-left text-center">
                      {point.text}
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
