import { z } from 'zod';

export const ProductItemGroupCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, 'code must be at least 1 character').optional(),
  name: z.string().min(1, 'name is required'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  product_subcategory_id: z.string().uuid(),
});

export type ProductItemGroupCreateModel = z.infer<
  typeof ProductItemGroupCreateSchema
>;

export class ProductItemGroupCreateDto implements ProductItemGroupCreateModel {
  id?: string;
  code?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  product_subcategory_id!: string;
}

export const ProductItemGroupUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1, 'code must be at least 1 character').optional(),
  name: z.string().min(1, 'name is required'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  product_subcategory_id: z.string().uuid(),
});

export type ProductItemGroupUpdateModel = z.infer<
  typeof ProductItemGroupUpdateSchema
>;

export class ProductItemGroupUpdateDto implements ProductItemGroupUpdateModel {
  id!: string;
  code?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  product_subcategory_id!: string;
}

export const mockProductItemGroups: ProductItemGroupCreateDto[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    code: 'GRP001',
    name: 'เบียร์',
    description: 'กลุ่มสินค้าประเภทเบียร์',
    is_active: true,
    product_subcategory_id: '550e8400-e29b-41d4-a716-446655440010',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440021',
    code: 'GRP002',
    name: 'น้ำอัดลม',
    description: 'กลุ่มสินค้าประเภทน้ำอัดลม',
    is_active: true,
    product_subcategory_id: '550e8400-e29b-41d4-a716-446655440011',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440022',
    code: 'GRP003',
    name: 'ไมโครเวฟ',
    description: 'กลุ่มสินค้าประเภทไมโครเวฟ',
    is_active: true,
    product_subcategory_id: '550e8400-e29b-41d4-a716-446655440012',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440023',
    code: 'GRP004',
    name: 'พัดลม',
    description: 'กลุ่มสินค้าประเภทพัดลม',
    is_active: false,
    product_subcategory_id: '550e8400-e29b-41d4-a716-446655440013',
  },
];
