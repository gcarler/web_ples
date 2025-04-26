// src/components/crm/opportunity-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { stageFilterOptions } from "./opportunity-columns"; // Import stage filter options

interface OpportunityTableToolbarProps<TData> {
  table: Table<TData>
}

export function OpportunityTableToolbar<TData>({
  table,
}: OpportunityTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global search */}
        <Input
          placeholder="Filter opportunities..."
          // Filter by opportunity name primarily
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'stage' column */}
        {table.getColumn("stage") && (
          <DataTableFacetedFilter
            column={table.getColumn("stage")}
            title="Stage"
            options={stageFilterOptions} // Use the defined options
          />
        )}
        {/* Add other filters if needed (e.g., by amount range, close date) */}

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