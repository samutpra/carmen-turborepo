import { z } from "zod";

// Derivery Point
export const deliveryPointSchema = z.object({
	id: z.string().optional(),
	name: z.string().nonempty('Name is required'),
	is_active: z.boolean().refine(
		(val) => typeof val === 'boolean',
		{ message: 'Active status must be true or false' }
	),
});

export type DeliveryPointType = z.infer<typeof deliveryPointSchema>;

export interface DeliveryPointLabel {
	key: keyof DeliveryPointType;
	label: string;
}
