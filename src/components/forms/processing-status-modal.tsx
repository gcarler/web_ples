'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, ShieldCheck, Terminal, Copy, Check, 
  ExternalLink, Clock, Sparkles, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  senderEmail: string;
  radicadoCode: string;
  isComplete: boolean;
}

export function ProcessingStatusModal({
  isOpen,
  onClose,
  senderName,
  senderEmail,
  radicadoCode,
  isComplete,
}: ProcessingStatusModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const steps = [
    { title: 'Estableciendo canal cifrado TLS 1.3 con nodo central PLES', progress: 25 },
    { title: 'Sanitizando payload y validando directivas de integridad', progress: 50 },
    { title: 'Enrutando requerimiento a la cola corporativa especializada', progress: 75 },
    { title: 'Generando radicado oficial y emitiendo acuse de recibo', progress: 95 },
    { title: 'Solicitud radicada exitosamente bajo protocolo SLA 99.98%', progress: 100 },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    if (isOpen && !isComplete) {
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 2) {
            return prev + 1;
          }
          return prev;
        });
      }, 700);

      return () => clearInterval(interval);
    }

    if (isComplete) {
      setCurrentStepIndex(steps.length - 1);
    }
  }, [isOpen, isComplete]);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(radicadoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl text-card-foreground overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-muted-foreground ml-2">
              telemetria.ples.com.co // dispatch
            </span>
          </div>
          {isComplete && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Area */}
        {!isComplete ? (
          <div className="py-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary animate-pulse">
                <Terminal className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Procesando Solución Tecnológica
              </h3>
              <p className="text-xs text-muted-foreground">
                Conectando con la infraestructura de alta disponibilidad de PLES...
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Progreso de verificación</span>
                <span className="text-primary font-bold">{currentStep.progress}%</span>
              </div>
              <Progress value={currentStep.progress} className="h-2 bg-muted" />
            </div>

            {/* Stepper logs */}
            <div className="space-y-2 rounded-xl bg-muted/40 p-3 border border-border/50 text-xs font-mono">
              {steps.slice(0, currentStepIndex + 1).map((s, idx) => (
                <div key={idx} className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                ¡Solicitud Radicada Exitosamente!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Tu requerimiento ha sido ingresado a nuestro sistema central con prioridad corporativa.
              </p>
            </div>

            {/* Radicado Code Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border border-primary/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block uppercase tracking-wider">
                  Código de Radicado Oficial
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-primary">
                  {radicadoCode}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="gap-1.5 text-xs font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </Button>
            </div>

            {/* SLA and Commitment Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>SLA de Respuesta</span>
                </div>
                <p className="font-bold text-foreground">Menor a 24 horas</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Canal Asignado</span>
                </div>
                <p className="font-bold text-foreground">Mesa N2 de Soluciones</p>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              Hemos enviado una copia de este acuse de recibo a <strong className="text-foreground">{senderEmail}</strong> conforme a la política de tratamiento de datos (Ley 1581 de 2012).
            </p>

            <Button
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Aceptar y Cerrar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
