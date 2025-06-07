// src/app/ples-consulting/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'PLES Consulting - Estrategia e Innovación para el Desarrollo Sostenible',
  description: 'Consultoría especializada para impulsar la estrategia, la innovación y la sostenibilidad en organizaciones públicas y privadas.',
};

export default function PlesConsultingPage() {
  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">PLES Consulting</CardTitle>
          <CardDescription>
            Estrategia e Innovación para el Desarrollo Sostenible
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                En PLES Consulting, colaboramos con organizaciones para diseñar e implementar estrategias que generan impacto positivo y duradero. Nuestro enfoque combina análisis riguroso, pensamiento innovador y un profundo entendimiento de los desafíos del desarrollo sostenible.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Planificación estratégica y desarrollo organizacional.</li>
                <li>Diseño y evaluación de políticas públicas.</li>
                <li>Gestión de proyectos de desarrollo sostenible.</li>
                <li>Innovación social y transformación digital.</li>
                <li>Fortalecimiento de capacidades y asistencia técnica.</li>
              </ul>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-inner">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Consultoría Estratégica"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="sustainable development strategy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
