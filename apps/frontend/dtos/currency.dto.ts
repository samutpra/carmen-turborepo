import { z } from 'zod';

export const CurrencyCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(3, 'code must be at least 3 characters'),
  name: z.string().max(100, 'name must be at most 100 characters'),
  symbol: z.string().max(5).nullable().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  exchange_rate: z.number().default(1).nullable().optional(),
});

export type CurrencyCreateModel = z.infer<typeof CurrencyCreateSchema>;

export class CurrencyCreateDto implements CurrencyCreateModel {
	id?: string;
	code!: string;
	name!: string;
	symbol?: string | null;
	description?: string | null;
	is_active?: boolean;
	exchange_rate?: number | null;
}

export class CurrencyCreateDtoList {
	list!: CurrencyCreateDto[];
}

// Update

export const CurrencyUpdateSchema = z.object({
	id: z.string().uuid(),
	code: z.string().min(3, 'code must be at least 3 characters'),
	name: z.string().max(100, 'name must be at most 100 characters'),
	symbol: z.string().max(5).nullable().optional(),
	description: z.string().nullable().optional(),
	is_active: z.boolean().default(true).nullable().optional(),
	exchange_rate: z.number().default(1).nullable().optional(),
});

export type CurrencyUpdateModel = z.infer<typeof CurrencyUpdateSchema>;

export class CurrencyUpdateDto implements CurrencyUpdateModel {
	id!: string;
	code!: string;
	name!: string;
	symbol?: string | null;
	description?: string | null;
	is_active?: boolean;
	exchange_rate?: number | null;
}

