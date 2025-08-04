// src/app/admin/users/new/page.tsx
import { AddUserForm } from '@/components/admin/add-user-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Add New User - PLES Admin',
  description: 'Create a new user account and assign a role.',
};

export default function AddUserPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/admin/users">
                <span className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Usuarios
                </span>
            </Link>
        </Button>
       <Card className="shadow-lg border">
         <CardHeader>
           <CardTitle className="text-2xl">Añadir Nuevo Usuario</CardTitle>
           <CardDescription>
             Introduce los detalles a continuación para crear una nueva cuenta de usuario y asignarle su rol. El usuario recibirá credenciales de inicio de sesión (o instrucciones para restablecer la contraseña).
           </CardDescription>
         </CardHeader>
         <CardContent>
            <AddUserForm />
         </CardContent>
       </Card>
    </div>
  );
}
