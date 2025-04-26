// src/lib/models/contact.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp

// Define lead sources
export const LeadSourceSchema = z.enum(['Web Form', 'Referral', 'Cold Call', 'Event', 'Other']);
export type LeadSource = z.infer<typeof LeadSourceSchema>;

// Zod schema for validating contact data when creating/updating
export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().email("Please enter a valid email address.").max(100),
  phone: z.string().optional(), // Added phone number
  company: z.string().optional(), // Added company
  title: z.string().optional(), // Added title
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  subscribe: z.boolean().default(false).optional(),
  createdAt: z.instanceof(Timestamp).optional(), // Optional on input, set by server
  updatedAt: z.instanceof(Timestamp).optional(), // Optional on input, set by server
  leadSource: LeadSourceSchema.optional().default('Other'), // Added lead source with enum type
});

// TypeScript type derived from the schema (used in code)
export type Contact = z.infer<typeof ContactSchema> & { id?: string }; // Add optional id

// Schema for data retrieved from Firestore (includes server-generated timestamps)
export const ContactFirestoreSchema = ContactSchema.extend({
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type ContactFirestore = z.infer<typeof ContactFirestoreSchema> & { id: string }; // id is mandatory when retrieved