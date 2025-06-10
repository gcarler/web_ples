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
    <div className="py-10 space-y-6 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/admin/users">
                <span className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
                </span>
            </Link>
        </Button>
       <Card className="shadow-lg border">
         <CardHeader>
           <CardTitle className="text-2xl">Add New User</CardTitle>
           <CardDescription>
             Enter the details below to create a new user account and assign their role. The user will receive login credentials (or reset password instructions).
           </CardDescription>
         </CardHeader>
         <CardContent>
            <AddUserForm />
         </CardContent>
       </Card>
    </div>
  );
}
