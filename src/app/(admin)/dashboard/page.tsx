// src/app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, ExternalLink, Settings, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard - PLES',
  description: 'Admin dashboard for PLES platform.',
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  linkText: string;
  disabled?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, href, linkText, disabled = false }) => (
  <Card className="hover:shadow-lg hover:border-primary transition-all flex flex-col group">
    <CardHeader className="flex-grow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
        </div>
        <div>
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button asChild className="w-full" disabled={disabled}>
        <Link href={href} target={href === '/' ? '_blank' : undefined}>
          {linkText}
          {!disabled && <ExternalLink className="ml-2 h-4 w-4" />}
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <LayoutDashboard className="h-8 w-8 text-primary"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido al panel de administración de PLES. Desde aquí puede gestionar el contenido del sitio web y el acceso de los usuarios.
            </p>
          </div>
      </div>
      

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <FeatureCard
          title="Gestión de Contenido"
          description="Edite y actualice varias secciones de contenido de su sitio web público, como el texto de la página de inicio."
          icon={FileText}
          href="/admin/content-management"
          linkText="Ir a Contenido"
        />
        <FeatureCard
          title="Gestión de Usuarios"
          description="Cree, vea y gestione cuentas de usuario y sus roles y permisos."
          icon={Users}
          href="/admin/users"
          linkText="Gestionar Usuarios"
        />
         <FeatureCard
          title="Configuración"
          description="Gestione la configuración global de la plataforma (próximamente)."
          icon={Settings}
          href="#"
          linkText="Configurar"
          disabled={true}
        />
         <FeatureCard
          title="Ver Sitio Público"
          description="Abra la página de inicio pública en una nueva pestaña para ver sus cambios en vivo."
          icon={ExternalLink}
          href="/"
          linkText="Abrir Sitio"
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
