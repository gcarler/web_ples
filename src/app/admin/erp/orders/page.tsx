// src/app/admin/erp/orders/page.tsx
import { getOrders } from '@/app/actions/erp-actions'; // Create this action
import { OrderDataTable } from '@/components/erp/order-data-table'; // Create this component
import { orderColumns } from '@/components/erp/order-columns'; // Create this
import { Card, CardContent } from '@/components/ui/card';
// Import Button, Link, PlusCircle if adding "Create Order" functionality

export const metadata = {
  title: 'ERP Orders - PLES Admin',
  description: 'View and manage customer orders.',
};

export default async function ErpOrdersPage() {
  const orders = await getOrders();

  return (
    // Removed horizontal padding (px-4 sm:px-6 lg:px-8) to rely on AdminLayout's SidebarInset padding
    <div className="py-10 space-y-6">
       <div className="flex justify-between items-center">
         <div>
             <h1 className="text-3xl font-bold tracking-tight">ERP Orders</h1>
             <p className="text-muted-foreground">
                 Monitor customer orders and their fulfillment status.
             </p>
         </div>
        {/* Optional: Add Button to create new order manually (less common) */}
        {/* <Button asChild>
            <Link href="/admin/erp/orders/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Order
            </Link>
        </Button> */}
      </div>

      <Card className="shadow-lg border">
        <CardContent className="pt-6">
          {orders.length > 0 ? (
            <OrderDataTable columns={orderColumns} data={orders} />
          ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No orders found.</p>
                 <p className="mt-2 text-sm text-muted-foreground">
                    Orders created from won opportunities will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
