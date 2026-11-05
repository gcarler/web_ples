// This file is no longer used for navigation and can be repurposed or removed later.
// The content is now handled within the master-detail view on the /ples-catastro page.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DeprecatedOrdenamientoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] bg-background px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg border rounded-lg">
        <CardHeader>
          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
            <Info className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Página Reubicada</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            El contenido de esta página ahora se muestra de forma interactiva.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Para una mejor experiencia, por favor explora nuestros servicios directamente en la página principal de PLES Catastro.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link href="/ples-catastro">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver a PLES Catastro
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
