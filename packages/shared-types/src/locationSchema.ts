import { z } from 'zod'

export const StoreLocationSchema = z.object({
    id: z.string().optional(),
    storeCode: z.string(),
    storeName: z.string(),
    departmentName: z.string(),
    type: z.string(),
    status: z.string(),
    isActive: z.boolean().default(true),
  });
  
  export type StoreLocationType = z.infer<typeof StoreLocationSchema>;
  
  export interface StoreLocationLabel {
    key: keyof StoreLocationType;
    label: string;
  }