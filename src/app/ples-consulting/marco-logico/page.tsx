// src/app/ples-consulting/marco-logico/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Target, GitMerge, CheckCircle, BarChart3, Puzzle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "Marco Lógico y Teoría del Cambio",
    subtitle: "Herramientas estratégicas para diseñar, monitorear y evaluar proyectos con claridad, coherencia y un enfoque en resultados medibles.",
};

const keyConcepts = {
    marcoLogico: {
        title: "El Marco Lógico: La Matriz para la Claridad",
        description: "Es una herramienta de diseño y gestión que resume un proyecto en una matriz 4x4. Ayuda a asegurar la coherencia lógica entre los insumos, las actividades, los resultados y el objetivo final.",
        components: [
            { icon: Target, title: "Jerarquía de Objetivos", description: "Define la lógica vertical: Actividades -> Componentes (Resultados) -> Propósito -> Fin." },
            { icon: BarChart3, title: "Indicadores Verificables", description: "Establece cómo se medirá el éxito en cada nivel de la jerarquía de objetivos." },
            { icon: CheckCircle, title: "Medios de Verificación", description: "Especifica las fuentes de datos que se utilizarán para medir los indicadores." },
            { icon: Puzzle, title: "Supuestos y Riesgos", description: "Identifica las condiciones externas necesarias para que el proyecto tenga éxito, permitiendo una gestión proactiva de riesgos." }
        ]
    },
    teoriaDelCambio: {
        title: "La Teoría del Cambio: El Mapa Causal del Impacto",
        description: "Es un proceso participativo que explica cómo y por qué se espera que un cambio suceda. Se enfoca en mapear la 'caja negra' entre lo que hacemos (intervenciones) y lo que queremos lograr (impacto).",
        components: [
            { icon: GitMerge, title: "Cadena de Resultados", description: "Visualiza la secuencia causal desde las actividades hasta los resultados a corto, mediano y largo plazo, culminando en el impacto final." },
            { icon: Puzzle, title: "Identificación de Supuestos", description: "Hace explícitas todas las suposiciones que conectan cada paso de la cadena de resultados." },
            { icon: BarChart3, title: "Definición de Indicadores", description: "Establece indicadores para medir el progreso en cada eslabón de la cadena, no solo al final." },
            { icon: Target, title: "Visión de Éxito a Largo Plazo", description: "Comienza con el fin en mente: define claramente el impacto a largo plazo que se busca y luego trabaja hacia atrás." }
        ]
    }
};

const benefits = [
    "Claridad y consenso sobre los objetivos y la lógica del proyecto.",
    "Mejora en la planificación y la asignación de recursos.",
    "Base sólida para un sistema de monitoreo y evaluación (M&E) efectivo.",
    "Facilita la comunicación del proyecto a donantes y stakeholders.",
    "Mejora la gestión de riesgos y la capacidad de adaptación.",
    "Aumenta la probabilidad de lograr el impacto deseado."
];

export default function MarcoLogicoPage() {
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
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Marco Lógico */}
                        <Card className="bg-card/50 border">
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">{keyConcepts.marcoLogico.title}</CardTitle>
                                <CardDescription>{keyConcepts.marcoLogico.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {keyConcepts.marcoLogico.components.map(item => {
                                    const ItemIcon = item.icon;
                                    return (
                                        <div key={item.title} className="flex items-start gap-3">
                                            <ItemIcon className="h-5 w-5 text-accent mt-1 shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                        {/* Teoría del Cambio */}
                        <Card className="bg-card/50 border">
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">{keyConcepts.teoriaDelCambio.title}</CardTitle>
                                <CardDescription>{keyConcepts.teoriaDelCambio.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {keyConcepts.teoriaDelCambio.components.map(item => {
                                    const ItemIcon = item.icon;
                                    return (
                                        <div key={item.title} className="flex items-start gap-3">
                                            <ItemIcon className="h-5 w-5 text-accent mt-1 shrink-0" />
                                            <div>
                                                <h4 className="font-semibold">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios de un Diseño Robusto de Proyectos</h2>
                    <Card className="bg-card/50 border">
                        <CardContent className="p-6">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
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
                                <Target className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">¿Quiere que sus proyectos generen un impacto real y medible?</CardTitle>
                            <CardDescription>Le ayudamos a diseñar proyectos con una lógica impecable y una estrategia de cambio clara desde el inicio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Consulta%20sobre%20Marco%20Logico%20y%20Teoria%20del%20Cambio">
                                    Solicitar un Taller de Diseño de Proyectos <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
