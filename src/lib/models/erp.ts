// src/lib/models/erp.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// --- Product Model ---
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name cannot be empty.").max(150),
  description: z.string().max(1000).optional(),
  sku: z.string().min(1, "SKU is required.").max(50).optional(), // Stock Keeping Unit
  price: z.number().nonnegative("Price cannot be negative."),
  stockLevel: z.number().int().nonnegative("Stock level cannot be negative.").default(0),
  category: z.string().optional(),
  // Add other relevant ERP fields like supplierId, weight, dimensions, etc.
  createdAt: z.instanceof(Timestamp).optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

export type Product = z.infer<typeof ProductSchema> & { id?: string };

export const ProductFirestoreSchema = ProductSchema.extend({
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type ProductFirestore = z.infer<typeof ProductFirestoreSchema> & { id: string };


// --- Order Model ---
export const OrderStatusSchema = z.enum([
  'Pending', // Order received, not yet processed
  'Processing', // Order acknowledged, inventory allocated/production started
  'Awaiting Payment', // Order waiting for payment confirmation
  'Awaiting Shipment', // Order ready to be shipped
  'Shipped', // Order has been shipped
  'Delivered', // Order confirmed delivered
  'Completed', // Order delivered and finalized
  'Cancelled', // Order was cancelled
  'Refunded', // Order was refunded
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const OrderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string(), // Store name at time of order for history
  sku: z.string().optional(), // Store SKU at time of order
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(), // Price per unit at time of order
  // Add discounts, taxes etc. if needed per item
});

export const OrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."), // Can be auto-generated
  contactId: z.string().min(1, "Contact ID is required."), // Link to CRM Contact
  opportunityId: z.string().optional(), // Link to CRM Opportunity if applicable
  orderDate: z.instanceof(Timestamp),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item."),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative().default(0),
  taxAmount: z.number().nonnegative().default(0),
  totalAmount: z.number().nonnegative(),
  status: OrderStatusSchema.default('Pending'),
  shippingAddress: z.object({ // Example address structure
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }).optional(),
  billingAddress: z.object({
     street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }).optional(),
  paymentMethod: z.string().optional(),
  paymentStatus: z.enum(['Pending', 'Paid', 'Failed', 'Refunded']).default('Pending'),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.instanceof(Timestamp).optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

export type Order = z.infer<typeof OrderSchema> & { id?: string };

export const OrderFirestoreSchema = OrderSchema.extend({
  orderDate: z.instanceof(Timestamp), // Ensure Timestamps from Firestore
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type OrderFirestore = z.infer<typeof OrderFirestoreSchema> & { id: string };