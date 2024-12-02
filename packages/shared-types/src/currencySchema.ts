import { z } from "zod";

// Currency
export const CurrencySchema = z.object({
	id: z.string().optional(),
	code: z.string(),
	name: z.string(),
	symbol: z.string(),
	description: z.string(),
	rate: z.number(),
	is_active: z.boolean(),
});
  
  export type CurrencyType = z.infer<typeof CurrencySchema>;
  export interface CurrencyLabel {
    key: keyof CurrencyType;
    label: string;
  }