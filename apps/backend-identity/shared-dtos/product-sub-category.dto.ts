import { z } from 'zod';

export const ProductSubCategoryCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, 'code must be at least 1 character').optional(),
  name: z.string().min(1, 'name must be at least 1 character'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  product_category_id: z.string().uuid(),
});

export type ProductSubCategoryCreateModel = z.infer<
  typeof ProductSubCategoryCreateSchema
>;

export class ProductSubCategoryCreateDto
  implements ProductSubCategoryCreateModel
{
  id?: string;
  code?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  product_category_id!: string;
}

export const ProductSubCategoryUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1, 'code must be at least 1 character').optional(),
  name: z.string().min(1, 'name must be at least 1 character'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  product_category_id: z.string().uuid(),
});

export type ProductSubCategoryUpdateModel = z.infer<
  typeof ProductSubCategoryUpdateSchema
>;

export class ProductSubCategoryUpdateDto
  implements ProductSubCategoryUpdateModel
{
  id!: string;
  code?: string;
  name!: string;
  description?: string | null;
  is_active?: boolean | null;
  product_category_id!: string;
}

export const mockProductSubCategories: ProductSubCategoryCreateDto[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    code: 'SUBCAT001',
    name: 'เครื่องดื่มแอลกอฮอล์',
    description: 'หมวดหมู่ย่อยสำหรับเครื่องดื่มที่มีแอลกอฮอล์',
    is_active: true,
    product_category_id: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440011',
    code: 'SUBCAT002',
    name: 'เครื่องดื่มไม่มีแอลกอฮอล์',
    description: 'หมวดหมู่ย่อยสำหรับเครื่องดื่มที่ไม่มีแอลกอฮอล์',
    is_active: true,
    product_category_id: '550e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    code: 'SUBCAT003',
    name: 'เครื่องใช้ไฟฟ้าในครัว',
    description: 'หมวดหมู่ย่อยสำหรับเครื่องใช้ไฟฟ้าในครัว',
    is_active: true,
    product_category_id: '550e8400-e29b-41d4-a716-446655440002',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440013',
    code: 'SUBCAT004',
    name: 'เครื่องใช้ไฟฟ้าในห้องนอน',
    description: 'หมวดหมู่ย่อยสำหรับเครื่องใช้ไฟฟ้าในห้องนอน',
    is_active: false,
    product_category_id: '550e8400-e29b-41d4-a716-446655440002',
  },
];
