// src/app/modules/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Users, Package, Workflow, FileText, ShieldCheck, Layers } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Módulos de la Plataforma - PLES',
  description: 'Descubra los módulos integrados que componen nuestra plataforma: CRM, ERP, BPM, CMS y más, diseñados para una gestión integral y eficiente.',
};

const modules = [
  {
    icon: <Users className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
    title: 'CRM - Gestión de Relaciones con Clientes',
    description: 'Centralice la información de sus contactos y gestione el ciclo de vida de sus oportunidades de negocio, desde el prospecto hasta el cierre.',
    features: ['Gestión de Contactos', 'Seguimiento de Oportunidades', 'Integración con Formularios Web', 'Historial de Interacciones'],
    link: '/admin/crm'
  },
  {
    icon: <Package className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
    title: 'ERP - Planificación de Recursos Empresariales',
    description: 'Administre su catálogo de productos, controle el inventario y gestione los pedidos de manera eficiente para optimizar su cadena de suministro.',
    features: ['Gestión de Productos', 'Control de Inventario', 'Procesamiento de Órdenes', 'Integración con Oportunidades'],
    link: '/admin/erp/products'
  },
  {
    icon: <Workflow className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
    title: 'BPM - Gestión de Procesos de Negocio',
    description: 'Modele, automatice y monitoree sus flujos de trabajo clave. Obtenga visibilidad en tiempo real del estado de sus procesos para una mejora continua.',
    features: ['Monitoreo de Instancias', 'Automatización de Tareas', 'Gestión de Estados (Suspendido, Fallido)', 'Integración entre Módulos'],
    link: '/admin/bpm/processes'
  },
  {
    icon: <FileText className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
    title: 'CMS - Sistema de Gestión de Contenidos',
    description: 'Actualice fácilmente el contenido dinámico de su sitio web, como los mensajes principales de la página de inicio, sin necesidad de tocar el código.',
    features: ['Edición de Contenido en Vivo', 'Gestión de Textos e Imágenes', 'Control de Versiones (futuro)', 'Facilidad de Uso'],
    link: '/admin/content-management'
  },
    {
    icon: <ShieldCheck className="h-10 w-10 text-primary group-hover:text-primary-foreground" />,
    title: 'Gestión de Usuarios y Roles',
    description: 'Controle el acceso a la plataforma con un sistema granular de roles y permisos. Cree, modifique y elimine usuarios de forma segura.',
    features: ['Creación de Usuarios', 'Asignación de Roles', 'Permisos por Módulo', 'Autenticación Segura'],
    link: '/admin/users'
  },
];

export default function ModulesPage() {
  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block p-5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full mb-8 shadow-md">
                    <Layers className="h-12 w-12 md:h-16 md:w-16" />
                </div>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2 mb-6">
                    Nuestros Módulos Integrados
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                    Una plataforma unificada para una gestión 360°. Descubra cómo nuestros módulos de CRM, ERP, BPM y más, trabajan en conjunto para potenciar su organización.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    <Badge variant="default" className="text-md px-4 py-2 shadow-md">#GestiónIntegral</Badge>
                    <Badge variant="default" className="text-md px-4 py-2 shadow-md">#EficienciaOperativa</Badge>
                    <Badge variant="default" className="text-md px-4 py-2 shadow-md">#DatosCentralizados</Badge>
              </div>
            </div>
        </div>
      </section>

      {/* Modules Grid Section */}
      <section>
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <Link key={module.title} href={module.link} passHref legacyBehavior>
                <a className="block group hover:scale-105 transition-all duration-300 ease-in-out">
                  <Card className="h-full group-hover:shadow-xl group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground bg-card group-hover:animate-gradient group-hover:bg-[length:200%_200%]">
                    <CardHeader className="items-center text-center">
                        {module.icon}
                        <CardTitle className="text-xl group-hover:text-primary-foreground mt-4">{module.title}</CardTitle>
                        <CardDescription className="mt-1 group-hover:text-primary-foreground/90">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm font-semibold mb-2 text-foreground group-hover:text-primary-foreground">Funcionalidades Clave:</p>
                        <ul className="space-y-1 text-xs text-muted-foreground group-hover:text-primary-foreground/90">
                        {module.features.map(feature => (
                            <li key={feature}>{feature}</li>
                        ))}
                        </ul>
                         <div className="mt-6 text-right">
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-foreground">
                                Ir al Módulo <ArrowRight className="ml-1 h-4 w-4"/>
                            </span>
                          </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="text-center py-20 bg-primary text-primary-foreground animate-gradient bg-[length:200%_200%]">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <Layers className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Integrar y Optimizar?</h2>
            <p className="text-lg md:text-xl mb-10 opacity-90">
                Nuestra plataforma está diseñada para crecer con usted. Contáctenos para una demostración y descubra cómo podemos adaptar nuestros módulos a sus necesidades específicas.
            </p>
            <Button size="xl" variant="accent" className="text-lg px-10 py-4" asChild>
            <Link href="/forms?subject=Consulta%20Plataforma%20PLES">
                <span className="flex items-center">
                    Solicitar una Demostración <ArrowRight className="ml-3 h-5 w-5" />
                </span>
            </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
