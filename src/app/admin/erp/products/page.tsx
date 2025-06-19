// src/app/admin/erp/products/page.tsx
import { getProducts } from '@/app/actions/erp-actions';
import { ProductDataTable } from '@/components/erp/product-data-table'; 
import { productColumns } from '@/components/erp/product-columns'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'ERP Products - PLES Admin',
  description: 'View and manage product catalog.',
};

export default async function ErpProductsPage() {
  const products = await getProducts();

  return (
    // Removed horizontal padding (px-4 sm:px-6 lg:px-8) to rely on AdminLayout's SidebarInset padding
    <div className="py-10 space-y-6">
       <div className="flex justify-between items-center">
         <div>
             <h1 className="text-3xl font-bold tracking-tight">ERP Products</h1>
             <p className="text-muted-foreground">
                 Manage your product catalog and inventory levels.
             </p>
         </div>
        <Button asChild>
            <Link href="/admin/erp/products/new">
                <span className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </span>
            </Link>
        </Button>
      </div>

      <Card className="shadow-lg border">
        <CardContent className="pt-6">
          {products.length > 0 ? (
            <ProductDataTable columns={productColumns} data={products} />
          ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No products found.</p>
                 <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href="/admin/erp/products/new">
                        <span className="flex items-center">Add Product</span>
                    </Link>
                 </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
