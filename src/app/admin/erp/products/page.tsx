// src/app/admin/erp/products/page.tsx
import { getProducts } from '@/app/actions/erp-actions';
import { ProductDataTable } from '@/components/erp/product-data-table'; // Create this
import { productColumns } from '@/components/erp/product-columns'; // Create this
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
    <div className="container mx-auto py-10 space-y-6">
       <div className="flex justify-between items-center">
         <div>
             <h1 className="text-3xl font-bold tracking-tight">ERP Products</h1>
             <p className="text-muted-foreground">
                 Manage your product catalog and inventory levels.
             </p>
         </div>
        {/* Optional: Add Button to create new product */}
        {/* <Button asChild>
            <Link href="/admin/erp/products/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg border">
        <CardContent className="pt-6">
          {products.length > 0 ? (
            <ProductDataTable columns={productColumns} data={products} />
          ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No products found.</p>
                 {/* Optional: Link to add product */}
                 {/* <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href="/admin/erp/products/new">Add Product</Link>
                 </Button> */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
