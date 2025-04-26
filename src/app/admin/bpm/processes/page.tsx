// src/app/admin/bpm/processes/page.tsx
import { getProcessInstances } from '@/app/actions/bpm-actions'; // Create this action
import { ProcessInstanceDataTable } from '@/components/bpm/process-instance-data-table'; // Create this component
import { processInstanceColumns } from '@/components/bpm/process-instance-columns'; // Create this
import { Card, CardContent } from '@/components/ui/card';
// Import Button, Link, PlusCircle if adding manual process start functionality

export const metadata = {
  title: 'BPM Process Instances - PLES Admin',
  description: 'Monitor the status of business processes.',
};

export default async function BpmProcessesPage() {
  const processInstances = await getProcessInstances();

  return (
    <div className="container mx-auto py-10 space-y-6">
       <div className="flex justify-between items-center">
         <div>
             <h1 className="text-3xl font-bold tracking-tight">BPM Process Instances</h1>
             <p className="text-muted-foreground">
                 Monitor running, completed, and failed business process workflows.
             </p>
         </div>
        {/* Optional: Add Button to manually start a process (less common for end-users) */}
        {/* <Button asChild>
            <Link href="/admin/bpm/processes/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Start Process
            </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg border">
        <CardContent className="pt-6">
          {processInstances.length > 0 ? (
            <ProcessInstanceDataTable columns={processInstanceColumns} data={processInstances} />
          ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No process instances found.</p>
                 <p className="mt-2 text-sm text-muted-foreground">
                    Processes triggered by system events (like Opportunity Won) will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
