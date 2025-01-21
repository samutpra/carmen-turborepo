import { z } from "zod";

// Currency
export const CurrencySchema = z.object({
	id: z.string().optional(),
	code: z
		.string()
		.nonempty('Currency code is required')
		.max(10, 'Currency code must not exceed 10 characters'),
	name: z
		.string()
		.nonempty('Currency name is required')
		.max(50, 'Currency name must not exceed 50 characters'),
	symbol: z
		.string()
		.nonempty('Currency symbol is required')
		.max(5, 'Currency symbol must not exceed 5 characters'),
	rate: z
		.string()
		.regex(/^\d+(\.\d+)?$/, 'Rate must be a valid decimal number'),
	is_active: z.boolean().refine(
		(val) => typeof val === 'boolean',
		{ message: 'Active status must be true or false' }
	),
});

export type CurrencyType = z.infer<typeof CurrencySchema>;
export interface CurrencyLabel {
	key: keyof CurrencyType;
	label: string;
}

export const SystemCurrencySchema = z.object({
	id: z.string().optional(),
	iso_code: z
		.string()
		.nonempty('Currency code is required')
		.max(10, 'Currency code must not exceed 10 characters'),
	name: z
		.string()
		.nonempty('Currency name is required')
		.max(50, 'Currency name must not exceed 50 characters'),
	symbol: z
		.string()
		.nonempty('Currency symbol is required'),
	is_active: z.boolean().refine(
		(val) => typeof val === 'boolean',
		{ message: 'Active status must be true or false' }
	),
});

export type SystemCurrencyType = z.infer<typeof SystemCurrencySchema>;

