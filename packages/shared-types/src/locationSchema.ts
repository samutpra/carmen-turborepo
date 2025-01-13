import { z } from 'zod';

export const LocationSchema = z.object({
	id: z.string().uuid({ message: 'Invalid UUID format for ID' }).optional(),
	name: z
		.string()
		.nonempty('Location name is required')
		.max(50, 'Location name must not exceed 50 characters'),
	location_type: z.enum(['inventory', 'direct'], {
		errorMap: () => ({ message: 'Invalid location type. Must be "inventory" or "direct"' }),
	}),
	description: z
		.string()
		.nonempty('Location description is required')
		.max(255, 'Description must not exceed 255 characters'),
	is_active: z.boolean().refine(
		(val) => typeof val === 'boolean',
		{ message: 'Active status must be true or false' }
	),
	delivery_point_id: z
		.string()
		.uuid({ message: 'Invalid UUID format for delivery point ID' })
		.optional()
		.nullable(),
});

export type LocationType = z.infer<typeof LocationSchema>;

export type PayloadLocationType = Omit<LocationType, 'id'>;

export interface LocationLabel {
	key: keyof LocationType;
	label: string;
}