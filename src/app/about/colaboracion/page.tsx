// src/app/about/colaboracion/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Colaboración Global - Sobre Nosotros - PLES',
  description: 'Conoce cómo nuestra dinámica de colaboración trasciende fronteras.',
};

const parentLink = "/about";
const parentName = "Sobre Nosotros";

export default function ColaboracionPage() {
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
