// src/app/not-found.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Compass } from 'lucide-react';
import Link from 'next/link';

const FloatingShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div
        className={`absolute bg-primary/5 rounded-full animate-move-and-scale ${className}`}
        style={style}
    />
);

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] bg-background px-4 py-12 overflow-hidden">
        {/* Background elements */}
        <FloatingShape className="w-24 h-24" style={{ top: '10%', left: '5%', animationDuration: '20s' }} />
        <FloatingShape className="w-16 h-16" style={{ top: '20%', right: '10%', animationDuration: '25s', animationDelay: '-5s' }} />
        <FloatingShape className="w-12 h-12" style={{ bottom: '15%', left: '20%', animationDuration: '18s', animationDelay: '-10s' }} />
        <FloatingShape className="w-20 h-20" style={{ bottom: '5%', right: '15%', animationDuration: '22s', animationDelay: '-2s' }} />
        <FloatingShape className="w-8 h-8" style={{ top: '50%', left: '40%', animationDuration: '30s' }} />

        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-[20rem] md:text-[30rem] font-black text-muted/30 select-none pointer-events-none">
                404
            </h1>
        </div>

      <Card className="w-full max-w-lg text-center shadow-2xl border bg-card/80 backdrop-blur-sm relative z-10 animate-fade-in-up">
        <CardHeader>
          <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
            <Compass className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
            P?gina No Encontrada
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            ?Ups! Parece que te has perdido en el ciberespacio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            No te preocupes, estas cosas pasan. El contenido que buscas no est? aqu?, pero podemos ayudarte a encontrar el camino de vuelta.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
