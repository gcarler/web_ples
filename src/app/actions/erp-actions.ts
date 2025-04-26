// src/app/actions/erp-actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Timestamp, collection, addDoc, getDocs, query, orderBy, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { ProductSchema, ProductFirestoreSchema, Product, ProductFirestore, OrderSchema, OrderFirestoreSchema, Order, OrderFirestore, OrderStatusSchema, OrderStatus } from '@/lib/models/erp';
import * as ErpService from '@/services/erp-service'; // Use functions from ERP service which now hit Firestore

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
            sku: rawData.sku || undefined, // Handle optional SKU
            category: rawData.category || undefined,
            description: rawData.description || undefined,
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
        // Use serverTimestamp for creation and update times
        const productWithTimestamps = {
            ...productData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
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
        // Query Firestore 'products' collection
        const productsCol = collection(adminDb, 'products');
        const q = query(productsCol, orderBy('name', 'asc'));
        const snapshot = await getDocs(q);
        const products: ProductFirestore[] = snapshot.docs.map(doc => {
            const data = doc.data();
             // Ensure Timestamps are correctly handled
             if (data.createdAt && !(data.createdAt instanceof Timestamp)) {
                 data.createdAt = Timestamp.fromMillis(data.createdAt.seconds * 1000);
             }
             if (data.updatedAt && !(data.updatedAt instanceof Timestamp)) {
                 data.updatedAt = Timestamp.fromMillis(data.updatedAt.seconds * 1000);
             }
            const parsed = ProductFirestoreSchema.safeParse(data);
            if (!parsed.success) {
                console.warn(`Invalid product data in Firestore ${doc.id}:`, parsed.error);
                return { id: doc.id, name: 'Invalid Data', price: 0, stockLevel: 0, createdAt: Timestamp.now(), updatedAt: Timestamp.now() } as ProductFirestore;
            }
            return { id: doc.id, ...parsed.data };
        });
        return products;

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function updateProductStock(productId: string, changeAmount: number): Promise<{ message: string | null; success: boolean }> {
    console.log(`Action: Updating stock for product ${productId} by ${changeAmount} in Firestore`);
     try {
        const productRef = doc(adminDb, 'products', productId);
        // Use a transaction for atomic read-modify-write
        const result = await adminDb.runTransaction(async (transaction) => {
            const productSnap = await transaction.get(productRef);
            if (!productSnap.exists()) {
                throw new Error('Product not found.');
            }

            const currentStock = productSnap.data()?.stockLevel ?? 0;
            const newStockLevel = currentStock + changeAmount;

            if (newStockLevel < 0) {
                 throw new Error('Stock level cannot be negative.');
            }

            transaction.update(productRef, {
                stockLevel: newStockLevel,
                updatedAt: serverTimestamp(), // Use server timestamp
            });
            return newStockLevel; // Return new stock level on success
        });


        console.log(`Product ${productId} stock updated to ${result}`);
        revalidatePath('/admin/erp/products');
        revalidatePath(`/admin/erp/products/${productId}`); // If detail page exists
        return { message: 'Stock updated successfully!', success: true };

     } catch (error: any) {
         console.error(`Error updating stock for product ${productId}:`, error);
         return { message: `Failed to update stock: ${error.message}`, success: false };
     }
}


// --- Order Actions ---

export async function getOrders(): Promise<OrderFirestore[]> {
     try {
        // Query the 'orders' collection in Firestore
        const ordersCol = collection(adminDb, 'orders');
        const q = query(ordersCol, orderBy('orderDate', 'desc'));
        const snapshot = await getDocs(q);

         const orders: OrderFirestore[] = snapshot.docs.map(doc => {
             const data = doc.data();
             // Ensure Timestamps are correctly handled
             if (data.orderDate && !(data.orderDate instanceof Timestamp)) {
                 data.orderDate = Timestamp.fromMillis(data.orderDate.seconds * 1000);
             }
              if (data.createdAt && !(data.createdAt instanceof Timestamp)) {
                 data.createdAt = Timestamp.fromMillis(data.createdAt.seconds * 1000);
              }
             if (data.updatedAt && !(data.updatedAt instanceof Timestamp)) {
                 data.updatedAt = Timestamp.fromMillis(data.updatedAt.seconds * 1000);
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

        // Use the ERP service function which handles the Firestore update
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
        // Use the ERP service function which hits Firestore
        const orderDetails = await ErpService.getErpOrderDetails(orderId);
        return orderDetails;
    } catch (error) {
        console.error(`Error getting details for order ${orderId}:`, error);
        return null;
    }
}
