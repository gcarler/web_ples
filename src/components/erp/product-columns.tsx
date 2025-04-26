// src/components/erp/product-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProductFirestore } from "@/lib/models/erp"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { Package, CircleDollarSign, Hash, Shapes } from "lucide-react" // Example icons

// Helper to format currency
const formatCurrency = (amount: number | null | undefined) => {
  if (amount == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount); // Adjust currency as needed
};

export const productColumns: ColumnDef<ProductFirestore>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
        <div className="w-[250px] truncate font-medium flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            {row.getValue("name")}
        </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => <div className="w-[150px] truncate text-muted-foreground">{row.getValue("sku") || "-"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
    {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
     cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return category ? (
             <Badge variant="outline" className="capitalize">
                 <Shapes className="mr-1 h-3 w-3" />
                 {category}
            </Badge>
         ) : <span className="text-muted-foreground">-</span>;
     },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
        <div className="w-[100px] text-right flex items-center justify-end gap-1">
             <CircleDollarSign className="h-3.5 w-3.5 text-muted-foreground"/>
             {formatCurrency(row.getValue("price"))}
        </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "stockLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
        const stock = row.getValue("stockLevel") as number;
        const badgeColor = stock > 10 ? 'bg-green-100 text-green-800' : stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
        return (
            <Badge variant="secondary" className={`w-[60px] justify-center font-mono ${badgeColor}`}>
                <Hash className="mr-1 h-3 w-3" />
                {stock}
            </Badge>
        );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const timestamp = row.getValue("updatedAt");
      if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
        const date = (timestamp as any).toDate();
        return <div className="w-[100px] text-muted-foreground">{format(date, 'PP')}</div>;
      }
      return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  // Add row actions if needed (e.g., Edit, Delete)
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ProductRowActions row={row} />, // Create this component
  // },
]

// Define options for faceted filter for category (if needed)
// Example - Assuming you have a predefined list of categories
// export const categoryFilterOptions = [
//   { label: "Services", value: "Services", icon: Briefcase },
//   { label: "Data", value: "Data", icon: Database },
//   // Add more categories and icons
// ];
