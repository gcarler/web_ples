// src/app/ples-catastro/avaluos/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Scale } from 'lucide-react';

export const metadata = {
  title: 'Avalúos Masivos y Puntuales - PLES Catastro',
  description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes para una base imponible justa y una gestión eficiente de activos.',
};

const serviceDetails = {
  icon: <Scale className="h-12 w-12 text-primary mb-4" />,
  title: 'Avalúos Masivos y Puntuales',
  description: 'Realizamos valoraciones de propiedades con metodologías robustas y transparentes para una base imponible justa y una gestión eficiente de activos.',
  points: [
    'Modelos de Valoración Automatizada (AVM)',
    'Análisis de Mercado Inmobiliario',
    'Cumplimiento Normativo',
    'Informes Detallados',
  ],
  formSubject: 'Consulta%20Avaluos'
};

export default function AvaluosPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-8">
          <Link href="/ples-catastro">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a PLES Catastro
          </Link>
        </Button>

        <Card className="shadow-xl group hover:shadow-2xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 ease-in-out border-primary/30">
          <CardHeader className="items-center text-center">
            {serviceDetails.icon}
            <CardTitle className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2">
              {serviceDetails.title}
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {serviceDetails.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Aspectos Destacados:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
              {serviceDetails.points.map((point) => (
                <li key={point} className="flex items-start text-foreground group-hover:text-inherit">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0 group-hover:text-green-400" />
                  <span className="text-md">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <Button size="lg" asChild className="text-lg px-8 py-3 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary">
                <Link href={`/forms?service=ples-catastro&subject=${serviceDetails.formSubject}`}>
                  <span className="flex items-center">
                    Más Información sobre {serviceDetails.title} <ArrowRight className="ml-2 h-5 w-5" />
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
