// src/app/ples-tic/analisis-datos-bi/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BarChart3, Bot, CheckCircle, Database, GitMerge, LayoutDashboard, Lightbulb, Search, Settings, Share2, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const biServices = [
    { icon: Settings, title: "Estrategia de Datos y Gobernanza", description: "Definimos una hoja de ruta clara para sus datos, estableciendo políticas de calidad, seguridad y acceso para maximizar su valor y asegurar el cumplimiento." },
    { icon: Database, title: "Ingeniería de Datos y ETL/ELT", description: "Diseñamos y construimos pipelines de datos robustos que extraen, transforman y cargan datos de diversas fuentes a un repositorio centralizado (Data Warehouse o Data Lake)." },
    { icon: LayoutDashboard, title: "Visualización de Datos y Dashboards", description: "Creamos dashboards interactivos y reportes visuales que permiten a los usuarios de negocio explorar los datos, identificar tendencias y responder a sus propias preguntas." },
    { icon: TrendingUp, title: "Análisis Predictivo", description: "Utilizamos técnicas estadísticas y de Machine Learning para construir modelos que pronostican tendencias futuras, como la demanda de productos o la probabilidad de abandono de un cliente." },
];

const dataProcessSteps = [
    { title: "1. Comprensión del Negocio", description: "Trabajamos con usted para definir las preguntas de negocio clave que los datos deben responder y los KPIs que medirán el éxito." },
    { title: "2. Adquisición e Integración de Datos", description: "Identificamos y conectamos las diversas fuentes de datos (Bases de datos, APIs, archivos planos) para crear una vista unificada." },
    { title: "3. Modelado y Almacenamiento", description: "Estructuramos y almacenamos los datos en un Data Warehouse o Data Lake, optimizado para el análisis y la consulta rápida." },
    { title: "4. Análisis y Visualización", description: "Aplicamos técnicas de análisis y creamos visualizaciones que convierten los datos en historias claras y accionables." },
    { title: "5. Despliegue y Adopción", description: "Entregamos las soluciones y capacitamos a sus equipos para que puedan integrar el uso de datos en su toma de decisiones diaria." },
];

const tools = ["Power BI", "Tableau", "Looker Studio", "dbt", "Airflow", "Snowflake", "BigQuery", "Redshift", "Databricks", "Python (Pandas, Scikit-learn)"];

export default function AnalisisDatosPage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Más Allá de los Datos: Inteligencia Accionable</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>En un mundo impulsado por la información, los datos son el activo más valioso de una organización. Sin embargo, su verdadero poder no reside en su volumen, sino en la capacidad de transformarlos en conocimiento y, finalmente, en acciones inteligentes. En PLES TIC, nos especializamos en construir ecosistemas de datos que potencian la toma de decisiones en todos los niveles de su empresa.</p>
            <p>Nuestro enfoque de Inteligencia de Negocio (BI) y Análisis de Datos va desde la estrategia y la ingeniería de datos hasta la creación de visualizaciones impactantes y modelos predictivos. Le ayudamos a pasar de las preguntas a las respuestas, y de las respuestas a los resultados.</p>
        </div>
      </section>

      <section id="nuestros-servicios-bi">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestros Servicios de BI y Análisis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biServices.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                     <Card key={index} className="flex flex-col bg-card/50">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <ServiceIcon className="h-8 w-8 text-primary mt-1" />
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
      
       <section id="proceso-de-datos">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestro Proceso de Datos: Un Viaje Estructurado</h2>
        <div className="space-y-4">
            {dataProcessSteps.map((step, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section id="herramientas">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Herramientas que Dominamos</h2>
         <p className="text-muted-foreground mb-6">Utilizamos un ecosistema de herramientas líderes en la industria para construir soluciones de datos modernas y eficientes.</p>
        <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool) => (
                <Badge key={tool} className="text-md px-4 py-2" variant="secondary">{tool}</Badge>
            ))}
        </div>
      </section>

      <section id="cta-final" className="text-center py-10">
        <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <BarChart3 className="h-12 w-12 text-primary"/>
                </div>
                <CardTitle className="text-2xl">¿Quiere tomar decisiones basadas en datos, no en intuición?</CardTitle>
                <CardDescription>Descubra las oportunidades ocultas en su información. Nuestro equipo puede ayudarle a construir una cultura de datos sólida.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button size="lg" asChild>
                    <Link href="/forms?service=analisis-datos&subject=Consulta%20sobre%20Analisis%20de%20Datos%20y%20BI">
                        Hable con un Estratega de Datos <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </>
  );
}
