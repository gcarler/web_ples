// src/lib/models/erp.ts
import { z } from 'zod';

// --- Product Model ---

export const ProductInputSchema = z.object({
  name: z.string().min(1, "Product name cannot be empty.").max(150), // Name of the product
  description: z.string().max(1000).optional(), // Description of the product
  sku: z.string().min(1, "SKU is required.").max(50), // Stock Keeping Unit (SKU) of the product
  price: z.number().positive("Price must be positive."), // Price of the product
  stockLevel: z.number().int().nonnegative("Stock level cannot be negative.").default(0), // Current stock level of the product
  category: z.string().optional(), // Category of the product
  imageUrl: z.string().optional(), // URL to the product image
  createdAt: z.date().optional(), // Creation date (optional on input, set by server)
  updatedAt: z.date().optional(), // Last update date (optional on input, set by server)
});

export type ProductInput = z.infer<typeof ProductInputSchema> & { id?: string };

// Schema representing data structure in Firestore
export const ProductOutputSchema = ProductInputSchema.extend({
  createdAt: z.date(), // Creation date (mandatory when retrieved from Firestore)
  updatedAt: z.date(), // Last update date (mandatory when retrieved from Firestore)
});

// Type for data retrieved from Firestore, including the ID
export type ProductFirestore = z.infer<typeof ProductOutputSchema> & { id: string };

// --- Order Model ---
export const OrderStatusSchema = z.enum([
  'Pending',             // Order received, not yet processed
  'Processing',          // Order acknowledged, inventory allocated/production started
  'Awaiting Payment',    // Order waiting for payment confirmation
  'Awaiting Shipment',   // Order ready to be shipped
  'Shipped',             // Order has been shipped
  'Delivered',           // Order confirmed delivered
  'Completed',           // Order delivered and finalized
  'Cancelled',           // Order was cancelled
  'Refunded',            // Order was refunded
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const OrderItemSchema = z.object({
  productId: z.string().min(1), // Unique identifier of the product
  productName: z.string(), // Name of the product at the time of order (for history)
  sku: z.string().optional(), // SKU of the product at the time of order (for history)
  quantity: z.number().int().positive("Quantity must be positive."), // Quantity of the product ordered
  price: z.number().positive("Price must be positive."), // Price per unit at the time of order
  // Add discounts, taxes, etc. if needed per item
});

export type OrderItem = z.infer<typeof OrderItemSchema>;


// Schema representing the structure of an Order in Firestore
export const OrderFirestoreSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."), // Unique identifier for the order (can be auto-generated)
  contactId: z.string().min(1, "Contact ID is required."), // Unique identifier of the contact associated with this order
  opportunityId: z.string().optional(), // Link to CRM Opportunity if applicable
  orderDate: z.date(), // Date the order was placed
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item."), // List of items in the order
  subtotal: z.number().nonnegative(), // Subtotal before taxes, shipping, discounts
  totalAmount: z.number().nonnegative(), // Final total amount
  discountAmount: z.number().nonnegative().default(0).optional(), // Discount amount for the order
  status: OrderStatusSchema.default('Pending'), // Current status of the order
  paymentStatus: z.enum(['Pending', 'Paid', 'Failed', 'Refunded']).default('Pending'), // Status of the payment
  createdAt: z.date(), // Creation date
  updatedAt: z.date(), // Last update date
  // Optional fields that might be added later in the process
  shippingAddress: z.object({
    street: z.string(), city: z.string(), state: z.string(), postalCode: z.string(), country: z.string()
  }).optional(),
  billingAddress: z.object({
    street: z.string(), city: z.string(), state: z.string(), postalCode: z.string(), country: z.string()
  }).optional(),
  shippingCost: z.number().nonnegative().optional(),
  taxAmount: z.number().nonnegative().optional(),
  paymentMethod: z.string().optional(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Type for data retrieved from Firestore, including the ID
export type OrderFirestore = z.infer<typeof OrderFirestoreSchema> & { id: string };


// Schema for input when creating an order (might differ slightly from Firestore structure, e.g., dates)
export const OrderInputSchema = OrderFirestoreSchema.omit({ createdAt: true, updatedAt: true }).extend({
  orderDate: z.date().optional(), // Allow omitting on input, will default to now() or serverTimestamp()
  // Make other fields optional if they are set later in the process
}).partial({
    // Make fields optional if they aren't required at the initial creation step
    status: true,
    paymentStatus: true,
    // etc.
});

// Type for input when creating an order
export type OrderInput = z.infer<typeof OrderInputSchema> & { id?: string };

// Generic types for flexibility
export type Product = ProductInput | ProductFirestore;
export type Order = OrderInput | OrderFirestore;
