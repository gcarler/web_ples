// src/app/ples-tic/analisis-datos-bi/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, BarChartBig, CheckCircle, Database, BarChartHorizontalBig, Brain, Lightbulb, TrendingUp, Eye, MessageSquare
} from 'lucide-react';
import React from 'react';

export const metadata = {
  title: 'Análisis de Datos e Inteligencia de Negocio (BI) - PLES TIC',
  description: 'Transformamos sus datos en decisiones estratégicas. Descubra insights ocultos y optimice su rendimiento con nuestras soluciones de BI y análisis avanzado.',
};

const serviceDetails = {
  parentLink: "/ples-tic",
  parentName: "PLES TIC",
  serviceSlug: "analisis-datos-bi",
  icon: <BarChartBig />,
  title: 'Análisis de Datos e Inteligencia de Negocio (BI)',
  description: 'Transformamos sus datos en su activo más valioso. Descubra insights ocultos, visualice tendencias y tome decisiones informadas que impulsan el crecimiento y la eficiencia operativa de su organización.',
  pointsHeading: 'Servicios Clave en Datos y BI:',
  points: [
    { title: 'Data Warehousing y Modelado de Datos', text: 'Diseñamos y construimos almacenes de datos robustos y eficientes para consolidar su información y facilitar el análisis.', icon: <Database /> },
    { title: 'Visualización de Datos y Dashboards', text: 'Creamos dashboards interactivos y reportes visuales (Tableau, Power BI, Looker) que comunican insights de forma clara y accionable.', icon: <BarChartHorizontalBig /> },
    { title: 'Análisis Predictivo y Fundamentos de ML', text: 'Aplicamos técnicas estadísticas y de machine learning para predecir tendencias, segmentar clientes y optimizar procesos.', icon: <Brain /> },
    { title: 'Ingeniería de Datos y ETL/ELT', text: 'Desarrollamos procesos de extracción, transformación y carga (ETL/ELT) para asegurar la calidad e integridad de sus datos.', icon: <Lightbulb /> },
  ],
  benefitsHeading: "Beneficios de Potenciar su Negocio con Datos:",
  benefits: [
    'Decisiones Estratégicas Basadas en Evidencia',
    'Optimización del Rendimiento Operativo',
    'Conocimiento Profundo del Cliente y Mercado',
    'Identificación Proactiva de Oportunidades',
    'Reducción de Costos Mediante Eficiencia',
    'Visión 360° del Desempeño Organizacional',
  ],
  formSubject: 'Consulta%20Analisis%20de%20Datos%20y%20BI'
};

export default function AnalisisDatosBiPage() {
  return (
    <div className="py-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" size="sm" asChild className="mb-8">
          <Link href={serviceDetails.parentLink}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a {serviceDetails.parentName}
          </Link>
        </Button>

        <Card className="shadow-xl border border-border/30 hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-card group hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5">
          <CardHeader className="items-center text-center pt-10 pb-8">
            {React.cloneElement(serviceDetails.icon, { className: "h-16 w-16 text-primary mb-6" })}
            <CardTitle className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2">
              {serviceDetails.title}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-3 group-hover:text-foreground/90">
              {serviceDetails.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 md:px-8 pb-10">
            {serviceDetails.points && serviceDetails.points.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.pointsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                  {serviceDetails.points.map((point) => (
                    <li key={point.title} className="flex items-start text-foreground group-hover:text-inherit">
                       {React.cloneElement(point.icon, { className: "h-7 w-7 text-green-500 mr-4 mt-1 shrink-0 group-hover:text-green-400"})}
                      <div>
                        <span className="text-md font-semibold">{point.title}</span>
                        <p className="text-sm text-muted-foreground group-hover:text-inherit/90">{point.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {serviceDetails.benefits && serviceDetails.benefits.length > 0 && (
              <section className="mb-12">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center group-hover:text-inherit">
                  {serviceDetails.benefitsHeading}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto">
                  {serviceDetails.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-foreground group-hover:text-inherit">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                      <span className="text-md">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="text-center mt-8">
              <Button size="lg" asChild className="text-lg px-8 py-4 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary shadow-md hover:shadow-lg transition-all">
                <Link href={`/forms?service=${serviceDetails.serviceSlug}&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Obtener Asesoría en Datos <ArrowRight className="ml-2 h-5 w-5" />
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
