import { z } from 'zod';

export enum enum_location_type {
	inventory = 'Inventory',
	direct = 'Direct',
	consignment = 'Consignment',
}
export const LocationCreateSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1, 'name must be at least 1 character'),
	description: z.string().nullable().optional(),
	is_active: z.boolean().default(true).nullable().optional(),
	location_type: z.enum(Object.values(enum_location_type) as [string, ...string[]]),
	deliveryPointId: z.string().uuid().nullable().optional(),
});

export type LocationCreateModel = z.infer<typeof LocationCreateSchema>;

export class LocationCreateDto implements LocationCreateModel {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	location_type!: enum_location_type;
	deliveryPointId?: string | null;
}

export const LocationUpdateSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, 'name must be at least 1 character').optional(),
	description: z.string().nullable().optional(),
	is_active: z.boolean().default(true).nullable().optional(),
	location_type: z.enum(Object.values(enum_location_type) as [string, ...string[]]).optional(),
	deliveryPointId: z.string().uuid().nullable().optional(),
});

export type LocationUpdateModel = z.infer<typeof LocationUpdateSchema>;

export class LocationUpdateDto implements LocationUpdateModel {
	id!: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	location_type!: enum_location_type;
	deliveryPointId?: string | null;
}
