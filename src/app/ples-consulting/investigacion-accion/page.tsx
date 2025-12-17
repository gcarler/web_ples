// src/app/ples-consulting/investigacion-accion/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Users, Search, Lightbulb, Repeat, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "Investigación Acción Participativa (IAP)",
    subtitle: "Un enfoque colaborativo donde la comunidad se convierte en co-investigadora para generar conocimiento y transformar su propia realidad.",
};

const keyPrinciples = [
    {
        icon: Users,
        title: "Participación Genuina",
        description: "La comunidad no es un objeto de estudio, sino un actor protagónico. Los miembros participan activamente en todas las fases del proceso de investigación."
    },
    {
        icon: Lightbulb,
        title: "Conocimiento para la Acción",
        description: "La investigación no termina en un informe. Su propósito fundamental es generar conocimiento que impulse acciones concretas de cambio y mejora."
    },
    {
        icon: Repeat,
        title: "Proceso Cíclico y Reflexivo",
        description: "Es un ciclo continuo de planificación, acción, observación y reflexión. Cada ciclo informa y mejora el siguiente, en una espiral de aprendizaje."
    },
    {
        icon: Search,
        title: "Diálogo de Saberes",
        description: "Valoramos y combinamos el conocimiento técnico y científico con el saber popular y la experiencia vivida de la comunidad para una comprensión más rica."
    }
];

const processSteps = [
    { title: "1. Diagnóstico Participativo", description: "Junto con la comunidad, identificamos y priorizamos los problemas o temas de interés que desean investigar y transformar." },
    { title: "2. Planificación de la Acción", description: "Co-diseñamos un plan de acción y una estrategia de investigación. Definimos qué queremos saber, cómo lo averiguaremos y qué acciones tomaremos." },
    { title: "3. Acción y Observación Sistemática", description: "Implementamos las acciones planificadas mientras recopilamos datos y observamos sistemáticamente los efectos y resultados." },
    { title: "4. Reflexión y Sistematización", description: "El grupo analiza e interpreta la información recopilada, reflexiona sobre el proceso y sistematiza los aprendizajes para generar nuevo conocimiento." },
    { title: "5. Replanteamiento y Nuevo Ciclo", description: "Con base en los aprendizajes, se evalúan las acciones, se redefine el problema si es necesario, y se planifica un nuevo ciclo de acción-investigación." }
];

const benefits = [
    "Soluciones más sostenibles y apropiadas por la comunidad.",
    "Empoderamiento y fortalecimiento de las capacidades locales.",
    "Generación de conocimiento contextualizado y relevante.",
    "Promoción de la democracia, la participación y la ciudadanía activa.",
    "Transformaciones sociales más profundas y duraderas."
];


export default function InvestigacionAccionPage() {
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
                    <h2 className="text-3xl font-bold text-center mb-10">Principios Clave de la IAP</h2>
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

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">El Ciclo de la Investigación-Acción</h2>
                     <div className="relative max-w-2xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative mb-8">
                                <div className="flex items-center" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                                    <div className="w-1/2"></div>
                                    <div className="w-1/2 px-4">
                                        <Card className="p-4 bg-card border">
                                            <h3 className="font-semibold text-primary">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </Card>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-background" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios de Este Enfoque</h2>
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
                            <CardTitle className="text-2xl">¿Busca generar un cambio social desde la base?</CardTitle>
                            <CardDescription>Facilitamos procesos de IAP que empoderan a las comunidades para que sean protagonistas de su propio desarrollo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Consulta%20sobre%20Investigacion%20Accion%20Participativa">
                                    Iniciar un Proyecto Participativo <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
