// src/lib/models/erp.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// --- Product Model ---

export const ProductInputSchema = z.object({
  name: z.string().min(1, "Product name cannot be empty.").max(150), // Name of the product
  description: z.string().max(1000).optional(), // Description of the product
  sku: z.string().min(1, "SKU is required.").max(50), // Stock Keeping Unit (SKU) of the product
  price: z.number().positive("Price must be positive."), // Price of the product
  stockLevel: z.number().int().nonnegative("Stock level cannot be negative.").default(0), // Current stock level of the product
  category: z.string().optional(), // Category of the product
  imageUrl: z.string().optional(), // URL to the product image
  createdAt: z.instanceof(Timestamp).optional(), // Creation timestamp (optional on input, set by server)
  updatedAt: z.instanceof(Timestamp).optional(), // Last update timestamp (optional on input, set by server)
});

export type ProductInput = z.infer<typeof ProductInputSchema> & { id?: string };

export const ProductOutputSchema = ProductInputSchema.extend({
  createdAt: z.instanceof(Timestamp), // Creation timestamp (mandatory when retrieved from Firestore)
  updatedAt: z.instanceof(Timestamp), // Last update timestamp (mandatory when retrieved from Firestore)
});

export type ProductOutput = z.infer<typeof ProductOutputSchema> & { id: string };


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


export const OrderFirestoreSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."), // Unique identifier for the order (can be auto-generated)
  contactId: z.string().min(1, "Contact ID is required."), // Unique identifier of the contact associated with this order
  opportunityId: z.string().optional(), // Link to CRM Opportunity if applicable
  orderDate: z.instanceof(Timestamp),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item."),
  subtotal: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  discountAmount: z.number().nonnegative().default(0).optional(), // discountAmount amount for the order
  status: OrderStatusSchema.default('Pending'), // Current status of the order (defaults to 'Pending')
  paymentStatus: z.enum(['Pending', 'Paid', 'Failed', 'Refunded']).default('Pending'), // Status of the payment (defaults to 'Pending')
  createdAt: z.instanceof(Timestamp), // Creation timestamp (mandatory when retrieved from Firestore)
  updatedAt: z.instanceof(Timestamp), // Last update timestamp (mandatory when retrieved from Firestore)
});
export type OrderFirestore = z.infer<typeof OrderFirestoreSchema>;


export const OrderInputSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required."), // Unique identifier for the order (can be auto-generated)
  contactId: z.string().min(1, "Contact ID is required."), // Unique identifier of the contact associated with this order
  opportunityId: z.string().optional(), // Link to CRM Opportunity if applicable
  orderDate: z.instanceof(Timestamp),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item."),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative().default(0),
  taxAmount: z.number().nonnegative().default(0),
  totalAmount: z.number().nonnegative(),
  discountAmount: z.number().nonnegative().default(0).optional(), // discountAmount amount for the order
  status: OrderStatusSchema.default('Pending'), // Current status of the order (defaults to 'Pending')
  shippingAddress: z.object({ // Shipping address structure
    street: z.string(), // Street address
    city: z.string(), // City
    state: z.string(), // State
    postalCode: z.string(), // Postal code
    country: z.string(), // Country
  }).optional(),
  billingAddress: z.object({ // Billing address structure
    street: z.string(), // Street address
    city: z.string(), // City
    state: z.string(), // State
    postalCode: z.string(), // Postal code
    country: z.string(), // Country
  }).optional(),
  paymentMethod: z.string().optional(), // Method used for payment (e.g., 'Credit Card', 'PayPal')
  paymentStatus: z.enum(['Pending', 'Paid', 'Failed', 'Refunded']).default('Pending'), // Status of the payment (defaults to 'Pending')
  trackingNumber: z.string().optional(), // Tracking number for the shipment (if applicable)
  notes: z.string().optional(), // Any additional notes about the order
  createdAt: z.instanceof(Timestamp).optional(), // Creation timestamp (optional on input, set by server)
  updatedAt: z.instanceof(Timestamp).optional(), // Last update timestamp (optional on input, set by server)
});

export type OrderInput = z.infer<typeof OrderInputSchema> & { id?: string };

export type Order = OrderInput | OrderOutput | OrderFirestore;

export const OrderOutputSchema = OrderInputSchema.extend({
  orderDate: z.instanceof(Timestamp), // Date when the order was placed (mandatory when retrieved from Firestore)
  createdAt: z.instanceof(Timestamp), // Creation timestamp (mandatory when retrieved from Firestore)
  updatedAt: z.instanceof(Timestamp), // Last update timestamp (mandatory when retrieved from Firestore)
});

export type OrderOutput = z.infer<typeof OrderOutputSchema> & { id: string };


