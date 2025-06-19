// src/app/admin/erp/products/new/page.tsx
import { AddProductForm } from '@/components/erp/add-product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Add New Product - PLES ERP',
  description: 'Create a new product for the catalog.',
};

export default function AddProductPage() {
  return (
    <div className="py-10 space-y-6 max-w-2xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/admin/erp/products">
                <span className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </span>
            </Link>
        </Button>
       <Card className="shadow-lg border">
         <CardHeader>
           <CardTitle className="text-2xl">Add New Product</CardTitle>
           <CardDescription>
             Enter the details below to create a new product in the ERP system.
           </CardDescription>
         </CardHeader>
         <CardContent>
            <AddProductForm />
         </CardContent>
       </Card>
    </div>
  );
}
