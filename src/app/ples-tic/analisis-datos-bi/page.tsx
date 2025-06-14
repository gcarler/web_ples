// src/app/ples-tic/analisis-datos-bi/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, BarChartBig, CheckCircle, Database, BarChartHorizontalBig, Brain, Lightbulb, TrendingUp, Eye, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Análisis de Datos e Inteligencia de Negocio (BI) - PLES TIC',
  description: 'Transformamos sus datos en decisiones estratégicas. Descubra insights ocultos y optimice su rendimiento con nuestras soluciones de BI y análisis avanzado.',
};

export default function AnalisisDatosBiPage() {
  const services = [
    {
      icon: <Database className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Data Warehousing y Modelado de Datos',
      description: 'Diseñamos y construimos almacenes de datos robustos y eficientes para consolidar su información y facilitar el análisis.',
    },
    {
      icon: <BarChartHorizontalBig className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Visualización de Datos y Dashboards',
      description: 'Creamos dashboards interactivos y reportes visuales (Tableau, Power BI, Looker) que comunican insights de forma clara y accionable.',
    },
    {
      icon: <Brain className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Análisis Predictivo y Fundamentos de ML',
      description: 'Aplicamos técnicas estadísticas y de machine learning para predecir tendencias, segmentar clientes y optimizar procesos.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4" />,
      title: 'Ingeniería de Datos y ETL/ELT',
      description: 'Desarrollamos procesos de extracción, transformación y carga (ETL/ELT) para asegurar la calidad e integridad de sus datos.',
    },
  ];

  const benefits = [
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Decisiones Basadas en Datos', text: 'Tome decisiones más inteligentes y estratégicas con información precisa y oportuna.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Optimización del Rendimiento', text: 'Identifique áreas de mejora y optimice sus operaciones para mayor eficiencia.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Conocimiento del Cliente', text: 'Entienda mejor a sus clientes para personalizar ofertas y mejorar la retención.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Identificación de Oportunidades', text: 'Descubra nuevas tendencias de mercado y oportunidades de crecimiento.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Reducción de Costos', text: 'Elimine ineficiencias y optimice la asignación de recursos.' },
    { icon: <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-green-300" />, title: 'Visión 360° del Negocio', text: 'Obtenga una comprensión completa del rendimiento de su organización.' },
  ];

  const technologies = ['SQL (PostgreSQL, MySQL, SQL Server)', 'Python (Pandas, NumPy, Scikit-learn)', 'R', 'Tableau', 'Microsoft Power BI', 'Looker (Google Data Studio)', 'Apache Spark', 'AWS (Redshift, S3, Glue)', 'Azure (Synapse, Data Factory)', 'Google Cloud (BigQuery, Dataflow)'];
  
  const caseStudies = [
    {
      id: 1,
      title: 'Dashboard de Ventas en Tiempo Real para Retail',
      challenge: 'Falta de visibilidad inmediata sobre el rendimiento de ventas por tienda y producto.',
      solution: 'Implementamos un dashboard interactivo en Power BI conectado a su sistema POS, permitiendo el seguimiento de KPIs en tiempo real y la toma de decisiones ágiles.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'retail sales dashboard charts',
      tags: ['Visualización de Datos', 'Power BI', 'Retail Analytics']
    },
    {
      id: 2,
      title: 'Modelo Predictivo de Fuga de Clientes para Telco',
      challenge: 'Alta tasa de cancelación de servicios y dificultad para identificar clientes en riesgo.',
      solution: 'Desarrollamos un modelo de machine learning que predice la probabilidad de fuga de clientes, permitiendo campañas de retención proactivas y personalizadas.',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'customer churn prediction graph',
      tags: ['Análisis Predictivo', 'Machine Learning', 'Telecomunicaciones']
    },
  ];


  return (
    <div className="py-10 space-y-16 px-4 sm:px-6 lg:px-8">
      <Button variant="outline" size="sm" asChild className="mb-8">
        <Link href="/ples-tic">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a PLES TIC
        </Link>
      </Button>

      <section className="relative py-20 md:py-28 bg-card shadow-xl rounded-lg overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <BarChartBig className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
            Análisis de Datos e Inteligencia de Negocio (BI)
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
            Convierta sus datos en su activo más valioso. En PLES TIC, le ayudamos a extraer insights significativos, visualizar tendencias y tomar decisiones informadas que impulsan el crecimiento y la eficiencia.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link href="/forms?service=analisis-datos-bi&subject=Consulta%20Analisis%20de%20Datos%20y%20BI">
              <span className="flex items-center">
                Descubra el Poder de sus Datos <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nuestros Servicios de Análisis y BI</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Desde la infraestructura de datos hasta la visualización avanzada y el modelado predictivo.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col bg-card">
                <CardHeader className="items-center">
                  {service.icon}
                  <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground group-hover:text-primary-foreground/90">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beneficios de Potenciar su Negocio con Datos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="bg-card p-6 group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
                <div className="flex items-start space-x-3">
                  {benefit.icon}
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary-foreground mb-1">{benefit.title}</CardTitle>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{benefit.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       <section className="py-12 bg-card rounded-lg shadow-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Casos de Éxito en Análisis de Datos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col">
                <div className="relative h-56 w-full">
                  <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" data-ai-hint={study.imageHint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary-foreground">{study.title}</CardTitle>
                  <div className="mt-2">
                    {study.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2 mb-2 group-hover:bg-primary-foreground/20 group-hover:text-accent-foreground">{tag}</Badge>)}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Desafío:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary-foreground mb-1">Solución PLES Analítica:</p>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">{study.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tecnologías y Plataformas de Datos</h2>
           <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Dominamos un amplio espectro de herramientas de bases de datos, análisis, visualización y machine learning.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm hover:bg-primary/10 transition-colors">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground rounded-lg shadow-inner">
        <div className="container mx-auto">
          <Eye className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforme sus Datos en Ventaja Competitiva</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Permítanos ayudarle a construir una cultura basada en datos y a liberar el verdadero potencial de su información.
          </p>
          <Button size="xl" variant="secondary" className="text-lg px-10 py-4 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/forms?service=analisis-datos-bi&subject=Consultoria%20Datos%20y%20BI">
              <span className="flex items-center">
                Obtener Asesoría en Datos <ArrowRight className="ml-3 h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
