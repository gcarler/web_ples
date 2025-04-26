// src/components/crm/opportunity-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OpportunityFirestore, OpportunityStageSchema } from "@/lib/models/opportunity"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleDollarSign, Clock, ListFilter, XCircle } from "lucide-react" // Example icons
import { OpportunityStagePill } from "./opportunity-stage-pill" // Import the stage pill component
import Link from "next/link"

// Helper to format currency
const formatCurrency = (amount: number | null | undefined) => {
  if (amount == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount); // Adjust currency as needed
};

export const opportunityColumns: ColumnDef<OpportunityFirestore>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opportunity Name" />
    ),
    cell: ({ row }) => (
        // Optional: Link to opportunity detail page if you build one
        // <Link href={`/admin/crm/opportunities/${row.original.id}`} className="hover:underline">
             <div className="w-[200px] truncate font-medium">{row.getValue("name")}</div>
        // </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "contactId", // Display related contact info (needs enhancement in action)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
        // TODO: Fetch contact name based on contactId in the getOpportunities action
        const contactId = row.getValue("contactId") as string;
        return <Link href={`/admin/crm/contacts/${contactId}`} className="text-muted-foreground hover:text-primary hover:underline truncate w-[120px] block">{contactId}</Link>; // Placeholder
    },
    enableSorting: false, // Usually sort by name/company if joined
    enableHiding: true,
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => {
        const stage = row.getValue("stage") as OpportunityStage;
        return <OpportunityStagePill stage={stage} />; // Use the custom pill component
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div className="w-[100px] text-right">{formatCurrency(row.getValue("amount"))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "closeDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Close Date" />
    ),
    cell: ({ row }) => {
      const timestamp = row.getValue("closeDate");
      if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
        const date = (timestamp as any).toDate();
        return <div className="w-[100px]">{format(date, 'PP')}</div>; // Format like 'Sep 17, 2023'
      }
      return <div className="w-[100px] text-muted-foreground">-</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "createdAt",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Created At" />
     ),
    cell: ({ row }) => {
        const timestamp = row.getValue("createdAt");
        if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
             const date = (timestamp as any).toDate();
            return <div className="w-[100px] text-muted-foreground">{format(date, 'PP')}</div>;
        }
        return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  // Add row actions if needed
  // {
  //   id: "actions",
  //   cell: ({ row }) => <OpportunityRowActions row={row} />, // Create this component
  // },
]

// Define options for faceted filter for stage
export const stageFilterOptions = OpportunityStageSchema.options.map(stage => {
    let Icon;
    switch (stage) {
        case 'Prospecting': Icon = ListFilter; break;
        case 'Qualification': Icon = ListFilter; break; // Adjust icons as needed
        case 'Needs Analysis': Icon = ListFilter; break;
        case 'Value Proposition': Icon = CircleDollarSign; break;
        case 'Proposal/Price Quote': Icon = CircleDollarSign; break;
        case 'Negotiation/Review': Icon = Clock; break;
        case 'Closed Won': Icon = CheckCircle; break;
        case 'Closed Lost': Icon = XCircle; break;
        default: Icon = ListFilter;
    }
    return { label: stage, value: stage, icon: Icon };
});