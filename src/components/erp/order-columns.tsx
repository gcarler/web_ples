
// src/components/erp/order-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderFirestore, OrderStatus, OrderStatusSchema } from "@/lib/models/erp"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { Calendar, CheckCircle, CircleDollarSign, Clock, ExternalLink, Package, RefreshCcw, RotateCcw, Truck, User, XCircle } from "lucide-react" // Added ExternalLink
import Link from "next/link"

const formatCurrency = (amount: number | null | undefined) => {
  if (amount == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const OrderStatusPill = ({ status }: { status: OrderStatus }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let Icon = Clock;
  let className = '';

  switch (status) {
    case 'Pending': variant = 'secondary'; Icon = Clock; break;
    case 'Processing': variant = 'outline'; Icon = RefreshCcw; break;
    case 'Awaiting Payment': variant = 'outline'; Icon = CircleDollarSign; break;
    case 'Awaiting Shipment': variant = 'default'; Icon = Package; break;
    case 'Shipped': variant = 'default'; Icon = Truck; break;
    case 'Delivered': variant = 'default'; Icon = CheckCircle; break;
    case 'Completed': variant = 'default'; Icon = CheckCircle; className = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50"; break;
    case 'Cancelled': variant = 'destructive'; Icon = XCircle; break;
    case 'Refunded': variant = 'destructive'; Icon = RotateCcw; break;
    default: variant = 'secondary'; Icon = Clock;
  }

  return (
    <Badge variant={variant} className={`capitalize px-2.5 py-0.5 text-xs w-[140px] justify-start ${className}`}>
      <Icon className="mr-1 h-3 w-3" />
      {status}
    </Badge>
  );
};


export const orderColumns: ColumnDef<OrderFirestore>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
    cell: ({ row }) => (
        <Link href={`#`} passHref> {/* Placeholder link, replace with actual detail page if exists */}
             <span className="w-[120px] truncate font-mono text-sm hover:underline hover:text-primary flex items-center gap-1">
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground"/>
                {row.getValue("orderNumber")}
             </span>
        </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "contactId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
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
    enableSorting: true, // Sorting by contactId can be useful
    enableHiding: true,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const timestamp = row.getValue("orderDate");
      if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
        const date = (timestamp as any).toDate();
        return (
            <div className="w-[100px] flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5"/>
                {format(date, 'PP')}
            </div>
        );
      }
      return <div className="w-[100px] text-muted-foreground">-</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
   {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => <div className="w-[100px] text-right">{formatCurrency(row.getValue("totalAmount"))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <OrderStatusPill status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
    {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
     cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string;
         let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
         let className = '';
         if (status === 'Paid') { variant = 'default'; className = 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50'; }
         if (status === 'Failed' || status === 'Refunded') variant = 'destructive';

        return <Badge variant={variant} className={`capitalize ${className}`}>{status}</Badge>;
     },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: true,
  },
]

export const orderStatusFilterOptions = OrderStatusSchema.options.map(status => ({
    label: status,
    value: status,
}));

export const paymentStatusFilterOptions = ['Pending', 'Paid', 'Failed', 'Refunded'].map(status => ({
    label: status,
    value: status,
}));

