// src/app/about/colaboracion/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Colaboración Global - Sobre Nosotros - PLES',
  description: 'Conoce cómo nuestra dinámica de colaboración trasciende fronteras.',
};

export default function ColaboracionPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <span className="flex items-center">
             <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
           </span>
         </Link>
       </Button>
      <Card className="shadow-lg border group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary group-hover:text-primary-foreground">Colaboración Global</CardTitle>
          <CardDescription className="group-hover:text-primary-foreground/90">Conoce cómo trabajamos.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg group-hover:text-primary-foreground/90">
            Nuestra dinámica de colaboración trasciende fronteras y culturas, enriqueciendo cada plan, política, estrategia y proyecto con una paleta de visiones, disciplinas y enfoques que amplían los horizontes de la solución.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
