

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building, Users, Handshake, Quote, CheckCircle, Database, UsersRound, Globe, Server, HomeIcon, Lightbulb, Layers, Cpu, BookOpen, Send } from 'lucide-react'; // Added BookOpen, Send - Layers, Cpu were already there. Keep HomeIcon as it's used below.
import { RotatingHeroText, type HeroStatement } from '@/components/layout/rotating-hero-text';


const heroStatements: HeroStatement[] = [
  {
    title: "Datos, ingeniería y propósito para el desarrollo",
    description: "De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.",
    ctaText: "Empieza hoy",
    ctaLink: "/forms",
    ctaIconName: "Send", // Pass icon name
  },
  {
    title: "Innovación que Impacta, Estrategias que Perduran",
    description: "Creamos soluciones a medida que impulsan el progreso y construyen un legado sostenible para su organización.",
    ctaText: "Conoce cómo",
    ctaLink: "/about",
    ctaIconName: "BookOpen",
  },
  {
    title: "Soluciones Integrales para Desafíos Complejos",
    description: "Tecnología, datos y estrategia al servicio de tus metas.",
    ctaText: "Explora Servicios",
    ctaLink: "/#nuestras-marcas",
    ctaIconName: "Layers", // Pass icon name
  },
];


export default function Home() {
  return (
    <div className="space-y-0"> {/* Reduced global space-y if sections manage their own padding */}
      {/* New Hero Section with Rotating Text */}
      <section className="relative bg-background overflow-hidden">
        <div className="container mx-auto min-h-[calc(80vh)] lg:min-h-0 px-4 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-8">
            {/* Left Visual Part */}
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                <div className="absolute -left-[65%] sm:-left-[55%] md:-left-[45%] top-1/2 transform -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
                  <div className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--ring))] bg-[length:200%_200%] animate-gradient rounded-full w-full h-full shadow-xl"></div>
                </div>
              </div>
            </div>

            {/* Right Text Part with RotatingHeroText */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <RotatingHeroText
                statements={heroStatements}
                className="items-center text-center lg:items-start lg:text-left" // Handles alignment
                titleClassName="text-4xl sm:text-5xl xl:text-6xl text-foreground mb-6"
                descriptionClassName="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
                // buttonContainerClassName="" // Use default margin for button
              />
            </div>
          </div>
        </div>
      </section>

      {/* "EL USO INTELIGENTE DE LA EXPERIENCIA" Section */}
      <section className="text-center py-20 md:py-28 bg-background"> {/* Increased padding */}
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-16"> {/* Increased bottom margin */}
            EL USO INTELIGENTE DE LA EXPERIENCIA
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-center items-stretch gap-8 md:gap-12 text-lg text-foreground mb-20"> {/* Changed flex to grid for better wrapping and spacing */}
            {[
              { icon: CheckCircle, text: "+15 proyectos ejecutados", dataAiHint:"projects checkmark" },
              { icon: Database, text: "42 sistemas de información desarrollados", dataAiHint:"database systems" },
              { icon: UsersRound, text: "8 alianzas académicas y comunitarias", dataAiHint:"community alliance" },
            ].map((metric, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                <metric.icon className="h-12 w-12 text-primary mb-4" />
                <span className="text-xl leading-tight">{metric.text}</span>
              </div>
            ))}
          </div>
          <Button asChild size="lg" variant="default">
            <Link href="/about">
              <span className="flex items-center">
                Saber Más <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Remaining sections from original page.tsx - these can be styled later or removed if not part of the new design */}
      <section className="relative py-16 bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-8 items-center pt-8">
             <div>
              <h2 className="text-3xl font-semibold mb-4 text-primary">Nuestra Misión</h2>
              <p className="text-lg text-foreground mb-4">
                Somos una empresa dedicada a ofrecer soluciones innovadoras y eficientes que impulsan el crecimiento y la transformación digital de nuestros clientes. Creemos en el poder de la tecnología para simplificar procesos y crear valor.
              </p>
               <Button asChild className="mt-6">
                 <Link href="/about">
                   <span className="flex items-center">
                     Saber Más <ArrowRight className="ml-2" />
                   </span>
                 </Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Equipo trabajando"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="team working collaboration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background" id="nuestras-marcas">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestras Marcas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { title: 'Ples CREA', description: 'Cartografía y diseño geoespacial.', icon: Globe, href: "/ples-crea" },
                { title: 'Ples TIC', description: 'Tecnologías de la información.', icon: Server, href: "/ples-tic" },
                { title: 'Ples Catastro', description: 'Catastro y gestión territorial.', icon: HomeIcon, href: "/ples-catastro" },
                { title: 'Ples Consulting', description: 'Consultoría estratégica.', icon: Lightbulb, href: "/ples-consulting" },
            ].map((marca) => (
                <Card key={marca.title} className="text-center group hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4 group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground">
                    <marca.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="group-hover:text-primary-foreground">{marca.title}</CardTitle>
                    <CardDescription className="group-hover:text-primary-foreground/90">{marca.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="link" asChild className="text-primary group-hover:text-primary-foreground">
                    <Link href={marca.href}>
                        <span className="flex items-center">
                        Ver Detalles <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </Link>
                    </Button>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-16 bg-secondary rounded-lg">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Nuestro Público Objetivo</h2>
            <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <Building className="h-6 w-6 text-primary group-hover:text-accent transition-colors"/>
                    <CardTitle>Sector Público</CardTitle>
                </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Ofrecemos soluciones adaptadas a las necesidades de entidades gubernamentales y administraciones públicas, mejorando la eficiencia y transparencia.
                </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                    <Handshake className="h-6 w-6 text-accent group-hover:text-primary transition-colors"/>
                    <CardTitle>Sector Privado</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Impulsamos la competitividad de las empresas con herramientas tecnológicas y consultoría estratégica para optimizar sus operaciones.
                </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                    <CardTitle>Sector Social y Comunitario</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Colaboramos con organizaciones sin fines de lucro y comunidades para fortalecer su impacto social a través de la tecnología y la innovación.
                </p>
                </CardContent>
            </Card>
            </div>
        </div>
      </section>

      <section className="relative py-24 rounded-lg overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1200x400.png"
            alt="Fondo abstracto"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
             data-ai-hint="abstract technology background"
          />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">¿Listo para Transformar su Organización?</h2>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            Contáctenos hoy mismo para descubrir cómo nuestras soluciones pueden ayudarle a alcanzar sus objetivos.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
             <Link href="/forms">
               <span className="flex items-center">
                 Contactar Ahora <ArrowRight className="ml-2" />
               </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-background">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Testimonios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { name: 'Ruth Gutierrez', title: 'Directora OEDS, Universidad de Cartagena', text: '¡Increíble servicio! Superaron nuestras expectativas.', image: 'https://placehold.co/100x100.png', hint: 'person face director' },
                { name: 'Olga Montes', title: 'Directora, Corporación Rhema', text: 'La implementación fue fluida y el soporte excelente.', image: 'https://placehold.co/100x100.png', hint: 'person face director' },
                { name: 'Mary Janacet', title: 'CEO, Betrip', text: 'Nos ayudaron a optimizar nuestros procesos clave.', image: 'https://placehold.co/100x100.png', hint: 'person face ceo' },
            ].map((testimonial) => (
                <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow">
                    <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                    <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
                </CardContent>
                <CardHeader className="flex flex-row items-center gap-4 pt-0 mt-auto">
                    <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint}/>
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                </CardHeader>
                </Card>
            ))}
            </div>
        </div>
      </section>

    </div>
  );
}
