import { z } from 'zod';

export const VendorCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type VendorCreateModel = z.infer<typeof VendorCreateSchema>;

export class VendorCreateDto implements VendorCreateModel {
  id?: string;
  name!: string;
  description?: string;
  is_active?: boolean | null;
}

export const VendorUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'name is required').optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type VendorUpdateModel = z.infer<typeof VendorUpdateSchema>;

export class VendorUpdateDto implements VendorUpdateModel {
  id!: string;
  name?: string;
  description?: string;
  is_active?: boolean | null;
}

export const mockVendors: VendorCreateDto[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    name: 'บริษัท เอบีซี จำกัด',
    description: 'ผู้จัดจำหน่ายอุปกรณ์อิเล็กทรอนิกส์',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440021',
    name: 'บริษัท เอ็กซ์วาย จำกัด',
    description: 'ผู้ผลิตชิ้นส่วนคอมพิวเตอร์',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440022',
    name: 'บริษัท ไทยซัพพลาย จำกัด',
    description: 'ตัวแทนจำหน่ายอุปกรณ์สำนักงาน',
    is_active: false,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440023',
    name: 'บริษัท เทคโนโลจี จำกัด',
    description: 'ผู้จัดจำหน่ายซอฟต์แวร์และฮาร์ดแวร์',
    is_active: true,
  },
];
