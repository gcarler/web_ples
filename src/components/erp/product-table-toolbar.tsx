// src/components/erp/product-table-toolbar.tsx
"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
// Import if you add faceted filters, e.g., for category
// import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
// import { categoryFilterOptions } from "./product-columns";

interface ProductTableToolbarProps<TData> {
  table: Table<TData>
}

export function ProductTableToolbar<TData>({
  table,
}: ProductTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global search */}
        <Input
          placeholder="Filter products..."
          // Filter by product name and SKU
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
             table.getColumn("name")?.setFilterValue(event.target.value);
             table.getColumn("sku")?.setFilterValue(event.target.value);
             table.getColumn("category")?.setFilterValue(event.target.value); // Also filter category
            }
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* Faceted filter for 'category' column (Example) */}
        {/* {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categoryFilterOptions} // Use the defined options if you have them
          />
        )} */}

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
