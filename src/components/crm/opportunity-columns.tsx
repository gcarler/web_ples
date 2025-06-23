// src/components/crm/opportunity-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OpportunityFirestore, OpportunityStage, OpportunityStageSchema } from "@/lib/models/opportunity"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { format } from 'date-fns'
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, CircleDollarSign, Clock, ListFilter, User, XCircle } from "lucide-react" // Added User
import { OpportunityStagePill } from "./opportunity-stage-pill"
import Link from "next/link"

const formatCurrency = (amount: number | null | undefined) => {
  if (amount == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const opportunityColumns: ColumnDef<OpportunityFirestore>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opportunity Name" />
    ),
    cell: ({ row }) => (
             <div className="w-[200px] truncate font-medium">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "contactId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
        const contactId = row.getValue("contactId") as string;
        return (
            <Link href={`/admin/crm?contactId=${contactId}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary hover:underline truncate w-[150px]">
                <User className="h-3.5 w-3.5"/>
                {contactId}
            </Link>
        );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => {
        const stage = row.getValue("stage") as OpportunityStage;
        return <OpportunityStagePill stage={stage} />;
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
      const date = row.getValue("closeDate") as Date | undefined;
      if (date) {
        return <div className="w-[100px]">{format(date, 'PP')}</div>;
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
        const date = row.getValue("createdAt") as Date | undefined;
        if (date) {
            return <div className="w-[100px] text-muted-foreground">{format(date, 'PP')}</div>;
        }
        return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
]

export const stageFilterOptions = OpportunityStageSchema.options.map(stage => {
    let Icon;
    switch (stage) {
        case 'Prospecting': Icon = ListFilter; break;
        case 'Qualification': Icon = ListFilter; break;
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
