/**
 * @fileoverview Defines the data schemas (input and output) for the AI assistant flow.
 * This file separates the data structure definitions from the server-side logic,
 * allowing for clean imports in both client and server components without violating
 * "use server" constraints.
 */
import { z } from 'genkit';

// Defines the expected input from the client to the assistant flow.
export const AssistantInputSchema = z.object({
  query: z.string(),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

// Defines the expected structured output from the assistant flow to the client.
export const AssistantOutputSchema = z.object({
  response: z.string(),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;
