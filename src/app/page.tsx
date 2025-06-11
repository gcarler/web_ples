
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building, Users, Handshake, Quote, CheckCircle, Database, UsersRound, Globe, Server, Home as HomeIcon, Lightbulb, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-0"> {/* Reduced global space-y if sections manage their own padding */}
      {/* New Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="container mx-auto min-h-[calc(80vh)] lg:min-h-0 px-4 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-8">
            {/* Left Visual Part */}
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px]">
                {/* Large White Background "Scoop" Shape */}
                <div className="absolute -left-[70%] sm:-left-[60%] md:-left-[50%] top-1/2 transform -translate-y-1/2 w-[180%] h-[180%] bg-card rounded-full shadow-2xl"></div>
                {/* Blue Circle, on top of the white scoop */}
                <div className="absolute inset-0 flex justify-center items-center z-10 p-4"> {/* Added padding to contain circle */}
                  <div className="bg-accent rounded-full w-full h-full"></div>
                </div>
              </div>
            </div>

            {/* Right Text Part */}
            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                Datos, ingeniería y propósito para el desarrollo
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0">
                De la idea a la acción: acompañamos gobiernos y empresas a generar impacto real.
              </p>
              <Button size="lg" variant="default" asChild>
                <Link href="/forms">
                  <span className="flex items-center">
                    Empieza hoy <Send className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* "EL USO INTELIGENTE DE LA EXPERIENCIA" Section */}
      <section className="text-center py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-12">
            EL USO INTELIGENTE DE LA EXPERIENCIA
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-y-8 sm:gap-x-10 md:gap-x-16 text-lg text-foreground mb-16">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary shrink-0" />
              <span>+15 proyectos ejecutados</span>
            </div>
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-primary shrink-0" />
              <span>42 sistemas de información desarrollados</span>
            </div>
            <div className="flex items-center gap-3">
              <UsersRound className="h-8 w-8 text-primary shrink-0" />
              <span>8 alianzas académicas y comunitarias</span>
            </div>
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
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

      <section className="py-16 bg-background">
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
