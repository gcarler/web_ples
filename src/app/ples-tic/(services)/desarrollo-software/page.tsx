// src/app/ples-tic/desarrollo-software/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Code, DraftingCompass, FlaskConical, GitPullRequestArrow, KanbanSquare, Layers, Rocket, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const methodologySteps = [
    { icon: Search, title: '1. Descubrimiento y Estrategia', description: 'Nos sumergimos en su negocio para entender sus objetivos, desafíos y usuarios. Definimos juntos el alcance, las funcionalidades clave y una hoja de ruta estratégica para el producto.' },
    { icon: DraftingCompass, title: '2. Diseño UX/UI y Arquitectura', description: 'Creamos prototipos interactivos y diseñamos una interfaz intuitiva. Paralelamente, nuestros arquitectos diseñan una base técnica robusta, escalable y segura.' },
    { icon: KanbanSquare, title: '3. Desarrollo Ágil (Sprints)', description: 'Trabajamos en ciclos cortos (sprints) para construir la aplicación de forma incremental. Esto permite flexibilidad, retroalimentación constante y entregas de valor tempranas.' },
    { icon: FlaskConical, title: '4. Calidad y Pruebas Continuas', description: 'La calidad no es una etapa final. Integramos pruebas automatizadas y manuales en todo el ciclo de desarrollo para garantizar un software fiable y sin errores.' },
    { icon: Rocket, title: '5. Despliegue y Puesta en Marcha', description: 'Gestionamos el proceso de despliegue en la infraestructura cloud, asegurando una transición suave a producción y monitorizando el rendimiento inicial.' },
    { icon: GitPullRequestArrow, title: '6. Soporte y Evolución', description: 'Ofrecemos planes de soporte y mantenimiento evolutivo para asegurar que su software siga creciendo y adaptándose a las nuevas necesidades del mercado.' },
];

const technologies = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "Vue.js"] },
    { category: "Backend", items: ["Node.js", "Python (Django, FastAPI)", "Java (Spring)", "C# (.NET)", "Go"] },
    { category: "Bases de Datos", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase Firestore"] },
    { category: "Móvil", items: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)"] },
];

const useCases = [
    "Plataformas SaaS multi-inquilino.",
    "Aplicaciones web empresariales (ERP, CRM) a medida.",
    "Sistemas de E-commerce y Marketplaces complejos.",
    "Aplicaciones móviles nativas e híbridas.",
    "Paneles de control (Dashboards) para visualización de datos.",
    "Integración de sistemas y APIs de terceros.",
];

export default function DesarrolloSoftwarePage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">El Arte y la Ciencia de Construir Software</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>En PLES TIC, el desarrollo de software a medida es más que escribir código; es un proceso colaborativo de ingeniería para resolver problemas de negocio complejos. Entendemos que cada organización es única, y por ello, las soluciones genéricas a menudo se quedan cortas. Nuestro enfoque se centra en crear activos tecnológicos que no solo cumplen con sus requisitos actuales, sino que también proporcionan una plataforma flexible para el crecimiento futuro.</p>
            <p>Fusionamos la disciplina de la ingeniería con la agilidad de las metodologías modernas para entregar software de alta calidad, de manera predecible y eficiente. Desde la conceptualización hasta el soporte post-lanzamiento, somos su socio tecnológico en cada paso del camino.</p>
        </div>
      </section>

      <section id="nuestra-metodologia">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestra Metodología: Del Concepto al Código</h2>
        <div className="relative space-y-8">
             <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border -z-10" aria-hidden="true" />
            {methodologySteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                     <div key={index} className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
                            <StepIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </section>

      <section id="stack-tecnologico">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Stack Tecnológico Flexible y Moderno</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map(tech => (
                <Card key={tech.category} className="bg-card/50">
                    <CardHeader>
                        <CardTitle>{tech.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {tech.items.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section id="casos-de-uso">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Casos de Uso Comunes</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((useCase) => (
                <div key={useCase} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-foreground">{useCase}</span>
                </div>
            ))}
        </div>
      </section>
      
      <section id="cta-final" className="text-center py-10">
        <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Code className="h-12 w-12 text-primary"/>
                </div>
                <CardTitle className="text-2xl">¿Listo para construir su próxima gran idea?</CardTitle>
                <CardDescription>Nuestro equipo de expertos está preparado para transformar su visión en una solución de software robusta y escalable.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button size="lg" asChild>
                    <Link href="/forms?service=desarrollo-software&subject=Consulta%20sobre%20Desarrollo%20a%20Medida">
                        Hable con un Arquitecto de Soluciones <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </>
  );
}