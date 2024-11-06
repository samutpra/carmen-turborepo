import { z } from "zod";

// Unit
export const UnitSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    description: z.string().min(1, "Description is required").max(100, "Description must be less than 100 characters"),
    isActive: z.boolean().default(true)
  });
  
  export type UnitType = z.infer<typeof UnitSchema>;
  export interface UnitLabel {
    key: keyof UnitType;
    label: string;
  }