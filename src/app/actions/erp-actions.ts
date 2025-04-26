// src/app/actions/erp-actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Timestamp, collection, addDoc, getDocs, query, orderBy, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { ProductSchema, ProductFirestoreSchema, Product, ProductFirestore, OrderSchema, OrderFirestoreSchema, Order, OrderFirestore, OrderStatusSchema, OrderStatus } from '@/lib/models/erp';
import * as ErpService from '@/services/erp-service'; // Use functions from ERP service

// --- Product Actions ---

const AddProductInputSchema = ProductSchema.omit({ id: true, createdAt: true, updatedAt: true });

export async function addProduct(
    prevState: { message: string | null; success: boolean },
    formData: FormData
): Promise<{ message: string | null; success: boolean }> {
    try {
        const rawData = Object.fromEntries(formData.entries());
        const dataToValidate = {
            ...rawData,
            price: parseFloat(rawData.price as string),
            stockLevel: parseInt(rawData.stockLevel as string, 10),
        };

        const validatedData = AddProductInputSchema.safeParse(dataToValidate);
        if (!validatedData.success) {
             console.error('Add Product Validation Error:', validatedData.error.flatten().fieldErrors);
             const errorMessages = Object.values(validatedData.error.flatten().fieldErrors)
                .map(errors => errors?.join(', '))
                .filter(Boolean)
                .join('; ');
            return { message: `Invalid product data: ${errorMessages}`, success: false };
        }

        const productData = validatedData.data;
        const productWithTimestamps = {
            ...productData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const productsCol = collection(adminDb, 'products');
        const docRef = await addDoc(productsCol, productWithTimestamps);

        console.log('Product added with ID:', docRef.id);
        revalidatePath('/admin/erp/products'); // Revalidate products list page
        return { message: 'Product added successfully!', success: true };

    } catch (error) {
        console.error('Error adding product:', error);
        let errorMessage = 'Failed to add product due to a server error.';
        if (error instanceof Error) {
            errorMessage = `Failed to add product: ${error.message}`;
        }
        return { message: errorMessage, success: false };
    }
}

export async function getProducts(): Promise<ProductFirestore[]> {
    try {
        // This directly accesses the mock data for now
        // In a real scenario, it would query Firestore:
        // const productsCol = collection(adminDb, 'products');
        // const q = query(productsCol, orderBy('name', 'asc'));
        // const snapshot = await getDocs(q);
        // const products: ProductFirestore[] = snapshot.docs.map(doc => {
        //     const data = doc.data();
        //     const parsed = ProductFirestoreSchema.safeParse(data);
        //     if (!parsed.success) {
        //         console.warn(`Invalid product data in Firestore ${doc.id}:`, parsed.error);
        //         return { id: doc.id, name: 'Invalid Data', price: 0, stockLevel: 0, createdAt: Timestamp.now(), updatedAt: Timestamp.now() } as ProductFirestore;
        //     }
        //     return { id: doc.id, ...parsed.data };
        // });
        // return products;

        // Using the mock service function:
        const mockProductIds = ['prod_1', 'prod_2', 'prod_3', 'prod_4']; // Example IDs
        const productPromises = mockProductIds.map(id => ErpService.getProductDetails(id));
        const products = (await Promise.all(productPromises)).filter(p => p !== null) as ProductFirestore[];
        return products;

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function updateProductStock(productId: string, changeAmount: number): Promise<{ message: string | null; success: boolean }> {
    console.log(`Action: Updating stock for product ${productId} by ${changeAmount}`);
     try {
        const productRef = doc(adminDb, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return { message: 'Product not found.', success: false };
        }

        const currentStock = productSnap.data()?.stockLevel ?? 0;
        const newStockLevel = currentStock + changeAmount;

        if (newStockLevel < 0) {
             return { message: 'Stock level cannot be negative.', success: false };
        }

        await updateDoc(productRef, {
            stockLevel: newStockLevel,
            updatedAt: Timestamp.now(),
        });

        console.log(`Product ${productId} stock updated to ${newStockLevel}`);
        revalidatePath('/admin/erp/products');
        revalidatePath(`/admin/erp/products/${productId}`); // If detail page exists
        return { message: 'Stock updated successfully!', success: true };

     } catch (error) {
         console.error(`Error updating stock for product ${productId}:`, error);
         return { message: 'Failed to update stock.', success: false };
     }
}


// --- Order Actions ---

export async function getOrders(): Promise<OrderFirestore[]> {
     try {
        // This would query the 'orders' collection in Firestore
        const ordersCol = collection(adminDb, 'orders');
        const q = query(ordersCol, orderBy('orderDate', 'desc'));
        const snapshot = await getDocs(q);

         const orders: OrderFirestore[] = snapshot.docs.map(doc => {
             const data = doc.data();
             // Ensure orderDate is a Timestamp before parsing
             if (data.orderDate && !(data.orderDate instanceof Timestamp)) {
                 data.orderDate = Timestamp.fromMillis(data.orderDate.seconds * 1000);
             }
             const parsed = OrderFirestoreSchema.safeParse(data);
             if (!parsed.success) {
                 console.warn(`Invalid order data in Firestore ${doc.id}:`, parsed.error);
                 // Provide defaults for display
                 return {
                    id: doc.id,
                    orderNumber: 'Invalid',
                    contactId: '',
                    orderDate: Timestamp.now(),
                    items: [],
                    totalAmount: 0,
                    status: 'Pending',
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                    paymentStatus: 'Pending',
                    subtotal:0,
                 } as OrderFirestore;
             }
             return { id: doc.id, ...parsed.data };
         });
         return orders;
     } catch (error) {
         console.error('Error fetching orders:', error);
         return [];
     }
 }

 export async function updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<{ message: string | null; success: boolean }> {
     console.log(`Action: Updating status for order ${orderId} to ${newStatus}`);
    try {
        // Validate status
        const validatedStatus = OrderStatusSchema.safeParse(newStatus);
        if (!validatedStatus.success) {
            return { message: 'Invalid order status provided.', success: false };
        }

        // Use the ERP service function which handles the mock/real update
        const success = await ErpService.updateErpOrderStatus(orderId, validatedStatus.data);

        if (success) {
            revalidatePath('/admin/erp/orders');
            revalidatePath(`/admin/erp/orders/${orderId}`); // If detail page exists
            return { message: 'Order status updated successfully!', success: true };
        } else {
            return { message: 'Failed to update order status via ERP service.', success: false };
        }
    } catch (error) {
        console.error(`Error updating status for order ${orderId}:`, error);
        return { message: 'Failed to update order status.', success: false };
    }
}

 export async function getOrderDetails(orderId: string): Promise<OrderFirestore | null> {
     console.log(`Action: Getting details for order ${orderId}`);
    try {
        // Use the ERP service function
        const orderDetails = await ErpService.getErpOrderDetails(orderId);
        return orderDetails;
    } catch (error) {
        console.error(`Error getting details for order ${orderId}:`, error);
        return null;
    }
}