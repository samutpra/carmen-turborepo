import { z } from 'zod';

export const ProductCategoryCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, 'code must be at least 1 character'),
  name: z.string().min(1, 'name must be at least 1 character'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type ProductCategoryCreateModel = z.infer<
  typeof ProductCategoryCreateSchema
>;

export class ProductCategoryCreateDto implements ProductCategoryCreateModel {
  id?: string;
  code!: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
}

export const ProductCategoryUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1, 'code must be at least 1 character').optional(),
  name: z.string().min(1, 'name must be at least 1 character').optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type ProductCategoryUpdateModel = z.infer<
  typeof ProductCategoryUpdateSchema
>;

export class ProductCategoryUpdateDto implements ProductCategoryUpdateModel {
  id!: string;
  code?: string;
  name?: string;
  description?: string | null;
  is_active?: boolean | null;
}

export const mockProductCategories: ProductCategoryCreateDto[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'CAT001',
    name: 'อาหารและเครื่องดื่ม',
    description: 'หมวดหมู่สำหรับสินค้าประเภทอาหารและเครื่องดื่ม',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    code: 'CAT002',
    name: 'เครื่องใช้ไฟฟ้า',
    description: 'หมวดหมู่สำหรับสินค้าประเภทเครื่องใช้ไฟฟ้า',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'เครื่องแต่งกาย',
    code: 'CAT003',
    description: 'หมวดหมู่สำหรับสินค้าประเภทเครื่องแต่งกาย',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    code: 'CAT004',
    name: 'เฟอร์นิเจอร์',
    description: 'หมวดหมู่สำหรับสินค้าประเภทเฟอร์นิเจอร์',
    is_active: false,
  },
];
