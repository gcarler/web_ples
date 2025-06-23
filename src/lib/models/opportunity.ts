// src/lib/models/opportunity.ts
import { z } from 'zod';

// Define opportunity stages
export const OpportunityStageSchema = z.enum([
  'Prospecting',
  'Qualification',
  'Needs Analysis',
  'Value Proposition',
  'Proposal/Price Quote',
  'Negotiation/Review',
  'Closed Won',
  'Closed Lost',
]);
export type OpportunityStage = z.infer<typeof OpportunityStageSchema>;

// Schema for Opportunity Input (creating/updating), using z.date()
export const OpportunityInputSchema = z.object({
  name: z.string().min(1, "Opportunity name cannot be empty.").max(200), // Name of the opportunity
  contactId: z.string().min(1, "Associated Contact ID is required."), // Unique identifier of the associated contact
  accountId: z.string().optional(), // Optional unique identifier of the associated account/company
  stage: OpportunityStageSchema.default('Prospecting'), // Current stage of the opportunity
  amount: z.number().positive("Amount must be a positive number.").optional(), // Expected amount of the opportunity
  closeDate: z.date().optional(), // Expected closing date of the opportunity
  description: z.string().max(1000).optional(), // Description of the opportunity
  probability: z.number().min(0).max(100).optional(), // Probability to win the opportunity
  createdAt: z.date().optional(), // Creation date (optional on input, set by server)
  updatedAt: z.date().optional(), // Last update date (optional on input, set by server)
});

// TypeScript type for Opportunity Input
export type OpportunityInput = z.infer<typeof OpportunityInputSchema> & { id?: string };

// Schema for Opportunity Output (retrieved from Firestore)
export const OpportunityOutputSchema = OpportunityInputSchema.extend({
  closeDate: z.date().optional(), // Expected closing date of the opportunity
  createdAt: z.date(), // Creation date (mandatory when retrieved from Firestore)
  updatedAt: z.date(), // Last update date (mandatory when retrieved from Firestore)
});

// TypeScript type for Opportunity Output
export type OpportunityOutput = z.infer<typeof OpportunityOutputSchema> & { id: string };

// Schema for Opportunity Firestore data
export const OpportunityFirestoreSchema = OpportunityOutputSchema;

// TypeScript type for Opportunity Firestore data
export type OpportunityFirestore = z.infer<typeof OpportunityFirestoreSchema> & { id: string };
