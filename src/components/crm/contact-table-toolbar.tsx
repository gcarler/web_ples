// src/components/crm/contact-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options" // Assuming you have this

// Define options for the faceted filter (e.g., Subscribed Yes/No)
const subscribedOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
]

import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter" // Assuming you have this
import { CheckCircle, XCircle } from "lucide-react" // Icons for faceted filter

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global search (filter by name or email) */}
        <Input
          placeholder="Filter by name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""} // Example using name column
          onChange={(event) => {
            // Apply filter to multiple columns if needed
            table.getColumn("name")?.setFilterValue(event.target.value)
            table.getColumn("email")?.setFilterValue(event.target.value) // You might want a more complex filter logic
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'subscribe' column */}
        {table.getColumn("subscribe") && (
          <DataTableFacetedFilter
            column={table.getColumn("subscribe")}
            title="Subscribed"
            options={subscribedOptions.map(opt => ({
                ...opt,
                // Add icons if desired
                icon: opt.value === 'true' ? CheckCircle : XCircle
            }))}
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
