// src/lib/models/contact.ts
import { z } from 'zod';

// Define lead sources
export const LeadSourceSchema = z.enum(['Web Form', 'Referral', 'Cold Call', 'Event', 'Other']);
export type LeadSource = z.infer<typeof LeadSourceSchema>;

// Schema for Contact Input (creating/updating), using z.date() for dates
export const ContactInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100), // Contact's full name
  email: z.string().email("Please enter a valid email address.").max(100), // Contact's email address
  phone: z.string().optional(), // Contact's phone number (optional)
  company: z.string().optional(), // Contact's company name (optional)
  title: z.string().optional(), // Contact's job title (optional)
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(), // Short bio about the contact (optional)
  address: z.string().optional(), // Contact's address (optional)
  subscribe: z.boolean().default(false).optional(), // Whether the contact is subscribed to newsletters/updates (optional, defaults to false)
  createdAt: z.date().optional(), // Creation date (optional on input, set by server)
  updatedAt: z.date().optional(), // Last update date (optional on input, set by server)
  leadSource: LeadSourceSchema.optional().default('Other'), // The source from which the contact was acquired (optional, defaults to 'Other')
});

// TypeScript type for Contact Input
export type ContactInput = z.infer<typeof ContactInputSchema> & { id?: string };

// Schema for Contact Output (retrieved from Firestore) - includes required dates
export const ContactOutputSchema = ContactInputSchema.extend({
  createdAt: z.date(), // Creation date is mandatory when retrieved
  updatedAt: z.date(), // Last update date is mandatory when retrieved
});

// TypeScript type for Contact Output
export type ContactOutput = z.infer<typeof ContactOutputSchema> & { id: string }; // ID is mandatory when retrieved from Firestore

// Re-exporting ContactOutputSchema as ContactFirestoreSchema for backward compatibility or clearer naming in certain contexts
export const ContactFirestoreSchema = ContactOutputSchema;
export type ContactFirestore = ContactOutput; // Use ContactOutput type for Firestore data structure

// Base Contact type covering both input and output possibilities
export type Contact = ContactInput | ContactOutput;
