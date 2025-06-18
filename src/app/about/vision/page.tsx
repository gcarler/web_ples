// src/app/about/vision/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Nuestra Visión - Sobre Nosotros - PLES',
  description: 'Definiendo nuestro horizonte y anhelo por un futuro sostenible.',
};

const parentLink = "/about";
const parentName = "Sobre Nosotros";

export default function VisionPage() {
  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 mb-8">
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href={parentLink}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary-foreground" />
              Volver a {parentName}
            </Link>
          </Button>
          <span className="text-muted-foreground">|</span>
          <Button variant="outline" size="sm" asChild className="group hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href="/">
               PLES Home
            </Link>
          </Button>
        </div>
      <Card className="shadow-lg border group hover:shadow-xl hover:bg-gradient-to-b hover:from-primary hover:to-accent hover:text-primary-foreground hover:scale-105 transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary group-hover:text-primary-foreground">Nuestra Visión</CardTitle>
          <CardDescription className="group-hover:text-primary-foreground/90">Definiendo nuestro horizonte.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg group-hover:text-primary-foreground/90">
            Anhelamos inspirar un porvenir donde la sostenibilidad y la equidad sean pilares, catalizadas por la innovación en la respuesta a desafíos críticos como el cambio climático y la gestión responsable de los recursos. Nos concebimos como referentes en la creación de un impacto positivo y perdurable, transformando comunidades hacia un mundo más resiliente y justo para las generaciones venideras.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
