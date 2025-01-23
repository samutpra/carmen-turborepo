import { z } from 'zod';

export const UnitCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'name must be at least 1 character'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitCreateModel = z.infer<typeof UnitCreateSchema>;

export class UnitCreateDto implements UnitCreateModel {
  id?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
}

export const UnitUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'name must be at least 1 character').optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitUpdateModel = z.infer<typeof UnitUpdateSchema>;

export class UnitUpdateDto implements UnitUpdateModel {
  id!: string;
  name?: string;
  description?: string | null;
  is_active?: boolean | null;
}
