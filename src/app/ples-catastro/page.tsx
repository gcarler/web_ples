// src/app/ples-catastro/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'PLES Catastro - Gestión Territorial y Soluciones Catastrales Integrales',
  description: 'Servicios expertos en catastro, ordenamiento territorial y administración de tierras para un desarrollo eficiente y equitativo.',
};

export default function PlesCatastroPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">PLES Catastro</CardTitle>
          <CardDescription>
            Gestión Territorial y Soluciones Catastrales Integrales
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                PLES Catastro ofrece soluciones avanzadas para la modernización de la gestión catastral y el ordenamiento territorial. Nuestra experiencia abarca desde el levantamiento predial multifinalitario hasta la implementación de sistemas de información geográfica (SIG) para la administración de tierras.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Levantamientos catastrales urbanos y rurales.</li>
                <li>Actualización y mantenimiento de bases de datos catastrales.</li>
                <li>Avalúos masivos y puntuales de propiedades.</li>
                <li>Desarrollo de planes de ordenamiento territorial.</li>
                <li>Implementación de SIG para la gestión territorial.</li>
              </ul>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Servicios Catastrales"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="land surveying map"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
