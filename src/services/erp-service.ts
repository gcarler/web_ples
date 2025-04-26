// src/services/erp-service.ts
'use server'; // Mark this module for server-side execution

import { Product, ProductFirestore, Order, OrderFirestore } from '@/lib/models/erp';
import { adminDb } from '@/lib/firebase/firebase-admin-config';
import { collection, query, where, getDocs, doc, getDoc, addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { startShippingProcess } from './bpm-service'; // Import BPM service

// --- Mock Product Data (Replace with actual Firestore calls) ---
const mockProductsDb: ProductFirestore[] = [
    { id: 'prod_1', name: 'PLES Consulting Hour', description: 'One hour of expert consulting.', price: 150, stockLevel: 1000, sku: 'PLES-CONS-01', category: 'Services', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
    { id: 'prod_2', name: 'PLES TIC Platform Setup', description: 'Initial setup fee for our TIC platform.', price: 5000, stockLevel: 1, sku: 'PLES-TIC-SETUP', category: 'Services', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
    { id: 'prod_3', name: 'PLES Catastro Data Package', description: 'Standard cadastral data package.', price: 1200, stockLevel: 500, sku: 'PLES-CATA-PKG-STD', category: 'Data', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
    { id: 'prod_4', name: 'PLES CREA Design Sprint', description: 'One-week intensive design sprint.', price: 8000, stockLevel: 10, sku: 'PLES-CREA-SPRINT', category: 'Services', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
];

/**
 * Simulates fetching a product's details from the ERP system (Firestore in this case).
 * In a real scenario, this would query the 'products' collection.
 * @param productId The ID of the product to fetch.
 * @returns Product details or null if not found.
 */
export async function getProductDetails(productId: string): Promise<ProductFirestore | null> {
  console.log(`ERP Service: Fetching details for product ${productId}`);
  // --- Replace with actual Firestore call ---
  // const productRef = doc(adminDb, 'products', productId);
  // const productSnap = await getDoc(productRef);
  // if (productSnap.exists()) {
  //     const data = productSnap.data();
  //     const parsed = ProductFirestoreSchema.safeParse(data);
  //     if (parsed.success) {
  //         return { id: productSnap.id, ...parsed.data };
  //     } else {
  //         console.error(`Invalid product data in Firestore for ID ${productId}:`, parsed.error);
  //         return null;
  //     }
  // }
  // return null;
  // --- Mock Implementation ---
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
  const product = mockProductsDb.find(p => p.id === productId);
  return product || null;
}

/**
 * Simulates checking the current stock level for a product in the ERP.
 * @param productId The ID of the product.
 * @returns Stock level information or null if product not found.
 */
export async function checkProductStock(productId: string): Promise<{ stockLevel: number } | null> {
  console.log(`ERP Service: Checking stock for product ${productId}`);
   // --- Replace with actual Firestore call ---
   // const productRef = doc(adminDb, 'products', productId);
   // const productSnap = await getDoc(productRef);
   // if (productSnap.exists()) {
   //     return { stockLevel: productSnap.data().stockLevel || 0 };
   // }
   // return null;
   // --- Mock Implementation ---
  await new Promise(resolve => setTimeout(resolve, 30)); // Simulate network delay
  const product = mockProductsDb.find(p => p.id === productId);
  return product ? { stockLevel: product.stockLevel } : null;
}

/**
 * Simulates creating an order in the ERP system based on CRM data.
 * In a real system, this would interact with Firestore.
 * @param orderData Data for the new order.
 * @returns The ID of the created order or null on failure.
 */
export async function createErpOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
  console.log(`ERP Service: Creating order for contact ${orderData.contactId}`);
  try {
    // --- Replace with actual Firestore call ---
    // const orderWithTimestamps = {
    //   ...orderData,
    //   orderDate: Timestamp.fromDate(orderData.orderDate instanceof Date ? orderData.orderDate : new Date()), // Ensure Timestamp
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    // };
    // const docRef = await addDoc(collection(adminDb, 'orders'), orderWithTimestamps);
    // console.log('ERP Order created with ID:', docRef.id);

    // ** Trigger BPM Shipping Process **
    // await startShippingProcess(docRef.id);

    // return docRef.id;
    // --- Mock Implementation ---
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate DB write
    const mockOrderId = `order_${Date.now()}`;
    console.log('Mock ERP Order created with ID:', mockOrderId);
    // ** Trigger Mock BPM Shipping Process **
    await startShippingProcess(mockOrderId);
    return mockOrderId;

  } catch (error) {
    console.error('ERP Service Error: Failed to create order:', error);
    return null;
  }
}

/**
 * Simulates updating an order's status in the ERP system.
 * @param orderId The ID of the order to update.
 * @param status The new status.
 * @returns Boolean indicating success.
 */
export async function updateErpOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    console.log(`ERP Service: Updating order ${orderId} to status ${status}`);
    try {
        // --- Replace with actual Firestore call ---
        // const orderRef = doc(adminDb, 'orders', orderId);
        // await updateDoc(orderRef, {
        //     status: status,
        //     updatedAt: Timestamp.now(),
        // });
        // --- Mock Implementation ---
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulate DB update
        console.log(`Mock ERP Order ${orderId} status updated to ${status}`);
        return true;
    } catch (error) {
        console.error(`ERP Service Error: Failed to update status for order ${orderId}:`, error);
        return false;
    }
}

/**
 * Simulates fetching order details from the ERP.
 * @param orderId The ID of the order.
 * @returns Order details or null if not found.
 */
export async function getErpOrderDetails(orderId: string): Promise<OrderFirestore | null> {
    console.log(`ERP Service: Fetching details for order ${orderId}`);
    // --- Replace with actual Firestore call ---
    // const orderRef = doc(adminDb, 'orders', orderId);
    // const orderSnap = await getDoc(orderRef);
    // if (orderSnap.exists()) {
    //     const data = orderSnap.data();
    //     const parsed = OrderFirestoreSchema.safeParse(data);
    //     if (parsed.success) {
    //         return { id: orderSnap.id, ...parsed.data };
    //     } else {
    //        console.error(`Invalid order data in Firestore for ID ${orderId}:`, parsed.error);
    //         return null;
    //     }
    // }
    // return null;
    // --- Mock Implementation ---
     await new Promise(resolve => setTimeout(resolve, 60));
     // Find a mock order or return a default mock structure
     console.warn(`ERP Service: Mock order data returned for ${orderId}. Implement actual fetch.`);
     return {
        id: orderId,
        orderNumber: `ORD-${orderId.slice(-4)}`,
        contactId: 'contact_mock_123',
        orderDate: Timestamp.now(),
        items: [{ productId: 'prod_1', productName: 'Mock Product', quantity: 1, price: 100 }],
        subtotal: 100,
        totalAmount: 100,
        status: 'Processing',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        paymentStatus: 'Paid',
     } as OrderFirestore;
}