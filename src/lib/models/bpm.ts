// src/lib/models/bpm.ts
import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// Define possible process statuses
export const ProcessStatusSchema = z.enum([
  'Not Started',
  'Running',
  'Suspended',
  'Completed',
  'Failed',
  'Cancelled',
]);
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>;

// Basic schema for a Process Instance
export const ProcessInstanceSchema = z.object({
  processDefinitionId: z.string().min(1), // ID of the defined process model (e.g., "opportunity-to-cash")
  status: ProcessStatusSchema.default('Not Started'),
  correlationId: z.string().optional(), // ID to link this process to a business entity (e.g., Opportunity ID, Order ID)
  variables: z.record(z.any()).optional(), // Store process variables (e.g., customerId, orderAmount)
  currentTaskId: z.string().optional(), // ID of the current active task (if applicable)
  currentTaskName: z.string().optional(), // Name of the current active task
  startedAt: z.instanceof(Timestamp).optional(),
  completedAt: z.instanceof(Timestamp).optional(),
  failedAt: z.instanceof(Timestamp).optional(),
  lastUpdatedAt: z.instanceof(Timestamp).optional(),
  errorDetails: z.string().optional(), // Store error information if the process failed
});

// TypeScript type
export type ProcessInstance = z.infer<typeof ProcessInstanceSchema> & { id?: string };

// Schema for data retrieved from Firestore
export const ProcessInstanceFirestoreSchema = ProcessInstanceSchema.extend({
  startedAt: z.instanceof(Timestamp).optional(),
  completedAt: z.instanceof(Timestamp).optional(),
  failedAt: z.instanceof(Timestamp).optional(),
  lastUpdatedAt: z.instanceof(Timestamp), // Should always be set on update
});

export type ProcessInstanceFirestore = z.infer<typeof ProcessInstanceFirestoreSchema> & { id: string };
