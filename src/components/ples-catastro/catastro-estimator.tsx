'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, Building2, MapPin, Layers, Plane, Crosshair, 
  CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, FileText,
  Sparkles, DollarSign, RefreshCw, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export function CatastroEstimator() {
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

  // Dynamic calculations
  const calculation = useMemo(() => {
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

  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
  };
  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const prefillSubject = `Estimación Técnica: Levantamiento de ${areaHa} Ha (${entorno})`;
  const prefillMessage = `Hola equipo PLES Catastro,\n\nHe utilizado el Estimador Paramétrico y solicito una propuesta formal con los siguientes parámetros técnicos:\n- Extensión territorial: ${areaHa} Hectáreas (aprox. ${(areaHa * 10000).toLocaleString('es-CO')} m²)\n- Entorno territorial: ${entorno}\n- Región estimada: ${region}\n- Componentes seleccionados:\n  ${compRtk ? '• Red GNSS-RTK Centimétrica (EPSG:9377)\n' : ''}  ${compUav ? '• Fotogrametría Aérea UAV (GSD < 3cm)\n' : ''}  ${compDem ? '• Modelo DEM y Curvas de Nivel\n' : ''}  ${compLadm ? '• Estructuración GDB LADM-COL\n' : ''}  ${compAvaluos ? '• Avalúos Comerciales y Masivos Res. 1149\n' : ''}  ${compJuridico ? '• Diagnóstico Jurídico y Estudio de Títulos\n' : ''}\n- Estimación preliminar del sistema: ${formatCOP(calculation.minCOP)} - ${formatCOP(calculation.maxCOP)}\n\nQuedo a la espera de su contacto técnico.`;

  return (
    <div id="estimador" className="w-full bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>HERRAMIENTA PARAMÉTRICA DE INGENIERÍA TERRITORIAL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Estimador de Cartografía & Topografía
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl font-light">
            Configure las variables de su predio o municipio y calcule de inmediato tiempos de ejecución, cuadrillas requeridas y presupuesto paramétrico oficial.
          </p>
        </div>

        <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs px-3 py-1.5 self-start md:self-auto">
          PRECISIÓN EPSG:9377
        </Badge>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Left Form: Parameters (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Area Slider */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  Área de Intervención Predial
                </h4>
                <p className="text-xs text-muted-foreground">
                  Extensión territorial total a intervenir
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-black text-primary">
                  {areaHa} Ha
                </span>
                <div className="text-[11px] text-muted-foreground">
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
              className="py-3 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>5 Ha (Predio puntual)</span>
              <span>500 Ha</span>
              <span>1,500 Ha (Cuenca o Municipio)</span>
            </div>
          </div>

          {/* Entorno Territorial */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
            <h4 className="text-sm font-bold text-foreground">
              Topografía y Entorno Territorial
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                      : 'bg-background border-border/70 hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="text-xs font-bold text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{item.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Componentes Técnicos */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
            <h4 className="text-sm font-bold text-foreground">
              Componentes Geodésicos & Cartográficos Requeridos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compRtk} onCheckedChange={(val) => setCompRtk(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Red GNSS-RTK Centimétrica</div>
                  <div className="text-[11px] text-muted-foreground">Vértices en MAGNA-SIRGAS EPSG:9377</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compUav} onCheckedChange={(val) => setCompUav(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Fotogrametría Aérea UAV</div>
                  <div className="text-[11px] text-muted-foreground">Ortomosaico GSD &lt; 3cm/px</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compDem} onCheckedChange={(val) => setCompDem(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Modelo DEM & Curvas de Nivel</div>
                  <div className="text-[11px] text-muted-foreground">Equidistancia 1 metro</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compLadm} onCheckedChange={(val) => setCompLadm(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Interoperabilidad LADM-COL</div>
                  <div className="text-[11px] text-muted-foreground">GDB oficial IGAC / SNR</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compAvaluos} onCheckedChange={(val) => setCompAvaluos(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Avalúos Comerciales / Masivos</div>
                  <div className="text-[11px] text-muted-foreground">Zonificación homogénea Res. 1149</div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-background hover:bg-muted/40 cursor-pointer">
                <Checkbox checked={compJuridico} onCheckedChange={(val) => setCompJuridico(!!val)} className="mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Diagnóstico Jurídico SNR</div>
                  <div className="text-[11px] text-muted-foreground">Estudio de títulos y deslinde</div>
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
                  RESUMEN TÉCNICO OPERATIVO
                </span>
                <h4 className="text-xl font-bold text-foreground">
                  Presupuesto Paramétrico
                </h4>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-mono">
                ESTIMACIÓN
              </Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">Plazo</div>
                <div className="text-sm font-bold text-foreground mt-0.5">
                  {calculation.weeks} Semanas
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">Cuadrillas</div>
                <div className="text-sm font-bold text-foreground mt-0.5">
                  {calculation.cuadrillas} Cuadrilla(s)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <Plane className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-[11px] text-muted-foreground">Pilotos UAV</div>
                <div className="text-sm font-bold text-foreground mt-0.5">
                  {calculation.pilotosUav} Piloto(s)
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/30 text-center space-y-1">
              <div className="text-xs font-mono text-muted-foreground uppercase">
                Inversión Estimada Preliminar (COP)
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
              <span className="font-semibold text-foreground block">Entregables Institucionales Incluidos:</span>
              <div className="space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Base de Datos Geográfica (GDB) estructurada en LADM-COL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Ortomosaico Georreferenciado TIFF y Curvas de Nivel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Fichas Técnicas Oficiales de Predio</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Acta de Deslinde firmada por Ingeniero Topógrafo COPNIA</span>
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
                <Link href={`/forms?service=ples-catastro&subservice=levantamiento-predial&subject=${encodeURIComponent(prefillSubject)}&message=${encodeURIComponent(prefillMessage)}`}>
                  <span>Formalizar Propuesta Técnica</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-2 font-mono">
                Propuesta formal ajustada tras validación en consola cartográfica.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
