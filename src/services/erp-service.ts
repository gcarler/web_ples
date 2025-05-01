// src/services/erp-service.ts
'use server'; // Mark this module for server-side execution

import { Product, ProductFirestore, ProductOutputSchema, Order, OrderFirestore, OrderFirestoreSchema, OrderStatus } from '@/lib/models/erp';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, query, where, getDocs, doc, getDoc, addDoc, Timestamp, updateDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { startShippingProcess } from './bpm-service'; // Import BPM service

/**
 * Fetches a product's details from the Firestore 'products' collection.
 * @param productId The ID of the product to fetch.
 * @returns Product details or null if not found or data is invalid.
 */
export async function getProductDetails(productId: string): Promise<ProductFirestore | null> {
  console.log(`ERP Service: Fetching details for product ${productId} from Firestore`);
  try {
    const productRef = doc(adminDb, 'products', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        const data = productSnap.data();
        // Ensure Timestamps are correctly handled if they are plain objects
        if (data.createdAt && !(data.createdAt instanceof Timestamp)) {
            data.createdAt = Timestamp.fromMillis(data.createdAt.seconds * 1000);
        }
        if (data.updatedAt && !(data.updatedAt instanceof Timestamp)) {
            data.updatedAt = Timestamp.fromMillis(data.updatedAt.seconds * 1000);
        }

        // Use ProductOutputSchema for validation as it represents Firestore data structure
        const parsed = ProductOutputSchema.safeParse(data);
        if (parsed.success) {
            return { id: productSnap.id, ...parsed.data } as ProductFirestore; // Cast to include ID
        } else {
            console.error(`Invalid product data in Firestore for ID ${productId}:`, parsed.error);
            return null;
        }
    }
    console.log(`Product with ID ${productId} not found in Firestore.`);
    return null;
  } catch (error) {
      console.error(`Error fetching product ${productId} from Firestore:`, error);
      return null;
  }
}

/**
 * Checks the current stock level for a product in Firestore.
 * @param productId The ID of the product.
 * @returns Stock level information or null if product not found.
 */
export async function checkProductStock(productId: string): Promise<{ stockLevel: number } | null> {
  console.log(`ERP Service: Checking stock for product ${productId} from Firestore`);
   try {
       const productRef = doc(adminDb, 'products', productId);
       const productSnap = await getDoc(productRef);
       if (productSnap.exists()) {
           const data = productSnap.data();
           return { stockLevel: data?.stockLevel ?? 0 };
       }
       console.log(`Product with ID ${productId} not found for stock check.`);
       return null;
   } catch (error) {
       console.error(`Error checking stock for product ${productId}:`, error);
       return null;
   }
}

/**
 * Creates an order in the Firestore 'orders' collection.
 * It also attempts to decrement stock levels for ordered items atomically using a batch write.
 * @param orderData Data for the new order.
 * @returns The ID of the created order or null on failure.
 */
export async function createErpOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
  console.log(`ERP Service: Creating order for contact ${orderData.contactId} in Firestore`);
  const batch = writeBatch(adminDb);
  const ordersCol = collection(adminDb, 'orders');
  const newOrderRef = doc(ordersCol); // Generate a ref for the new order

  try {
    // 1. Prepare order data with timestamps
    const orderWithTimestamps = {
      ...orderData,
      // Ensure Timestamps are correct - Firestore expects Timestamps, not JS Dates sometimes
      orderDate: orderData.orderDate instanceof Date ? Timestamp.fromDate(orderData.orderDate) : orderData.orderDate,
      createdAt: serverTimestamp(), // Use server timestamp for creation
      updatedAt: serverTimestamp(), // Use server timestamp for initial update
    };

    // 2. Decrement stock for each item in the order within the batch
    for (const item of orderData.items) {
      const productRef = doc(adminDb, 'products', item.productId);
      const productSnap = await getDoc(productRef); // Get current stock first (important for validation before batch commit)

      if (!productSnap.exists()) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      const currentStock = productSnap.data()?.stockLevel ?? 0;
      if (currentStock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}. Required: ${item.quantity}, Available: ${currentStock}`);
      }
      const newStock = currentStock - item.quantity;
      batch.update(productRef, { stockLevel: newStock, updatedAt: serverTimestamp() });
    }

    // 3. Add the order creation to the batch
    batch.set(newOrderRef, orderWithTimestamps);

    // 4. Commit the batch
    await batch.commit();
    console.log('ERP Order created with ID:', newOrderRef.id);

    // 5. Trigger BPM Shipping Process (after successful order creation and stock update)
    await startShippingProcess(newOrderRef.id);

    return newOrderRef.id;

  } catch (error) {
    console.error('ERP Service Error: Failed to create order or update stock:', error);
    // Note: Batch commit failure automatically rolls back all operations in the batch.
    return null;
  }
}

/**
 * Updates an order's status in the Firestore 'orders' collection.
 * @param orderId The ID of the order to update.
 * @param status The new status.
 * @returns Boolean indicating success.
 */
export async function updateErpOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    console.log(`ERP Service: Updating order ${orderId} to status ${status} in Firestore`);
    if (!orderId) {
        console.error("ERP Service Error: Invalid orderId provided for status update.");
        return false;
    }
    try {
        const orderRef = doc(adminDb, 'orders', orderId);
        await updateDoc(orderRef, {
            status: status,
            updatedAt: serverTimestamp(), // Use server timestamp for updates
        });
        console.log(`ERP Order ${orderId} status updated to ${status}`);
        return true;
    } catch (error) {
        console.error(`ERP Service Error: Failed to update status for order ${orderId}:`, error);
        return false;
    }
}

/**
 * Fetches order details from the Firestore 'orders' collection.
 * @param orderId The ID of the order.
 * @returns Order details or null if not found or data is invalid.
 */
export async function getErpOrderDetails(orderId: string): Promise<OrderFirestore | null> {
    console.log(`ERP Service: Fetching details for order ${orderId} from Firestore`);
    if (!orderId) {
         console.error("ERP Service Error: Invalid orderId provided for fetching details.");
         return null;
    }
    try {
        const orderRef = doc(adminDb, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
            const data = orderSnap.data();
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
            if (parsed.success) {
                return { id: orderSnap.id, ...parsed.data };
            } else {
               console.error(`Invalid order data in Firestore for ID ${orderId}:`, parsed.error);
                return null;
            }
        }
        console.log(`Order with ID ${orderId} not found in Firestore.`);
        return null;
    } catch (error) {
        console.error(`Error fetching order ${orderId} from Firestore:`, error);
        return null;
    }
}
