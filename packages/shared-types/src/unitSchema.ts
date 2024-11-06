import { z } from "zod";

// Unit
export const unitSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
});

export type unitType = z.infer<typeof unitSchema>;
export interface UnitLabel {
    key: keyof unitType;
    display: string;
    type: "string" | "boolean";
}