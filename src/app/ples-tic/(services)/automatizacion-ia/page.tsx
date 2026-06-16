// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, BrainCircuit, CheckCircle, Eye, Lightbulb, MessageSquare, Repeat, Search, Settings, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iaCapabilities = [
    { icon: Repeat, title: "Automatizaci?n Rob?tica de Procesos (RPA)", description: "Desarrollamos 'bots' de software que imitan las acciones humanas para automatizar tareas repetitivas y basadas en reglas, liberando a su equipo para que se concentre en actividades de mayor valor." },
    { icon: MessageSquare, title: "Procesamiento de Lenguaje Natural (NLP)", description: "Creamos soluciones que entienden y procesan el lenguaje humano, permitiendo analizar grandes vol?menes de texto, clasificar documentos o potenciar chatbots inteligentes." },
    { icon: Eye, title: "Visi?n por Computadora", description: "Implementamos algoritmos que permiten a las m?quinas 'ver' e interpretar el mundo visual, para aplicaciones como el control de calidad por imagen, la detecci?n de objetos o el an?lisis de video." },
    { icon: BrainCircuit, title: "Machine Learning y Modelos Predictivos", description: "Construimos y desplegamos modelos de aprendizaje autom?tico que identifican patrones en sus datos para predecir resultados futuros, optimizar procesos y personalizar experiencias." },
];

const implementationProcess = [
    { title: "1. Identificaci?n de Oportunidades", description: "Realizamos un taller para identificar los procesos con mayor potencial de automatizaci?n y retorno de inversi?n (ROI)." },
    { title: "2. Prueba de Concepto (PoC)", description: "Desarrollamos un prototipo r?pido para validar la viabilidad t?cnica de la soluci?n y demostrar su valor de negocio en un entorno controlado." },
    { title: "3. Desarrollo e Integraci?n", description: "Construimos la soluci?n completa y la integramos de forma segura y eficiente con sus sistemas existentes (ERP, CRM, etc.)." },
    { title: "4. Despliegue y Monitorizaci?n", description: "Ponemos la soluci?n en producci?n y monitorizamos su rendimiento para asegurar que cumpla con los objetivos y se adapte a los cambios." },
    { title: "5. Gesti?n del Cambio y Capacitaci?n", description: "Acompa?amos a sus equipos en el proceso de adopci?n, capacitando y comunicando los beneficios para asegurar el ?xito del proyecto." },
];

const useCases = [
    "Clasificaci?n autom?tica de tickets de soporte.",
    "Extracci?n de datos de facturas y documentos no estructurados.",
    "Chatbots de servicio al cliente para responder preguntas frecuentes.",
    "Sistemas de recomendaci?n de productos personalizados.",
    "Detecci?n de anomal?as y fraudes en transacciones.",
    "Optimizaci?n de rutas log?sticas en tiempo real.",
    "An?lisis de sentimiento en redes sociales.",
    "Mantenimiento predictivo de maquinaria industrial."
];

export default function AutomatizacionIAPage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Inteligencia Artificial: La Pr?xima Frontera de la Eficiencia</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>La Inteligencia Artificial (IA) ha dejado de ser una promesa futurista para convertirse en una herramienta de negocio tangible y poderosa. En PLES TIC, ayudamos a las empresas a desmitificar la IA y a aplicarla de manera pr?ctica para resolver desaf?os reales, automatizar procesos complejos y crear ventajas competitivas duraderas.</p>
            <p>Nuestro enfoque es pragm?tico y centrado en el valor. No se trata de implementar IA por el simple hecho de hacerlo, sino de identificar las oportunidades donde puede generar el mayor impacto en su eficiencia operativa, en la experiencia de sus clientes y en su rentabilidad.</p>
        </div>
      </section>

      <section id="capacidades-ia">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestras Capacidades en Inteligencia Artificial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iaCapabilities.map((capability, index) => {
                const CapabilityIcon = capability.icon;
                return (
                     <Card key={index} className="flex flex-col bg-card/50">
                        <CardHeader className="flex flex-row items-start gap-4 pb-4">
                            <CapabilityIcon className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <CardTitle className="text-xl">{capability.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{capability.description}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </section>

      <section id="nuestro-proceso">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestro Proceso de Implementaci?n</h2>
        <div className="space-y-4">
            {implementationProcess.map((step, index) => (
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
      
      <section id="casos-de-uso">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Casos de Uso Aplicados</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((useCase) => (
                <div key={useCase} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                    <Zap className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground">{useCase}</span>
                </div>
            ))}
        </div>
      </section>

      <section id="cta-final" className="text-center py-10">
        <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Bot className="h-12 w-12 text-primary"/>
                </div>
                <CardTitle className="text-2xl">Libere el potencial de su equipo con la automatizaci?n</CardTitle>
                <CardDescription>Deje que la IA se encargue de las tareas repetitivas y permita que su talento se enfoque en la estrategia y la innovaci?n.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button size="lg" asChild>
                    <Link href="/forms?service=automatizacion-ia&subject=Consulta%20sobre%20Automatizacion%20con%20IA">
                        Descubrir Oportunidades de IA <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </section>
    </>
  );
}