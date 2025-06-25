
// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import { app } from '@/lib/firebase/firebase-config'; // Import Firebase app instance
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, User, Lock } from 'lucide-react'; // Import icons, removed Briefcase
import Link from 'next/link'; // Import Link
import { PlesGroupLogo } from '@/components/logo';

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Use email for username field
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app); // Initialize Firebase Auth

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Inicio de Sesión Exitoso', // Changed to Spanish
        description: '¡Bienvenido de nuevo!', // Changed to Spanish
      });
      // Store token in cookie (client-side) after successful login
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        // Set cookie - adjust path, domain, maxAge/expires as needed
        document.cookie = `firebaseIdToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // Example: 7 days
      }
      router.push('/admin/dashboard'); // Redirect to dashboard after successful login
    } catch (err: any) {
      console.error('Login Error:', err);
      let errorMessage = 'Fallo al iniciar sesión. Por favor revise sus credenciales.'; // Changed to Spanish
      // Provide more specific Firebase error messages if needed
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Email o contraseña inválidos.'; // Changed to Spanish
      } else if (err.code === 'auth/invalid-email') {
          errorMessage = 'Por favor ingrese una dirección de email válida.'; // Changed to Spanish
      } else if (err.code === 'auth/api-key-not-valid' || err.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
          errorMessage = 'La clave API de Firebase es inválida. Por favor revise sus variables de entorno.'; // Changed to Spanish
           console.error("Firebase Config Error: API Key is not valid. Ensure NEXT_PUBLIC_FIREBASE_API_KEY is set correctly in your .env.local file and the server was restarted.");
           toast({ title: "Error de Configuración de Firebase", description: "La clave API de Firebase es inválida. Por favor contacte al administrador.", variant: "destructive"}) // Changed to Spanish
      }
      setError(errorMessage);
      // Don't show generic toast if it's the API key error, already shown above.
      if (err.code !== 'auth/api-key-not-valid' && err.code !== 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
        toast({
          title: 'Inicio de Sesión Fallido', // Changed to Spanish
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Two-column layout for the login page
    <div className="flex min-h-screen bg-background">
      {/* Left Column: Depth Illusion Container */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-0">
        <div className="relative w-full h-full flex flex-col items-center justify-center
                      bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)),_hsl(var(--primary)),_hsl(var(--ring)))]
                      bg-[length:300%_300%] animate-gradient text-primary-foreground text-center shadow-2xl">
          <PlesGroupLogo className="text-[18rem] mb-12" />
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Bienvenidos
          </h1>
          <p className="text-lg max-w-md opacity-90 leading-relaxed text-left px-4">
            <span className="text-3xl font-bold text-accent">Accede</span>
            <span className="text-xl"> a un mundo de </span>
            <span className="text-4xl font-extrabold text-primary-foreground">soluciones</span>
            <span className="text-3xl font-bold text-accent"> innovadoras</span>
            <span className="text-xl"> y </span>
            <span className="text-4xl font-extrabold text-primary-foreground">gestión</span>
            <span className="text-3xl font-bold text-accent"> inteligente.</span>
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Entrar</h1>
            <p className="text-muted-foreground mt-2">Por favor complete su información a continuación</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
             {/* Username (Email) Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Nombre de Usuario" // Using Email for username
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 py-2 h-12 rounded-lg bg-muted/50 border-none focus:ring-primary focus:ring-2" // Updated styling
              />
            </div>

            {/* Password Input */}
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
                className="pl-10 py-2 h-12 rounded-lg bg-muted/50 border-none focus:ring-primary focus:ring-2" // Updated styling
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

             {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-base" // Updated styling, using theme primary color
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Iniciar Sección'}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>

           {/* Forgot Password Link */}
          <div className="text-center">
            <Button variant="link" asChild className="text-primary text-sm hover:underline px-0">
              <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </Button>
          </div>

           {/* Register Link */}
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
