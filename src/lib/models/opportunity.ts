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

// Zod schema for validating opportunity data
export const OpportunitySchema = z.object({
  name: z.string().min(1, "Opportunity name cannot be empty.").max(200),
  contactId: z.string().min(1, "Associated Contact ID is required."), // Link to Contact
  accountId: z.string().optional(), // Optional link to an Account/Company entity
  stage: OpportunityStageSchema.default('Prospecting'),
  amount: z.number().positive("Amount must be a positive number.").optional(),
  closeDate: z.date().optional(), // Expected close date
  description: z.string().max(1000).optional(),
  createdAt: z.instanceof(Timestamp).optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

// TypeScript type derived from the schema
export type Opportunity = z.infer<typeof OpportunitySchema> & { id?: string };

// Schema for data retrieved from Firestore
export const OpportunityFirestoreSchema = OpportunitySchema.extend({
  // Ensure dates are Timestamps when coming from Firestore
  closeDate: z.instanceof(Timestamp).optional(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type OpportunityFirestore = z.infer<typeof OpportunityFirestoreSchema> & { id: string };