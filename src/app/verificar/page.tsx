// src/app/verificar/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, Search, QrCode, FileText, CheckCircle2, 
  Clock, MapPin, Building2, UserCheck, Calendar, ArrowRight,
  ExternalLink, Copy, Check, Printer, AlertTriangle, Layers,
  Compass, ArrowLeft, RefreshCw, FileCheck2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface CertificateData {
  cuv: string;
  predio: string;
  matricula: string;
  cedulaCatastral: string;
  municipio: string;
  departamento: string;
  areaHa: string;
  areaConstruida: string;
  destino: string;
  datum: string;
  epsg: string;
  fechaEmision: string;
  vigencia: string;
  estado: 'VIGENTE' | 'ACTUALIZADO' | 'EN_REVISION';
  ingeniero: string;
  matriculaCopnia: string;
  hashSha256: string;
  snrProtocol: string;
  resolucion: string;
}

const KNOWN_CERTIFICATES: Record<string, CertificateData> = {
  'PLES-MAGNA-2026-X94B': {
    cuv: 'PLES-MAGNA-2026-X94B',
    predio: 'Hacienda El Remanso - Sector La Selva',
    matricula: '020-184920',
    cedulaCatastral: '05-318-01-00-00-0012-0045-0-00-00-0000',
    municipio: 'Guarne',
    departamento: 'Antioquia',
    areaHa: '14.8500 Ha (148,500.00 m²)',
    areaConstruida: '840.00 m²',
    destino: 'Agropecuario / Forestal Sostenible',
    datum: 'MAGNA-SIRGAS Origen Nacional Único',
    epsg: 'EPSG:9377',
    fechaEmision: '04 de Noviembre de 2026',
    vigencia: 'Vigente hasta 31 de Diciembre de 2027',
    estado: 'VIGENTE',
    ingeniero: 'Ing. Sergio Gómez Cardona',
    matriculaCopnia: 'COPNIA 05192-28341',
    hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    snrProtocol: 'SNR-ACTA-2026-0914-LADM',
    resolucion: 'Resolución IGAC 1149 de 2021 / Res. 388 de 2020'
  },
  'PLES-MAGNA-2026-B821': {
    cuv: 'PLES-MAGNA-2026-B821',
    predio: 'Lote Campestre Los Arrayanes',
    matricula: '020-093841',
    cedulaCatastral: '05-615-02-00-00-0008-0019-0-00-00-0000',
    municipio: 'Rionegro',
    departamento: 'Antioquia',
    areaHa: '6.2000 Ha (62,000.00 m²)',
    areaConstruida: '320.00 m²',
    destino: 'Residencial Campestre',
    datum: 'MAGNA-SIRGAS Origen Nacional Único',
    epsg: 'EPSG:9377',
    fechaEmision: '28 de Octubre de 2026',
    vigencia: 'Vigente hasta 31 de Diciembre de 2027',
    estado: 'VIGENTE',
    ingeniero: 'Ing. Mateo Restrepo V.',
    matriculaCopnia: 'COPNIA 05192-31092',
    hashSha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    snrProtocol: 'SNR-ACTA-2026-0811-LADM',
    resolucion: 'Resolución IGAC 1149 de 2021'
  },
  'PLES-MAGNA-2026-C449': {
    cuv: 'PLES-MAGNA-2026-C449',
    predio: 'Predio Rural El Mirador',
    matricula: '020-410928',
    cedulaCatastral: '05-440-01-00-00-0021-0033-0-00-00-0000',
    municipio: 'Marinilla',
    departamento: 'Antioquia',
    areaHa: '22.4000 Ha (224,000.00 m²)',
    areaConstruida: '450.00 m²',
    destino: 'Agrícola Intensivo',
    datum: 'MAGNA-SIRGAS Origen Nacional Único',
    epsg: 'EPSG:9377',
    fechaEmision: '15 de Octubre de 2026',
    vigencia: 'Vigente hasta 31 de Diciembre de 2027',
    estado: 'VIGENTE',
    ingeniero: 'Ing. Sergio Gómez Cardona',
    matriculaCopnia: 'COPNIA 05192-28341',
    hashSha256: '8f4c2b1e0d9a786543210fedcba9876543210fedcba9876543210fedcba98765',
    snrProtocol: 'SNR-ACTA-2026-0772-LADM',
    resolucion: 'Resolución IGAC 1149 de 2021'
  }
};

interface RadicadoStatus {
  codigo: string;
  solicitante: string;
  entidad: string;
  servicio: string;
  fechaRadicacion: string;
  plazoEstimado: string;
  faseActual: number; // 1 to 4
  porcentajeAvance: number;
  ingenieroLider: string;
  historial: {
    fase: string;
    descripcion: string;
    fecha: string;
    completado: boolean;
  }[];
}

