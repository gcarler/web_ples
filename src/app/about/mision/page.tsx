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
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <Button variant="outline" size="sm" asChild className="mb-4">
         <Link href="/about">
           <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Sobre Nosotros
         </Link>
       </Button>
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Nuestra Misión</CardTitle>
          <CardDescription>Guiando nuestras acciones.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Consolidar lazos estratégicos entre sectores y comunidades, aplicando nuestra experiencia con discernimiento para afrontar los retos globales de manera sostenible y con visión de futuro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
