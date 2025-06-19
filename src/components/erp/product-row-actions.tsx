
// src/components/erp/product-row-actions.tsx
"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pen, Layers, Edit } from "lucide-react"
import { ProductFirestore } from "@/lib/models/erp"
import { useToast } from "@/hooks/use-toast"
import React from "react"
// import { updateProductStock } from "@/app/actions/erp-actions"; // Future action

interface ProductRowActionsProps<TData extends ProductFirestore> {
  row: Row<TData>
}

export function ProductRowActions<TData extends ProductFirestore>({
  row,
}: ProductRowActionsProps<TData>) {
  const product = row.original
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleEdit = () => {
    // Placeholder for edit functionality
    // router.push(`/admin/erp/products/edit/${product.id}`);
    toast({ title: "Edit Product", description: `Placeholder for editing ${product.name}.` });
  };

  const handleAdjustStock = async () => {
    // Placeholder for stock adjustment functionality
    // Example: Open a modal to input stock change
    const changeAmount = prompt(`Adjust stock for ${product.name} (current: ${product.stockLevel}). Enter change (e.g., +10 or -5):`);
    if (changeAmount !== null) {
      const amount = parseInt(changeAmount, 10);
      if (!isNaN(amount)) {
        setIsUpdating(true);
        // const result = await updateProductStock(product.id, amount);
        // toast({
        //   title: result.success ? "Stock Updated" : "Update Failed",
        //   description: result.message ?? (result.success ? `${product.name} stock adjusted.` : 'Failed to update stock.'),
        //   variant: result.success ? "default" : "destructive",
        // });
        toast({ title: "Adjust Stock", description: `Placeholder: Adjusting stock for ${product.name} by ${amount}.`});
        setIsUpdating(false);
      } else {
        toast({ title: "Invalid Input", description: "Please enter a valid number.", variant: "destructive" });
      }
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          disabled={isUpdating}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit Product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAdjustStock} disabled={isUpdating}>
          <Layers className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          {isUpdating ? "Updating..." : "Adjust Stock"}
        </DropdownMenuItem>
        {/* Add delete action if needed, with confirmation */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

