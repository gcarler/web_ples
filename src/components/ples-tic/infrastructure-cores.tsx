'use client';

import React, { useState } from 'react';
import { 
  Server, Shield, Cpu, Network, Headphones, 
  CheckCircle2, ArrowRight, ExternalLink, Award, 
  HardDrive, Lock, Activity, Eye, FileCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const coresData = [
  {
    id: 'core-1',
    number: '01',
    icon: Cpu,
    title: 'Cómputo Corporativo & Endpoints de Misión Crítica',
    tagline: 'Continuidad operativa y rendimiento de grado empresarial',
    description: 'Aprovisionamiento, homologación y despliegue masivo de estaciones de trabajo, laptops ejecutivas y terminales de alta disponibilidad para entornos corporativos, clínicos e industriales.',
    specs: [
      'Desktops empresariales y laptops con certificación de ciclo 24/7',
      'Despliegue estandarizado de SO corporativo y políticas Zero-Trust',
      'Homologación previa de hardware y gestión proactiva de garantías',
      'Gobernanza centralizada de endpoints y hardening de sistemas'
    ],
    metric: '2,500+ Endpoints Homologados',
    referenceCode: 'CORE-ENDPOINTS-PRO'
  },
  {
    id: 'core-2',
    number: '02',
    icon: Eye,
    title: 'Seguridad Electrónica & CCTV Biométrico Inteligente',
    tagline: 'Vigilancia de ultra alta definición con analítica perimetral',
    description: 'Sistemas convergentes de videovigilancia IP 4K con tecnología DarkFighter y ColorVu, combinados con control de acceso biométrico facial y detección de vivacidad anti-spoofing.',
    specs: [
      'Cámaras IP 4K con visión nocturna a color y analítica perimetral IA',
      'NVRs redundantes de grado empresarial con arreglos RAID ininterrumpidos',
      'Control de acceso biométrico facial con verificación anti-spoofing',
      'Integración nativa con torniquetes, electroimanes y sistemas de alarma'
    ],
    metric: '4K DarkFighter / 0 Latencia',
    referenceCode: 'CORE-CCTV-BIO'
  },
  {
    id: 'core-3',
    number: '03',
    icon: Network,
    title: 'Conectividad, Redes Certificadas Fluke & Fibra Óptica',
    tagline: 'Topología física de datos con certificación Fluke Networks',
    description: 'Ingeniería de cableado estructurado Categoría 6A / Fibra Óptica monomodo y multimodo 10Gbps con certificación punto a punto mediante Fluke DSX-8000 y respaldo eléctrico online de alta autonomía.',
    specs: [
      'Cableado Cat6A Panduit / Siemon certificado con Fluke DSX-8000',
      'Backbones de fibra óptica 10Gbps y canalización perimetral blindada',
      'Conmutación L2/L3 PoE+ gestionada y segmentación VLAN de alta seguridad',
      'Racks autosoportados y centros de potencia UPS online APC / Vertiv'
    ],
    metric: '10 Gbps / Certificación Fluke',
    referenceCode: 'CORE-NET-FLUKE'
  },
  {
    id: 'core-4',
    number: '04',
    icon: Lock,
    title: 'Ciberseguridad Perimetral & Backup Inmutable 3-2-1',
    tagline: 'Blindaje perimetral y recuperación garantizada ante desastres',
    description: 'Defensa en profundidad mediante Next-Generation Firewalls (Fortinet/Cisco), inspección TLS profunda y arquitectura de respaldo inmutable 3-2-1 inmune a ransomware con RTO y RPO mínimos.',
    specs: [
      'Next-Gen Firewalls (NGFW) con IPS, filtrado web e inspección SSL/TLS profunda',
      'Estrategia de respaldo 3-2-1 con copias inmutables en nube y almacenamiento local',
      'Planes de continuidad del negocio (BCP) y recuperación ante desastres (DRP)',
      'Gestión de licenciamiento corporativo Microsoft 365 y protección XDR'
    ],
    metric: 'SLA RTO < 2h / RPO < 15m',
    referenceCode: 'CORE-CYBER-SEC'
  },
  {
    id: 'core-5',
    number: '05',
    icon: Headphones,
    title: 'Servicios Gestionados TI & Mesa de Ayuda Especializada',
    tagline: 'Acompañamiento técnico 24/7 con SLA garantizado de hasta 99.98%',
    description: 'Centro de operaciones de red (NOC) y mesa de ayuda con niveles de soporte escalonado N1, N2 y N3. Monitoreo predictivo de infraestructura para anticipar y neutralizar incidencias antes de impactar el negocio.',
    specs: [
      'Mesa de soporte multicanal con acuerdos de nivel de servicio (SLA) rigurosos',
      'Soporte técnico escalonado N1 (resolución), N2 (infraestructura), N3 (arquitectura)',
      'Monitoreo 24/7 en tiempo real de disponibilidad, consumo y ancho de banda',
      'Mantenimientos preventivos programados bajo modelo eficiente OpEx'
    ],
    metric: '99.98% SLA / NOC 24/7',
    referenceCode: 'CORE-MANAGED-NOC'
  }
];

const referenceProjects = [
  {
    code: 'PROY-DATACENTER-019',
    title: 'Normalización de Datacenter Tier II',
    scope: 'Adecuación de centro de cómputo, climatización de precisión de 5 TR, UPS modular de 40kVA con bypass estático y certificación de cableado troncal.',
    sector: 'Institucional / Gubernamental',
    impact: 'Disponibilidad 99.99% lograda sin interrupción de servicios'
  },
  {
    code: 'PROY-CLINIC-052',
    title: 'SD-WAN & Convergencia Médica Multi-Sede',
    scope: 'Interconexión de 14 sedes asistenciales con redundancia activa-activa LTE/Fibra, QoS priorizado para imágenes diagnósticas DICOM y telefonía IP.',
    sector: 'Salud / IPS de Alta Complejidad',
    impact: 'Reducción del 45% en tiempos de consulta de historias clínicas'
  },
  {
    code: 'PROY-CORP-095',
    title: 'Infraestructura de Edificio Corporativo 5 Niveles',
    scope: 'Despliegue de 380 puestos de trabajo Cat6A certificados Fluke, backbone de fibra 10G OM4, control de acceso peatonal y vehicular.',
    sector: 'Corporativo / Financiero',
    impact: '100% de puntos certificados con margen de diafonía > 6dB'
  },
  {
    code: 'PROY-CCTV-044',
    title: 'Circuito Cerrado 4K & Analítica LPR',
    scope: '64 cámaras 4K DarkFighter, analítica perimetral por detección térmica y reconocimiento de matrículas vehiculares en accesos de alta congestión.',
    sector: 'Logística & Puertos',
    impact: 'Cero puntos ciegos en 12,000 m² de patios y bodegas'
  },
  {
    code: 'PROY-SALUD-084',
    title: 'Renovación Tecnológica Asistencial',
    scope: 'Despliegue simultáneo de 210 estaciones de cómputo médico, sanitización de imagen, aislamiento VLAN de telemetría y mesa de soporte in-situ.',
    sector: 'Red Hospitalaria Regional',
    impact: 'Transición sin suspensión de atención a pacientes'
  }
];

export function InfrastructureCores() {
  const [activeCoreId, setActiveCoreId] = useState('core-1');
  const activeCore = coresData.find(c => c.id === activeCoreId) || coresData[0];
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-background border-y border-border/50 relative overflow-hidden">
      {/* Subtle ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#009fe308_1px,transparent_1px),linear-gradient(to_bottom,#009fe308_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            <Award className="w-4 h-4" />
            <span>ESTÁNDARES DE ALTA DISPONIBILIDAD TIER II & III</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary py-1">
            Los 5 Cores de Infraestructura PLES
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ingeniería de misión crítica diseñada para garantizar continuidad operativa, seguridad de datos y rendimiento ininterrumpido en organizaciones de alta exigencia.
          </p>
        </div>

        {/* 5 Cores Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {coresData.map((core) => {
            const Icon = core.icon;
            const isActive = core.id === activeCoreId;
            return (
              <button
                key={core.id}
                onClick={() => setActiveCoreId(core.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {core.number}
                </span>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{core.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Core Highlight Card */}
        <div className="max-w-5xl mx-auto mb-20">
          <Card className="border-primary/30 bg-card/80 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-5">
              <activeCore.icon className="w-64 h-64 text-primary" />
            </div>

            <CardHeader className="relative z-10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                    <activeCore.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
                      CORE {activeCore.number} • {activeCore.referenceCode}
                    </span>
                    <CardTitle className="text-2xl sm:text-3xl font-bold mt-1">
                      {activeCore.title}
                    </CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs px-3 py-1 font-mono border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                  {activeCore.metric}
                </Badge>
              </div>
              <CardDescription className="text-base text-foreground/80 mt-3">
                {activeCore.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6 pt-2">
              <div className="grid sm:grid-cols-2 gap-3">
                {activeCore.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/40 border border-border/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileCheck className="w-4 h-4 text-primary" />
                  <span>Procedimientos alineados con normativas ISO 27001, TIA-568-C y RETIE</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/brochureples/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                      <span>Ver Ficha Técnica Completa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href="/forms?service=ples-tic&subject=Cotizacion%20Infraestructura">
                      <span>Cotizar este Core</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reference Projects Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Proyectos de Referencia & Casos de Éxito
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Implementaciones verificadas en producción con métricas duras de desempeño y cumplimiento contractual estricto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {referenceProjects.map((proj) => (
              <Card key={proj.code} className="hover:border-primary/50 transition-all duration-300 flex flex-col justify-between bg-card group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {proj.code}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {proj.sector}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {proj.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed line-clamp-3 mt-1">
                    {proj.scope}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    <span className="font-semibold block mb-0.5">Resultado Clave:</span>
                    {proj.impact}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Direct Brochure CTA Card */}
            <Card className="bg-gradient-to-br from-primary/15 via-accent/10 to-transparent border-primary/40 flex flex-col justify-between p-6">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground w-fit">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  Catálogo Técnico Interactivo
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Descarga o explora en línea la especificación detallada de equipos, tiempos de respuesta de mesa de ayuda y matrices de escalamiento.
                </p>
              </div>
              <Button size="sm" variant="default" asChild className="mt-6 w-full">
                <a href="/brochureples/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                  <span>Abrir Catálogo PLES</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
