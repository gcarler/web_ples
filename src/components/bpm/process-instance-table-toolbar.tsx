// src/components/bpm/process-instance-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { processStatusFilterOptions, processDefinitionFilterOptions } from "./process-instance-columns"; // Import filter options

interface ProcessInstanceTableToolbarProps<TData> {
  table: Table<TData>
}

export function ProcessInstanceTableToolbar<TData>({
  table,
}: ProcessInstanceTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global search */}
        <Input
          placeholder="Filter processes..."
          // Filter by correlation ID or maybe current step name
          value={(table.getColumn("correlationId")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
             table.getColumn("correlationId")?.setFilterValue(event.target.value);
             table.getColumn("currentTaskName")?.setFilterValue(event.target.value);
            }
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'processDefinitionId' column */}
        {table.getColumn("processDefinitionId") && (
          <DataTableFacetedFilter
            column={table.getColumn("processDefinitionId")}
            title="Process Name"
            options={processDefinitionFilterOptions}
          />
        )}
         {/* Faceted filter for 'status' column */}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={processStatusFilterOptions}
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