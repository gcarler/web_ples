// src/app/about/mision/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Nuestra Misión - Sobre Nosotros - PLES',
  description: 'Guiando nuestras acciones y consolidando lazos estratégicos.',
};

export default function MisionPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <span className="flex items-center">
             <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
           </span>
         </Link>
       </Button>
      <Card className="shadow-lg border group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary group-hover:text-primary-foreground">Nuestra Misión</CardTitle>
          <CardDescription className="group-hover:text-primary-foreground/90">Guiando nuestras acciones.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg group-hover:text-primary-foreground/90">
            Consolidar lazos estratégicos entre sectores y comunidades, aplicando nuestra experiencia con discernimiento para afrontar los retos globales de manera sostenible y con visión de futuro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
