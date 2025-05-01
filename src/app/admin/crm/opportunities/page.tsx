// src/app/admin/crm/opportunities/page.tsx
import { getOpportunities } from '@/app/actions/crm-actions';
import { OpportunityDataTable } from '@/components/crm/opportunity-data-table'; // Create this component
import { opportunityColumns } from '@/components/crm/opportunity-columns'; // Create this file
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'CRM Opportunities - PLES Admin',
  description: 'View and manage sales opportunities.',
};

export default async function OpportunitiesAdminPage() {
  const opportunities = await getOpportunities();

  return (
    // Removed container mx-auto
    <div className="py-10 space-y-6">
      <div className="flex justify-between items-center">
         <div>
             <h1 className="text-3xl font-bold tracking-tight">CRM Opportunities</h1>
             <p className="text-muted-foreground">
                 Track and manage potential sales deals.
             </p>
         </div>
        {/* Optional: Add Button to create new opportunity */}
        {/* <Button asChild>
            <Link href="/admin/crm/opportunities/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Opportunity
            </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg border">
        <CardContent className="pt-6">
          {opportunities.length > 0 ? (
            <OpportunityDataTable columns={opportunityColumns} data={opportunities} />
          ) : (
             <div className="text-center py-10">
                <p className="text-muted-foreground">No opportunities found.</p>
                 <p className="mt-2 text-sm text-muted-foreground">
                    Opportunities created from leads or manually will appear here.
                </p>
                 {/* Optional: Link to add opportunity */}
                 {/* <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href="/admin/crm/opportunities/new">Add Opportunity</Link>
                 </Button> */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
