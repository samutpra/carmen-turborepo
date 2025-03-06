import { z } from 'zod';

const enumActivityAction = z.enum([
  'read',
  'create',
  'update',
  'delete',
  'login',
  'other',
]);

const globalActivityCreateSchema = z.object({
  id: z.string().uuid(),
  action: enumActivityAction,
  entity_type: z.string().max(100),
  entity_id: z.string().uuid(),
  actor_id: z.string().uuid(),
  meta_data: z.object({}).nullable(),
  old_data: z.object({}).nullable(),
  new_data: z.object({}).nullable(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  description: z.string(),
});

export type globalActivityCreateModel = z.infer<
  typeof globalActivityCreateSchema
>;

export class GlobalActivityCreateDto implements globalActivityCreateModel {
  id!: string;
  action!: 'read' | 'create' | 'update' | 'delete' | 'login' | 'other';
  entity_type!: string;
  entity_id!: string;
  actor_id!: string;
  meta_data!: Record<string, unknown> | null;
  old_data!: Record<string, unknown> | null;
  new_data!: Record<string, unknown> | null;
  ip_address!: string | null;
  user_agent!: string | null;
  description!: string;
}

const globalActivityUpdateSchema = z.object({
  id: z.string().uuid(),
  action: enumActivityAction.optional(),
  entity_type: z.string().max(100).optional(),
  entity_id: z.string().uuid().optional(),
  actor_id: z.string().uuid().optional(),
  meta_data: z.object({}).nullable().optional(),
  old_data: z.object({}).nullable().optional(),
  new_data: z.object({}).nullable().optional(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  description: z.string().optional(),
});

export type globalActivityUpdateModel = z.infer<
  typeof globalActivityUpdateSchema
>;

export class GlobalActivityUpdateDto implements globalActivityUpdateModel {
  id!: string;
  action?: 'read' | 'create' | 'update' | 'delete' | 'login' | 'other';
  entity_type?: string;
  entity_id?: string;
  actor_id?: string;
  meta_data?: Record<string, unknown> | null;
  old_data?: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
  ip_address?: string | null;
  user_agent?: string | null;
  description?: string;
}

export const mockGlobalActivities = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    action: 'create',
    entity_type: 'user',
    entity_id: '550e8400-e29b-41d4-a716-446655440001',
    actor_id: '550e8400-e29b-41d4-a716-446655440002',
    meta_data: { browser: 'Chrome', os: 'Windows' },
    old_data: null,
    new_data: { name: 'สมชาย ใจดี', email: 'somchai@example.com' },
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    description: 'สร้างผู้ใช้งานใหม่',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    action: 'update',
    entity_type: 'product',
    entity_id: '550e8400-e29b-41d4-a716-446655440004',
    actor_id: '550e8400-e29b-41d4-a716-446655440005',
    meta_data: { browser: 'Firefox', os: 'MacOS' },
    old_data: { price: 100 },
    new_data: { price: 150 },
    ip_address: '192.168.1.2',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
    description: 'อัพเดทราคาสินค้า',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    action: 'delete',
    entity_type: 'order',
    entity_id: '550e8400-e29b-41d4-a716-446655440007',
    actor_id: '550e8400-e29b-41d4-a716-446655440008',
    meta_data: { reason: 'ลูกค้ายกเลิกคำสั่งซื้อ' },
    old_data: { status: 'pending' },
    new_data: null,
    ip_address: '192.168.1.3',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS)',
    description: 'ลบคำสั่งซื้อ',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    action: 'read',
    entity_type: 'report',
    entity_id: '550e8400-e29b-41d4-a716-446655440010',
    actor_id: '550e8400-e29b-41d4-a716-446655440011',
    meta_data: { report_type: 'sales' },
    old_data: null,
    new_data: null,
    ip_address: '192.168.1.4',
    user_agent: 'Mozilla/5.0 (Linux; Android)',
    description: 'ดูรายงานยอดขาย',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440012',
    action: 'login',
    entity_type: 'auth',
    entity_id: '550e8400-e29b-41d4-a716-446655440013',
    actor_id: '550e8400-e29b-41d4-a716-446655440014',
    meta_data: { login_type: 'password' },
    old_data: null,
    new_data: null,
    ip_address: '192.168.1.5',
    user_agent: 'Mozilla/5.0 (iPad; CPU OS)',
    description: 'เข้าสู่ระบบ',
  },
];
