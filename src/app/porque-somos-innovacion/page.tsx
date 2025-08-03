// src/app/porque-somos-innovacion/page.tsx
'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lightbulb, Sparkles, Wand2, FlaskConical, Bot, User, Loader, CornerDownLeft, Terminal, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getComponentSuggestion, type ComponentSuggestionOutput } from '@/ai/flows/innovation-lab-flow';

const pageDetails = {
    parentLink: "/about",
    parentName: "Sobre Nosotros",
    title: "Laboratorio de Innovación",
    subtitle: "Donde las ideas audaces se convierten en soluciones prácticas y de valor.",
};

const principles = [
    { title: "Inteligencia Artificial", description: "Asistentes que entienden y actúan." },
    { title: "Experiencias Inmersivas", description: "Interfaces que cautivan y responden." },
    { title: "Rendimiento Radical", description: "Velocidad que se siente instantánea." },
    { title: "Conectividad Total", description: "Integración fluida con tu ecosistema." },
];

interface Message {
    role: 'user' | 'assistant' | 'error';
    content: string;
    suggestion?: ComponentSuggestionOutput;
}

export default function InnovacionPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                content: "Soy tu asistente de diseño de UI. Descríbeme un componente que necesites, como 'un formulario de inicio de sesión con temática futurista' o 'una tarjeta de perfil de usuario para una red social', y generaré una sugerencia para ti.",
            }
        ]);
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isPending) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');

        startTransition(async () => {
            const result = await getComponentSuggestion({ prompt: currentInput });
            if (result.error) {
                setMessages(prev => [...prev, { role: 'error', content: result.error! }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: result.suggestion!.explanation, suggestion: result.suggestion! }]);
            }
        });
    };

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
            </div>

            <section className="text-center mb-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-4">
                    {pageDetails.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {pageDetails.subtitle}
                </p>
                 <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {principles.map(p => (
                         <Badge key={p.title} variant="secondary" className="text-md px-4 py-2 shadow-sm">{p.title}: <span className="text-muted-foreground ml-2">{p.description}</span></Badge>
                    ))}
                </div>
            </section>

            <section className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
                 <Card className="shadow-2xl border-2 border-primary/20 backdrop-blur-sm bg-background/50 overflow-hidden">
                    <CardHeader className="border-b-2 border-primary/20 p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Wand2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Asistente de Diseño de Componentes</CardTitle>
                                <CardDescription>Usa IA para generar ideas y código para componentes de UI.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                         <div className="h-[50vh] overflow-y-auto p-4 space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-4 animate-fade-in-up", message.role === 'user' ? 'justify-end' : '')}>
                                    {message.role === 'assistant' && <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />}
                                    {message.role === 'error' && <AlertCircle className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />}
                                     {message.role === 'user' && <User className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" />}

                                    <div className={cn("max-w-lg rounded-lg px-4 py-3 text-sm", 
                                        message.role === 'user' && 'bg-primary text-primary-foreground',
                                        message.role === 'assistant' && 'bg-card border',
                                        message.role === 'error' && 'bg-destructive/10 text-destructive-foreground border border-destructive/50'
                                    )}>
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                        {message.suggestion && (
                                            <div className="mt-4">
                                                 <h3 className="font-semibold mb-2 text-foreground">Sugerencia de Componente:</h3>
                                                 <p className="text-sm text-muted-foreground mb-4">{message.suggestion.explanation}</p>
                                                 <pre className="bg-background/50 text-xs text-foreground p-3 rounded-md overflow-x-auto">
                                                    <code>{message.suggestion.code}</code>
                                                 </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isPending && (
                                <div className="flex items-start gap-4 animate-fade-in-up">
                                    <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                    <div className="flex items-center space-x-2 bg-card border rounded-lg px-4 py-3">
                                        <Loader className="h-4 w-4 animate-spin text-primary" />
                                        <span className="text-sm text-muted-foreground">Generando sugerencia...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t-2 border-primary/20 bg-background/20">
                            <form onSubmit={handleSendMessage} className="relative">
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ej: 'una tarjeta de métricas para un dashboard con un ícono y un título...'"
                                    className="pr-16 resize-none"
                                    disabled={isPending}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                />
                                <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2" disabled={isPending || !input.trim()}>
                                    <CornerDownLeft className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                 </Card>
            </section>
        </div>
    );
}