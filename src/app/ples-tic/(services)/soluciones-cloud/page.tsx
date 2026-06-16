// src/app/ples-tic/soluciones-cloud/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, GitMerge, CloudCog, Layers, Repeat, Rocket, ShieldCheck, Database, Server, Settings, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const cloudServices = [
    { icon: Rocket, title: 'Migraci?n a la Nube', description: 'Planificamos y ejecutamos migraciones estrat?gicas desde infraestructuras on-premise a la nube, minimizando el tiempo de inactividad y optimizando la arquitectura para el nuevo entorno.' },
    { icon: Layers, title: 'Arquitecturas Cloud-Native', description: 'Dise?amos y construimos aplicaciones basadas en microservicios, contenedores (Docker, Kubernetes) y funciones serverless para una m?xima escalabilidad y resiliencia.' },
    { icon: Database, title: 'Gesti?n de Bases de Datos', description: 'Implementamos y gestionamos bases de datos relacionales (RDS, SQL) y NoSQL (DynamoDB, MongoDB) optimizadas para rendimiento, seguridad y costo.' },
    { icon: Server, title: 'Infraestructura como C?digo (IaC)', description: 'Utilizamos herramientas como Terraform y CloudFormation para definir y gestionar la infraestructura de forma program?tica, garantizando consistencia y repetibilidad.' },
];

const devopsApproach = [
    { icon: GitMerge, title: 'Integraci?n Continua (CI)', description: 'Automatizamos la compilaci?n y prueba del c?digo cada vez que se realiza un cambio, detectando errores de forma temprana.' },
    { icon: Repeat, title: 'Entrega Continua (CD)', description: 'Automatizamos el despliegue de los cambios aprobados a los entornos de producci?n, reduciendo el time-to-market.' },
    { icon: Settings, title: 'Orquestaci?n y Contenerizaci?n', description: 'Utilizamos Docker y Kubernetes para empaquetar y gestionar aplicaciones, asegurando que se ejecuten de la misma manera en todos los entornos.' },
    { icon: Zap, title: 'Monitorizaci?n y Observabilidad', description: 'Implementamos herramientas para monitorizar el rendimiento, los logs y las trazas de las aplicaciones, permitiendo una resoluci?n proactiva de problemas.' },
];

const platforms = ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)"];

export default function SolucionesCloudPage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Potenciando Negocios con la Nube</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>La nube no es solo un lugar para alojar servidores; es un catalizador para la innovaci?n y la agilidad empresarial. En PLES TIC, ayudamos a las organizaciones a aprovechar todo el potencial de las plataformas cloud, dise?ando soluciones que son seguras, escalables, resilientes y costo-eficientes.</p>
            <p>Nuestro enfoque combina una profunda experiencia en arquitectura de nube con una cultura DevOps s?lida. No solo construimos su infraestructura, sino que tambi?n optimizamos sus procesos de desarrollo y operaciones para acelerar la entrega de valor a sus clientes.</p>
        </div>
      </section>

      <section id="servicios-cloud">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestros Servicios Cloud</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                     <Card key={index} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start gap-4 pb-4">
                            <ServiceIcon className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </section>

       <section id="enfoque-devops">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestro Enfoque DevOps: Cultura y Automatizaci?n</h2>
        <p className="text-muted-foreground mb-6">DevOps es m?s que herramientas; es una cultura de colaboraci?n entre los equipos de desarrollo (Dev) y operaciones (Ops). Nuestro objetivo es romper los silos para construir, probar y lanzar software de forma m?s r?pida y fiable.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devopsApproach.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                     <Card key={index} className="bg-card/50">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ItemIcon className="h-7 w-7 text-accent" />
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </section>

      <section id="plataformas-principales">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Plataformas Principales que Dominamos</h2>
        <div className="flex flex-wrap gap-4 justify-center">
            {platforms.map((platform) => (
                <Badge key={platform} className="text-lg px-6 py-2" variant="outline">{platform}</Badge>
            ))}
        </div>
      </section>
      
      <section id="cta-final" className="text-center py-10">
        <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <CloudCog className="h-12 w-12 text-primary"/>
                </div>
                <CardTitle className="text-2xl">?Listo para acelerar su innovaci?n en la nube?</CardTitle>
                <CardDescription>Perm?tanos ser su gu?a en la transformaci?n hacia una infraestructura m?s ?gil, segura y escalable.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button size="lg" asChild>
                    <Link href="/forms?service=soluciones-cloud&subject=Consulta%20sobre%20Soluciones%20Cloud%20y%20DevOps">
                        Hable con un Arquitecto Cloud <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </>
  );
}