import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';

export const CreditNoteCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  amount: z.number(),
  is_active: z.boolean().default(true).nullable().optional(),
  inventory_transaction_id: z.string().uuid(),
});

export type ICreditNoteCreate = z.infer<typeof CreditNoteCreateSchema>;

export class CreditNoteCreateDto extends createZodDto(CreditNoteCreateSchema) {}
// export class CreditNoteCreateDto implements CreditNoteCreateModel {
//   id?: string;
//   name!: string;
//   description?: string;
//   amount!: number;
//   is_active?: boolean | null;
//   inventory_transaction_id!: string;
// }

export const CreditNoteUpdateSchema = z.object({
  // id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  amount: z.number().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  inventory_transaction_id: z.string().uuid().optional(),
});

export type ICreditNoteUpdate = z.infer<typeof CreditNoteUpdateSchema> & {
  id?: string;
};

export class CreditNoteUpdateDto extends createZodDto(CreditNoteUpdateSchema) {}
// export class CreditNoteUpdateDto implements CreditNoteUpdateModel {
//   id!: string;
//   name?: string;
//   description?: string;
//   amount?: number;
//   is_active?: boolean | null;
//   inventory_transaction_id?: string;
// }
