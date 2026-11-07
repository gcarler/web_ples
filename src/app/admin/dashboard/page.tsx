// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, FileText, CheckCircle2, Clock, 
  AlertCircle, Search, Filter, ShieldCheck, QrCode, ArrowRight, 
  ExternalLink, Layers, Building2, Server, Download, Eye,
  RefreshCw, Check, MoreVertical, Sparkles, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface RadicadoRecord {
  id: string;
  codigo: string;
  solicitante: string;
  entidad: string;
  servicio: 'Catastro' | 'TIC' | 'Crea' | 'Consulting';
  fecha: string;
  montoEstimado: string;
  estado: 'NUEVO' | 'EN_CAMPO' | 'LADM_REVISION' | 'FINALIZADO';
  ingeniero: string;
}

const INITIAL_RADICADOS: RadicadoRecord[] = [
  {
    id: 'rad-1',
    codigo: '#RAD-2026-PLES-4812',
    solicitante: 'Alcaldía de Rionegro',
    entidad: 'Secretaría de Planeación',
    servicio: 'Catastro',
    fecha: '02 Nov 2026',
    montoEstimado: '$48,000,000 COP',
    estado: 'LADM_REVISION',
    ingeniero: 'Ing. Sergio Gómez Cardona'
  },
  {
    id: 'rad-2',
    codigo: '#RAD-2026-PLES-9104',
    solicitante: 'Inmobiliaria Los Andes',
    entidad: 'Gerencia de Proyectos',
    servicio: 'Catastro',
    fecha: '04 Nov 2026',
    montoEstimado: '$18,500,000 COP',
    estado: 'EN_CAMPO',
    ingeniero: 'Ing. Mateo Restrepo V.'
  },
  {
    id: 'rad-3',
    codigo: '#RAD-2026-PLES-2231',
    solicitante: 'Empresas Públicas de Guarne',
    entidad: 'Dirección de TI',
    servicio: 'TIC',
    fecha: '05 Nov 2026',
    montoEstimado: '$35,000,000 COP',
    estado: 'NUEVO',
    ingeniero: 'Por asignar'
  },
  {
    id: 'rad-4',
    codigo: '#RAD-2026-PLES-7820',
    solicitante: 'Hacienda El Remanso',
    entidad: 'Particular / Propietario',
    servicio: 'Catastro',
    fecha: '28 Oct 2026',
    montoEstimado: '$12,400,000 COP',
    estado: 'FINALIZADO',
    ingeniero: 'Ing. Sergio Gómez Cardona'
  },
  {
    id: 'rad-5',
    codigo: '#RAD-2026-PLES-3319',
    solicitante: 'Constructora del Oriente',
    entidad: 'Departamento de Topografía',
    servicio: 'Crea',
    fecha: '06 Nov 2026',
    montoEstimado: '$22,000,000 COP',
    estado: 'NUEVO',
    ingeniero: 'Por asignar'
  }
];