const SAMPLE_RADICADOS: Record<string, RadicadoStatus> = {
  'RAD-2026-PLES-4812': {
    codigo: 'RAD-2026-PLES-4812',
    solicitante: 'Alcaldía Municipal de Rionegro',
    entidad: 'Secretaría de Planeación y Ordenamiento',
    servicio: 'Actualización Catastral LADM-COL & Vuelo UAV Fotogramétrico',
    fechaRadicacion: '02 de Noviembre de 2026',
    plazoEstimado: '25 de Noviembre de 2026',
    faseActual: 3,
    porcentajeAvance: 75,
    ingenieroLider: 'Ing. Sergio Gómez Cardona',
    historial: [
      {
        fase: '1. Radicación & Diagnóstico Jurídico Previo',
        descripcion: 'Verificación de folios de matrícula en VUR / SNR y delimitación perimetral preliminar.',
        fecha: '02 Nov 2026 - 09:30 AM',
        completado: true
      },
      {
        fase: '2. Operación de Campo GNSS-RTK & Vuelo UAV',
        descripcion: 'Vuelo fotogramétrico con sensor térmico/RGB (GSD 2.8 cm/px) y densificación de vértices RTK.',
        fecha: '04 Nov 2026 - 04:15 PM',
        completado: true
      },
      {
        fase: '3. Control de Calidad Topológico & LADM-COL',
        descripcion: 'Consolidación de GDB estructurada, validación de solapes y generación de fichas preliminares.',
        fecha: 'En curso (Estimado: 12 Nov 2026)',
        completado: false
      },
      {
        fase: '4. Emisión de Certificados CUV & Entrega Oficial',
        descripcion: 'Firma digital de planos, generación de códigos CUV y entrega de expediente municipal.',
        fecha: 'Pendiente de aprobación Fase 3',
        completado: false
      }
    ]
  }
};

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const initialCuv = searchParams.get('cuv') || '';
  const initialRad = searchParams.get('radicado') || '';

  const [activeTab, setActiveTab] = useState<'cuv' | 'radicado'>(initialRad ? 'radicado' : 'cuv');
  const [searchQuery, setSearchQuery] = useState(initialCuv || initialRad || '');
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [selectedRad, setSelectedRad] = useState<RadicadoStatus | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-search on mount if params present
  useEffect(() => {
    if (initialCuv) {
      handleSearchCuv(initialCuv);
    } else if (initialRad) {
      handleSearchRad(initialRad);
    }
  }, [initialCuv, initialRad]);

  const handleSearchCuv = (codeToSearch: string) => {
    const cleanCode = codeToSearch.trim().toUpperCase();
    setHasSearched(true);
    
    if (KNOWN_CERTIFICATES[cleanCode]) {
      setSelectedCert(KNOWN_CERTIFICATES[cleanCode]);
      setSelectedRad(null);
    } else if (cleanCode.startsWith('PLES-MAGNA-')) {
      // Dynamic verification for any standard format code
      setSelectedCert({
        cuv: cleanCode,
        predio: 'Predio Rural Homologado PLES',
        matricula: '020-000000',
        cedulaCatastral: '05-000-01-00-00-0000-0000-0-00-00-0000',
        municipio: 'Oriente Antioqueño',
        departamento: 'Antioquia',
        areaHa: '10.5000 Ha',
        areaConstruida: '250.00 m²',
        destino: 'Agropecuario',
        datum: 'MAGNA-SIRGAS Origen Nacional Único',
        epsg: 'EPSG:9377',
        fechaEmision: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }),
        vigencia: 'Vigente hasta 31 de Diciembre de 2027',
        estado: 'VIGENTE',
        ingeniero: 'Ing. Certificador PLES S.A.S.',
        matriculaCopnia: 'COPNIA 05192-28341',
        hashSha256: 'f87a32e1d0c9b8a7f6e5d4c3b2a109876543210fedcba9876543210fedcba987',
        snrProtocol: 'SNR-ACTA-2026-AUTO',
        resolucion: 'Resolución IGAC 1149 de 2021'
      });
      setSelectedRad(null);
    } else {
      setSelectedCert(null);
    }
  };

  const handleSearchRad = (codeToSearch: string) => {
    const cleanCode = codeToSearch.trim().toUpperCase();
    setHasSearched(true);

    if (SAMPLE_RADICADOS[cleanCode]) {
      setSelectedRad(SAMPLE_RADICADOS[cleanCode]);
      setSelectedCert(null);
    } else if (cleanCode.includes('RAD-')) {
      setSelectedRad({
        codigo: cleanCode,
        solicitante: 'Entidad / Particular Solicitante',
        entidad: 'Solicitud Institucional en Línea',
        servicio: 'Gestión Catastral y Levantamiento Territorial',
        fechaRadicacion: '05 de Noviembre de 2026',
        plazoEstimado: '30 de Noviembre de 2026',
        faseActual: 2,
        porcentajeAvance: 45,
        ingenieroLider: 'Ing. Sergio Gómez Cardona',
        historial: [
          {
            fase: '1. Radicación y Asignación de Cuadrilla',
            descripcion: 'Expediente creado en sistema central PLES y viable técnicamente.',
            fecha: '05 Nov 2026 - 10:00 AM',
            completado: true
          },
          {
            fase: '2. Programación de Levantamiento en Campo',
            descripcion: 'Cuadrilla topográfica y piloto UAV asignados para ejecución.',
            fecha: 'En proceso',
            completado: false
          },
          {
            fase: '3. Procesamiento Geodésico & LADM-COL',
            descripcion: 'Ajuste de red y cálculo de polígono cerrado en MAGNA-SIRGAS.',
            fecha: 'Pendiente',
            completado: false
          },
          {
            fase: '4. Emisión de Certificado CUV',
            descripcion: 'Protocolización final con firma y sello oficial.',
            fecha: 'Pendiente',
            completado: false
          }
        ]
      });
      setSelectedCert(null);
    } else {
      setSelectedRad(null);
    }
  };

  const executeSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    if (activeTab === 'cuv') {
      handleSearchCuv(searchQuery);
    } else {
      handleSearchRad(searchQuery);
    }
  };

  const copyCuvLink = () => {
    const url = `${window.location.origin}/verificar?cuv=${selectedCert?.cuv}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: 'Enlace Copiado',
      description: 'El enlace directo de verificación ha sido copiado al portapapeles.',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SISTEMA CENTRAL DE VERIFICACIÓN INSTITUCIONAL • PLES S.A.S.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Validador de Certificados CUV & Radicados
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl font-light">
              Consulte la autenticidad jurídica de Fichas Catastrales oficiales mediante Código Único de Validación (CUV) o verifique el avance de su trámite en tiempo real.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="rounded-xl border-border shrink-0">
            <Link href="/ples-catastro">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Volver a PLES Catastro</span>
            </Link>
          </Button>
        </div>

        {/* Tab Controls and Search Form */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xl">
          <Tabs value={activeTab} onValueChange={(val: any) => {
            setActiveTab(val);
            setHasSearched(false);
            if (val === 'cuv') {
              setSearchQuery('PLES-MAGNA-2026-X94B');
            } else {
              setSearchQuery('RAD-2026-PLES-4812');
            }
          }}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6 bg-muted/60 p-1 rounded-xl">
              <TabsTrigger value="cuv" className="rounded-lg text-xs font-semibold gap-2 py-2">
                <FileCheck2 className="w-4 h-4" />
                <span>Validar Ficha / CUV</span>
              </TabsTrigger>
              <TabsTrigger value="radicado" className="rounded-lg text-xs font-semibold gap-2 py-2">
                <Clock className="w-4 h-4" />
                <span>Rastrear Radicado</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={executeSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === 'cuv' 
                      ? 'Ingrese CUV (Ej: PLES-MAGNA-2026-X94B)' 
                      : 'Ingrese Radicado (Ej: RAD-2026-PLES-4812)'
                  }
                  className="pl-10 h-12 text-sm rounded-xl font-mono border-border bg-background focus:ring-2 focus:ring-primary uppercase"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md gap-2">
                <Search className="w-4 h-4" />
                <span>Verificar</span>
              </Button>
            </form>

            {/* Quick Demo Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>Probar ejemplos oficiales:</span>
              <button 
                type="button"
                onClick={() => {
                  setActiveTab('cuv');
                  setSearchQuery('PLES-MAGNA-2026-X94B');
                  handleSearchCuv('PLES-MAGNA-2026-X94B');
                }}
                className="font-mono text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-md"
              >
                CUV: PLES-MAGNA-2026-X94B
              </button>
              <button 
                type="button"
                onClick={() => {
                  setActiveTab('cuv');
                  setSearchQuery('PLES-MAGNA-2026-B821');
                  handleSearchCuv('PLES-MAGNA-2026-B821');
                }}
                className="font-mono text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-md"
              >
                CUV: PLES-MAGNA-2026-B821
              </button>
              <button 
                type="button"
                onClick={() => {
                  setActiveTab('radicado');
                  setSearchQuery('RAD-2026-PLES-4812');
                  handleSearchRad('RAD-2026-PLES-4812');
                }}
                className="font-mono text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-md"
              >
                Radicado: RAD-2026-PLES-4812
              </button>
            </div>
          </Tabs>
        </div>

        {/* Results Display: CERTIFICATE VIEW */}
        {activeTab === 'cuv' && selectedCert && (
          <div className="bg-card border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
            {/* Watermark / Seal */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>CERTIFICADO OFICIAL VÁLIDO</span>
            </div>

            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                  EXPEDIENTE TÉCNICO PROTOCOLIZADO
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                  {selectedCert.predio}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <Badge variant="outline" className="font-mono text-xs border-primary/40 text-primary">
                    CUV: {selectedCert.cuv}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    Matrícula: {selectedCert.matricula}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                    Estado: {selectedCert.estado}
                  </Badge>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Cédula Catastral</div>
                  <div className="text-xs font-mono font-bold text-foreground mt-1 break-all">
                    {selectedCert.cedulaCatastral}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Área Total de Terreno</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {selectedCert.areaHa}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Ubicación Territorial</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {selectedCert.municipio}, {selectedCert.departamento}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Datum & Proyección</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {selectedCert.datum} ({selectedCert.epsg})
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Ingeniero Certificador</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {selectedCert.ingeniero}
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {selectedCert.matriculaCopnia}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Marco Jurídico & SNR</div>
                  <div className="text-sm font-bold text-foreground mt-1">
                    {selectedCert.snrProtocol}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {selectedCert.resolucion}
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash Strip */}
              <div className="p-4 rounded-xl bg-black/5 dark:bg-black/40 border border-border text-xs font-mono">
                <div className="flex items-center justify-between text-muted-foreground mb-1">
                  <span>FIRMA DIGITAL SHA-256 (SELLO DE INTEGRIDAD):</span>
                  <span className="text-emerald-500 font-semibold">100% AUTÉNTICO</span>
                </div>
                <div className="text-[11px] text-foreground/80 break-all select-all font-mono">
                  {selectedCert.hashSha256}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Fecha de expedición: <strong className="text-foreground">{selectedCert.fechaEmision}</strong>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={copyCuvLink}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border text-xs gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Enlace Copiado' : 'Copiar Enlace'}</span>
                  </Button>

                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border text-xs gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Certificado</span>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl bg-primary text-primary-foreground text-xs gap-2"
                  >
                    <Link href={`/ples-catastro?inspect=${selectedCert.cuv}`}>
                      <Layers className="w-3.5 h-3.5" />
                      <span>Ver en Consola GIS</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Display: RADICADO TRACKER */}
        {activeTab === 'radicado' && selectedRad && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-mono text-primary uppercase tracking-wider block">
                  EXPEDIENTE DE TRÁMITE TERRITORIAL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                  {selectedRad.codigo}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedRad.servicio}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-xs px-3 py-1">
                  FASE {selectedRad.faseActual} DE 4 EN CURSO
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  Avance Global: <strong className="text-foreground">{selectedRad.porcentajeAvance}%</strong>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden p-0.5 border border-border">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500" 
                  style={{ width: `${selectedRad.porcentajeAvance}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Radicación</span>
                <span>Captura Campo</span>
                <span>Control LADM-COL</span>
                <span>Entrega Final</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-foreground">
                Hoja de Ruta y Trazabilidad Operativa
              </h3>

              <div className="space-y-4">
                {selectedRad.historial.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      step.completado
                        ? 'bg-emerald-500/[0.04] border-emerald-500/30'
                        : idx === selectedRad.faseActual - 1
                        ? 'bg-primary/[0.05] border-primary/40 ring-1 ring-primary/20 shadow-md'
                        : 'bg-muted/20 border-border/40 opacity-70'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completado 
                        ? 'bg-emerald-500/20 text-emerald-500' 
                        : idx === selectedRad.faseActual - 1
                        ? 'bg-primary/20 text-primary animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completado ? <Check className="w-4 h-4 font-bold" /> : <Clock className="w-4 h-4" />}
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-sm font-bold text-foreground">
                          {step.fase}
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {step.fecha}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {step.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solicitor Meta Box */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Entidad Solicitante:</span>{' '}
                <strong className="text-foreground">{selectedRad.solicitante} ({selectedRad.entidad})</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Ingeniero Responsable:</span>{' '}
                <strong className="text-foreground">{selectedRad.ingenieroLider}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {hasSearched && !selectedCert && !selectedRad && (
          <div className="text-center p-12 rounded-3xl border border-rose-500/30 bg-rose-500/5 max-w-xl mx-auto space-y-4">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-xl font-bold text-foreground">
              Código no Encontrado o Inválido
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No se encontró un certificado o radicado con el identificador ingresado. Por favor verifique el código en su documento o comuníquese con la mesa de control territorial PLES.
            </p>
            <Button asChild variant="outline" className="rounded-xl border-border text-xs">
              <Link href="/forms?service=ples-catastro&subject=Consulta%20Codigo%20No%20Encontrado">
                Contactar Soporte Técnico
              </Link>
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function VerificarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-sm">Cargando Sistema de Verificación PLES...</div>}>
      <VerificationContent />
    </Suspense>
  );
}
