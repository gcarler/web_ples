// src/app/ples-consulting/facilitacion-estrategica/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, Lightbulb, Puzzle, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "Facilitación Estratégica y Co-creación",
    subtitle: "Guiamos a los equipos a través de la complejidad para alinear visiones, construir consensos y diseñar futuros accionables, juntos.",
};

const keyPrinciples = [
    {
        icon: Users,
        title: "Inteligencia Colectiva",
        description: "Creemos que las mejores soluciones emergen del conocimiento combinado del grupo. Nuestro rol es crear el espacio para que esa inteligencia florezca."
    },
    {
        icon: Puzzle,
        title: "Proceso Estructurado",
        description: "Diseñamos y guiamos un proceso claro con metodologías probadas que aseguran la participación, el enfoque y el logro de los objetivos de la sesión."
    },
    {
        icon: Lightbulb,
        title: "Neutralidad y Objetividad",
        description: "Actuamos como un catalizador neutral, asegurando que todas las voces sean escuchadas y que la discusión se centre en los objetivos, no en las jerarquías."
    },
    {
        icon: Target,
        title: "Orientación a la Acción",
        description: "No terminamos en la conversación. Cada sesión se diseña para culminar en decisiones claras, planes de acción concretos y compromisos definidos."
    }
];

const processSteps = [
    { title: "1. Diseño de la Sesión", description: "Colaboramos con usted para definir los objetivos, los participantes clave y la agenda. Diseñamos las dinámicas y herramientas adecuadas para el desafío." },
    { title: "2. Creación del Contexto", description: "Iniciamos la sesión estableciendo un espacio seguro, alineando a todos en el propósito y las reglas de participación para fomentar la confianza." },
    { title: "3. Exploración y Divergencia", description: "Guiamos al grupo a través de actividades de ideación y análisis para explorar el problema desde múltiples ángulos y generar un amplio espectro de ideas." },
    { title: "4. Convergencia y Priorización", description: "Utilizamos métodos estructurados para ayudar al grupo a analizar, sintetizar y priorizar las ideas, convergiendo hacia las soluciones más viables y de mayor impacto." },
    { title: "5. Plan de Acción y Cierre", description: "Traducimos las decisiones en un plan de acción claro, con responsables, plazos y próximos pasos, asegurando que el impulso se mantenga." }
];

const benefits = [
    "Alineación y compromiso del equipo directivo con una visión compartida.",
    "Resolución de problemas complejos de manera más rápida y efectiva.",
    "Decisiones de mayor calidad al incorporar múltiples perspectivas.",
    "Fomento de una cultura de colaboración, confianza y responsabilidad.",
    "Planes de acción claros y realistas que tienen el respaldo de quienes los ejecutarán."
];

export default function FacilitacionEstrategicaPage() {
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
                    <h2 className="text-3xl font-bold text-center mb-10">Nuestros Principios de Facilitación</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {keyPrinciples.map((principle, index) => {
                            const PrincipleIcon = principle.icon;
                            return (
                                <Card key={index} className="text-center bg-card/50 border hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                                            <PrincipleIcon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle>{principle.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{principle.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                <section className="mb-16 py-12 bg-secondary rounded-lg">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10">Nuestro Proceso de Co-creación</h2>
                        <div className="space-y-4">
                            {processSteps.map((step, index) => (
                                <Card key={index} className="bg-card">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios para su Organización</h2>
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
                                <Users className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">¿Necesita alinear a su equipo para un desafío importante?</CardTitle>
                            <CardDescription>Permítanos diseñar y facilitar una sesión que transforme la conversación en acción y resultados concretos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Solicitud%20de%20Facilitacion%20Estrategica">
                                    Coordinar una Sesión Estratégica <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
