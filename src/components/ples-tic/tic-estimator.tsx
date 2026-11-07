'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, Server, Cpu, ShieldCheck, Clock, 
  CheckCircle2, ArrowRight, RefreshCw, Lock, Sparkles,
  Database, Network, Globe, Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export function TicEstimator() {
  const [projectType, setProjectType] = useState<'webgis' | 'portal' | 'mobile' | 'security' | 'ai'>('webgis');
  const [concurrentUsers, setConcurrentUsers] = useState<number>(1000);
  const [cloudHighAvail, setCloudHighAvail] = useState<boolean>(true);
  const [isoAudit, setIsoAudit] = useState<boolean>(true);

  // Dynamic calculations for TIC
  const calculation = useMemo(() => {
    let baseCOP = 22000000;
    let sprints = 4; // 2 weeks per sprint

    if (projectType === 'webgis') {
      baseCOP = 35000000;
      sprints = 6;
    } else if (projectType === 'security') {
      baseCOP = 28000000;
      sprints = 4;
    } else if (projectType === 'ai') {
      baseCOP = 32000000;
      sprints = 5;
    } else if (projectType === 'mobile') {
      baseCOP = 29000000;
      sprints = 5;
    }

    if (concurrentUsers > 5000) baseCOP *= 1.3;
    if (cloudHighAvail) baseCOP += 6000000;
    if (isoAudit) baseCOP += 7000000;

    const minRange = Math.round((baseCOP * 0.92) / 100000) * 100000;
    const maxRange = Math.round((baseCOP * 1.18) / 100000) * 100000;

    return {
      weeks: sprints * 2,
      sprints,
      minCOP: minRange,
      maxCOP: maxRange,
      minUSD: Math.round(minRange / 4200),
      maxUSD: Math.round(maxRange / 4200)
    };
  }, [projectType, concurrentUsers, cloudHighAvail, isoAudit]);

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
  };
  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const projectLabels: Record<string, string> = {
    webgis: 'Plataforma WebGIS Territorial',
    portal: 'Portal Institucional & Extranet',
    mobile: 'Aplicación Móvil de Campo (Offline/Sync)',
    security: 'Ciberseguridad & Hardening ISO 27001',
    ai: 'Pipeline de Inteligencia Artificial & Chatbot'
  };

  const prefillSubject = `Estimación Proyecto TIC: ${projectLabels[projectType]}`;
  const prefillMessage = `Hola equipo PLES TIC,\n\nHe utilizado el Estimador de Soluciones TIC y solicito un diagnóstico técnico inicial para el siguiente proyecto:\n- Tipo de solución: ${projectLabels[projectType]}\n- Concurrencia estimada: ${concurrentUsers.toLocaleString()} usuarios concurrentes\n- Criterios de infraestructura:\n  ${cloudHighAvail ? '• Alta Disponibilidad Cloud (SLA 99.98% / WAF / Multi-zona)\n' : ''}  ${isoAudit ? '• Gobernanza y Hardening ISO / IEC 27001 (TLS 1.3 / AES-256)\n' : ''}\n- Estimación preliminar del sistema: ${formatCOP(calculation.minCOP)} - ${formatCOP(calculation.maxCOP)} (${calculation.weeks} semanas / ${calculation.sprints} sprints)\n\nQuedo a la espera de su contacto para agendar la sesión técnica.`;

  return (
    <div id="estimador" className="w-full bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-2">
            <Server className="w-3.5 h-3.5" />
            <span>ESTIMADOR DE ARQUITECTURA & DESARROLLO DE SOFTWARE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Estimador de Proyectos PLES TIC
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-light">
            Dimensione el alcance de su solución tecnológica, estime ciclos de sprints ágiles y obtenga un presupuesto paramétrico de desarrollo e infraestructura.
          </p>
        </div>

        <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs px-3 py-1.5 self-start md:self-auto">
          AGILE / SCRUM
        </Badge>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Form: Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Project Type */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
            <h4 className="text-sm font-bold text-foreground">
              Tipo de Plataforma o Módulo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'webgis', label: 'Plataforma WebGIS Territorial', desc: 'Visor cartográfico, capas espaciales y microservicios' },
                { id: 'portal', label: 'Portal Institucional & Extranet', desc: 'Autenticación corporativa, roles, pasarela y CMS' },
                { id: 'mobile', label: 'App Móvil de Campo', desc: 'Captura offline, sincronización GNSS y formularios' },
                { id: 'security', label: 'Ciberseguridad & ISO 27001', desc: 'Hardening, pentesting ético y auditoría perimetral' },
                { id: 'ai', label: 'Pipeline IA & Chatbot', desc: 'Modelos LLM, Genkit y extracción semántica' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectType(item.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    projectType === item.id
                      ? 'bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary'
                      : 'bg-background border-border/70 hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="text-xs font-bold text-foreground">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Concurrency Slider */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Concurrencia de Usuarios Estimada
                </h4>
                <p className="text-xs text-muted-foreground">
                  Picos de peticiones simultáneas sobre la infraestructura
                </p>
              </div>
              <span className="text-xl font-extrabold text-primary font-mono">
                {concurrentUsers.toLocaleString()} Usuarios
              </span>
            </div>

            <Slider
              value={[concurrentUsers]}
              onValueChange={(vals) => setConcurrentUsers(vals[0])}
              min={100}
              max={20000}
              step={100}
              className="py-3 cursor-pointer"
            />
          </div>

          {/* Security & Infrastructure Checkboxes */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
            <h4 className="text-sm font-bold text-foreground">
              Infraestructura & Resiliencia
            </h4>
            <div className="space-y-2.5 text-xs">
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={cloudHighAvail} onCheckedChange={(val) => setCloudHighAvail(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Alta Disponibilidad Cloud (SLA 99.98%)</div>
                  <div className="text-[11px] text-muted-foreground">WAF perimetral, balanceo multi-zona y caché distribuida</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={isoAudit} onCheckedChange={(val) => setIsoAudit(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Gobernanza y Cumplimiento ISO / IEC 27001</div>
                  <div className="text-[11px] text-muted-foreground">Cifrado de datos en reposo y tránsito (TLS 1.3 / AES-256)</div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Summary: Live Calculation Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-card via-card to-muted/20 border-2 border-primary/30 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="text-[11px] font-mono text-primary uppercase tracking-wider block">
                  PROYECCIÓN DE DESARROLLO
                </span>
                <h4 className="text-xl font-bold text-foreground">
                  Presupuesto & Plazos
                </h4>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono">
                SPRINTS ÁGILES
              </Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">Plazo de Entrega</div>
                <div className="text-sm font-bold text-foreground mt-0.5">
                  {calculation.weeks} Semanas
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <RefreshCw className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">Ciclos de Sprint</div>
                <div className="text-sm font-bold text-foreground mt-0.5">
                  {calculation.sprints} Sprints Ágiles
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/30 text-center space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">
                Inversión Paramétrica Estimada (COP)
              </div>
              <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                {formatCOP(calculation.minCOP)}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hasta {formatCOP(calculation.maxCOP)}
              </div>
              <div className="text-[11px] text-muted-foreground/80 font-mono pt-1">
                (Aprox. {formatUSD(calculation.minUSD)} - {formatUSD(calculation.maxUSD)} USD)
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-foreground block">Garantías & Entregables de Ingeniería:</span>
              <div className="space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Código Fuente propietario y repositorio Git documentado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Infraestructura como Código (IaC) y contenedor Docker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Documentación de APIs bajo estándar OpenAPI 3.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Garantía de soporte y parches de seguridad por 12 meses</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <Button 
                asChild 
                size="lg" 
                className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 gap-2"
              >
                <Link href={`/forms?service=ples-tic&subject=${encodeURIComponent(prefillSubject)}&message=${encodeURIComponent(prefillMessage)}`}>
                  <span>Solicitar Diagnóstico Técnico</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
