// src/components/crm/contact-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ContactFirestore } from "@/lib/models/contact"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"; // Assuming you have this component
import { DataTableRowActions } from "@/components/crm/contact-row-actions"; // Actions component (Edit/Delete) - Optional for now
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns'; // For date formatting


export const contactColumns: ColumnDef<ContactFirestore>[] = [
  // Optional: Selection column
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Name" />
     ),
    cell: ({ row }) => <div className="w-[120px] truncate">{row.getValue("name")}</div>,
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
    accessorKey: "bio",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="Bio" />
     ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate text-muted-foreground">
        {row.getValue("bio") || "-"}
      </div>
    ),
     enableSorting: false, // Usually don't sort by long text
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
       return value.includes(row.getValue(id))
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
        // Check if timestamp is a Firestore Timestamp object
        if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
             const date = (timestamp as any).toDate(); // Cast to access toDate()
            return <div className="w-[100px]">{format(date, 'PP')}</div>; // Format like 'Sep 17, 2023'
        }
         // Handle cases where it might be a string or undefined (shouldn't happen with validation)
        return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
   // Optional: Row Actions Column
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
