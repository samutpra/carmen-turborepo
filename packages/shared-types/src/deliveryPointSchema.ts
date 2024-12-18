import { z } from "zod";

// Derivery Point
export const deliveryPointSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	is_active: z.boolean(),
});

export type DeliveryPointType = z.infer<typeof deliveryPointSchema>;

export interface DeliveryPointLabel {
	key: keyof DeliveryPointType;
	label: string;
}
