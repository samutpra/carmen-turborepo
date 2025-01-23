import { z } from 'zod';

export const CurrencyCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(3, 'code must be at least 3 characters'),
  name: z.string().max(100, 'name must be at most 100 characters'),
  symbol: z.string().max(5).nullable().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  exchange_rate: z.number().default(1).nullable().optional(),
});

export type CurrencyCreateModel = z.infer<typeof CurrencyCreateSchema>;

export class CurrencyCreateDto implements CurrencyCreateModel {
  id?: string;
  code!: string;
  name!: string;
  symbol?: string | null;
  description?: string | null;
  is_active?: boolean | null;
  exchange_rate?: number | null;
}

export class CurrencyCreateDtoList {
  list!: CurrencyCreateDto[];
}

// Update

export const CurrencyUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(3, 'code must be at least 3 characters'),
  name: z.string().max(100, 'name must be at most 100 characters'),
  symbol: z.string().max(5).nullable().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  exchange_rate: z.number().default(1).nullable().optional(),
});

export type CurrencyUpdateModel = z.infer<typeof CurrencyUpdateSchema>;

export class CurrencyUpdateDto implements CurrencyUpdateModel {
  id!: string;
  code!: string;
  name!: string;
  symbol?: string | null;
  description?: string | null;
  is_active?: boolean | null;
  exchange_rate?: number | null;
}

export const mockCurrencies = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    code: 'THB',
    name: 'บาทไทย',
    symbol: '฿',
    description: 'สกุลเงินบาทไทย',
    is_active: true,
    exchange_rate: 1,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'USD',
    name: 'ดอลลาร์สหรัฐ',
    symbol: '$',
    description: 'สกุลเงินดอลลาร์สหรัฐ',
    is_active: true,
    exchange_rate: 35.5,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    code: 'EUR',
    name: 'ยูโร',
    symbol: '€',
    description: 'สกุลเงินยูโร',
    is_active: true,
    exchange_rate: 38.2,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    code: 'GBP',
    name: 'ปอนด์สเตอร์ลิง',
    symbol: '£',
    description: 'สกุลเงินปอนด์สเตอร์ลิง',
    is_active: true,
    exchange_rate: 44.5,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    code: 'JPY',
    name: 'เยนญี่ปุ่น',
    symbol: '¥',
    description: 'สกุลเงินเยนญี่ปุ่น',
    is_active: true,
    exchange_rate: 0.24,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    code: 'CNY',
    name: 'หยวนจีน',
    symbol: '¥',
    description: 'สกุลเงินหยวนจีน',
    is_active: true,
    exchange_rate: 4.9,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    code: 'SGD',
    name: 'ดอลลาร์สิงคโปร์',
    symbol: 'S$',
    description: 'สกุลเงินดอลลาร์สิงคโปร์',
    is_active: true,
    exchange_rate: 26.3,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    code: 'HKD',
    name: 'ดอลลาร์ฮ่องกง',
    symbol: 'HK$',
    description: 'สกุลเงินดอลลาร์ฮ่องกง',
    is_active: true,
    exchange_rate: 4.5,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    code: 'KRW',
    name: 'วอนเกาหลีใต้',
    symbol: '₩',
    description: 'สกุลเงินวอนเกาหลีใต้',
    is_active: true,
    exchange_rate: 0.027,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    code: 'AUD',
    name: 'ดอลลาร์ออสเตรเลีย',
    symbol: 'A$',
    description: 'สกุลเงินดอลลาร์ออสเตรเลีย',
    is_active: true,
    exchange_rate: 23.1,
  },
];
