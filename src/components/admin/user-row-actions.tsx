// src/components/admin/user-row-actions.tsx
"use client"

import React from "react";
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pen, ShieldAlert, Trash } from "lucide-react"
import { UserProfile, UserRole, UserRoleSchema } from "@/lib/models/user"
import { updateUserRole, deleteUser } from "@/app/actions/user-actions" // Import server actions
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Use if redirecting after delete
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth to prevent self-deletion/role change

interface UserRowActionsProps<TData extends UserProfile> {
  row: Row<TData>
}

export function UserRowActions<TData extends UserProfile>({
  row,
}: UserRowActionsProps<TData>) {
  const userProfile = row.original // Get the full user profile data
  const { user } = useAuth(); // Get current logged-in user's auth UID
  const { toast } = useToast();
  const router = useRouter();
  const [currentRole, setCurrentRole] = React.useState<UserRole>(userProfile.role);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

   const isCurrentUser = user?.uid === userProfile.uid; // Check if the row is the currently logged-in user

  const handleRoleChange = async (newRole: UserRole) => {
    if (isCurrentUser) {
        toast({ title: "Action Forbidden", description: "Cannot change your own role.", variant: "destructive" });
        return;
    }
    if (newRole === currentRole) return;

    setIsUpdating(true);
    const result = await updateUserRole(userProfile.uid, newRole);
    toast({
      title: result.success ? "Role Updated" : "Update Failed",
      description: result.message ? (result.success ? `User role changed to ${newRole}.` : 'Failed to update role.'),
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setCurrentRole(newRole); // Update local state on success
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
     if (isCurrentUser) {
        toast({ title: "Action Forbidden", description: "Cannot delete your own account.", variant: "destructive" });
        return;
    }
    if (confirm(`Are you sure you want to delete user ${userProfile.email}? This action is irreversible.`)) {
      setIsDeleting(true);
      const result = await deleteUser(userProfile.uid);
      toast({
        title: result.success ? "User Deleted" : "Deletion Failed",
        description: result.message ? (result.success ? 'User successfully deleted.' : 'Failed to delete user.'),
        variant: result.success ? "default" : "destructive",
      });
      // Optionally refresh or redirect if needed, revalidatePath should handle table update
      // if (result.success) router.refresh();
      setIsDeleting(false);
    }
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          disabled={isUpdating || isDeleting} // Disable while actions are in progress
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
         <DropdownMenuSeparator />
         {/* Submenu for Role Change */}
         <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={isCurrentUser || isUpdating}>
                <ShieldAlert className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Change Role
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                 <DropdownMenuRadioGroup value={currentRole} onValueChange={handleRoleChange}>
                    {UserRoleSchema.options.map((roleOption) => (
                      <DropdownMenuRadioItem key={roleOption} value={roleOption} disabled={isUpdating}>
                        {roleOption.replace('_', ' ')}
                      </DropdownMenuRadioItem>
                    ))}
                 </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
         </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/50"
            disabled={isCurrentUser || isDeleting}
        >
           <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
           {isDeleting ? "Deleting..." : "Delete User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
