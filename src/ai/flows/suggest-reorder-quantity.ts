'use server';
/**
 * @fileOverview An AI agent that suggests reorder quantities for tools and materials.
 *
 * - suggestReorderQuantity - A function that handles the reorder quantity suggestion process.
 * - SuggestReorderQuantityInput - The input type for the suggestReorderQuantity function.
 * - SuggestReorderQuantityOutput - The return type for the suggestReorderQuantity function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestReorderQuantityInputSchema = z.object({
  itemName: z.string().describe('The name of the item to reorder.'),
  historicalStockLevels: z
    .string()
    .describe(
      'Historical stock levels and usage patterns for the item, as a JSON string.'
    ),
  reorderPoint: z
    .number()
    .describe(
      'The reorder point for the item (the stock level at which a reorder should be triggered).'n    ),
});
export type SuggestReorderQuantityInput = z.infer<
  typeof SuggestReorderQuantityInputSchema
>;

const SuggestReorderQuantityOutputSchema = z.object({
  suggestedReorderQuantity: z
    .number()
    .describe(
      'The suggested reorder quantity for the item, based on historical stock levels and usage patterns.'
    ),
  reasoning: z
    .string()
    .describe(
      'The AI’s reasoning for the suggested reorder quantity. Include factors considered such as lead time, demand variability, and safety stock.'
    ),
});
export type SuggestReorderQuantityOutput = z.infer<
  typeof SuggestReorderQuantityOutputSchema
>;

export async function suggestReorderQuantity(
  input: SuggestReorderQuantityInput
): Promise<SuggestReorderQuantityOutput> {
  return suggestReorderQuantityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestReorderQuantityPrompt',
  input: {
    schema: z.object({
      itemName: z.string().describe('The name of the item to reorder.'),
      historicalStockLevels: z
        .string()
        .describe(
          'Historical stock levels and usage patterns for the item, as a JSON string.'
        ),
      reorderPoint: z
        .number()
        .describe(
          'The reorder point for the item (the stock level at which a reorder should be triggered).'n        ),
    }),
  },
  output: {
    schema: z.object({
      suggestedReorderQuantity: z
        .number()
        .describe(
          'The suggested reorder quantity for the item, based on historical stock levels and usage patterns.'
        ),
      reasoning: z
        .string()
        .describe(
          'The AI’s reasoning for the suggested reorder quantity. Include factors considered such as lead time, demand variability, and safety stock.'
        ),
    }),
  },
  prompt: `You are a stock management expert. Analyze the historical stock levels and usage patterns for the item and suggest an optimal reorder quantity to maintain adequate stock levels and avoid shortages.

Item Name: {{{itemName}}}
Historical Stock Levels and Usage Patterns: {{{historicalStockLevels}}}
Reorder Point: {{{reorderPoint}}}

Consider factors such as lead time, demand variability, and safety stock when determining the reorder quantity. Provide a brief explanation of your reasoning.

Suggested Reorder Quantity:`,
});

const suggestReorderQuantityFlow = ai.defineFlow<
  typeof SuggestReorderQuantityInputSchema,
  typeof SuggestReorderQuantityOutputSchema
>(
  {
    name: 'suggestReorderQuantityFlow',
    inputSchema: SuggestReorderQuantityInputSchema,
    outputSchema: SuggestReorderQuantityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
