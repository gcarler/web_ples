// src/lib/models/contact.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp

// Zod schema for validating contact data when creating/updating
export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().email("Please enter a valid email address.").max(100),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  subscribe: z.boolean().default(false).optional(),
  createdAt: z.instanceof(Timestamp).optional(), // Optional on input, set by server
  updatedAt: z.instanceof(Timestamp).optional(), // Optional on input, set by server
});

// TypeScript type derived from the schema (used in code)
export type Contact = z.infer<typeof ContactSchema> & { id?: string }; // Add optional id

// Schema for data retrieved from Firestore (includes server-generated timestamps)
export const ContactFirestoreSchema = ContactSchema.extend({
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type ContactFirestore = z.infer<typeof ContactFirestoreSchema> & { id: string }; // id is mandatory when retrieved
