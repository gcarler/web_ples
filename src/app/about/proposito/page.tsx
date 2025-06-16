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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <span className="flex items-center">
             <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
           </span>
         </Link>
       </Button>
      <Card className="shadow-lg border group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary group-hover:text-primary-foreground">Nuestro Propósito</CardTitle>
          <CardDescription className="group-hover:text-primary-foreground/90">Explorando nuestro motor.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg group-hover:text-primary-foreground/90">
            Impulsados por la convicción en el poder transformador de la experiencia inteligente, forjamos puentes sólidos entre los ámbitos público y privado, así como con las comunidades que servimos. Aprovechamos la sabiduría colectiva para abordar los desafíos globales con una estrategia refinada y una visión de sostenibilidad a largo plazo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
