// src/app/cotizador/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Server, ArrowRight, ArrowLeft, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CotizadorHubPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>ESTIMADORES PARAMÉTRICOS INSTITUCIONALES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Seleccione el Estimador Técnico
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
            Hemos integrado las herramientas de estimación directamente en los portales especializados de cada división.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {/* Option 1: Catastro & Topografía */}
          <Card className="rounded-2xl border-2 border-primary/20 hover:border-primary transition-all shadow-md group">
            <CardHeader className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Building2 className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-bold">Cartografía & Topografía</CardTitle>
              <CardDescription className="text-xs">
                Levantamientos GNSS-RTK, fotogrametría aérea con drones UAV, modelos DEM y estructuración LADM-COL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground text-xs gap-1.5">
                <Link href="/ples-catastro#estimador">
                  <span>Ir al Estimador Catastral</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Option 2: Software & Cloud TIC */}
          <Card className="rounded-2xl border-2 border-primary/20 hover:border-primary transition-all shadow-md group">
            <CardHeader className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Server className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-bold">Soluciones TIC & Cloud</CardTitle>
              <CardDescription className="text-xs">
                Plataformas WebGIS, sistemas cloud escalables, aplicaciones móviles de campo y auditorías de ciberseguridad ISO 27001.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground text-xs gap-1.5">
                <Link href="/ples-tic#estimador">
                  <span>Ir al Estimador TIC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              <span>Volver a la página principal</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
