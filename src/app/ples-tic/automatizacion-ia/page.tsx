// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft,
  Zap,
  Brain,
  Bot,
  FileArchive,
  Star,
  CircleDollarSign,
  Award,
  ClipboardCheck,
  BarChart3,
  LifeBuoy,
  Lightbulb,
  Users,
  MessageSquare,
  Settings,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata = {
  title: 'Automatización con IA Confiable - PLES TIC',
  description: 'Transformamos tu negocio con IA probada y estratégica. Optimizamos procesos, reducimos costos y liberamos el potencial de tu equipo.',
};

export default function AiAutomationPage() {
  const automatizacionBeneficios = [
    {
      icon: <Zap className="h-8 w-8 text-primary mb-4" />,
      title: 'Optimización de Procesos',
      description: 'Elimina tareas repetitivas, reduce errores y acelera flujos de trabajo en áreas como finanzas, RRHH, logística y atención al cliente.',
    },
    {
      icon: <Brain className="h-8 w-8 text-primary mb-4" />,
      title: 'Análisis Predictivo',
      description: 'Transforma tus datos en decisiones estratégicas. Anticipa tendencias, optimiza inventarios y personaliza la experiencia del cliente.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary mb-4" />,
      title: 'Atención al Cliente Inteligente',
      description: 'Implementa chatbots y asistentes virtuales que resuelven dudas 24/7, liberando a tu equipo para interacciones de alto valor.',
    },
    {
      icon: <FileArchive className="h-8 w-8 text-primary mb-4" />,
      title: 'Gestión Documental Avanzada',
      description: 'Digitaliza y clasifica información automáticamente, mejorando el acceso y la seguridad de tus documentos.',
    },
    {
      icon: <Star className="h-8 w-8 text-primary mb-4" />,
      title: 'Personalización y Experiencia de Usuario',
      description: 'Ofrece experiencias únicas a tus clientes, desde recomendaciones de productos hasta interacciones personalizadas.',
    },
    {
      icon: <CircleDollarSign className="h-8 w-8 text-primary mb-4" />,
      title: 'Reducción de Costos Operativos',
      description: 'Logra ahorros significativos al automatizar tareas que antes requerían mano de obra intensiva.',
    },
  ];

  const porquePles = [
    {
      icon: <Award className="h-10 w-10 text-accent mb-3" />,
      title: 'Expertos Certificados',
      description: 'Nuestro equipo cuenta con amplia trayectoria en implementación y consultoría de IA en diversos sectores.',
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-accent mb-3" />,
      title: 'Metodología Probada',
      description: 'Desarrollamos estrategias personalizadas, basadas en un análisis profundo de tus necesidades y objetivos, minimizando riesgos.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-accent mb-3" />,
      title: 'Resultados Medibles',
      description: 'Nos enfocamos en soluciones que generan un ROI claro y tangible, demostrando el impacto real en tu negocio.',
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-accent mb-3" />,
      title: 'Soporte Continuo',
      description: 'No te dejamos solo. Ofrecemos acompañamiento post-implementación para asegurar la adaptación y optimización constante.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-accent mb-3" />,
      title: 'Visión Estratégica',
      description: 'La IA no es solo tecnología, es una herramienta para el crecimiento. Te ayudamos a integrarla estratégicamente en tu modelo de negocio.',
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'Optimización Logística con IA para Empresa de Distribución',
      challenge: 'Altos costos operativos debido a rutas ineficientes y gestión manual de inventarios.',
      solution: 'Implementamos un sistema de IA para optimizar rutas en tiempo real y predecir la demanda, reduciendo costos de combustible en un 15% y mejorando la rotación de inventario.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'logistics optimization ai gears',
      tags: ['Optimización de Procesos', 'Análisis Predictivo', 'Logística']
    },
    {
      id: 2,
      title: 'Mejora de Atención al Cliente con Chatbot Inteligente para E-commerce',
      challenge: 'Equipo de soporte sobrecargado con consultas repetitivas, afectando tiempos de respuesta.',
      solution: 'Desarrollamos un chatbot con IA capaz de resolver el 80% de las consultas frecuentes, disponible 24/7, mejorando la satisfacción del cliente y liberando al equipo humano.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'ecommerce chatbot ai interface',
      tags: ['Atención al Cliente', 'Chatbots', 'IA Conversacional']
    },
  ];

  return (
    <div className="space-y-0"> {/* Removed global space-y, sections will manage their own padding */}
      <Button variant="outline" size="sm" asChild className="absolute top-28 left-4 sm:left-6 lg:left-8 z-20">
        <Link href="/ples-tic">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a PLES TIC
        </Link>
      </Button>

      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-background text-center relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 z-10 relative">
          <Brain className="h-24 w-24 md:h-32 md:w-32 text-primary mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">
            Automatización con IA Confiable
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
            No hay saltos al vacío. Transformamos tu negocio con IA probada y estratégica.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Optimizamos tus procesos, reducimos costos y liberamos el potencial de tu equipo con soluciones de IA implementadas por expertos.
          </p>
          <Button size="lg" className="text-lg px-10 py-6" asChild>
            <Link href="/forms?service=ai-automation&subject=Diagnostico%20Gratuito%20IA">
              <span className="flex items-center">
                Solicita tu Diagnóstico Gratuito <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-secondary to-transparent opacity-50 z-0"></div>
      </section>

      {/* Sección 2: La IA Requiere Experiencia (Problema/Solución) */}
      <section className="w-full py-16 md:py-24 bg-muted">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-2 border-primary/20 bg-card max-w-4xl mx-auto">
            <CardHeader className="text-center p-8 md:p-12">
              <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">La IA Requiere Experiencia.</CardTitle>
              <CardDescription className="text-lg md:text-xl text-muted-foreground space-y-4">
                <p>
                  Muchas empresas intentan automatizar con IA sin una estrategia clara, lo que lleva a proyectos fallidos, costos inesperados y resultados decepcionantes. La IA no es una moda, es una inversión que exige conocimiento y un enfoque estructurado.
                </p>
                <p className="text-foreground font-semibold">
                  En PLES, sabemos que la automatización inteligente no es un salto al vacío. Somos tu aliado estratégico con años de experiencia en el uso inteligente de la IA, garantizando implementaciones exitosas, retorno de inversión y una verdadera transformación digital.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Sección 3: Descubre el Potencial */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Descubre el Potencial de la Automatización con IA</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Implementamos soluciones inteligentes que resuelven desafíos reales y generan valor medible en diversas áreas de tu negocio.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automatizacionBeneficios.map((item) => (
              <Card key={item.title} className="bg-card p-6 text-center rounded-lg shadow-lg border border-border hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="flex justify-center mb-5">{item.icon}</div>
                <CardTitle className="text-xl text-foreground mb-3">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground flex-grow">{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: La Experiencia PLES */}
      <section className="w-full py-16 md:py-24 bg-muted">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">La Experiencia PLES: Tu Camino Seguro hacia la IA</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Combinamos conocimiento experto con una metodología probada para asegurar que cada proyecto de IA sea un éxito.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {porquePles.map((item) => (
              <Card key={item.title} className="bg-card p-6 rounded-lg shadow-lg border border-border hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                {item.icon}
                <CardTitle className="text-xl text-foreground mt-4 mb-2">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground flex-grow">{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 5: Casos de Éxito */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Empresas que ya Transformaron su Operación con PLES</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Vea cómo hemos ayudado a organizaciones como la suya a alcanzar nuevos niveles de eficiencia e innovación.
          </p>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden rounded-xl shadow-lg border border-border flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
                <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
                  <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" data-ai-hint={study.imageHint} className="group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-card">
                  <CardTitle className="text-2xl text-foreground mb-3">{study.title}</CardTitle>
                  <div className="mb-4">
                    {study.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2 mb-2">{tag}</Badge>)}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-primary mb-1">Desafío:</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary mb-1">Solución PLES IA:</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 6: CTA Final */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="h-20 w-20 mx-auto mb-8 opacity-90" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Comienza Tu Transformación con IA</h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Agenda una asesoría gratuita con nuestros expertos para diseñar tu estrategia de automatización personalizada y descubrir cómo la IA puede impulsar tu negocio.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-12 py-8 shadow-2xl hover:scale-105 transition-transform duration-300 bg-background text-primary hover:bg-background/90" asChild>
            <Link href="/forms?service=ai-automation&subject=Asesoria%20Estrategia%20IA">
              <span className="flex items-center">
                Agendar Asesoría Gratuita <ArrowRight className="ml-3 h-6 w-6" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
