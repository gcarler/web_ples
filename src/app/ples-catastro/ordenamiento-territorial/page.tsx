// src/app/ples-catastro/ordenamiento-territorial/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Home } from 'lucide-react';

export const metadata = {
  title: 'Planes de Ordenamiento Territorial (POT) - PLES Catastro',
  description: 'Desarrollamos e implementamos planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad.',
};

const serviceDetails = {
  icon: <Home className="h-12 w-12 text-primary mb-4" />,
  title: 'Planes de Ordenamiento Territorial (POT)',
  description: 'Desarrollamos e implementamos planes estratégicos que guían el crecimiento sostenible y la ocupación eficiente del territorio, promoviendo la equidad.',
  points: [
    'Diagnóstico Territorial Integral',
    'Participación Ciudadana Activa',
    'Zonificación y Usos del Suelo',
    'Instrumentos de Gestión',
  ],
  formSubject: 'Consulta%20Planes%20Ordenamiento%20Territorial'
};

export default function OrdenamientoTerritorialPage() {
  return (
    <div className="py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
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
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Elementos Clave:</h3>
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
                    Información sobre {serviceDetails.title} <ArrowRight className="ml-2 h-5 w-5" />
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
