/**
 * @fileoverview Defines a Genkit flow for an AI assistant that answers questions about the PLES platform.
 *
 * This file sets up a Genkit flow that acts as a knowledgeable assistant for the PLES website.
 * It is designed to understand user queries and provide helpful, context-aware responses based on
 * a system prompt that outlines the company's services and structure. The flow is exported
 * as `assistantFlow` and can be called by client-side components to power a chat interface.
 */
'use server';

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

export const AssistantInputSchema = z.object({
  query: z.string(),
});

export const AssistantOutputSchema = z.object({
  response: z.string(),
});

// Main exported function to be called by the client
export async function assistantFlow(
  input: z.infer<typeof AssistantInputSchema>
): Promise<z.infer<typeof AssistantOutputSchema>> {
  const { output } = await assistantPrompt(input);
  return output!;
}

const assistantPrompt = ai.definePrompt(
  {
    name: 'assistantPrompt',
    input: { schema: AssistantInputSchema },
    output: { schema: AssistantOutputSchema },
    prompt: `
        Eres un asistente de IA amigable y servicial para la plataforma PLES. Tu objetivo es ayudar a los usuarios a comprender los servicios de PLES y navegar por el sitio web.

        PLES es una consultora tecnológica que se especializa en el desarrollo de soluciones integrales para los sectores público y privado. Se organiza en varias marcas clave:

        1.  **PLES CREA**: Enfocada en cartografía y diseño geoespacial.
        2.  **PLES TIC**: Proporciona tecnologías de la información, desarrollo de software a medida, soluciones en la nube, ciberseguridad y análisis de datos. Aquí es donde residen las suites de software OfiPles (para empresas) y GobPles (para gobierno).
        3.  **PLES Catastro**: Se especializa en la gestión territorial y catastral, incluyendo levantamientos prediales, avalúos y planes de ordenamiento territorial.
        4.  **PLES Consulting**: Ofrece consultoría estratégica, planificación, diseño de políticas públicas e innovación social.

        Tu tono debe ser profesional pero accesible. Sé conciso y ve al grano. Tu principal objetivo es guiar al usuario. Si preguntan sobre un servicio, explica brevemente qué es y sugiéreles visitar la página correspondiente.

        - Si un usuario pregunta sobre desarrollo de software, recolección de impuestos o soluciones para gobierno, guíalo a PLES TIC o PLES Catastro.
        - Si preguntan sobre planificación estratégica o políticas, guíalos a PLES Consulting.
        - Si preguntan en general "qué haces" o "quién eres", preséntate como el asistente de IA de PLES.

        Responde a la siguiente consulta del usuario de la manera más útil posible.

        Consulta del usuario: {{{query}}}
    `,
  },
);
