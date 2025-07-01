// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, Lock } from 'lucide-react';
import Link from 'next/link';
import { PlesGroupLogo } from '@/components/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const auth = app ? getAuth(app) : null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!auth) {
      const configError = "Firebase no está configurado. Por favor, revise las credenciales en su archivo .env.local y reinicie el servidor.";
      setError(configError);
      toast({
        title: "Error de Configuración",
        description: configError,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Inicio de Sesión Exitoso',
        description: '¡Bienvenido de nuevo!',
      });
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `firebaseIdToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      }
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Login Error:', err);
      let errorMessage = 'Fallo al iniciar sesión. Por favor revise sus credenciales.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Email o contraseña inválidos.';
      } else if (err.code === 'auth/invalid-email') {
          errorMessage = 'Por favor ingrese una dirección de email válida.';
      } else if (err.code === 'auth/api-key-not-valid' || err.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
          errorMessage = 'La clave API de Firebase es inválida. Por favor revise sus variables de entorno.';
           console.error("Firebase Config Error: API Key is not valid. Ensure NEXT_PUBLIC_FIREBASE_API_KEY is set correctly in your .env.local file and the server was restarted.");
           toast({ title: "Error de Configuración de Firebase", description: "La clave API de Firebase es inválida. Por favor contacte al administrador.", variant: "destructive"})
      }
      setError(errorMessage);
      if (err.code !== 'auth/api-key-not-valid' && err.code !== 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
        toast({
          title: 'Inicio de Sesión Fallido',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center
                      bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)),_hsl(var(--primary)),_hsl(var(--ring)))]
                      bg-[length:300%_300%] animate-gradient text-primary-foreground text-center shadow-2xl">
          <Link href="/">
            <PlesGroupLogo className="text-9xl mb-12" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Bienvenidos
            </h1>
            <p className="text-lg max-w-md opacity-90 leading-relaxed">
              Accede a un mundo de soluciones innovadoras y gestión inteligente.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-muted-foreground mt-2">Por favor complete su información a continuación</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Nombre de Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 py-2 h-12 rounded-lg bg-muted/50 border-none focus:ring-primary focus:ring-2"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 py-2 h-12 rounded-lg bg-muted/50 border-none focus:ring-primary focus:ring-2"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="text-center">
            <Button variant="link" asChild className="text-primary text-sm hover:underline px-0">
              <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </Button>
          </div>

           <div className="text-center text-sm text-muted-foreground">
             ¿No tienes cuenta?{' '}
             <Button variant="link" asChild className="text-primary hover:underline px-0">
               <Link href="/register">Regístrate aquí</Link>
             </Button>
           </div>
        </div>
       </div>
    </div>
  );
}
