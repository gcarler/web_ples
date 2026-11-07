'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  ShieldCheck, AlertCircle, CheckCircle2, HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  const urlError = searchParams.get('error');

  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isCredsLoading, setIsCredsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    urlError === 'OAuthSignin' || urlError === 'OAuthCallback'
      ? 'No se pudo completar el inicio de sesión con Google. Intente nuevamente o use credenciales corporativas.'
      : ''
  );

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage('');
      await signIn('google', { callbackUrl });
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setErrorMessage('Ocurrió un error al contactar el servicio de autenticación de Google.');
      setIsGoogleLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Por favor ingrese su correo corporativo y contraseña.');
      return;
    }

    try {
      setIsCredsLoading(true);
      setErrorMessage('');

      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage('Credenciales no autorizadas. Verifique su usuario o comuníquese con la administración.');
        setIsCredsLoading(false);
      } else if (res?.ok) {
        toast({
          title: 'Acceso Autorizado',
          description: 'Iniciando sesión segura en la consola PLES...',
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error('Credentials Sign In Error:', err);
      setErrorMessage('Error de red al procesar la autenticación. Intente más tarde.');
      setIsCredsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: 'Recuperación Institucional',
      description: 'Por políticas de ciberseguridad PLES, comuníquese con mesa de ayuda a contacto@ples.com.co o al PBX (+57) 322 513 7924.',
      duration: 6000,
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Error alert banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Primary Action: Google OAuth Button */}
      <div>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isCredsLoading}
          variant="outline"
          className="w-full h-12 rounded-xl text-sm font-semibold border-border/80 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 shadow-sm flex items-center justify-center gap-3 relative group"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Conectando con Google...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-foreground group-hover:text-primary transition-colors">
                Continuar con Google Workspace
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Modern Separator */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/60" />
        <span className="absolute bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          o con correo corporativo
        </span>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label 
            htmlFor="login-email" 
            className="text-xs font-semibold text-foreground/90 block tracking-wide"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              placeholder="usuario@ples.com.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isCredsLoading || isGoogleLoading}
              className="pl-10 h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <label 
            htmlFor="login-password" 
            className="text-xs font-semibold text-foreground/90 block tracking-wide"
          >
            Contraseña de Seguridad
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isCredsLoading || isGoogleLoading}
              className="pl-10 pr-10 h-11 rounded-xl bg-background/50 border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-device"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
              disabled={isCredsLoading || isGoogleLoading}
              className="rounded"
            />
            <label
              htmlFor="remember-device"
              className="text-muted-foreground hover:text-foreground cursor-pointer select-none"
            >
              Recordar este equipo
            </label>
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isCredsLoading || isGoogleLoading}
          className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-95 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
        >
          {isCredsLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verificando credenciales...</span>
            </>
          ) : (
            <>
              <span>Ingresar a la Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Enterprise Security Footnote */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-center gap-2 text-[11px] text-muted-foreground text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>Conexión cifrada TLS 1.3 / AES-256 • PLES S.A.S.</span>
      </div>
    </div>
  );
}
