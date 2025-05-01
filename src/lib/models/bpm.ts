// src/lib/models/bpm.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

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

// Schema for Process Instance Input (creating/updating)
export const ProcessInstanceInputSchema = z.object({
  processDefinitionId: z.string().min(1, "Process definition ID is required."), // Unique identifier for the process definition (e.g., "opportunity-to-cash")
  processDefinitionName: z.string().min(1, "Process definition name is required."), // Name of the process definition (e.g., "Opportunity to Cash")
  status: ProcessStatusSchema.default('Not Started'), // Current status of the process instance
  correlationId: z.string().optional(), // Identifier to link this process instance to a business entity (e.g., Opportunity ID, Order ID)
  variables: z.record(z.any()).optional(), // Dynamic key-value pairs for process variables (e.g., customerId, orderAmount)
  currentTaskId: z.string().optional(), // Unique identifier of the currently active task within the process (if applicable)
  currentTaskName: z.string().optional(), // Name or label of the currently active task
  startedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance was started
  completedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance was completed
  failedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance failed
  lastUpdatedAt: z.instanceof(Timestamp).optional(), // Timestamp of the last update to the process instance
  errorDetails: z.string().optional(), // Detailed information about errors that occurred during the process execution (if applicable)
});

// TypeScript type for Process Instance Input
export type ProcessInstanceInput = z.infer<typeof ProcessInstanceInputSchema> & { id?: string };

// Schema for Process Instance Output (retrieved from Firestore)
export const ProcessInstanceOutputSchema = ProcessInstanceInputSchema.extend({
  startedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance was started
  completedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance was completed
  failedAt: z.instanceof(Timestamp).optional(), // Timestamp when the process instance failed
  lastUpdatedAt: z.instanceof(Timestamp), // Timestamp of the last update to the process instance, this should always be set on update
});

// TypeScript type for Process Instance Output
export type ProcessInstanceOutput = z.infer<typeof ProcessInstanceOutputSchema> & { id: string };

// Schema for data retrieved from Firestore
export const ProcessInstanceFirestoreSchema = ProcessInstanceOutputSchema.extend({
  id: z.string()
});

export type ProcessInstanceFirestore = z.infer<typeof ProcessInstanceFirestoreSchema>;
export type ProcessInstance = {
  id?: string;
  processDefinitionId: string;
  processDefinitionName: string;
  status: ProcessStatus;
  correlationId?: string;
  variables?: Record<string, any>;
  currentTaskId?: string;
  currentTaskName?: string;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  failedAt?: Timestamp;
  lastUpdatedAt?: Timestamp;
  errorDetails?: string;
};

