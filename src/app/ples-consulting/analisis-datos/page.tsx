// src/app/ples-consulting/analisis-datos/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, Search, Database, BrainCircuit, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "An?lisis de Datos Avanzado",
    subtitle: "Transformamos datos crudos en decisiones estrat?gicas, combinando m?todos cualitativos y cuantitativos para una comprensi?n 360°.",
};

const keyPrinciples = [
    {
        icon: Database,
        title: "Integraci?n de Fuentes",
        description: "Unificamos datos de m?ltiples or?genes (encuestas, entrevistas, bases de datos, redes sociales) para crear una visi?n completa y sin silos."
    },
    {
        icon: BarChart3,
        title: "Rigor Cuantitativo",
        description: "Aplicamos modelos estad?sticos y algoritmos de machine learning para identificar patrones, correlaciones y tendencias predictivas en sus datos."
    },
    {
        icon: Search,
        title: "Profundidad Cualitativa",
        description: "Utilizamos t?cnicas como el an?lisis de contenido y de sentimiento para extraer el 'porqu?' detr?s de los n?meros, capturando el contexto y las percepciones humanas."
    },
    {
        icon: BrainCircuit,
        title: "Visualizaci?n Estrat?gica",
        description: "Dise?amos dashboards e informes interactivos que comunican los hallazgos de manera clara y accionable, facilitando la toma de decisiones en todos los niveles."
    }
];

const processSteps = [
    { title: "1. Definici?n del Problema y Objetivos", description: "Colaboramos con usted para traducir sus preguntas de negocio en objetivos de an?lisis claros y medibles." },
    { title: "2. Recopilaci?n y Limpieza de Datos", description: "Identificamos, recopilamos y preparamos los datos, asegurando su calidad y consistencia para un an?lisis fiable." },
    { title: "3. An?lisis Mixto", description: "Ejecutamos an?lisis cuantitativos y cualitativos en paralelo, cruzando los hallazgos para obtener insights m?s robustos." },
    { title: "4. S?ntesis y Generaci?n de Insights", description: "Sintetizamos los resultados en conclusiones claras y recomendaciones estrat?gicas priorizadas." },
    { title: "5. Comunicaci?n y Taller de Acci?n", description: "Presentamos los hallazgos de manera visual y facilitamos un taller para traducir los insights en un plan de acci?n concreto." }
];

const benefits = [
    "Decisiones de negocio basadas en evidencia s?lida, no en intuici?n.",
    "Comprensi?n profunda del comportamiento y las necesidades de sus clientes.",
    "Identificaci?n de nuevas oportunidades de mercado y optimizaci?n de procesos.",
    "Capacidad para anticipar tendencias y predecir resultados futuros.",
    "Comunicaci?n clara y convincente de la historia que cuentan sus datos."
];


export default function AnalisisDatosPage() {
    return (
        <div className="py-10 w-full">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 mb-12">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={pageDetails.parentLink}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a {pageDetails.parentName}
                        </Link>
                    </Button>
                </div>

                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4">
                        {pageDetails.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {pageDetails.subtitle}
                    </p>
                </header>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Principios Clave de Nuestro Enfoque</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {keyPrinciples.map((principle, index) => {
                            const PrincipleIcon = principle.icon;
                            return (
                                <Card key={index} className="bg-card/50 border hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-start gap-4">
                                        <PrincipleIcon className="h-10 w-10 text-primary mt-1" />
                                        <div>
                                            <CardTitle>{principle.title}</CardTitle>
                                            <CardDescription className="mt-1">{principle.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="mb-16 py-12 bg-secondary rounded-lg">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10">Nuestro Proceso de An?lisis</h2>
                        <div className="relative space-y-8">
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
                            {processSteps.map((step, index) => (
                                <div key={index} className="relative flex items-start gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground z-10">
                                        <span className="text-lg font-bold">{index + 1}</span>
                                    </div>
                                    <div className="bg-card p-4 rounded-lg flex-1 border">
                                        <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                                        <p className="text-muted-foreground text-sm">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios para su Organizaci?n</h2>
                    <Card className="bg-card/50 border">
                        <CardContent className="p-6">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <section className="text-center py-10">
                    <Card className="max-w-2xl mx-auto bg-primary/10 shadow-lg border-primary/20">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <BarChart3 className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">?Listo para que sus datos trabajen para usted?</CardTitle>
                            <CardDescription>Perm?tanos ayudarle a descubrir las historias y oportunidades ocultas en su informaci?n.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Consulta%20sobre%20Analisis%20de%20Datos">
                                    Hable con un Analista <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
