// src/app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ShieldCheck, ExternalLink } from 'lucide-react';
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
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, href, linkText }) => (
  <Card className="hover:shadow-lg hover:border-primary transition-all flex flex-col">
    <CardHeader className="flex-grow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button asChild className="w-full">
        <Link href={href}>
          {linkText}
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to the PLES administration panel. From here you can manage website content and user access.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <FeatureCard
          title="Content Management"
          description="Edit and update various content sections of your public website, like homepage text."
          icon={FileText}
          href="/admin/content-management"
          linkText="Go to Content"
        />
        <FeatureCard
          title="User Management"
          description="Create, view, and manage user accounts and their roles and permissions."
          icon={ShieldCheck}
          href="/admin/users"
          linkText="Manage Users"
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
