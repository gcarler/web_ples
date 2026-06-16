// src/app/ples-tic/ciberseguridad/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Eye, GitBranch, HeartPulse, ListChecks, Lock, ShieldCheck, UserCheck, Users, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const approachSteps = [
    { icon: Eye, title: 'Identificar', description: 'Evaluamos su postura de seguridad, identificando activos cr?ticos, amenazas y vulnerabilidades para entender su perfil de riesgo.' },
    { icon: ShieldCheck, title: 'Proteger', description: 'Implementamos controles y arquitecturas de seguridad robustas para salvaguardar sus sistemas, datos y redes de forma proactiva.' },
    { icon: HeartPulse, title: 'Detectar', description: 'Desplegamos sistemas de monitoreo continuo y an?lisis de comportamiento para detectar actividades an?malas y posibles brechas en tiempo real.' },
    { icon: Zap, title: 'Responder', description: 'Desarrollamos y probamos planes de respuesta a incidentes para contener, erradicar y recuperarse r?pidamente de un ataque cibern?tico.' },
    { icon: GitBranch, title: 'Recuperar', description: 'Aseguramos que sus planes de continuidad de negocio y recuperaci?n ante desastres est?n alineados para restaurar las capacidades cr?ticas.' },
];

const keyServices = [
    { title: "Evaluaci?n de Seguridad y Pentesting ?tico", description: "Realizamos pruebas de penetraci?n y an?lisis de vulnerabilidades para descubrir y remediar debilidades antes de que sean explotadas." },
    { title: "Gesti?n de Identidad y Acceso (IAM)", description: "Implementamos soluciones para asegurar que solo las personas autorizadas accedan a los recursos correctos, en el momento correcto." },
    { title: "Seguridad en la Nube (Cloud Security)", description: "Configuramos y gestionamos la seguridad en entornos AWS, Azure y GCP, aplicando las mejores pr?cticas para proteger sus cargas de trabajo." },
    { title: "Seguridad de Endpoints y Redes", description: "Desplegamos soluciones de Detecci?n y Respuesta Extendida (XDR) y firewalls de ?ltima generaci?n para proteger sus dispositivos y redes." },
    { title: "Consultor?a y Cumplimiento Normativo", description: "Le ayudamos a navegar y cumplir con normativas como ISO 27001, GDPR, HIPAA, entre otras, alineando la seguridad con los requisitos legales." },
    { title: "Respuesta a Incidentes y Ciber-resiliencia", description: "Desarrollamos su capacidad para resistir, responder y recuperarse de incidentes de seguridad, minimizando el impacto en el negocio." },
];

const frameworks = ["NIST Cybersecurity Framework", "ISO/IEC 27001", "CIS Controls", "MITRE ATT&CK"];

export default function CiberseguridadPage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Ciberseguridad como Habilitador de Negocio</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>En el panorama digital actual, la ciberseguridad ya no es un mero requisito t?cnico, sino un pilar fundamental para la confianza, la continuidad y la competitividad del negocio. En PLES TIC, abordamos la seguridad de forma hol?stica, integr?ndola en el ADN de su organizaci?n.</p>
            <p>Nuestro enfoque va m?s all? de la simple implementaci?n de herramientas. Construimos una cultura de seguridad, alineamos las estrategias de protecci?n con sus objetivos de negocio y le ayudamos a gestionar el riesgo cibern?tico de manera inteligente para que pueda innovar con confianza.</p>
        </div>
      </section>

      <section id="nuestro-enfoque">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestro Enfoque 360°: Un Ciclo de Vida Completo</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">Basamos nuestra metodolog?a en el reconocido marco del NIST, cubriendo el ciclo de vida completo de la gesti?n de la ciberseguridad.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {approachSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                     <Card key={index} className="text-center p-6 bg-card/50 flex flex-col items-center">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                            <StepIcon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                        <p className="text-muted-foreground text-sm flex-grow">{step.description}</p>
                    </Card>
                );
            })}
        </div>
      </section>

      <section id="servicios-clave">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Servicios Clave</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyServices.map((service) => (
                <Card key={service.title} className="bg-card/50">
                    <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
      
      <section id="marcos-de-referencia">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Marcos de Referencia y Est?ndares</h2>
         <p className="text-muted-foreground mb-6">Nuestros servicios se basan en est?ndares y marcos de trabajo reconocidos internacionalmente, asegurando las mejores pr?cticas.</p>
        <div className="flex flex-wrap gap-3 justify-center">
            {frameworks.map((framework) => (
                <Badge key={framework} className="text-md px-4 py-2" variant="outline">{framework}</Badge>
            ))}
        </div>
      </section>

      <section id="cta-final" className="text-center py-10">
        <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Lock className="h-12 w-12 text-primary"/>
                </div>
                <CardTitle className="text-2xl">Proteja su Activo m?s Valioso: Su Informaci?n</CardTitle>
                <CardDescription>Un incidente de seguridad puede tener consecuencias devastadoras. Perm?tanos ayudarle a construir una defensa robusta y resiliente.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button size="lg" asChild>
                    <Link href="/forms?service=ciberseguridad&subject=Consulta%20sobre%20Ciberseguridad">
                        Solicitar una Evaluaci?n de Seguridad <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </>
  );
}
