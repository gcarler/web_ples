// src/app/ples-consulting/gestion-agil/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, KanbanSquare, Repeat, CheckCircle, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "Gesti?n ?gil de Proyectos (Scrum/Kanban)",
    subtitle: "Adoptamos un enfoque iterativo e incremental para entregar valor de forma temprana y continua, adapt?ndonos al cambio.",
};

const keyPrinciples = [
    {
        icon: Repeat,
        title: "Entrega Iterativa e Incremental",
        description: "Construimos y entregamos el proyecto en ciclos cortos y funcionales (Sprints), permitiendo una retroalimentaci?n constante y una adaptaci?n r?pida."
    },
    {
        icon: Users,
        title: "Colaboraci?n y Comunicaci?n",
        description: "Fomentamos una comunicaci?n diaria y transparente entre el equipo del proyecto y los stakeholders para asegurar la alineaci?n y resolver impedimentos."
    },
    {
        icon: Lightbulb,
        title: "Adaptaci?n al Cambio",
        description: "Damos la bienvenida al cambio. Nuestra metodolog?a est? dise?ada para ser flexible y responder a nuevos requisitos o prioridades en cualquier etapa del proyecto."
    },
    {
        icon: CheckCircle,
        title: "Enfoque en el Valor",
        description: "Priorizamos el trabajo en funci?n del valor que aporta al negocio, asegurando que los recursos se centren en las funcionalidades m?s importantes primero."
    }
];

const processSteps = {
    scrum: [
        { title: "Planificaci?n del Sprint", description: "El equipo selecciona un conjunto de tareas del Product Backlog para completar en el pr?ximo ciclo (Sprint)." },
        { title: "Ejecuci?n del Sprint", description: "El equipo trabaja en las tareas seleccionadas, con reuniones diarias (Daily Stand-ups) para sincronizarse y resolver bloqueos." },
        { title: "Revisi?n del Sprint (Review)", description: "Al final del Sprint, el equipo presenta el trabajo completado (incremento) a los stakeholders para obtener feedback." },
        { title: "Retrospectiva del Sprint", description: "El equipo reflexiona sobre el Sprint pasado para identificar qu? funcion? bien y qu? se puede mejorar en el siguiente ciclo." }
    ],
    kanban: [
        { title: "Visualizar el Flujo", description: "Mapeamos su proceso actual en un tablero visual (Tablero Kanban) con columnas que representan cada etapa del trabajo." },
        { title: "Limitar el Trabajo en Progreso (WIP)", description: "Establecemos l?mites en la cantidad de tareas que pueden estar en cada etapa a la vez, para evitar cuellos de botella y mejorar el flujo." },
        { title: "Gestionar el Flujo", description: "Nos enfocamos en mover las tareas a trav?s del tablero de la manera m?s fluida posible, midiendo y optimizando el tiempo de ciclo." },
        { title: "Mejora Continua", description: "Utilizamos m?tricas como el tiempo de ciclo y el rendimiento para identificar oportunidades de mejora en el proceso de forma continua." }
    ]
};

const benefits = [
    "Mayor velocidad de entrega y 'time-to-market'.",
    "Capacidad para gestionar prioridades cambiantes y reducir el riesgo.",
    "Mayor visibilidad del progreso del proyecto para todos los interesados.",
    "Mejora de la productividad y la moral del equipo.",
    "Producto final de mayor calidad y mejor alineado con las necesidades del cliente."
];

export default function GestionAgilPage() {
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
                    <h2 className="text-3xl font-bold text-center mb-10">Principios Fundamentales de la Agilidad</h2>
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
                    <h2 className="text-3xl font-bold text-center mb-10">Nuestros Marcos de Trabajo ?giles</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="bg-card/50 border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Repeat className="text-primary"/> Scrum: Para Proyectos Complejos</CardTitle>
                                <CardDescription>Un marco de trabajo prescriptivo para desarrollar y mantener productos complejos, basado en ciclos de trabajo fijos (Sprints).</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {processSteps.scrum.map(step => (
                                    <div key={step.title}>
                                        <h4 className="font-semibold">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><KanbanSquare className="text-primary"/> Kanban: Para la Mejora Continua del Flujo</CardTitle>
                                <CardDescription>Un m?todo para visualizar el trabajo, limitar el trabajo en curso (WIP) y maximizar la eficiencia del flujo de entrega.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {processSteps.kanban.map(step => (
                                    <div key={step.title}>
                                        <h4 className="font-semibold">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10">Beneficios de Adoptar la Agilidad</h2>
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
                                <KanbanSquare className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">?Quiere acelerar la entrega de valor?</CardTitle>
                            <CardDescription>Le ayudamos a implementar el marco ?gil que mejor se adapte a su cultura y a las necesidades de su proyecto para lograr resultados tangibles m?s r?pido.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Consulta%20sobre%20Gestion%20Agil">
                                    Solicitar Asesor?a ?gil <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
