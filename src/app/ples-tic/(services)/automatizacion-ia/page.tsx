// src/app/ples-tic/automatizacion-ia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, BrainCircuit, CheckCircle, Eye, Lightbulb, MessageSquare, Repeat, Search, Settings, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iaCapabilities = [
    { icon: Repeat, title: "Automatización Robótica de Procesos (RPA)", description: "Desarrollamos 'bots' de software que imitan las acciones humanas para automatizar tareas repetitivas y basadas en reglas, liberando a su equipo para que se concentre en actividades de mayor valor." },
    { icon: MessageSquare, title: "Procesamiento de Lenguaje Natural (NLP)", description: "Creamos soluciones que entienden y procesan el lenguaje humano, permitiendo analizar grandes volúmenes de texto, clasificar documentos o potenciar chatbots inteligentes." },
    { icon: Eye, title: "Visión por Computadora", description: "Implementamos algoritmos que permiten a las máquinas 'ver' e interpretar el mundo visual, para aplicaciones como el control de calidad por imagen, la detección de objetos o el análisis de video." },
    { icon: BrainCircuit, title: "Machine Learning y Modelos Predictivos", description: "Construimos y desplegamos modelos de aprendizaje automático que identifican patrones en sus datos para predecir resultados futuros, optimizar procesos y personalizar experiencias." },
];

const implementationProcess = [
    { title: "1. Identificación de Oportunidades", description: "Realizamos un taller para identificar los procesos con mayor potencial de automatización y retorno de inversión (ROI)." },
    { title: "2. Prueba de Concepto (PoC)", description: "Desarrollamos un prototipo rápido para validar la viabilidad técnica de la solución y demostrar su valor de negocio en un entorno controlado." },
    { title: "3. Desarrollo e Integración", description: "Construimos la solución completa y la integramos de forma segura y eficiente con sus sistemas existentes (ERP, CRM, etc.)." },
    { title: "4. Despliegue y Monitorización", description: "Ponemos la solución en producción y monitorizamos su rendimiento para asegurar que cumpla con los objetivos y se adapte a los cambios." },
    { title: "5. Gestión del Cambio y Capacitación", description: "Acompañamos a sus equipos en el proceso de adopción, capacitando y comunicando los beneficios para asegurar el éxito del proyecto." },
];

const useCases = [
    "Clasificación automática de tickets de soporte.",
    "Extracción de datos de facturas y documentos no estructurados.",
    "Chatbots de servicio al cliente para responder preguntas frecuentes.",
    "Sistemas de recomendación de productos personalizados.",
    "Detección de anomalías y fraudes en transacciones.",
    "Optimización de rutas logísticas en tiempo real.",
    "Análisis de sentimiento en redes sociales.",
    "Mantenimiento predictivo de maquinaria industrial."
];

export default function AutomatizacionIAPage() {
  return (
    <>
      <section id="introduccion">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Inteligencia Artificial: La Próxima Frontera de la Eficiencia</h2>
        <div className="space-y-4 text-muted-foreground">
            <p>La Inteligencia Artificial (IA) ha dejado de ser una promesa futurista para convertirse en una herramienta de negocio tangible y poderosa. En PLES TIC, ayudamos a las empresas a desmitificar la IA y a aplicarla de manera práctica para resolver desafíos reales, automatizar procesos complejos y crear ventajas competitivas duraderas.</p>
            <p>Nuestro enfoque es pragmático y centrado en el valor. No se trata de implementar IA por el simple hecho de hacerlo, sino de identificar las oportunidades donde puede generar el mayor impacto en su eficiencia operativa, en la experiencia de sus clientes y en su rentabilidad.</p>
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
        <h2 className="text-3xl font-semibold text-foreground mb-6">Nuestro Proceso de Implementación</h2>
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
                <CardTitle className="text-2xl">Libere el potencial de su equipo con la automatización</CardTitle>
                <CardDescription>Deje que la IA se encargue de las tareas repetitivas y permita que su talento se enfoque en la estrategia y la innovación.</CardDescription>
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