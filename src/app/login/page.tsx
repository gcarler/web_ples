import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlesGroupLogo } from '@/components/logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <Link href="/">
            <PlesGroupLogo className="text-6xl mb-4" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus credenciales para acceder al panel
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Solo para personal autorizado de PLES
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
