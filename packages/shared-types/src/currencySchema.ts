import { z } from "zod";

// Currency
export const currencySchema = z.object({
    id: z.string(),
    code: z.string(),
    description: z.string(),
    isActive: z.boolean(),
});

export type currencyType = z.infer<typeof currencySchema>;

export interface CurrencyLabel {
    key: keyof currencyType;
    display: string;
    type: "string" | "boolean";
}