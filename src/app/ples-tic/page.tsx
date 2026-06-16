// src/app/ples-tic/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, Rocket
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InteractiveSoftwareSuites } from '@/components/ples-tic/interactive-software-suites';
import { CodeTypingIllustration } from '@/components/illustrations/CodeTypingIllustration';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PlesTicPage() {
  const { t } = useLanguage();
  const content = t.PlesTic;

  return (
    <div className="space-y-0">
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 min-h-[calc(70vh)] lg:min-h-0 py-16 sm:py-20 md:py-24 lg:py-32 flex items-center">
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-8">
            <div className="w-full lg:w-5/12 flex justify-center items-center relative order-1 lg:order-none">
                <CodeTypingIllustration />
            </div>

            <div className="w-full lg:w-7/12 text-center lg:text-left relative z-20 order-2 lg:order-none">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                {content.title}
              </h1>
              <p className="text-lg sm:text-xl text-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <strong className="text-primary">{content.subtitle}</strong>. {content.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
                {content.badges.map(badge => (
                    <Badge key={badge} variant="default" className="text-md px-4 py-2 shadow-md">{badge}</Badge>
                ))}
              </div>
              <Button size="lg" variant="accent" className="text-lg px-8 py-3" asChild>
                <Link href={`/forms?service=ples-tic&subject=Consulta%20Soluciones%20PLES%20TIC`}>
                  <span className="flex items-center">
                    {content.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.whyChooseTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                {content.whyChooseDesc}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.propositions.map(({icon: Icon, title, description}: any) => (
                <Card key={title} className="text-center group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col hover:animate-gradient hover:bg-[length:200%_200%]">
                <CardHeader className="items-center">
                    <Icon className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
                    <CardTitle className="mt-2 text-xl group-hover:text-primary-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground group-hover:text-primary-foreground/90">{description}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.servicesTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
            {content.services.map(({icon: Icon, title, description, details, cta}: any) => (
              <Link key={title} href={'/forms'} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                        <div>
                        <CardTitle className="text-xl group-hover:text-primary-foreground">{title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                        {details.map((detail: string) => (
                            <li key={detail} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-300 mr-2 shrink-0" />
                            {detail}
                            </li>
                        ))}
                        </ul>
                        {cta && (
                          <div className="mt-4 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                              {cta} <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
            </div>
        </div>
      </section>

      <InteractiveSoftwareSuites />

      <section>
        <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.approachTitle}</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                {content.approachDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {content.approachSteps.map(({icon: Icon, title, description}: any) => (
                <Card key={title} className="text-center p-6 group hover:shadow-xl hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out flex flex-col items-center bg-card hover:animate-gradient hover:bg-[length:200%_200%]">
                <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground mb-2" />
                <CardTitle className="text-lg mt-2 mb-1 group-hover:text-primary-foreground">{title}</CardTitle>
                <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/90 flex-grow">{description}</p>
                </Card>
            ))}
            </div>
        </div>
      </section>

      <section className="py-12 bg-card shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">{content.techTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            {content.techDesc}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {['JavaScript (React, Next.js, Node.js)', 'Python (Django, Flask, FastAPI)', 'Java, C#/.NET', 'Bases de Datos (PostgreSQL, MySQL, MongoDB, Redis)', 'Docker, Kubernetes, Terraform', 'AWS, Azure, Google Cloud Platform', 'Inteligencia Artificial (Machine Learning, NLP, Computer Vision)', 'Git, Jenkins, GitLab CI', 'Marcos de Ciberseguridad (NIST, ISO 27001)', 'Herramientas BI (Tableau, Power BI)'].map((tech) => (
              <Badge key={tech} variant="outline" className="text-md md:text-base px-4 py-2 border-primary text-primary shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-transparent hover:scale-105">{tech}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <Rocket className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.ctaSectionTitle}</h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
             {content.ctaSectionDesc}
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href={`/forms?service=ples-tic&subject=Solicitud%20Asesoria%20Tecnologica`}>
                <span className="flex items-center">
                    {content.ctaSectionBtn} <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
