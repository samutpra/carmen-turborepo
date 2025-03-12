import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
export const AddressTypeCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().uuid(),
  description: z.string().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type IAddressTypeCreate = z.infer<typeof AddressTypeCreateSchema>;

export class AddressTypeCreateDto extends createZodDto(
  AddressTypeCreateSchema,
) {}
// export class AddressTypeCreateDto implements AddressTypeCreateModel {
//   id?: string;
//   name!: string;
//   description?: string;
//   is_active?: boolean | null;
// }

export const AddressTypeUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().uuid().optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type IAddressTypeUpdate = z.infer<typeof AddressTypeUpdateSchema>;

export class AddressTypeUpdateDto extends createZodDto(
  AddressTypeUpdateSchema,
) {}
// export class AddressTypeUpdateDto implements AddressTypeUpdateModel {
//   id!: string;
//   name?: string;
//   description?: string;
//   is_active?: boolean | null;
// }

export const mockAddressTypes = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'บ้าน',
    description: 'ที่อยู่บ้าน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'ที่ทำงาน',
    description: 'ที่อยู่ที่ทำงาน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'สาขา',
    description: 'ที่อยู่สาขา',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'คลังสินค้า',
    description: 'ที่อยู่คลังสินค้า',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'โรงงาน',
    description: 'ที่อยู่โรงงาน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'ร้านค้า',
    description: 'ที่อยู่ร้านค้า',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'สำนักงานใหญ่',
    description: 'ที่อยู่สำนักงานใหญ่',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'ศูนย์กระจายสินค้า',
    description: 'ที่อยู่ศูนย์กระจายสินค้า',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'โชว์รูม',
    description: 'ที่อยู่โชว์รูม',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'อื่นๆ',
    description: 'ที่อยู่อื่นๆ',
    is_active: true,
  },
];
