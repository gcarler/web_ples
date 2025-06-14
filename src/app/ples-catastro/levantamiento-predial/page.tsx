// src/app/ples-catastro/levantamiento-predial/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Settings, Layers, Cpu, BarChart3, ShieldCheck, Clock } from 'lucide-react';

export const metadata = {
  title: 'Levantamiento Predial Multifinalitario - PLES Catastro',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales, utilizando tecnología de vanguardia y el uso inteligente de la experiencia.',
};

const serviceDetails = {
  icon: <MapPin className="h-12 w-12 text-primary mb-4" />,
  title: 'Levantamiento Predial Multifinalitario',
  description: 'Ejecutamos levantamientos catastrales precisos (urbanos y rurales) con fines fiscales, jurídicos, económicos y sociales. Aplicamos <strong class="text-primary">el uso inteligente de la experiencia</strong>, metodologías científicas y tecnología de vanguardia para garantizar información territorial confiable, optimizar tiempos y costos, y entregar productos de alta calidad.',
  characteristics: [
    'Cobertura Urbana y Rural exhaustiva.',
    'Aplicación de Tecnología GPS de alta precisión, Drones con sensores LiDAR/Fotogramétricos y Estaciones Totales Robóticas.',
    'Integración nativa con Sistemas de Información Geográfica (SIG) y Bases de Datos Espaciales.',
    'Generación de Cartografía Base y Temática detallada, precisa y actualizada.',
    'Identificación rigurosa de características físicas, jurídicas y económicas de los predios.',
    'Soporte técnico y metodológico para la formalización de la propiedad y regularización de la tenencia.',
  ],
  methodology: [
    {
      icon: <Settings className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />,
      title: "Planificación Detallada y Científica",
      text: "Definimos alcances, seleccionamos tecnologías óptimas y diseñamos flujos de trabajo eficientes basados en análisis técnico y nuestra vasta experiencia."
    },
    {
      icon: <Layers className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />,
      title: "Captura de Datos de Alta Precisión",
      text: "Utilizamos GPS RTK/PPK, estaciones totales robóticas y drones equipados con sensores LiDAR o fotogramétricos para garantizar la máxima exactitud en campo."
    },
    {
      icon: <Cpu className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />,
      title: "Procesamiento y Modelado Avanzado",
      text: "Empleamos software especializado y algoritmos de IA para el procesamiento de datos, generación de Modelos Digitales de Terreno (MDT), Modelos Digitales de Superficie (MDS) y ortofotomosaicos."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />,
      title: "Integración y Validación Rigurosa",
      text: "Consolidamos información física, jurídica y económica en SIG, aplicando controles de calidad continuos para asegurar la consistencia y fiabilidad de los datos."
    }
  ],
  benefits: [
    {
      icon: <BarChart3 className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />,
      title: "Base Catastral Precisa y Confiable",
      text: "Fundamento sólido para la toma de decisiones estratégicas, planificación y gestión territorial."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />,
      title: "Seguridad Jurídica y Optimización Fiscal",
      text: "Identificación clara de predios que facilita la formalización, reduce conflictos y optimiza la recaudación."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />,
      title: "Eficiencia y Reducción de Costos",
      text: "Gracias a la aplicación de tecnologías eficientes y nuestra experiencia probada, optimizamos los tiempos de ejecución y los costos operativos."
    }
  ],
  formSubject: 'Consulta%20Levantamiento%20Predial'
};

export default function LevantamientoPredialPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-8">
          <Link href="/ples-catastro">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a PLES Catastro
          </Link>
        </Button>

        <Card className="shadow-xl group hover:shadow-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ease-in-out border-primary/30">
          <CardHeader className="items-center text-center">
            {serviceDetails.icon}
            <CardTitle className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2">
              {serviceDetails.title}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: serviceDetails.description }} />
          </CardHeader>
          <CardContent className="mt-8 space-y-12">
            
            <section>
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Características Clave del Servicio</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                {serviceDetails.characteristics.map((point) => (
                  <li key={point} className="flex items-start text-foreground group-hover:text-inherit">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                    <span className="text-md">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="my-12 border-border" />

            <section>
              <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Nuestra Metodología Avanzada para Resultados Superiores</h3>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro enfoque combina técnicas de campo de alta precisión con análisis geoespacial avanzado y un riguroso control de calidad en cada etapa, asegurando productos finales de la más alta calidad en tiempos optimizados.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceDetails.methodology.map((item) => (
                  <Card key={item.title} className="bg-background/50 group-hover:bg-card/80 p-2">
                    <CardHeader className="flex flex-row items-start gap-3 p-4">
                      {item.icon}
                      <CardTitle className="text-lg text-primary group-hover:text-accent">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground group-hover:text-inherit">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <hr className="my-12 border-border" />

            <section>
              <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Beneficios de Nuestro Levantamiento Predial</h3>
               <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Al elegir PLES Catastro para su levantamiento predial, su organización se beneficia de nuestra experiencia técnica, el uso de tecnología de punta y un compromiso con la calidad y la eficiencia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceDetails.benefits.map((item) => (
                  <Card key={item.title} className="bg-background/50 group-hover:bg-card/80 p-2 text-center">
                     <CardHeader className="items-center p-4">
                      {item.icon}
                      <CardTitle className="text-lg text-primary group-hover:text-accent mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground group-hover:text-inherit">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <div className="mt-16 text-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary">
                <Link href={`/forms?service=ples-catastro&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Solicitar Asesoría Especializada <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
