// src/lib/models/opportunity.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

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

// Schema for Opportunity Input (creating/updating)
export const OpportunityInputSchema = z.object({
  name: z.string().min(1, "Opportunity name cannot be empty.").max(200), // Name of the opportunity
  contactId: z.string().min(1, "Associated Contact ID is required."), // Unique identifier of the associated contact
  accountId: z.string().optional(), // Optional unique identifier of the associated account/company
  stage: OpportunityStageSchema.default('Prospecting'), // Current stage of the opportunity
  amount: z.number().positive("Amount must be a positive number.").optional(), // Expected amount of the opportunity
  closeDate: z.date().optional(), // Expected closing date of the opportunity
  description: z.string().max(1000).optional(), // Description of the opportunity
  probability: z.number().min(0).max(100).optional(), // Probability to win the opportunity
  createdAt: z.instanceof(Timestamp).optional(), // Creation timestamp (optional on input, set by server)
  updatedAt: z.instanceof(Timestamp).optional(), // Last update timestamp (optional on input, set by server)
});

// TypeScript type for Opportunity Input
export type OpportunityInput = z.infer<typeof OpportunityInputSchema> & { id?: string };

// Schema for Opportunity Output (retrieved from Firestore)
export const OpportunityOutputSchema = OpportunityInputSchema.extend({
  closeDate: z.instanceof(Timestamp).optional(), // Expected closing date of the opportunity, must be a Timestamp when retrieved from Firestore
  createdAt: z.instanceof(Timestamp), // Creation timestamp (mandatory when retrieved from Firestore)
  updatedAt: z.instanceof(Timestamp), // Last update timestamp (mandatory when retrieved from Firestore)
});

// TypeScript type for Opportunity Output
export type OpportunityOutput = z.infer<typeof OpportunityOutputSchema> & { id: string };

// Schema for Opportunity Firestore data
export const OpportunityFirestoreSchema = OpportunityOutputSchema;

// TypeScript type for Opportunity Firestore data
export type OpportunityFirestore = z.infer<typeof OpportunityFirestoreSchema>;

