// src/app/admin/users/page.tsx
import { getUsers } from '@/app/actions/user-actions'; 
import { UserDataTable } from '@/components/admin/user-data-table'; 
import { userColumns } from '@/components/admin/user-columns'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Suspense } from 'react'; 
import { Skeleton } from '@/components/ui/skeleton'; 

export const metadata = {
  title: 'Gestionar Usuarios - PLES Admin',
  description: 'Crear, ver y gestionar cuentas de usuario y roles.',
};

async function UserManagementContent() {
    const users = await getUsers(); 

    return (
        <Card className="shadow-lg border">
            <CardContent className="pt-6">
                {users.length > 0 ? (
                    <UserDataTable columns={userColumns} data={users} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No se encontraron usuarios.</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A?ada nuevos usuarios para concederles acceso.
                        </p>
                         <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/admin/users/new">
                                <span className="flex items-center">A?adir Usuario</span>
                            </Link>
                         </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestionar Usuarios</h1>
            <p className="text-muted-foreground">
                 Cree, vea y gestione cuentas de usuario y roles.
            </p>
        </div>
        <Button asChild>
            <Link href="/admin/users/new">
                <span className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" /> A?adir Usuario
                </span>
            </Link>
        </Button>
      </div>
       <Suspense fallback={<LoadingSkeleton />}>
          <UserManagementContent />
       </Suspense>
    </div>
  );
}

export const dynamic = 'force-dynamic';
