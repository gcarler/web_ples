'use client';

import React, { useState, useEffect } from 'react';
import { 
  Server, Shield, Cpu, Network, Terminal, Activity, 
  CheckCircle2, ArrowRight, Zap, RefreshCw, Lock, 
  Layers, HardDrive, Database, Globe, Play, Flame, Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface NodeSpec {
  id: string;
  name: string;
  category: string;
  latency: string;
  status: 'OPTIMAL' | 'SECURE' | 'RUNNING';
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

const NODES: NodeSpec[] = [
  {
    id: 'edge',
    name: 'Edge CDN & WAF Anti-DDoS',
    category: 'Capa Perimetral',
    latency: '8 ms',
    status: 'SECURE',
    description: 'Filtrado inteligente perimetral de tráfico malicioso, mitigación de ataques L3/L4/L7 y distribución de contenido estático global con TLS 1.3.',
    tech: ['Cloudflare Enterprise', 'WAF Custom Rules', 'TLS 1.3', 'HTTP/3 Quic'],
    metrics: [
      { label: 'Mitigación DDoS', value: '100% Activa' },
      { label: 'Caché Hit Ratio', value: '94.2%' },
      { label: 'Certificado SSL', value: 'ECDSA 256-bit' },
    ]
  },
  {
    id: 'gateway',
    name: 'Zero-Trust API Gateway & IAM',
    category: 'Gobernanza & Auth',
    latency: '12 ms',
    status: 'OPTIMAL',
    description: 'Gestión federada de identidades, autenticación con JWT cifrado, control de acceso basado en roles (RBAC) y limitación de tasa contra ataques de fuerza bruta.',
    tech: ['NextAuth / Drizzle', 'OAuth 2.0 / OIDC', 'Rate Limiting', 'AES-256 Tokens'],
    metrics: [
      { label: 'Políticas Zero-Trust', value: 'Enforzadas' },
      { label: 'Throughput', value: '4,500 req/s' },
      { label: 'Auditoría Accesos', value: 'Log Streaming' },
    ]
  },
  {
    id: 'compute',
    name: 'Cluster de Cómputo Standalone',
    category: 'Capa de Aplicación',
    latency: '15 ms',
    status: 'RUNNING',
    description: 'Renderizado reactivo con Next.js 15 compilado en standalone, microservicios asíncronos y orquestación de tareas de alta concurrencia.',
    tech: ['Next.js 15 Standalone', 'Node.js 22 LTS', 'Phusion Passenger', 'Docker / cgroups'],
    metrics: [
      { label: 'Uptime SLA', value: '99.98%' },
      { label: 'Uso de Memoria', value: 'Bajo Demanda' },
      { label: 'Concurrencia', value: 'Alta Escalabilidad' },
    ]
  },
  {
    id: 'ai',
    name: 'Pipeline IA & Genkit Engine',
    category: 'Inteligencia Aplicada',
    latency: '24 ms',
    status: 'OPTIMAL',
    description: 'Integración de modelos fundacionales de Google AI y Genkit para extracción semántica de datos, asistentes conversacionales e indexación vectorial.',
    tech: ['Google Gemini Pro', 'Genkit SDK', 'Nomic Embeddings', 'RAG Pipeline'],
    metrics: [
      { label: 'Inferencia', value: 'Serverless Cloud' },
      { label: 'Tokens Procesados', value: 'Tiempo Real' },
      { label: 'Seguridad de Datos', value: 'Zero Data Retention' },
    ]
  },
  {
    id: 'db',
    name: 'Neon Serverless PostgreSQL & PostGIS',
    category: 'Capa de Persistencia',
    latency: '14 ms',
    status: 'SECURE',
    description: 'Base de datos relacional serverless con escalado elástico inmediato, consultas espaciales indexadas en PostGIS y conexión HTTP sin agotamiento de sockets.',
    tech: ['Neon PostgreSQL 16+', 'PostGIS Spatial', 'Drizzle ORM', 'SSL Require'],
    metrics: [
      { label: 'Pool de Conexiones', value: 'Ilimitado (HTTP)' },
      { label: 'Cifrado en Reposo', value: 'AES-256' },
      { label: 'Backups Continuos', value: 'Point-in-Time (PITR)' },
    ]
  }
];

export function CloudMeshConsole() {
  const [activeNodeId, setActiveNodeId] = useState<string>('edge');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'sys_init: Inicializando cluster PLES TIC Cloud Mesh v2.4...',
    'net_edge: Cloudflare WAF perimetral activo [TLS 1.3 / AES-256-GCM]',
    'iam_auth: Zero-Trust Identity Provider sincronizado con Neon DB',
    'db_neon: Conexión HTTP serverless establecida con PostgreSQL 16+',
    'gis_postgis: Módulos de indexación espacial EPSG:9377 habilitados',
    'telemetry: Monitor de latencia global activo. SLA 99.98% confirmado.'
  ]);
  const [isSimulatingStress, setIsSimulatingStress] = useState<boolean>(false);

  const activeNode = NODES.find(n => n.id === activeNodeId) || NODES[0];

  // Live telemetry log simulation
  useEffect(() => {
    const events = [
      'waf_monitor: 1,420 peticiones perimetrales analizadas. 0 amenazas detectadas.',
      'neon_pool: Query ejecutada en 11ms vía Drizzle ORM [HTTP Serverless].',
      'api_gateway: Token JWT verificado para usuario institucional.',
      'genkit_core: Flujo de inferencia IA completado satisfactoriamente.',
      'sys_health: Consumo de recursos óptimo en contenedor standalone.',
      'postgis_index: Verificación de coordenadas MAGNA-SIRGAS validada.'
    ];

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTerminalLogs(prev => [
        `[${timestamp}] ${randomEvent}`,
        ...prev.slice(0, 5)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerStressTest = () => {
    setIsSimulatingStress(true);
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [
      `[${timestamp}] STRESS TEST: Simulando ráfaga de 10,000 req/s sobre API Gateway...`,
      `[${timestamp}] WAF: Tráfico balanceado con éxito a través de nodos edge.`,
      `[${timestamp}] Neon DB: Escalado automático elástico verificado (0 caídas).`,
      ...prev.slice(0, 4)
    ]);
    setTimeout(() => {
      setIsSimulatingStress(false);
    }, 2000);
  };

  return (
    <div className="w-full bg-[#070D18] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden font-sans text-white">
      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #00D2FF 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <Badge variant="outline" className="text-emerald-300 border-emerald-500/30 bg-emerald-500/10 text-xs uppercase tracking-wider font-mono">
              Consola de Arquitectura PLES TIC
            </Badge>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">• Topología Zero-Trust</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Malla Tecnológica & Resiliencia Cloud</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl font-light">
            Infraestructura elástica de grado institucional, desacoplada y protegida bajo estándares internacionales de ciberseguridad (ISO 27001, TLS 1.3).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={triggerStressTest}
            disabled={isSimulatingStress}
            size="sm"
            className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-200 text-xs font-mono rounded-xl gap-2 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingStress ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isSimulatingStress ? 'Ejecutando Test...' : 'Simular Resiliencia'}</span>
          </Button>

          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-[#009FE3] to-[#0077b6] hover:from-[#00A8F3] hover:to-[#0088cc] text-white text-xs font-semibold rounded-xl gap-1.5 shadow-lg shadow-cyan-950/50"
          >
            <Link href="/forms?service=ples-tic&subject=Solicitud%20Arquitectura%20Tecnologica%20Empresarial">
              <span>Cotizar Arquitectura</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
        
        {/* Left: Interactive Topology Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1 mb-1">
            <span>NODOS ACTIVOS EN PRODUCCIÓN</span>
            <span className="text-cyan-400">LATENCIA P99</span>
          </div>

          {NODES.map((node) => {
            const isSelected = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border-cyan-400/60 shadow-lg shadow-cyan-950/80 ring-1 ring-cyan-400/30'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-[#00D2FF] border border-cyan-400/40' 
                      : 'bg-white/5 text-slate-400 group-hover:text-white border border-white/5'
                  }`}>
                    {node.id === 'edge' && <Globe className="w-5 h-5" />}
                    {node.id === 'gateway' && <Shield className="w-5 h-5" />}
                    {node.id === 'compute' && <Server className="w-5 h-5" />}
                    {node.id === 'ai' && <Cpu className="w-5 h-5" />}
                    {node.id === 'db' && <Database className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400/80">
                      {node.category}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {node.name}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {node.latency}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase">
                    {node.status}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Node Inspector & Live Telemetry Terminal (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Active Node Detail Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-md shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  {activeNode.category}
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {activeNode.name}
                </h4>
              </div>
              <Badge className="bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-mono text-xs px-3 py-1">
                STATUS: {activeNode.status}
              </Badge>
            </div>

            <p className="text-sm text-slate-200 mt-4 leading-relaxed font-light">
              {activeNode.description}
            </p>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-3 my-5">
              {activeNode.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                  <div className="text-[11px] font-mono text-slate-400 truncate">
                    {m.label}
                  </div>
                  <div className="text-sm font-bold text-cyan-300 mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack badges */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2">
                Tecnologías & Protocolos Integrados:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNode.tech.map((t) => (
                  <span 
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Terminal */}
          <div className="rounded-2xl bg-[#030712] border border-white/10 p-4 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-300">TELEMETRÍA EN VIVO (EVENT STREAM)</span>
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                STREAMING
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300 font-mono text-[11px] leading-relaxed min-h-[110px]">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-cyan-400 select-none">&gt;</span>
                  <span className={index === 0 ? 'text-cyan-200 font-medium' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Security Compliance Strip */}
      <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-400">Gobernanza de Datos</div>
          <div className="text-sm font-bold text-white mt-1">ISO / IEC 27001</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-400">Cifrado de Tránsito</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">TLS 1.3 / AES-256</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-400">Habeas Data (COL)</div>
          <div className="text-sm font-bold text-white mt-1">Ley 1581 de 2012</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-xs text-slate-400">Resiliencia de Red</div>
          <div className="text-sm font-bold text-cyan-300 mt-1">99.98% SLA Activo</div>
        </div>
      </div>
    </div>
  );
}
