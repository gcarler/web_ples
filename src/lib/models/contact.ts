// src/lib/models/contact.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// Define lead sources
export const LeadSourceSchema = z.enum(['Web Form', 'Referral', 'Cold Call', 'Event', 'Other']);
export type LeadSource = z.infer<typeof LeadSourceSchema>;

// Schema for Contact Input (creating/updating)
export const ContactInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100), // Contact's full name
  email: z.string().email("Please enter a valid email address.").max(100), // Contact's email address
  phone: z.string().optional(), // Contact's phone number (optional)
  company: z.string().optional(), // Contact's company name (optional)
  title: z.string().optional(), // Contact's job title (optional)
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(), // Short bio about the contact (optional)
  address: z.string().optional(), // Contact's address (optional)
  subscribe: z.boolean().default(false).optional(), // Whether the contact is subscribed to newsletters/updates (optional, defaults to false)
  createdAt: z.instanceof(Timestamp).optional(), // Creation timestamp (optional on input, set by server)
  updatedAt: z.instanceof(Timestamp).optional(), // Last update timestamp (optional on input, set by server)
  leadSource: LeadSourceSchema.optional().default('Other'), // The source from which the contact was acquired (optional, defaults to 'Other')
});

// TypeScript type for Contact Input
export type ContactInput = z.infer<typeof ContactInputSchema> & { id?: string };

// Schema for Contact Output (retrieved from Firestore)
export const ContactOutputSchema = ContactInputSchema.extend({
  createdAt: z.instanceof(Timestamp), // Creation timestamp (mandatory when retrieved from Firestore)
  updatedAt: z.instanceof(Timestamp), // Last update timestamp (mandatory when retrieved from Firestore)
});

// TypeScript type for Contact Output
export type ContactOutput = z.infer<typeof ContactOutputSchema> & { id: string }; // ID is mandatory when retrieved from Firestore