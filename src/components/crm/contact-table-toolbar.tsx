// src/components/crm/contact-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { subscribedFilterOptions, leadSourceFilterOptions } from "./contact-columns"; // Import defined options

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
          placeholder="Filter contacts..." // Generic placeholder
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""} // Primarily filter name
          onChange={(event) => {
             // Can target multiple columns if needed:
             table.getColumn("name")?.setFilterValue(event.target.value)
             table.getColumn("email")?.setFilterValue(event.target.value)
             table.getColumn("company")?.setFilterValue(event.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'subscribe' column */}
        {table.getColumn("subscribe") && (
          <DataTableFacetedFilter
            column={table.getColumn("subscribe")}
            title="Subscribed"
            options={subscribedFilterOptions}
          />
        )}
         {/* Faceted filter for 'leadSource' column */}
         {table.getColumn("leadSource") && (
          <DataTableFacetedFilter
            column={table.getColumn("leadSource")}
            title="Lead Source"
            options={leadSourceFilterOptions} // Use imported options
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