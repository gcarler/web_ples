// src/components/crm/contact-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ContactFirestore, LeadSourceSchema } from "@/lib/models/contact" // Import LeadSourceSchema
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/crm/contact-row-actions"; // Assuming actions exist
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { CheckCircle, Phone, Building, Briefcase, Users } from "lucide-react"; // Add icons

export const contactColumns: ColumnDef<ContactFirestore>[] = [
  // Optional: Selection column
  // ... (selection column code remains the same)
  {
    accessorKey: "name",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Name" />
     ),
    cell: ({ row }) => <div className="w-[120px] truncate font-medium">{row.getValue("name")}</div>,
     enableSorting: true,
     enableHiding: true,
  },
  {
    accessorKey: "email",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Email" />
     ),
    cell: ({ row }) => <div className="w-[180px] truncate">{row.getValue("email")}</div>,
     enableSorting: true,
     enableHiding: true,
  },
  {
    accessorKey: "phone",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Phone" />
     ),
    cell: ({ row }) => <div className="w-[120px] truncate text-muted-foreground">{row.getValue("phone") || "-"}</div>,
     enableSorting: false,
     enableHiding: true,
  },
    {
    accessorKey: "company",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Company" />
     ),
    cell: ({ row }) => <div className="w-[150px] truncate">{row.getValue("company") || "-"}</div>,
     enableSorting: true,
     enableHiding: true,
  },
      {
    accessorKey: "title",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Title" />
     ),
    cell: ({ row }) => <div className="w-[150px] truncate text-muted-foreground">{row.getValue("title") || "-"}</div>,
     enableSorting: false,
     enableHiding: true,
  },
  {
    accessorKey: "leadSource",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lead Source" />
    ),
    cell: ({ row }) => {
        const leadSource = row.getValue("leadSource");
        // Basic badge, could be enhanced with icons or colors
        return <Badge variant="outline" className="capitalize">{leadSource || "N/A"}</Badge>;
    },
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
   },
  {
    accessorKey: "bio",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Bio/Message" />
     ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-muted-foreground">
        {row.getValue("bio") || "-"}
      </div>
    ),
     enableSorting: false,
     enableHiding: true,
  },
   {
    accessorKey: "subscribe",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Subscribed" />
     ),
    cell: ({ row }) => (
        <Badge variant={row.getValue("subscribe") ? "default" : "secondary"}>
            {row.getValue("subscribe") ? "Yes" : "No"}
        </Badge>
    ),
    filterFn: (row, id, value) => {
       return value.includes(String(row.getValue(id))); // Ensure value is string for filter
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
   // Optional: Row Actions Column
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
     enableSorting: false,
     enableHiding: false,
  },
]

// Define options for faceted filters
export const subscribedFilterOptions = [
    { label: "Yes", value: "true", icon: CheckCircle },
    { label: "No", value: "false", icon: CheckCircle /* Placeholder, consider XCircle */ },
]

export const leadSourceFilterOptions = LeadSourceSchema.options.map(source => ({
    label: source,
    value: source,
    // Add icons based on source if desired
    // icon: source === 'Web Form' ? Globe : source === 'Referral' ? Users : MailQuestion
}));
