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
import { AlertCircle, CheckCircle, ShoppingCart, Users, Workflow, Package } from 'lucide-react'; // Import icons

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

export default async function DashboardPage() {
  // Fetch data in parallel
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

  // Process data for charts
  const contactsBySource = countByKey(contacts, 'leadSource');
  const opportunitiesByStage = countByKey(opportunities, 'stage');
  const ordersByStatus = countByKey(orders, 'status');
  const processesByStatus = countByKey(processes, 'status');

  // Calculate Key Metrics
  const totalContacts = contacts.length;
  const totalOpportunities = opportunities.length;
  const openOpportunities = opportunities.filter(o => o.stage !== 'Closed Won' && o.stage !== 'Closed Lost').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => ['Pending', 'Processing', 'Awaiting Payment', 'Awaiting Shipment'].includes(o.status)).length;
  const runningProcesses = processes.filter(p => p.status === 'Running').length;
  const failedProcesses = processes.filter(p => p.status === 'Failed').length;
  const totalProducts = products.length;

  return (
    // Removed container mx-auto
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContacts}</div>
            <p className="text-xs text-muted-foreground">Total registered contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Opportunities</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openOpportunities}</div>
            <p className="text-xs text-muted-foreground">Out of {totalOpportunities} total</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
             <p className="text-xs text-muted-foreground">Products in catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Out of {totalOrders} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Processes</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningProcesses}</div>
             <p className="text-xs text-muted-foreground">Active BPM instances</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Processes</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{failedProcesses}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

      </div>

      {/* Charts Section */}
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
