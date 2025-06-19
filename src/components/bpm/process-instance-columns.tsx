
// src/components/bpm/process-instance-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProcessInstanceFirestore, ProcessStatus, ProcessStatusSchema } from "@/lib/models/bpm"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { CheckCircle, Clock, Cog, ExternalLink, PlayCircle, Siren, Workflow, XCircle, PackageIcon, UsersIcon } from "lucide-react" // Added PackageIcon, UsersIcon
import Link from "next/link"
import { Button } from "../ui/button"
import { resumeProcessInstance } from "@/app/actions/bpm-actions"
import { useToast } from "@/hooks/use-toast"
import React from "react"
import { cn } from "@/lib/utils"

const ProcessStatusPill = ({ status }: { status: ProcessStatus }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let Icon = Clock;
  let className = '';

  switch (status) {
    case 'Not Started': variant = 'secondary'; Icon = PlayCircle; break;
    case 'Running': variant = 'default'; Icon = Cog; className = "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50 animate-pulse"; break;
    case 'Suspended': variant = 'outline'; Icon = Clock; className = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50"; break;
    case 'Completed': variant = 'default'; Icon = CheckCircle; className = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50"; break;
    case 'Failed': variant = 'destructive'; Icon = Siren; break;
    case 'Cancelled': variant = 'destructive'; Icon = XCircle; className = "opacity-70"; break;
    default: variant = 'secondary'; Icon = Clock;
  }

  return (
    <Badge variant={variant} className={cn(`capitalize px-2.5 py-0.5 text-xs w-[120px] justify-start`, className)}>
      <Icon className="mr-1 h-3 w-3" />
      {status}
    </Badge>
  );
};

const ProcessInstanceRowActions = ({ row }: { row: any }) => {
    const instance = row.original as ProcessInstanceFirestore;
    const { toast } = useToast();
    const [isResuming, setIsResuming] = React.useState(false);

    const handleResume = async () => {
        setIsResuming(true);
        const result = await resumeProcessInstance(instance.id);
        toast({
            title: result.success ? "Process Resumed" : "Resume Failed",
            description: result.message ?? (result.success ? 'Process successfully resumed.' : 'Failed to resume process.'),
            variant: result.success ? "default" : "destructive",
        });
        setIsResuming(false);
    };

    return (
        <div className="flex items-center space-x-2">
            {(instance.status === 'Suspended' || instance.status === 'Failed') && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResume}
                    disabled={isResuming}
                    className="text-xs h-7"
                >
                    {isResuming ? "Resuming..." : "Resume/Retry"}
                </Button>
            )}
        </div>
    );
};


export const processInstanceColumns: ColumnDef<ProcessInstanceFirestore>[] = [
  {
    accessorKey: "processDefinitionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Process Name" />
    ),
    cell: ({ row }) => (
        <div className="w-[180px] truncate font-medium flex items-center gap-2">
            <Workflow className="h-4 w-4 text-muted-foreground"/>
            {row.getValue("processDefinitionId")}
        </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <ProcessStatusPill status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "correlationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Related To" />
    ),
    cell: ({ row }) => {
      const correlationId = row.getValue("correlationId") as string | undefined;
      const definitionId = row.original.processDefinitionId;
      let linkPath = '';
      let linkText = correlationId || '-';
      let Icon = ExternalLink;

      if (correlationId) {
          if (definitionId?.toLowerCase().includes('opportunity')) {
              linkPath = `/admin/crm/opportunities`; // General link for now
              linkText = `Opp: ${correlationId.substring(0, 8)}...`;
              Icon = UsersIcon; // Or some opportunity icon
          } else if (definitionId?.toLowerCase().includes('shipping') || definitionId?.toLowerCase().includes('order')) {
              linkPath = `/admin/erp/orders`; // General link for now
              linkText = `Order: ${correlationId.substring(0, 8)}...`;
              Icon = PackageIcon;
          }
      }

      return correlationId ? (
          linkPath ? (
             <Link href={`${linkPath}?id=${correlationId}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline truncate w-[150px]">
                <Icon className="h-3.5 w-3.5"/>
                {linkText}
             </Link>
          ) : (
             <span className="text-muted-foreground w-[150px] truncate flex items-center gap-1"><Icon className="h-3.5 w-3.5"/>{linkText}</span>
          )
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "currentTaskName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Step" />
    ),
    cell: ({ row }) => <div className="w-[200px] truncate text-muted-foreground">{row.getValue("currentTaskName") || "-"}</div>,
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "lastUpdatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => {
      const timestamp = row.getValue("lastUpdatedAt");
      if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
        const date = (timestamp as any).toDate();
        return <div className="w-[100px] text-muted-foreground">{format(date, 'PP pp')}</div>;
      }
      return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
    {
    accessorKey: "errorDetails",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Error" />
    ),
    cell: ({ row }) => (
        <div className="w-[150px] truncate text-destructive text-xs">
            {row.getValue("errorDetails") || ""}
        </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
   {
    id: "actions",
    cell: ({ row }) => <ProcessInstanceRowActions row={row} />,
     enableSorting: false,
     enableHiding: false,
  },
]

export const processStatusFilterOptions = ProcessStatusSchema.options.map(status => ({
    label: status,
    value: status,
}));

export const processDefinitionFilterOptions = [
    { label: 'Opportunity to Cash', value: 'opportunity-to-cash-v1' },
    { label: 'Shipping Process', value: 'shipping-process-v1' },
];

