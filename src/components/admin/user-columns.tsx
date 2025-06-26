// src/components/admin/user-columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserProfile, UserRole, UserRoleSchema } from "@/lib/models/user"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { Mail, Shield, Calendar, CheckCircle, XCircle } from "lucide-react"
import { UserRowActions } from "./user-row-actions" // Create this component

// Component for Role Badge
const RoleBadge = ({ role }: { role: UserRole }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let className = '';

  switch (role) {
    case 'admin': variant = 'destructive'; break;
    case 'read_only': variant = 'secondary'; break;
    default: variant = 'secondary';
  }

  return (
    <Badge variant={variant} className={`capitalize ${className}`}>
      <Shield className="mr-1 h-3 w-3" />
      {role.replace('_', ' ')}
    </Badge>
  );
};


export const userColumns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px] truncate font-medium flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        {row.getValue("email")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Display Name" />
    ),
    cell: ({ row }) => <div className="w-[150px] truncate">{row.getValue("displayName") || "-"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <RoleBadge role={row.getValue("role")} />,
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
      const date = row.getValue("createdAt") as Date | undefined;
      if (date) {
        return (
          <div className="w-[100px] flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {format(date, 'PP')}
          </div>
        );
      }
      return <div className="w-[100px] text-muted-foreground">Invalid Date</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
   {
    id: "actions",
    cell: ({ row }) => <UserRowActions row={row} />,
     enableSorting: false,
     enableHiding: false,
  },
]

// Define options for faceted filter for roles
export const roleFilterOptions = UserRoleSchema.options.map(role => ({
    label: role.replace('_', ' '), // Make label more readable
    value: role,
    // Add icons if desired, similar to RoleBadge
}));
