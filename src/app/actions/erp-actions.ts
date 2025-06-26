// src/app/actions/erp-actions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { collection, addDoc, getDocs, query, orderBy, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { ProductInputSchema, ProductOutputSchema, ProductFirestore, OrderFirestoreSchema, OrderFirestore, OrderStatusSchema, OrderStatus } from '@/lib/models/erp';
import * as ErpService from '@/services/erp-service';

const AddProductInputSchema = ProductInputSchema.omit({ id: true, createdAt: true, updatedAt: true });
const sdkNotInitializedError = { message: "Firebase Admin SDK is not configured. Server-side features are disabled.", success: false };

export async function addProduct(
    prevState: { message: string | null; success: boolean },
    formData: FormData
): Promise<{ message: string | null; success: boolean }> {
    if (!adminDb) {
      console.error(sdkNotInitializedError.message);
      return sdkNotInitializedError;
    }
    try {
        const rawData = Object.fromEntries(formData.entries());
        const dataToValidate = {
            ...rawData,
            price: parseFloat(rawData.price as string),
            stockLevel: parseInt(rawData.stockLevel as string, 10),
            sku: rawData.sku || undefined,
            category: rawData.category || undefined,
            description: rawData.description || undefined,
        };

        const validatedData = AddProductInputSchema.safeParse(dataToValidate);
        if (!validatedData.success) {
             console.error('Add Product Validation Error:', validatedData.error.flatten().fieldErrors);
             const errorMessages = Object.values(validatedData.error.flatten().fieldErrors).map(errors => errors?.join(', ')).filter(Boolean).join('; ');
            return { message: `Invalid product data: ${errorMessages}`, success: false };
        }

        const productWithTimestamps = { ...validatedData.data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
        await addDoc(collection(adminDb, 'products'), productWithTimestamps);
        revalidatePath('/admin/erp/products');
        return { message: 'Product added successfully!', success: true };
    } catch (error) {
        console.error('Error adding product:', error);
        let errorMessage = 'Failed to add product due to a server error.';
        if (error instanceof Error) errorMessage = `Failed to add product: ${error.message}`;
        return { message: errorMessage, success: false };
    }
}

export async function getProducts(): Promise<ProductFirestore[]> {
    if (!adminDb) {
        console.error(sdkNotInitializedError.message);
        return [];
    }
    try {
        const productsCol = collection(adminDb, 'products');
        const q = query(productsCol, orderBy('name', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => {
            const data = doc.data();
            const dataWithDates = { ...data, createdAt: data.createdAt?.toDate(), updatedAt: data.updatedAt?.toDate() };
            const parsed = ProductOutputSchema.safeParse(dataWithDates);
            if (!parsed.success) {
                console.warn(`Invalid product data in Firestore ${doc.id}:`, parsed.error);
                return {
                    id: doc.id,
                    name: 'Invalid Data',
                    price: 0,
                    stockLevel: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    sku: 'INVALID_SKU',
                } as ProductFirestore;
            }
            return { id: doc.id, ...parsed.data };
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function updateProductStock(productId: string, changeAmount: number): Promise<{ message: string | null; success: boolean }> {
    if (!adminDb) {
        console.error(sdkNotInitializedError.message);
        return sdkNotInitializedError;
    }
    console.log(`Action: Updating stock for product ${productId} by ${changeAmount} in Firestore`);
     try {
        const productRef = doc(adminDb, 'products', productId);
        const result = await adminDb.runTransaction(async (transaction) => {
            const productSnap = await transaction.get(productRef);
            if (!productSnap.exists()) throw new Error('Product not found.');
            const currentStock = productSnap.data()?.stockLevel ?? 0;
            const newStockLevel = currentStock + changeAmount;
            if (newStockLevel < 0) throw new Error('Stock level cannot be negative.');
            transaction.update(productRef, { stockLevel: newStockLevel, updatedAt: serverTimestamp() });
            return newStockLevel;
        });

        revalidatePath('/admin/erp/products');
        revalidatePath(`/admin/erp/products/${productId}`);
        return { message: 'Stock updated successfully!', success: true };
     } catch (error: any) {
         console.error(`Error updating stock for product ${productId}:`, error);
         return { message: `Failed to update stock: ${error.message}`, success: false };
     }
}

export async function getOrders(): Promise<OrderFirestore[]> {
     if (!adminDb) {
        console.error(sdkNotInitializedError.message);
        return [];
    }
     try {
        const ordersCol = collection(adminDb, 'orders');
        const q = query(ordersCol, orderBy('orderDate', 'desc'));
        const snapshot = await getDocs(q);

         return snapshot.docs.map(doc => {
             const data = doc.data();
             const dataWithDates = {
                 ...data,
                 orderDate: data.orderDate?.toDate(),
                 createdAt: data.createdAt?.toDate(),
                 updatedAt: data.updatedAt?.toDate(),
             };
             const parsed = OrderFirestoreSchema.safeParse(dataWithDates);
             if (!parsed.success) {
                 console.warn(`Invalid order data in Firestore ${doc.id}:`, parsed.error.flatten().fieldErrors);
                 return {
                    id: doc.id,
                    orderNumber: 'Invalid',
                    contactId: '',
                    orderDate: new Date(),
                    items: [],
                    totalAmount: 0,
                    status: 'Pending',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    paymentStatus: 'Pending',
                    subtotal:0,
                 } as OrderFirestore;
             }
             return { id: doc.id, ...parsed.data };
         });
     } catch (error) {
         console.error('Error fetching orders:', error);
         return [];
     }
 }

 export async function updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<{ message: string | null; success: boolean }> {
     if (!adminDb) {
        console.error(sdkNotInitializedError.message);
        return sdkNotInitializedError;
    }
     console.log(`Action: Updating status for order ${orderId} to ${newStatus}`);
    try {
        const validatedStatus = OrderStatusSchema.safeParse(newStatus);
        if (!validatedStatus.success) {
            return { message: 'Invalid order status provided.', success: false };
        }

        const success = await ErpService.updateErpOrderStatus(orderId, validatedStatus.data);

        if (success) {
            revalidatePath('/admin/erp/orders');
            revalidatePath(`/admin/erp/orders/${orderId}`);
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
     if (!adminDb) {
        console.error(sdkNotInitializedError.message);
        return null;
    }
     console.log(`Action: Getting details for order ${orderId}`);
    try {
        return await ErpService.getErpOrderDetails(orderId);
    } catch (error) {
        console.error(`Error getting details for order ${orderId}:`, error);
        return null;
    }
}
