import { z } from "zod";

// Derivery Point
export const deliveryPointSchema = z.object({
	id: z.string(),
	code: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type deliveryPointType = z.infer<typeof deliveryPointSchema>;

export interface DeliveryPointLabel {
    key: keyof deliveryPointType;
    display: string;
    type: "string" | "boolean";
}
