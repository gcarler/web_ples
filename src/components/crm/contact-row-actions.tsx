// src/components/crm/contact-row-actions.tsx
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
import { MoreHorizontal, Pen, Trash } from "lucide-react"
import { Contact } from "@/lib/models/contact" // Assuming Contact type exists

interface DataTableRowActionsProps<TData extends Contact> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends Contact>({
  row,
}: DataTableRowActionsProps<TData>) {
  const contact = row.original // Get the full contact data

  const handleEdit = () => {
    // Implement edit logic (e.g., open a modal, navigate to edit page)
    console.log("Edit contact:", contact.id);
    // Example: router.push(`/admin/crm/edit/${contact.id}`);
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete contact ${contact.name}?`)) {
      console.log("Delete contact:", contact.id);
      // Implement delete logic using a Server Action
      // try {
      //   await deleteContactAction(contact.id); // Assuming you have a deleteContactAction
      //   // Show success toast
      // } catch (error) {
      //   // Show error toast
      // }
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/50">
           <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> {/* Optional shortcut */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
