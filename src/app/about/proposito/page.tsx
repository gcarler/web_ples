// src/app/about/proposito/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Nuestro Propósito - Sobre Nosotros - PLES',
  description: 'Explorando nuestro motor y convicción en la experiencia inteligente.',
};

export default function PropositoPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
         </Link>
       </Button>
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Nuestro Propósito</CardTitle>
          <CardDescription>Explorando nuestro motor.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Impulsados por la convicción en el poder transformador de la experiencia inteligente, forjamos puentes sólidos entre los ámbitos público y privado, así como con las comunidades que servimos. Aprovechamos la sabiduría colectiva para abordar los desafíos globales con una estrategia refinada y una visión de sostenibilidad a largo plazo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
