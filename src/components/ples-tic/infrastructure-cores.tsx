'use client';

import React, { useState } from 'react';
import { 
  Server, Shield, Cpu, Network, Headphones, 
  CheckCircle2, ArrowRight, ExternalLink, Award, 
  HardDrive, Lock, Activity, Eye, FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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

export function InfrastructureCores() {
  const [activeCoreId, setActiveCoreId] = useState('core-1');
  const activeCore = coresData.find(c => c.id === activeCoreId) || coresData[0];

  return (
    <div id="infraestructura-cores" className="w-full bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden font-sans text-foreground">
      {/* Subtle ambient grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#009fe315_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60" 
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>ESTÁNDARES DE ALTA DISPONIBILIDAD TIER II & III</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Los 5 Cores de Infraestructura PLES
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            Ingeniería de misión crítica diseñada para garantizar continuidad operativa, seguridad de datos y rendimiento ininterrumpido en organizaciones de alta exigencia.
          </p>
        </div>

        {/* 5 Cores Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {coresData.map((core) => {
            const Icon = core.icon;
            const isActive = core.id === activeCoreId;
            return (
              <button
                key={core.id}
                onClick={() => setActiveCoreId(core.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {core.number}
                </span>
                <Icon className="w-4 h-4" />
                <span>{core.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Core Highlight Card */}
        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <activeCore.icon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
                  CORE {activeCore.number} • {activeCore.referenceCode}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                  {activeCore.title}
                </h4>
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-3 py-1 font-mono border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
              {activeCore.metric}
            </Badge>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground my-5 leading-relaxed font-light">
            {activeCore.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 my-6">
            {activeCore.specs.map((spec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  {spec}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Procedimientos alineados con normativas ISO 27001, TIA-568-C y RETIE</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild className="rounded-xl border-border">
                <a href="/brochureples/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                  <span>Ver Ficha Técnica Completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
              <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-xl shadow-md shadow-primary/20">
                <Link href="/forms?service=ples-tic&subject=Cotizacion%20Infraestructura">
                  <span>Cotizar este Core</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