export default function DashboardPage() {
  const { toast } = useToast();
  const [radicados, setRadicados] = useState<RadicadoRecord[]>(INITIAL_RADICADOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');

  const filteredRadicados = radicados.filter((item) => {
    const matchesSearch = 
      item.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solicitante.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.entidad.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'TODOS' || item.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const changeStatus = (id: string, newStatus: RadicadoRecord['estado']) => {
    setRadicados(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, estado: newStatus };
      }
      return item;
    }));
    toast({
      title: 'Estado Actualizado',
      description: `El trámite ha pasado al estado: ${newStatus}`,
    });
  };

  const getStatusBadge = (estado: RadicadoRecord['estado']) => {
    switch (estado) {
      case 'NUEVO':
        return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">NUEVO</Badge>;
      case 'EN_CAMPO':
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">EN CAMPO (RTK/UAV)</Badge>;
      case 'LADM_REVISION':
        return <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">LADM-COL REVISIÓN</Badge>;
      case 'FINALIZADO':
        return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">FINALIZADO (CUV)</Badge>;
    }
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <span>CENTRO DE CONTROL OPERACIONAL • PLES S.A.S.</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            Consola de Administración Central
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestione radicados institucionales, certificados catastrales CUV y supervisión en tiempo real de la plataforma.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="rounded-xl border-border text-xs gap-2">
            <Link href="/ples-catastro#estimador">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>Estimador Catastro</span>
            </Link>
          </Button>

          <Button asChild size="sm" className="rounded-xl bg-primary text-primary-foreground text-xs gap-2">
            <Link href="/ples-tic#estimador">
              <Server className="w-3.5 h-3.5" />
              <span>Estimador TIC</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border border-border/80 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Radicados en Curso
            </CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground font-mono">18</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              4 pendientes de asignación de cuadrilla
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/80 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Certificados CUV Activos
            </CardTitle>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">142</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              100% validados bajo EPSG:9377
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/80 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Consultas Ciudadanas
            </CardTitle>
            <QrCode className="w-4 h-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground font-mono">1,280</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Verificaciones de autenticidad este mes
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/80 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Disponibilidad Cloud
            </CardTitle>
            <Server className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground font-mono">99.98%</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              Neon Serverless • TLS 1.3
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Backoffice Section: Bandeja de Radicados */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Bandeja de Radicados y Solicitudes Institucionales
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Solicitudes recibidas desde los formularios en línea y el cotizador técnico
            </p>
          </div>

          {/* Search and Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar código o solicitante..."
                className="pl-8 h-9 text-xs rounded-xl font-mono w-48 sm:w-56"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl border-border gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  <span>{statusFilter === 'TODOS' ? 'Todos los Estados' : statusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter('TODOS')}>Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('NUEVO')}>Nuevos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('EN_CAMPO')}>En Campo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('LADM_REVISION')}>LADM-COL Revisión</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('FINALIZADO')}>Finalizados</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Radicados Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-muted/60 text-muted-foreground uppercase font-mono text-[11px] border-b border-border">
              <tr>
                <th className="py-3 px-4">Radicado</th>
                <th className="py-3 px-4">Entidad / Solicitante</th>
                <th className="py-3 px-4">División</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Presupuesto</th>
                <th className="py-3 px-4">Estado Operativo</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRadicados.map((rad) => (
                <tr key={rad.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                    <span className="text-primary flex items-center gap-1.5">
                      {rad.codigo}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-foreground">{rad.solicitante}</div>
                    <div className="text-[11px] text-muted-foreground">{rad.entidad}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-muted-foreground">PLES {rad.servicio}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-muted-foreground">
                    {rad.fecha}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-foreground">
                    {rad.montoEstimado}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(rad.estado)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-xs">
                        <DropdownMenuItem onClick={() => changeStatus(rad.id, 'EN_CAMPO')}>
                          Mover a: En Campo (RTK)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeStatus(rad.id, 'LADM_REVISION')}>
                          Mover a: LADM-COL Revisión
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeStatus(rad.id, 'FINALIZADO')}>
                          Mover a: Finalizado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Quick Access Tools Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl border border-border/80 hover:border-primary/50 transition-all p-2 group">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Gestión de Contenido</CardTitle>
                <CardDescription className="text-xs">Edite secciones y textos del sitio público</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" className="w-full rounded-xl text-xs">
              <Link href="/admin/content-management">
                Ir a Contenido <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/80 hover:border-primary/50 transition-all p-2 group">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Gestión de Usuarios</CardTitle>
                <CardDescription className="text-xs">Administre cuentas, roles y accesos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" className="w-full rounded-xl text-xs">
              <Link href="/admin/users">
                Gestionar Usuarios <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border/80 hover:border-primary/50 transition-all p-2 group">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Portal Catastro & GIS</CardTitle>
                <CardDescription className="text-xs">Inspección de capas y simulador predial</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm" className="w-full rounded-xl text-xs">
              <Link href="/ples-catastro" target="_blank">
                Abrir Portal <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
