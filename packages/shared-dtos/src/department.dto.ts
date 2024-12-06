import { z } from 'zod';

export const DepartmentCreateSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1, 'name must be at least 1 character'),
	is_active: z.boolean().default(true).nullable().optional(),
});

export type DepartmentCreateModel = z.infer<typeof DepartmentCreateSchema>;

export class DepartmentCreateDto implements DepartmentCreateModel {
	id?: string;
	name!: string;
	is_active?: boolean | null;
}

export const DepartmentUpdateSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, 'name must be at least 1 character').optional(),
	is_active: z.boolean().default(true).nullable().optional(),
});

export type DepartmentUpdateModel = z.infer<typeof DepartmentUpdateSchema>;

export class DepartmentUpdateDto implements DepartmentUpdateModel {
	id!: string;
	name?: string;
	is_active?: boolean | null;
}
