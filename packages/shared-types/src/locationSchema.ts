import { z } from 'zod';

export const LocationSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
	location_type: z.enum(['inventory', 'direct']),
	description: z.string(),
	is_active: z.boolean(),
	delivery_point_id: z.string().optional().nullable(),
});

export type LocationType = z.infer<typeof LocationSchema>;

export type PayloadLocationType = Omit<LocationType, 'id'>;

export interface LocationLabel {
	key: keyof LocationType;
	label: string;
}