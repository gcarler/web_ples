import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Shield, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/login-form';
import { RotatingWord } from '@/components/auth/rotating-word';
import { PlesGroupLogo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Acceso Corporativo | PLES',
  description: 'Consola segura de gestión para proyectos territoriales, catastro multipropósito e infraestructura TI.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden font-sans bg-[#060D17]">
      {/* ======================================================== */}
      {/* FULL-VIEWPORT BACKDROP: Niño volando cometa hacia el cielo */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth/kite-boy-ples.webp"
          alt="Visión PLES - Elevando el potencial territorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[center_35%] scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Luminous, translucent veil - Softened navy gradient (STRICT: NO PURPLE) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D17]/75 via-[#07182C]/25 to-[#060D17]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D17]/80 via-transparent to-[#07182C]/20" />
        {/* Subtle cyber/GIS coordinate grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#009fe30f_1px,transparent_1px),linear-gradient(to_bottom,#009fe30f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-30" />
      </div>

      {/* ======================================================== */}
      {/* LEFT VISUAL COLUMN: Artwork, Atmosphere & Corporate Vision */}
      {/* ======================================================== */}
      <section 
        className="relative z-10 lg:w-7/12 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 text-white"
        aria-label="PLES, Ciencia y Tecnología Territorial"
      >
        {/* Top Header in Visual Area */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block group" aria-label="PLES, volver al inicio">
            <PlesGroupLogo className="text-4xl sm:text-5xl drop-shadow-md" hoverVariant="white-glow" />
          </Link>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Consola v2.6 • SLA 99.98%
          </span>
        </div>

        {/* Central Editorial Copy */}
        <div className="my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#009FE3]/25 border border-[#009FE3]/40 text-xs font-semibold text-[#00D2FF] mb-6 backdrop-blur-md shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>EL USO INTELIGENTE DE LA EXPERIENCIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] drop-shadow-sm flex flex-wrap items-baseline gap-x-2">
            <span>Elevamos el potencial de cada</span>
            <RotatingWord />
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-100/90 leading-relaxed font-light drop-shadow">
            Infraestructura tecnológica crítica, catastro multipropósito de precisión y consultoría estratégica de alto rendimiento.
          </p>

          {/* Technical Value Badges */}
          <div className="mt-8 space-y-2.5 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Alta disponibilidad de enlaces y centros de cómputo (Tier II & III)</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Gobernanza geoespacial y radicado seguro con cifrado TLS 1.3</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
              <span>Autenticación federada corporativa con Google Workspace</span>
            </div>
          </div>
        </div>

        {/* Bottom Institutional Info in Visual Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-white/15 text-xs text-slate-200/90">
          <span>PLES S.A.S. • NIT 901.156.404-0</span>
          <span>Cartagena de Indias, Colombia</span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* RIGHT ACCESS COLUMN: Translucent Frosted Glass Form Card */}
      {/* ======================================================== */}
      <section 
        className="relative z-10 lg:w-5/12 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-[#06101E]/25 dark:bg-[#050C17]/30 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/15 shadow-2xl text-foreground"
        aria-labelledby="login-heading"
      >
        {/* Subtle ambient light dot (blue/cyan only) */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls: Back to Web + Theme Toggle */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="text-xs text-slate-200 hover:text-white hover:bg-white/10 gap-2 -ml-2 rounded-lg backdrop-blur-sm"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold text-primary backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Plataforma Corporativa PLES</span>
            </div>

            <h2 id="login-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              Qué bueno verte de nuevo<span className="text-primary">.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-200/80 leading-relaxed">
              Ingresa con tu cuenta institucional para gestionar tus proyectos, servicios y expedientes territoriales.
            </p>
          </div>

          {/* Form Component with Google & Credentials */}
          <Suspense fallback={<div className="py-12 text-center text-xs text-muted-foreground animate-pulse">Cargando acceso seguro...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Bottom Legal & Security Notice */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 text-center text-xs text-slate-300/80">
          <p>
            Al ingresar aceptas los términos de servicio y la política de tratamiento de datos personales conforme a la{' '}
            <strong className="text-white font-medium">Ley 1581 de 2012</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
