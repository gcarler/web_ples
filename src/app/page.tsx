import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Building, Users, Handshake, Target, Quote, CheckCircle, Database, UsersRound } from 'lucide-react'; // Added CheckCircle, Database, UsersRound

export default function Home() {
  return (
    // Add container and mx-auto here for constrained width
    <div className="container mx-auto space-y-16">
      {/* Hero Section - Updated Content */}
      <section className="text-center py-12 relative">
        {/* The Carousel in the Header now serves as the main visual */}
        <h1 className="text-4xl font-bold tracking-tight mb-6 mt-8">Experiencia + inteligencia = mejores resultados</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg text-foreground mb-10">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-12 w-12 text-primary" /> {/* Increased size */}
            <span>+15 proyectos ejecutados</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-12 w-12 text-primary" /> {/* Increased size */}
            <span>42 sistemas de información desarrollados</span>
          </div>
          <div className="flex items-center gap-2">
             <UsersRound className="h-12 w-12 text-primary" /> {/* Increased size */}
            <span>8 alianzas académicas y comunitarias</span>
          </div>
        </div>
         <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/about"> {/* Changed link to /about */}
            Saber Más <ArrowRight className="ml-2" /> {/* Changed text to Saber Más */}
          </Link>
        </Button>
      </section>

      {/* Sección 1: Nuestra Misión (Removed "Conócenos" heading) */}
      <section className="relative py-16 bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="container mx-auto px-4">
           {/* Removed the absolute positioned h1 heading */}
           <div className="grid md:grid-cols-2 gap-8 items-center pt-8"> {/* Adjusted padding-top */}
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
                   Saber Más <ArrowRight className="ml-2" />
                 </Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://picsum.photos/600/400?random=3"
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

      {/* Sección 2: Nuestras Marcas */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestras Marcas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Ples CREA', description: 'Soluciones creativas y de diseño.', icon: Building, href: "/ples-crea" },
            { title: 'Ples TIC', description: 'Tecnologías de la información y comunicación.', icon: Target, href: "/ples-tic" }, // Using Target as placeholder
            { title: 'Ples Catastro', description: 'Servicios relacionados con catastro.', icon: Users, href: "/ples-catastro" }, // Using Users as placeholder
            { title: 'Ples Consulting', description: 'Consultoría especializada.', icon: Handshake, href: "/ples-consulting" },
          ].map((marca) => (
            <Card key={marca.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
                  <marca.icon className="h-8 w-8" />
                </div>
                <CardTitle>{marca.title}</CardTitle>
                <CardDescription>{marca.description}</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button variant="link" asChild>
                   <Link href={marca.href}>
                     Ver Detalles <ArrowRight className="ml-1 h-4 w-4" />
                   </Link>
                 </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sección 3: Nuestro Público Objetivo */}
      <section className="py-16 bg-secondary rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">Nuestro Público Objetivo</h2>
        <div className="grid md:grid-cols-3 gap-8 container mx-auto px-4">
           <Card className="shadow-sm">
             <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                 <Building className="h-6 w-6 text-primary"/>
                 <CardTitle>Sector Público</CardTitle>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">
                 Ofrecemos soluciones adaptadas a las necesidades de entidades gubernamentales y administraciones públicas, mejorando la eficiencia y transparencia.
               </p>
             </CardContent>
           </Card>
           <Card className="shadow-sm">
             <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Handshake className="h-6 w-6 text-accent"/>
                 <CardTitle>Sector Privado</CardTitle>
                </div>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">
                 Impulsamos la competitividad de las empresas con herramientas tecnológicas y consultoría estratégica para optimizar sus operaciones.
               </p>
             </CardContent>
           </Card>
           <Card className="shadow-sm">
              <CardHeader>
                 <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-destructive" /> {/* Using placeholder color */}
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

      {/* Sección 4: Llamado a la Acción */}
      <section className="relative py-24 rounded-lg overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/1200/400?random=4"
            alt="Fondo abstracto"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
             data-ai-hint="abstract background technology"
          />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">¿Listo para Transformar su Organización?</h2>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            Contáctenos hoy mismo para descubrir cómo nuestras soluciones pueden ayudarle a alcanzar sus objetivos.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
             <Link href="/forms"> {/* Link to the forms page */}
              Contactar Ahora <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Sección 5: Testimonios */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Testimonios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4">
          {[
            { name: 'Cliente Satisfecho 1', title: 'CEO, Empresa X', text: '¡Increíble servicio! Superaron nuestras expectativas.', image: 'https://picsum.photos/100/100?random=5', hint: 'person face ceo' },
            { name: 'Cliente Satisfecho 2', title: 'Gerente, Organización Y', text: 'La implementación fue fluida y el soporte excelente.', image: 'https://picsum.photos/100/100?random=6', hint: 'person face manager' },
            { name: 'Cliente Satisfecho 3', title: 'Director, Fundación Z', text: 'Nos ayudaron a optimizar nuestros procesos clave.', image: 'https://picsum.photos/100/100?random=7', hint: 'person face director' },
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
