

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building, Users, Handshake, Target, Quote, CheckCircle, Database, UsersRound, Gem, HeartPulse, Rocket, Eye, Globe, Server, Home as HomeIcon, Lightbulb } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 px-4 sm:px-6 lg:px-8">
      <section className="text-center py-16 md:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12 mt-8 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">EL USO INTELIGENTE DE LA EXPERIENCIA</h1>
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-y-8 sm:gap-x-10 md:gap-x-14 text-xl text-foreground mb-16">
          
          <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary/5 hover:shadow-lg hover:scale-105 cursor-default">
            <CheckCircle className="h-12 w-12 text-primary shrink-0" />
            <span className="text-left leading-tight">+15 proyectos ejecutados</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary/5 hover:shadow-lg hover:scale-105 cursor-default">
            <Database className="h-12 w-12 text-primary shrink-0" />
            <span className="text-left leading-tight">42 sistemas de información desarrollados</span>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary/5 hover:shadow-lg hover:scale-105 cursor-default">
              <UsersRound className="h-12 w-12 text-primary shrink-0" />
            <span className="text-left leading-tight">8 alianzas académicas y comunitarias</span>
          </div>

        </div>
         <Button asChild size="lg">
          <Link href="/about">
            <span className="flex items-center">
              Saber Más <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Link>
        </Button>
      </section>

      <section className="relative py-16 bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
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

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestras Marcas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Ples CREA', description: 'Soluciones cartográficas y de diseño geoespacial.', icon: Globe, href: "/ples-crea" },
            { title: 'Ples TIC', description: 'Tecnologías de la información y comunicación.', icon: Server, href: "/ples-tic" },
            { title: 'Ples Catastro', description: 'Servicios relacionados con catastro y gestión territorial.', icon: HomeIcon, href: "/ples-catastro" },
            { title: 'Ples Consulting', description: 'Consultoría especializada y estratégica.', icon: Lightbulb, href: "/ples-consulting" },
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
      </section>

      <section className="py-16 bg-secondary rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestro Público Objetivo</h2>
        <div className="grid md:grid-cols-3 gap-8">
           <Card className="shadow-sm group hover:shadow-xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in-out border">
             <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                 <Building className="h-6 w-6 text-primary group-hover:text-primary transition-colors"/>
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
                    <Users className="h-6 w-6 text-destructive group-hover:text-primary transition-colors" />
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
      </section>

      <section className="relative py-24 rounded-lg overflow-hidden">
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
        <div className="px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Cliente Satisfecho 1', title: 'CEO, Empresa X', text: '¡Increíble servicio! Superaron nuestras expectativas.', image: 'https://placehold.co/100x100.png', hint: 'person face ceo' },
            { name: 'Cliente Satisfecho 2', title: 'Gerente, Organización Y', text: 'La implementación fue fluida y el soporte excelente.', image: 'https://placehold.co/100x100.png', hint: 'person face manager' },
            { name: 'Cliente Satisfecho 3', title: 'Director, Fundación Z', text: 'Nos ayudaron a optimizar nuestros procesos clave.', image: 'https://placehold.co/100x100.png', hint: 'person face director' },
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
      </section>

    </div>
  );
}
