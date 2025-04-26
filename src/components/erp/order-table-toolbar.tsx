// src/components/erp/order-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { orderStatusFilterOptions, paymentStatusFilterOptions } from "./order-columns"; // Import filter options

interface OrderTableToolbarProps<TData> {
  table: Table<TData>
}

export function OrderTableToolbar<TData>({
  table,
}: OrderTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global search */}
        <Input
          placeholder="Filter orders..."
          // Filter by order number or contact ID
          value={(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
             table.getColumn("orderNumber")?.setFilterValue(event.target.value);
             table.getColumn("contactId")?.setFilterValue(event.target.value); // Allow filtering by contact ID shown
            }
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'status' column */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={orderStatusFilterOptions}
          />
        )}
         {/* Faceted filter for 'paymentStatus' column */}
        {table.getColumn("paymentStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("paymentStatus")}
            title="Payment Status"
            options={paymentStatusFilterOptions}
          />
        )}

        {/* Clear filters button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
       {/* Column visibility toggle */}
      <DataTableViewOptions table={table} />
    </div>
  )
}