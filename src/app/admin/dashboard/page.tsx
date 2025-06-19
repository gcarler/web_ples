
// src/app/admin/dashboard/page.tsx
import { getContacts } from '@/app/actions/crm-actions';
import { getOpportunities } from '@/app/actions/crm-actions';
import { getOrders } from '@/app/actions/erp-actions';
import { getProducts } from '@/app/actions/erp-actions';
import { getProcessInstances } from '@/app/actions/bpm-actions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactsBySourceChart } from '@/components/dashboard/contacts-by-source-chart';
import { OpportunitiesByStageChart } from '@/components/dashboard/opportunities-by-stage-chart';
import { OrdersByStatusChart } from '@/components/dashboard/orders-by-status-chart';
import { ProcessesByStatusChart } from '@/components/dashboard/processes-by-status-chart';
import { AlertCircle, CheckCircle, ShoppingCart, Users, Workflow, Package, ExternalLink } from 'lucide-react'; // Import icons
import Link from 'next/link'; // Import Link

export const metadata = {
  title: 'Admin Dashboard - PLES',
  description: 'Overview of CRM, ERP, and BPM data.',
};

// Helper function to count occurrences by key
function countByKey<T>(items: T[], key: keyof T): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  items.forEach(item => {
    const value = String(item[key] ?? 'Unknown');
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  href: string;
  iconColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon: Icon, href, iconColor }) => (
  <Link href={href} passHref>
    <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor || 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default async function DashboardPage() {
  const [
    contacts,
    opportunities,
    orders,
    processes,
    products
  ] = await Promise.all([
    getContacts(),
    getOpportunities(),
    getOrders(),
    getProcessInstances(),
    getProducts()
  ]);

  const contactsBySource = countByKey(contacts, 'leadSource');
  const opportunitiesByStage = countByKey(opportunities, 'stage');
  const ordersByStatus = countByKey(orders, 'status');
  const processesByStatus = countByKey(processes, 'status');

  const totalContacts = contacts.length;
  const totalOpportunities = opportunities.length;
  const openOpportunities = opportunities.filter(o => o.stage !== 'Closed Won' && o.stage !== 'Closed Lost').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => ['Pending', 'Processing', 'Awaiting Payment', 'Awaiting Shipment'].includes(o.status)).length;
  const runningProcesses = processes.filter(p => p.status === 'Running').length;
  const failedProcesses = processes.filter(p => p.status === 'Failed').length;
  const totalProducts = products.length;

  return (
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Contacts" value={totalContacts} description="Total registered contacts" icon={Users} href="/admin/crm" />
        <MetricCard title="Open Opportunities" value={openOpportunities} description={`Out of ${totalOpportunities} total`} icon={CheckCircle} href="/admin/crm/opportunities" />
        <MetricCard title="Total Products" value={totalProducts} description="Products in catalog" icon={Package} href="/admin/erp/products" />
        <MetricCard title="Pending Orders" value={pendingOrders} description={`Out of ${totalOrders} total`} icon={ShoppingCart} href="/admin/erp/orders" />
        <MetricCard title="Running Processes" value={runningProcesses} description="Active BPM instances" icon={Workflow} href="/admin/bpm/processes" />
        <MetricCard title="Failed Processes" value={failedProcesses} description="Requires attention" icon={AlertCircle} href="/admin/bpm/processes" iconColor="text-destructive" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="shadow-lg border col-span-1">
          <CardHeader>
            <CardTitle>Contacts by Lead Source</CardTitle>
             <CardDescription>Distribution of contact origins.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ContactsBySourceChart data={contactsBySource} />
          </CardContent>
        </Card>

        <Card className="shadow-lg border col-span-1">
          <CardHeader>
            <CardTitle>Opportunities by Stage</CardTitle>
             <CardDescription>Current sales pipeline status.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <OpportunitiesByStageChart data={opportunitiesByStage} />
          </CardContent>
        </Card>

        <Card className="shadow-lg border col-span-1">
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
            <CardDescription>Overview of order fulfillment stages.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <OrdersByStatusChart data={ordersByStatus} />
          </CardContent>
        </Card>

        <Card className="shadow-lg border col-span-1">
          <CardHeader>
            <CardTitle>Process Instances by Status</CardTitle>
            <CardDescription>Health of automated business processes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProcessesByStatusChart data={processesByStatus} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
