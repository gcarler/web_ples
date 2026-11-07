// src/app/cotizador/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, Building2, MapPin, Layers, Plane, Crosshair, 
  CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, FileText,
  Sparkles, DollarSign, ArrowLeft, RefreshCw, Server, Cpu, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CotizadorPage() {
  const [activeTab, setActiveTab] = useState<'catastro' | 'tic'>('catastro');

  // --- CATASTRO PARAMETERS ---
  const [areaHa, setAreaHa] = useState<number>(50);
  const [entorno, setEntorno] = useState<'urbano' | 'suburbano' | 'rural' | 'montana'>('rural');
  const [region, setRegion] = useState<string>('Antioquia / Eje Cafetero');
  
  // Selected components
  const [compRtk, setCompRtk] = useState<boolean>(true);
  const [compUav, setCompUav] = useState<boolean>(true);
  const [compDem, setCompDem] = useState<boolean>(true);
  const [compLadm, setCompLadm] = useState<boolean>(true);
  const [compAvaluos, setCompAvaluos] = useState<boolean>(false);
  const [compJuridico, setCompJuridico] = useState<boolean>(false);

  // --- TIC PARAMETERS ---
  const [projectType, setProjectType] = useState<'webgis' | 'portal' | 'mobile' | 'security' | 'ai'>('webgis');
  const [concurrentUsers, setConcurrentUsers] = useState<number>(1000);
  const [cloudHighAvail, setCloudHighAvail] = useState<boolean>(true);
  const [isoAudit, setIsoAudit] = useState<boolean>(true);

  // Calculation for Catastro
  const catastroCalculation = useMemo(() => {
    let basePricePerHa = 180000; // Base COP per Ha
    let weeks = Math.max(2, Math.ceil(areaHa / 25));
    let cuadrillas = 1;

    if (areaHa > 150) cuadrillas = 2;
    if (areaHa > 500) cuadrillas = 3;
    if (areaHa > 1500) cuadrillas = 4;

    // Terrain modifier
    let terrainFactor = 1.0;
    if (entorno === 'urbano') terrainFactor = 1.35;
    if (entorno === 'suburbano') terrainFactor = 1.15;
    if (entorno === 'montana') terrainFactor = 1.45;

    // Components modifiers
    let componentFactor = 1.0;
    if (compRtk) componentFactor += 0.20;
    if (compUav) componentFactor += 0.25;
    if (compDem) componentFactor += 0.15;
    if (compLadm) componentFactor += 0.20;
    if (compAvaluos) componentFactor += 0.20;
    if (compJuridico) componentFactor += 0.15;

    const totalEstimated = areaHa * basePricePerHa * terrainFactor * (componentFactor / 1.8);
    const minRange = Math.round((totalEstimated * 0.9) / 100000) * 100000;
    const maxRange = Math.round((totalEstimated * 1.15) / 100000) * 100000;

    return {
      weeks: Math.min(weeks, 16),
      cuadrillas,
      pilotosUav: compUav ? Math.max(1, Math.ceil(cuadrillas / 2)) : 0,
      minCOP: minRange,
      maxCOP: maxRange,
      minUSD: Math.round(minRange / 4200),
      maxUSD: Math.round(maxRange / 4200)
    };
  }, [areaHa, entorno, compRtk, compUav, compDem, compLadm, compAvaluos, compJuridico]);

  // Calculation for TIC
  const ticCalculation = useMemo(() => {
    let baseCOP = 22000000;
    let sprints = 4; // weeks: sprints * 2

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

  // Format currency
  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
  };
  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  // Build query string for prefilled formal contact
  const catastroPrefillSubject = `Cotización Catastral: ${areaHa} Ha en ${region} (${entorno})`;
  const catastroPrefillMessage = `Hola equipo PLES,\n\nHe utilizado el Cotizador Institucional y deseo formalizar la siguiente propuesta técnica:\n- Área a intervenir: ${areaHa} Hectáreas\n- Entorno territorial: ${entorno}\n- Región: ${region}\n- Componentes incluidos:\n  ${compRtk ? '• Red Geodésica GNSS-RTK Centimétrica\n' : ''}  ${compUav ? '• Vuelo Fotogramétrico UAV (GSD < 3cm)\n' : ''}  ${compDem ? '• Modelo Digital de Elevación (DEM) & Curvas\n' : ''}  ${compLadm ? '• Interoperabilidad LADM-COL (SNR/IGAC)\n' : ''}  ${compAvaluos ? '• Avalúos Masivos y Comerciales\n' : ''}  ${compJuridico ? '• Diagnóstico Jurídico y Saneamiento\n' : ''}\n- Estimación preliminar: ${formatCOP(catastroCalculation.minCOP)} - ${formatCOP(catastroCalculation.maxCOP)}\n\nPor favor contáctenme para agendar la reunión técnica inicial.`;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4 text-primary" />
              <span>ESTIMADOR PARAMÉTRICO DE PROYECTOS • PLES S.A.S.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Cotizador Institucional de Proyectos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl font-light">
              Calcule estimaciones técnicas, tiempos de ejecución y presupuestos paramétricos para proyectos de Catastro Multipropósito y Soluciones Tecnológicas Cloud.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="rounded-xl border-border shrink-0">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Volver al Inicio</span>
            </Link>
          </Button>
        </div>

        {/* Tab Controls: Catastro vs TIC */}
        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-muted/60 p-1 rounded-xl">
            <TabsTrigger value="catastro" className="rounded-lg text-xs font-semibold gap-2 py-2">
              <Building2 className="w-4 h-4" />
              <span>Catastro & Topografía</span>
            </TabsTrigger>
            <TabsTrigger value="tic" className="rounded-lg text-xs font-semibold gap-2 py-2">
              <Server className="w-4 h-4" />
              <span>Soluciones TIC & Cloud</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: CATASTRO & TOPOGRAFÍA */}
          <TabsContent value="catastro" className="space-y-8 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Input Parameters (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Parameter 1: Area Slider */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        Área de Intervención Predial
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Extensión territorial total a levantar o actualizar
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-primary font-mono">
                        {areaHa} Ha
                      </span>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        ≈ {(areaHa * 10000).toLocaleString('es-CO')} m²
                      </div>
                    </div>
                  </div>

                  <Slider
                    value={[areaHa]}
                    onValueChange={(vals) => setAreaHa(vals[0])}
                    min={5}
                    max={1500}
                    step={5}
                    className="py-4 cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                    <span>5 Ha (Predio puntual)</span>
                    <span>500 Ha</span>
                    <span>1,500 Ha (Cuenca o Municipio)</span>
                  </div>
                </div>

                {/* Parameter 2: Entorno Territorial */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-3">
                  <h3 className="text-base font-bold text-foreground">
                    Entorno Territorial y Topografía
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {[
                      { id: 'urbano', label: 'Urbano Denso', badge: 'Alta densidad' },
                      { id: 'suburbano', label: 'Suburbano', badge: 'Expansión' },
                      { id: 'rural', label: 'Rural Disperso', badge: 'Agropecuario' },
                      { id: 'montana', label: 'Alta Montaña', badge: 'Relieve quebrado' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEntorno(item.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          entorno === item.id
                            ? 'bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary'
                            : 'bg-muted/30 border-border/60 hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{item.badge}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 3: Componentes Técnicos */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4">
                  <h3 className="text-base font-bold text-foreground">
                    Componentes Técnicos Requeridos
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compRtk} onCheckedChange={(val) => setCompRtk(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Red GNSS-RTK Centimétrica</div>
                        <div className="text-[11px] text-muted-foreground">Vértices en MAGNA-SIRGAS EPSG:9377</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compUav} onCheckedChange={(val) => setCompUav(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Fotogrametría Aérea UAV</div>
                        <div className="text-[11px] text-muted-foreground">Ortomosaico GSD &lt; 3cm/px</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compDem} onCheckedChange={(val) => setCompDem(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Modelo DEM & Curvas de Nivel</div>
                        <div className="text-[11px] text-muted-foreground">Equidistancia 1 metro</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compLadm} onCheckedChange={(val) => setCompLadm(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Interoperabilidad LADM-COL</div>
                        <div className="text-[11px] text-muted-foreground">GDB oficial IGAC / SNR</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compAvaluos} onCheckedChange={(val) => setCompAvaluos(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Avalúos Comerciales / Masivos</div>
                        <div className="text-[11px] text-muted-foreground">Zonificación homogénea Res. 1149</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={compJuridico} onCheckedChange={(val) => setCompJuridico(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Diagnóstico Jurídico SNR</div>
                        <div className="text-[11px] text-muted-foreground">Estudio de títulos y deslinde</div>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Live Estimate Sheet (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 p-6 sm:p-8 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl space-y-6">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <span className="text-[11px] font-mono text-primary uppercase tracking-wider block">
                        ESTIMACIÓN PRELIMINAR
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        Plan Técnico Catastral
                      </h3>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono">
                      PARAMÉTRICO
                    </Badge>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Plazo Estimado</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {catastroCalculation.weeks} Semanas
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Cuadrillas Campo</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {catastroCalculation.cuadrillas} Cuadrilla(s)
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <Plane className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Pilotos UAV</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {catastroCalculation.pilotosUav} Certificado(s)
                      </div>
                    </div>
                  </div>

                  {/* Budget Estimation Range */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/30 text-center space-y-1">
                    <div className="text-xs font-mono text-muted-foreground uppercase">
                      Rango de Inversión Estimado (COP)
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                      {formatCOP(catastroCalculation.minCOP)}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      hasta {formatCOP(catastroCalculation.maxCOP)}
                    </div>
                    <div className="text-[11px] text-muted-foreground/80 font-mono pt-1">
                      (Aprox. {formatUSD(catastroCalculation.minUSD)} - {formatUSD(catastroCalculation.maxUSD)} USD)
                    </div>
                  </div>

                  {/* Included Deliverables List */}
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-foreground block">Entregables Institucionales Incluidos:</span>
                    <div className="space-y-1.5 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Base de Datos Geográfica (GDB) en estándar LADM-COL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Fichas Catastrales Oficiales con Código CUV y QR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Ortomosaico Georreferenciado TIFF y Curvas de Nivel</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Acta de Deslinde y Memoria Técnica firmada por Ingeniero</span>
                      </div>
                    </div>
                  </div>

                  {/* Formal Proposal Action Button */}
                  <div className="pt-2">
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 gap-2"
                    >
                      <Link href={`/forms?service=ples-catastro&subservice=cotizador&subject=${encodeURIComponent(catastroPrefillSubject)}&message=${encodeURIComponent(catastroPrefillMessage)}`}>
                        <span>Solicitar Propuesta Formal</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      La cotización formal definitiva se ajusta tras verificación en el Visor GIS.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </TabsContent>

          {/* TAB 2: SOLUCIONES TIC & CLOUD */}
          <TabsContent value="tic" className="space-y-8 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Project Type */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-3">
                  <h3 className="text-base font-bold text-foreground">
                    Tipo de Proyecto Tecnológico
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      { id: 'webgis', label: 'Plataforma WebGIS Territorial', desc: 'Visor cartográfico, gestión de capas y microservicios' },
                      { id: 'portal', label: 'Portal Institucional / Extranet', desc: 'Autenticación corporativa, roles, pasarela y CMS' },
                      { id: 'mobile', label: 'Aplicación Móvil de Campo', desc: 'Captura offline, sincronización GNSS y formularios' },
                      { id: 'security', label: 'Ciberseguridad & ISO 27001', desc: 'Hardening, pentesting ético y auditoría perimetral' },
                      { id: 'ai', label: 'Pipeline IA & Chatbot Territorial', desc: 'Modelos LLM, Genkit y extracción semántica' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setProjectType(item.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          projectType === item.id
                            ? 'bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary'
                            : 'bg-muted/30 border-border/60 hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="text-xs font-bold text-foreground">{item.label}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concurrency and Scale */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        Usuarios Concurrentes Estimados
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Volumen de peticiones simultáneas sobre la infraestructura
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
                    className="py-4 cursor-pointer"
                  />
                </div>

                {/* Security and Cloud additions */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-3">
                  <h3 className="text-base font-bold text-foreground">
                    Criterios de Infraestructura y Misión Crítica
                  </h3>
                  <div className="space-y-3 text-xs">
                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={cloudHighAvail} onCheckedChange={(val) => setCloudHighAvail(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Alta Disponibilidad Cloud (SLA 99.98%)</div>
                        <div className="text-[11px] text-muted-foreground">WAF perimetral, balanceo multi-zona y caché distribuida</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 cursor-pointer">
                      <Checkbox checked={isoAudit} onCheckedChange={(val) => setIsoAudit(!!val)} className="mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground">Gobernanza y Cumplimiento ISO / IEC 27001</div>
                        <div className="text-[11px] text-muted-foreground">Cifrado de datos en reposo y tránsito (TLS 1.3 / AES-256)</div>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 p-6 sm:p-8 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <span className="text-[11px] font-mono text-primary uppercase tracking-wider block">
                        ESTIMACIÓN DE DESARROLLO
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        Arquitectura PLES TIC
                      </h3>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono">
                      AGILE / SCRUM
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Plazo de Entrega</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {ticCalculation.weeks} Semanas
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/40 border border-border">
                      <RefreshCw className="w-4 h-4 text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Ciclos de Sprint</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {ticCalculation.sprints} Sprints Ágiles
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/30 text-center space-y-1">
                    <div className="text-xs font-mono text-muted-foreground uppercase">
                      Inversión Paramétrica Estimada
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                      {formatCOP(ticCalculation.minCOP)}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      hasta {formatCOP(ticCalculation.maxCOP)}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 gap-2"
                    >
                      <Link href={`/forms?service=ples-tic&subject=${encodeURIComponent(`Cotización Proyecto TIC: ${projectType}`)}`}>
                        <span>Solicitar Diagnóstico Técnico</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
