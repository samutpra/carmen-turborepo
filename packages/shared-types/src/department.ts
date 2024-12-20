import { z } from "zod";

export const DepartmentSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .nonempty('Department name is required')
        .max(50, 'Department name must not exceed 50 characters'),
    description: z
        .string()
        .nonempty('Department description is required')
        .max(255, 'Description must not exceed 255 characters'),
    is_active: z.boolean().refine(
        (val) => typeof val === 'boolean',
        { message: 'Active status must be true or false' }
    ),
});

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export interface DepartmentLabel {
    key: keyof DepartmentType;
    label: string;
}

export type PayloaDepartmentType = Omit<DepartmentType, 'id'>;
