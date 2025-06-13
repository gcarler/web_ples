// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
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
      icon: <Zap className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Optimización de Procesos',
      description: 'Elimina tareas repetitivas, reduce errores y acelera flujos de trabajo en áreas como finanzas, RRHH, logística y atención al cliente.',
    },
    {
      icon: <Brain className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Análisis Predictivo',
      description: 'Transforma tus datos en decisiones estratégicas. Anticipa tendencias, optimiza inventarios y personaliza la experiencia del cliente.',
    },
    {
      icon: <Bot className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Atención al Cliente Inteligente',
      description: 'Implementa chatbots y asistentes virtuales que resuelven dudas 24/7, liberando a tu equipo para interacciones de alto valor.',
    },
    {
      icon: <FileArchive className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Gestión Documental Avanzada',
      description: 'Digitaliza y clasifica información automáticamente, mejorando el acceso y la seguridad de tus documentos.',
    },
    {
      icon: <Star className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Personalización y Experiencia de Usuario',
      description: 'Ofrece experiencias únicas a tus clientes, desde recomendaciones de productos hasta interacciones personalizadas.',
    },
    {
      icon: <CircleDollarSign className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Reducción de Costos Operativos',
      description: 'Logra ahorros significativos al automatizar tareas que antes requerían mano de obra intensiva.',
    },
  ];

  const porquePles = [
    {
      icon: <Award className="h-8 w-8 text-accent group-hover:text-primary-foreground" />,
      title: 'Expertos Certificados',
      description: 'Nuestro equipo cuenta con amplia trayectoria en implementación y consultoría de IA en diversos sectores.',
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-accent group-hover:text-primary-foreground" />,
      title: 'Metodología Probada',
      description: 'Desarrollamos estrategias personalizadas, basadas en un análisis profundo de tus necesidades y objetivos, minimizando riesgos.',
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent group-hover:text-primary-foreground" />,
      title: 'Resultados Medibles',
      description: 'Nos enfocamos en soluciones que generan un ROI claro y tangible, demostrando el impacto real en tu negocio.',
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-accent group-hover:text-primary-foreground" />,
      title: 'Soporte Continuo',
      description: 'No te dejamos solo. Ofrecemos acompañamiento post-implementación para asegurar la adaptación y optimización constante.',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-accent group-hover:text-primary-foreground" />,
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
      imageHint: 'logistics optimization ai',
      tags: ['Optimización de Procesos', 'Análisis Predictivo', 'Logística']
    },
    {
      id: 2,
      title: 'Mejora de Atención al Cliente con Chatbot Inteligente para E-commerce',
      challenge: 'Equipo de soporte sobrecargado con consultas repetitivas, afectando tiempos de respuesta.',
      solution: 'Desarrollamos un chatbot con IA capaz de resolver el 80% de las consultas frecuentes, disponible 24/7, mejorando la satisfacción del cliente y liberando al equipo humano.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'ecommerce chatbot ai',
      tags: ['Atención al Cliente', 'Chatbots', 'IA Conversacional']
    },
  ];

  return (
    <div className="py-10 space-y-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-card shadow-xl rounded-lg overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           {/* Optional: Subtle background pattern or image */}
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Brain className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
            Automatización con IA Confiable
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            No hay saltos al vacío. Transformamos tu negocio con IA probada y estratégica.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Optimizamos tus procesos, reducimos costos y liberamos el potencial de tu equipo con soluciones de IA implementadas por expertos.
          </p>
          <div className="flex justify-center mb-10">
            <Image
              src="https://placehold.co/800x450.png"
              alt="Gráfico de eficiencia o flujos de trabajo optimizados por IA"
              width={800}
              height={450}
              className="rounded-lg shadow-md"
              data-ai-hint="ai workflow optimization gears"
            />
          </div>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=ai-automation&subject=Diagnostico%20Gratuito%20IA">
              <span className="flex items-center">
                Solicita tu Diagnóstico Gratuito de IA <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Sección 2: El Desafío y Nuestra Solución (Problema/Solución) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <Card className="shadow-lg border-2 border-secondary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">La IA Requiere Experiencia.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <p className="text-muted-foreground">
                Muchas empresas intentan automatizar con IA sin una estrategia clara, lo que lleva a proyectos fallidos, costos inesperados y resultados decepcionantes. La IA no es una moda, es una inversión que exige conocimiento y un enfoque estructurado.
              </p>
              <p className="text-foreground font-semibold">
                En PLES, sabemos que la automatización inteligente no es un salto al vacío. Somos tu aliado estratégico con años de experiencia en el uso inteligente de la IA, garantizando implementaciones exitosas, retorno de inversión y una verdadera transformación digital.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sección 3: ¿Qué Podemos Automatizar para Ti? */}
      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Descubre el Potencial de la Automatización con IA</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Implementamos soluciones inteligentes que resuelven desafíos reales y generan valor medible en diversas áreas de tu negocio.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automatizacionBeneficios.map((item) => (
              <Card key={item.title} className="text-center group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col bg-card">
                <CardHeader className="items-center">
                  {item.icon}
                  <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: ¿Por Qué Elegir PLES? */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">La Experiencia PLES: Tu Camino Seguro hacia la IA</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {porquePles.map((item) => (
              <Card key={item.title} className="bg-card border group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <CardTitle className="text-xl text-primary group-hover:text-primary-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 5: Casos de Éxito / Testimonios */}
      <section className="py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Empresas que ya Transformaron su Operación con PLES</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col">
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
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Solución PLES IA:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 6: Formulario de Contacto / CTA Final */}
      <section className="text-center py-20 bg-primary text-primary-foreground rounded-lg shadow-inner">
        <div className="container mx-auto">
          <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comienza Tu Transformación con IA</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Agenda una asesoría gratuita con nuestros expertos para diseñar tu estrategia de automatización personalizada.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=ai-automation&subject=Asesoria%20Estrategia%20IA">
              <span className="flex items-center">
                Agendar Asesoría Gratuita <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
