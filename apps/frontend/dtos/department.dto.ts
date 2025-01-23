import { z } from 'zod';

export const DepartmentCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'name must be at least 1 character'),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type DepartmentCreateModel = z.infer<typeof DepartmentCreateSchema>;

export class DepartmentCreateDto implements DepartmentCreateModel {
  id?: string;
  name!: string;
  is_active?: boolean | null;
}

export const DepartmentUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'name must be at least 1 character').optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type DepartmentUpdateModel = z.infer<typeof DepartmentUpdateSchema>;

export class DepartmentUpdateDto implements DepartmentUpdateModel {
  id!: string;
  name?: string;
  is_active?: boolean | null;
}

export const mockDepartments = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'แผนกขาย',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'แผนกการตลาด',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'แผนกบัญชี',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'แผนกทรัพยากรบุคคล',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'แผนกไอที',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'แผนกจัดซื้อ',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'แผนกคลังสินค้า',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'แผนกขนส่ง',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'แผนกซ่อมบำรุง',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'แผนกควบคุมคุณภาพ',
    is_active: true,
  },
];
