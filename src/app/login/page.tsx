import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Shield, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/login-form';
import { PlesGroupLogo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Acceso Corporativo | PLES',
  description: 'Consola segura de gestión para proyectos territoriales, catastro multipropósito e infraestructura TI.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden font-sans">
      {/* ======================================================== */}
      {/* LEFT VISUAL COLUMN: Artwork & Corporate Vision           */}
      {/* ======================================================== */}
      <section 
        className="relative lg:w-7/12 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 text-white overflow-hidden"
        aria-label="PLES, Ciencia y Tecnología Territorial"
      >
        {/* Background Artwork: Niño volando cometa hacia el cielo azul */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/auth/kite-boy-ples.webp"
            alt="Visión PLES - Elevando el potencial territorial"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Deep Navy/Obsidian Veil Gradient (STRICT: NO PURPLE) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-[#0B192C]/80 to-[#0A192F]/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D17]/90 via-[#0B192C]/60 to-transparent" />
          {/* Subtle cyber/GIS coordinate grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#009fe310_1px,transparent_1px),linear-gradient(to_bottom,#009fe310_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-30 pointer-events-none" />
        </div>

        {/* Top Header in Visual Area */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-block group" aria-label="PLES, volver al inicio">
            <PlesGroupLogo className="text-4xl sm:text-5xl drop-shadow-md" hoverVariant="white-glow" />
          </Link>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Consola v2.6 • SLA 99.98%
          </span>
        </div>

        {/* Central Editorial Copy */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#009FE3]/20 border border-[#009FE3]/30 text-xs font-semibold text-[#00D2FF] mb-6 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>EL USO INTELIGENTE DE LA EXPERIENCIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Elevamos el potencial de cada{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#009FE3] to-[#48CAE4]">
              territorio.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-200/90 leading-relaxed font-light">
            Infraestructura tecnológica crítica, catastro multipropósito de precisión y consultoría estratégica de alto rendimiento.
          </p>

          {/* Technical Value Badges */}
          <div className="mt-8 space-y-2.5 pt-4 border-t border-white/15">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Alta disponibilidad de enlaces y centros de cómputo (Tier II & III)</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Gobernanza geoespacial y radicado seguro con cifrado TLS 1.3</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Autenticación federada corporativa con Google Workspace</span>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Info in Visual Area */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-white/10 text-xs text-slate-300/80">
          <span>PLES S.A.S. • NIT 901.156.404-0</span>
          <span>Cartagena de Indias, Colombia</span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* RIGHT ACCESS COLUMN: Interactive Login Form             */}
      {/* ======================================================== */}
      <section 
        className="relative lg:w-5/12 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-card/60 backdrop-blur-xl border-l border-border/50 shadow-2xl"
        aria-labelledby="login-heading"
      >
        {/* Subtle ambient light dot (blue/cyan only) */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls: Back to Web + Theme Toggle */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="text-xs text-muted-foreground hover:text-foreground gap-2 -ml-2"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al sitio web</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Form Wrap Container */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto">
          {/* Form Header */}
          <div className="mb-8 text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Plataforma Corporativa PLES</span>
            </div>

            <h2 id="login-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Qué bueno verte de nuevo<span className="text-primary">.</span>
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ingresa con tu cuenta institucional para gestionar tus proyectos, servicios y expedientes territoriales.
            </p>
          </div>

          {/* Form Component with Google & Credentials */}
          <Suspense fallback={<div className="py-12 text-center text-xs text-muted-foreground animate-pulse">Cargando acceso seguro...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Bottom Legal & Security Notice */}
        <div className="relative z-10 mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>
            Al ingresar aceptas los términos de servicio y la política de tratamiento de datos personales conforme a la{' '}
            <strong className="text-foreground/80 font-medium">Ley 1581 de 2012</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
