import { z } from "zod";

export const DepartmentSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    is_active: z.boolean(),
})

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export interface DepartmentLabel {
    key: keyof DepartmentType;
    label: string;
}

export type PayloaDepartmentType = Omit<DepartmentType, 'id'>;
