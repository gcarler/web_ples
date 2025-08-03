/**
 * @fileoverview Defines a Genkit flow for an AI assistant that suggests UI component code.
 *
 * This file sets up a Genkit flow that acts as a UI design assistant.
 * It uses a "tool" to format its response as structured code, which can then be
 * displayed to the user. This demonstrates a more advanced use of Genkit where the
 * AI's output is constrained to a specific format for programmatic use.
 */
'use server';

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

// Input schema for the flow
const ComponentSuggestionInputSchema = z.object({
  prompt: z.string().describe('A user prompt describing the UI component they want.'),
});

// Output schema for the "tool" the AI will use
export const ComponentSuggestionOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A brief explanation of the component and the reasoning behind the code structure.'
    ),
  code: z
    .string()
    .describe(
      'The generated React component code using TypeScript, Next.js, Tailwind CSS, and shadcn/ui components. The code should be complete, self-contained, and ready to be copied into a .tsx file.'
    ),
});
export type ComponentSuggestionOutput = z.infer<typeof ComponentSuggestionOutputSchema>;

// Defines the tool that the AI can use to structure its output.
const componentSuggestionTool = ai.defineTool(
  {
    name: 'componentSuggestionTool',
    description: 'Use this tool to provide the explanation and code for the UI component.',
    inputSchema: ComponentSuggestionOutputSchema,
    outputSchema: z.void(), // The tool itself doesn't return anything, it's just a data structure
  },
  async (input) => {
    // This function is a placeholder. The AI will generate the input for this tool,
    // and we will capture that input as the final result.
  }
);


// Defines the main prompt for the AI.
const innovationLabPrompt = ai.definePrompt({
  name: 'innovationLabPrompt',
  input: { schema: ComponentSuggestionInputSchema },
  tools: [componentSuggestionTool],
  prompt: `You are an expert UI/UX designer and full-stack developer specializing in Next.js, React, Tailwind CSS, and shadcn/ui.
  A user will describe a UI component they need. Your task is to:
  1.  Think about the best way to implement this component using the specified tech stack.
  2.  Write a brief explanation of your design choices.
  3.  Generate clean, complete, and production-ready code for the React component in a single .tsx file.
  4.  Use the 'componentSuggestionTool' to format and return your answer.

  Guidelines for the code:
  - Use TypeScript.
  - Use functional components with hooks.
  - Use shadcn/ui components whenever possible (e.g., <Card>, <Button>, <Input>).
  - Use lucide-react for icons.
  - Use Tailwind CSS for styling.
  - The code should be self-contained in one file.

  User prompt: {{{prompt}}}
  `,
});

// Defines the main flow
const getComponentSuggestionFlow = ai.defineFlow(
  {
    name: 'getComponentSuggestionFlow',
    inputSchema: ComponentSuggestionInputSchema,
    // The flow can return either the suggestion or an error string
    outputSchema: z.object({
      suggestion: ComponentSuggestionOutputSchema.optional(),
      error: z.string().optional(),
    }),
  },
  async (input) => {
    const response = await innovationLabPrompt(input);
    const toolRequest = response.toolRequest();
    
    if (toolRequest && toolRequest.tool.name === 'componentSuggestionTool') {
        // The AI correctly used the tool. The arguments to the tool call are our desired output.
        return { suggestion: toolRequest.input };
    } else {
        // The AI failed to use the tool, return an error.
        console.error("AI did not use the expected tool. Response:", response.text);
        return { error: 'Sorry, I was unable to generate a component suggestion for that request. Please try rephrasing your prompt.' };
    }
  }
);

// Exported wrapper function to be called from the client
export async function getComponentSuggestion(input: z.infer<typeof ComponentSuggestionInputSchema>): Promise<z.infer<typeof getComponentSuggestionFlow.outputSchema>> {
    return getComponentSuggestionFlow(input);
}