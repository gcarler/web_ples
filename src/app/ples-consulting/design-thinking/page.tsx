// src/app/ples-consulting/design-thinking/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, Users, Search, DraftingCompass, Rocket, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const pageDetails = {
    parentLink: "/ples-consulting",
    parentName: "PLES Consulting",
    title: "Design Thinking",
    subtitle: "Una metodolog?a centrada en el ser humano para la innovaci?n y la resoluci?n de problemas complejos.",
};

const keyPrinciples = [
    {
        icon: Users,
        title: "Empat?a Profunda",
        description: "Nos sumergimos en el mundo de sus usuarios para comprender sus necesidades, dolores y motivaciones reales, no solo las aparentes."
    },
    {
        icon: Lightbulb,
        title: "Ideaci?n sin L?mites",
        description: "Fomentamos un ambiente de creatividad y colaboraci?n donde todas las ideas son bienvenidas, promoviendo el pensamiento divergente para encontrar soluciones novedosas."
    },
    {
        icon: DraftingCompass,
        title: "Prototipado R?pido",
        description: "Creemos en 'mostrar, no solo contar'. Construimos prototipos de baja y alta fidelidad para tangibilizar ideas y obtener feedback temprano y valioso."
    },
    {
        icon: Rocket,
        title: "Iteraci?n Constante",
        description: "Vemos el fracaso como una oportunidad de aprendizaje. Probamos, medimos, aprendemos y refinamos las soluciones de forma c?clica para asegurar su ?xito."
    }
];

const processSteps = [
    { title: "1. Empatizar", description: "Realizamos investigaciones de campo, entrevistas y observaciones para construir un mapa de empat?a profundo del usuario." },
    { title: "2. Definir", description: "Sintetizamos los hallazgos para definir claramente el problema central que debemos resolver desde la perspectiva del usuario." },
    { title: "3. Idear", description: "Conducimos talleres de brainstorming y co-creaci?n para generar una amplia gama de posibles soluciones al problema definido." },
    { title: "4. Prototipar", description: "Creamos versiones tangibles y de bajo costo de las mejores ideas, desde storyboards y maquetas hasta prototipos interactivos." },
    { title: "5. Probar", description: "Ponemos los prototipos en manos de usuarios reales para obtener feedback, validar hip?tesis y aprender qu? funciona y qu? no." }
];

const benefits = [
    "Soluciones que realmente resuelven las necesidades de los usuarios finales.",
    "Reducci?n del riesgo al validar ideas antes de grandes inversiones.",
    "Fomento de una cultura de innovaci?n y colaboraci?n en su equipo.",
    "Aceleraci?n del tiempo de lanzamiento de nuevos productos o servicios.",
    "Generaci?n de soluciones m?s creativas y disruptivas."
];

export default function DesignThinkingPage() {
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
                    <h2 className="text-3xl font-bold text-center mb-10">Los Pilares de Nuestro Enfoque</h2>
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
                    <h2 className="text-3xl font-bold text-center mb-10">Nuestro Proceso Iterativo</h2>
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
                                <Lightbulb className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">?Listo para innovar con prop?sito?</CardTitle>
                            <CardDescription>Descubra c?mo el Design Thinking puede desbloquear el potencial de su equipo y generar soluciones que enamoren a sus usuarios.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" asChild>
                                <Link href="/forms?subject=Taller%20de%20Design%20Thinking">
                                    Solicitar un Taller de Innovaci?n <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
