// src/app/ples-crea/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'PLES CREA - Cartografía para la Resiliencia y Equidad Ambiental',
  description: 'Soluciones cartográficas innovadoras para promover la resiliencia ambiental y la equidad en el territorio.',
};

export default function PlesCreaPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">PLES CREA</CardTitle>
          <CardDescription>
            Cartografía para la Resiliencia y Equidad Ambiental
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                En PLES CREA, transformamos datos geoespaciales en herramientas visuales poderosas que impulsan la toma de decisiones informadas para un futuro sostenible. Nos especializamos en la creación de cartografía temática y analítica enfocada en la resiliencia ambiental y la equidad territorial.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Análisis de vulnerabilidad y riesgo climático.</li>
                <li>Mapeo de ecosistemas y servicios ambientales.</li>
                <li>Identificación de zonas prioritarias para la conservación.</li>
                <li>Visualización de indicadores de equidad socioambiental.</li>
                <li>Desarrollo de plataformas cartográficas interactivas.</li>
              </ul>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Cartografía Ambiental"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="environmental mapping resilience"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
