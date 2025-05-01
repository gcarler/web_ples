// src/app/admin/users/page.tsx
import { getUsers } from '@/app/actions/user-actions'; // Action to fetch users
import { UserDataTable } from '@/components/admin/user-data-table'; // Component to display users
import { userColumns } from '@/components/admin/user-columns'; // Columns definition
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Suspense } from 'react'; // Import Suspense
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export const metadata = {
  title: 'Manage Users - PLES Admin',
  description: 'Create, view, and manage user accounts and roles.',
};

// Separate async component to fetch data
async function UserManagementContent() {
    const users = await getUsers(); // Fetch users using Server Action

    return (
        <Card className="shadow-lg border">
            <CardContent className="pt-6">
                {users.length > 0 ? (
                    <UserDataTable columns={userColumns} data={users} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No users found.</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Add new users to grant them access.
                        </p>
                         <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/admin/users/new">Add User</Link>
                         </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Loading Skeleton for the table content
function LoadingSkeleton() {
    return (
        <Card className="shadow-lg border">
            <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                     <Skeleton className="h-8 w-1/4" />
                     <Skeleton className="h-8 w-24" />
                </div>
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
}


export default function ManageUsersPage() {
  // This page should ideally be protected by middleware to ensure only admins can access it.
  // Additional client-side checks within the component might be added for extra security.

  return (
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
                 Create, view, and manage user accounts and roles.
            </p>
        </div>
        <Button asChild>
            <Link href="/admin/users/new"> {/* Link to a page/modal for creating users */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
            </Link>
        </Button>
      </div>
       <Suspense fallback={<LoadingSkeleton />}>
          <UserManagementContent />
       </Suspense>
    </div>
  );
}

// Force dynamic rendering as user data can change
export const dynamic = 'force-dynamic';
