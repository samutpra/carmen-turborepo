import { z } from 'zod';

export const DeliveryPointCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'name must be at least 1 character'),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type DeliveryPointCreateModel = z.infer<
  typeof DeliveryPointCreateSchema
>;

export class DeliveryPointCreateDto implements DeliveryPointCreateModel {
  id?: string;
  name!: string;
  is_active?: boolean | null;
}

export const DeliveryPointUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'name must be at least 1 character').optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type DeliveryPointUpdateModel = z.infer<
  typeof DeliveryPointUpdateSchema
>;

export class DeliveryPointUpdateDto implements DeliveryPointUpdateModel {
  id!: string;
  name?: string;
  is_active?: boolean | null;
}

export const mockDeliveryPoints = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'จุดส่งสินค้าหน้าร้าน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'จุดส่งสินค้าหลังร้าน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'จุดส่งสินค้าด้านข้างร้าน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'จุดส่งสินค้าชั้น 1',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'จุดส่งสินค้าชั้น 2',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'จุดส่งสินค้าชั้นใต้ดิน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'จุดส่งสินค้าลานจอดรถ',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'จุดส่งสินค้าโกดัง',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'จุดส่งสินค้าสำนักงาน',
    is_active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'จุดส่งสินค้าห้องรับของ',
    is_active: true,
  },
];
