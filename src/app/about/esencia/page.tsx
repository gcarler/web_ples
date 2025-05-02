// src/app/about/esencia/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Nuestra Esencia - Sobre Nosotros - PLES',
  description: 'Comprendiendo quienes somos y nuestro enfoque multidisciplinario.',
};

export default function EsenciaPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
         </Link>
       </Button>
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Nuestra Esencia</CardTitle>
          <CardDescription>Comprendiendo quienes somos.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Con una visión global y un enfoque multidisciplinario, nuestro equipo converge talentos y conocimientos diversos para la consecución de objetivos trascendentes. En PLES, valoramos la riqueza de cada perspectiva, cultivando un espacio donde las ideas disruptivas e innovadoras florecen, permitiendo intervenciones estratégicas y perspicaces en cualquier escenario.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
