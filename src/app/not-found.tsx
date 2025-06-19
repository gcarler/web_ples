// src/app/not-found.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] bg-background px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg border rounded-lg">
        <CardHeader>
          <div className="mx-auto p-3 bg-destructive/10 rounded-full w-fit mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold text-destructive">404 - Página No Encontrada</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            ¡Ups! Parece que la página que estás buscando se ha perdido en el ciberespacio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            No te preocupes, estas cosas pasan. Puedes volver al inicio o verificar si la URL es correcta.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver a la Página Principal
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
