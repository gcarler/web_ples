// src/lib/models/bpm.ts
import { z } from 'zod';

// Define possible process statuses
export const ProcessStatusSchema = z.enum([
  'Not Started',
  'Running',
  'Suspended',
  'Completed', // Process completed successfully
  'Failed',
  'Cancelled', // Process cancelled by user
]);
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>;

// Schema for Process Instance Input (creating/updating), using z.date()
export const ProcessInstanceInputSchema = z.object({
  processDefinitionId: z.string().min(1, "Process definition ID is required."), // Unique identifier for the process definition (e.g., "opportunity-to-cash")
  processDefinitionName: z.string().min(1, "Process definition name is required."), // Name of the process definition (e.g., "Opportunity to Cash")
  status: ProcessStatusSchema.default('Not Started'), // Current status of the process instance
  correlationId: z.string().optional(), // Identifier to link this process instance to a business entity (e.g., Opportunity ID, Order ID)
  variables: z.record(z.any()).optional(), // Dynamic key-value pairs for process variables (e.g., customerId, orderAmount)
  currentTaskId: z.string().optional(), // Unique identifier of the currently active task within the process (if applicable)
  currentTaskName: z.string().optional(), // Name or label of the currently active task
  startedAt: z.date().optional(), // Date when the process instance was started
  completedAt: z.date().optional(), // Date when the process instance was completed
  failedAt: z.date().optional(), // Date when the process instance failed
  lastUpdatedAt: z.date().optional(), // Date of the last update to the process instance
  errorDetails: z.string().optional(), // Detailed information about errors that occurred during the process execution (if applicable)
});

// TypeScript type for Process Instance Input
export type ProcessInstanceInput = z.infer<typeof ProcessInstanceInputSchema> & { id?: string };

// Schema for Process Instance Output (retrieved from Firestore)
export const ProcessInstanceOutputSchema = ProcessInstanceInputSchema.extend({
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  lastUpdatedAt: z.date(), // Date of the last update is mandatory when retrieved
});

// TypeScript type for Process Instance Output
export type ProcessInstanceOutput = z.infer<typeof ProcessInstanceOutputSchema>;

// This is the main type for data retrieved from Firestore, combining Output and ID
export type ProcessInstanceFirestore = ProcessInstanceOutput & { id: string };

// Base ProcessInstance type for general use
export type ProcessInstance = ProcessInstanceInput | ProcessInstanceFirestore;

// Use ProcessInstanceOutputSchema for Firestore data structure validation (ID is handled separately)
export const ProcessInstanceFirestoreSchema = ProcessInstanceOutputSchema;
