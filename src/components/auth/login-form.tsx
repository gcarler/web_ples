'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  ShieldCheck, AlertCircle, CheckCircle2, HelpCircle,
  KeyRound, UserX, PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [showUnregisteredModal, setShowUnregisteredModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    title: 'Usuario no registrado o pendiente de activación',
    description: 'No se encontró una cuenta activa asociada a estas credenciales en la consola corporativa PLES. Por favor revise su usuario y contraseña o solicite su alta al administrador del sistema.',
    account: '',
  });

  const [errorMessage, setErrorMessage] = useState(
    urlError === 'OAuthSignin' || urlError === 'OAuthCallback'
      ? 'No se pudo completar el inicio de sesión con Google. Intente nuevamente o use credenciales corporativas.'
      : ''
  );

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage('');

      // Check if Google Client ID is configured in production
      const res = await signIn('google', { callbackUrl, redirect: false });
      if (res?.error) {
        setModalDetails({
          title: 'Cuenta Google pendiente de federación',
          description: 'El dominio de Google Workspace ingresado aún no cuenta con permisos de acceso autorizados en el directorio central PLES. Por favor comuníquese con el área de TI.',
          account: 'Google Workspace',
        });
        setShowUnregisteredModal(true);
      }
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setModalDetails({
        title: 'Servicio de Autenticación Google',
        description: 'La federación con Google Workspace se encuentra en proceso de enlace corporativo. Mientras finaliza la configuración, por favor ingrese con sus credenciales institucionales o contacte a soporte.',
        account: 'Google Workspace',
      });
      setShowUnregisteredModal(true);
    } finally {
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
        setModalDetails({
          title: 'Usuario no registrado o revise su contraseña',
          description: `No hemos podido validar el acceso para "${email}". Por favor revise que la contraseña sea correcta o verifique si su usuario cuenta con los permisos activos para la consola corporativa.`,
          account: email,
        });
        setShowUnregisteredModal(true);
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
      setModalDetails({
        title: 'Validación de credenciales',
        description: 'No se pudo verificar el usuario en este momento. Por favor revise su contraseña o intente más tarde.',
        account: email,
      });
      setShowUnregisteredModal(true);
      setIsCredsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setModalDetails({
      title: 'Restablecimiento de Credenciales',
      description: 'Por estrictas políticas de gobernanza territorial y ciberseguridad PLES (ISO 27001 / TLS 1.3), las contraseñas institucionales son administradas directamente por el oficial de seguridad TI.',
      account: email || 'soporte@ples.com.co',
    });
    setShowUnregisteredModal(true);
  };

  return (
    <div className="space-y-6 w-full font-sans">
      {/* Error alert banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-400" />
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
          className="w-full h-12 rounded-xl text-sm font-semibold border-white/20 bg-white/10 hover:bg-white/15 text-white transition-all duration-300 shadow-md backdrop-blur-md flex items-center justify-center gap-3 relative group"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#00D2FF]" />
              <span>Verificando cuenta Google...</span>
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
              <span className="text-white group-hover:text-[#00D2FF] transition-colors">
                Continuar con Google Workspace
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Modern Separator */}
      <div className="relative flex items-center justify-center my-6">
        <div className="w-full border-t border-white/15" />
        <span className="absolute bg-[#06101E]/80 backdrop-blur-md px-3.5 py-0.5 rounded-full border border-white/15 text-[11px] uppercase tracking-wider text-slate-300 font-medium">
          o con correo corporativo
        </span>
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label 
            htmlFor="login-email" 
            className="text-xs font-semibold text-slate-200 block tracking-wide"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-300">
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
              className="pl-10 h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <label 
            htmlFor="login-password" 
            className="text-xs font-semibold text-slate-200 block tracking-wide"
          >
            Contraseña de Seguridad
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-300">
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
              className="pl-10 pr-10 h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm transition-all backdrop-blur-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-300 hover:text-white transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember-device"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
              disabled={isCredsLoading || isGoogleLoading}
              className="rounded border-white/30 data-[state=checked]:bg-[#009FE3] data-[state=checked]:border-[#009FE3]"
            />
            <label
              htmlFor="remember-device"
              className="text-slate-300 hover:text-white cursor-pointer select-none"
            >
              Recordar este equipo
            </label>
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[#00D2FF] hover:text-white font-medium transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isCredsLoading || isGoogleLoading}
          className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-[#009FE3] to-[#0077b6] hover:from-[#00A8F3] hover:to-[#0088cc] text-white shadow-lg shadow-[#009FE3]/25 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
        >
          {isCredsLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
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
      <div className="pt-4 border-t border-white/15 flex items-center justify-center gap-2 text-[11px] text-slate-300/80 text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Conexión cifrada TLS 1.3 / AES-256 • PLES S.A.S.</span>
      </div>

      {/* Enterprise Feedback Modal for Unregistered / Pending Users */}
      <Dialog open={showUnregisteredModal} onOpenChange={setShowUnregisteredModal}>
        <DialogContent className="max-w-md bg-[#0A192F]/95 backdrop-blur-2xl border border-white/20 text-white shadow-2xl rounded-2xl p-6">
          <DialogHeader className="text-left space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#009FE3]/20 border border-[#009FE3]/40 flex items-center justify-center text-[#00D2FF]">
              <KeyRound className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-white tracking-tight">
              {modalDetails.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-200 leading-relaxed">
              {modalDetails.description}
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Estado de plataforma:</span>
              <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Despliegue y Activación
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Mesa de ayuda TI:</span>
              <span className="text-white font-medium">contacto@ples.com.co</span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUnregisteredModal(false)}
              className="border-white/20 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs"
            >
              Revisar datos
            </Button>
            <Button
              type="button"
              asChild
              className="bg-gradient-to-r from-[#009FE3] to-[#0077b6] hover:from-[#00A8F3] hover:to-[#0088cc] text-white rounded-xl text-xs gap-2 font-medium"
            >
              <a href="mailto:contacto@ples.com.co?subject=Solicitud%20de%20Acceso%20o%20Revisi%C3%B3n%20de%20Cuenta%20-%20PLES">
                <Mail className="w-3.5 h-3.5" />
                <span>Contactar Soporte TI</span>
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
