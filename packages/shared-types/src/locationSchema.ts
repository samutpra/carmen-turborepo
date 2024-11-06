import { z } from 'zod'

const StoreTypeEnum = z.enum(["Main"]);
const StoreStatusEnum = z.enum(["Default", "System"]);

export const locationSchema = z.object({
    id: z.string().min(1, "require"),
    storeCode: z.string().optional(),
    storeName: z.string(),
    departmentName: z.string(),
    type: StoreTypeEnum,
    status: StoreStatusEnum,
    isActive: z.boolean(),
});

export type LocationType = z.infer<typeof locationSchema>;

export interface LocationLabel {
    key: keyof LocationType;
    display: string;
    type: "string" | "boolean";
}