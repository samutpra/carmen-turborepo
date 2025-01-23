import { z } from 'zod';

export const ExchangeRateCreateSchema = z.object({
  id: z.string().uuid().optional(),
  at_date: z.union([z.date(), z.string()]).nullable().optional(),
  rate: z.number().nullable().optional(),
  currency_id: z.string().uuid(),
});

export type ExchangeRateCreateModel = z.infer<typeof ExchangeRateCreateSchema>;

export class ExchangeRateCreateDto implements ExchangeRateCreateModel {
  id?: string;
  at_date?: Date | string | null;
  rate?: number | null;
  currency_id!: string;
}

export const ExchangeRateUpdateSchema = z.object({
  id: z.string().uuid(),
  at_date: z.union([z.date(), z.string()]).nullable().optional(),
  rate: z.number().nullable().optional(),
  currency_id: z.string().uuid(),
});

export type ExchangeRateUpdateModel = z.infer<typeof ExchangeRateUpdateSchema>;

export class ExchangeRateUpdateDto implements ExchangeRateUpdateModel {
  id!: string;
  at_date?: Date | string | null;
  rate?: number | null;
  currency_id!: string;
}

export const mockExchangeRates = [
  {
    id: '550e8400-e29b-41d4-a716-446655440100',
    at_date: '2024-01-01',
    rate: 1,
    currency_id: '550e8400-e29b-41d4-a716-446655440000', // THB
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    at_date: '2024-01-01',
    rate: 35.5,
    currency_id: '550e8400-e29b-41d4-a716-446655440001', // USD
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    at_date: '2024-01-01',
    rate: 38.2,
    currency_id: '550e8400-e29b-41d4-a716-446655440002', // EUR
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    at_date: '2024-01-01',
    rate: 44.5,
    currency_id: '550e8400-e29b-41d4-a716-446655440003', // GBP
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    at_date: '2024-01-01',
    rate: 0.24,
    currency_id: '550e8400-e29b-41d4-a716-446655440004', // JPY
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    at_date: '2024-01-01',
    rate: 4.9,
    currency_id: '550e8400-e29b-41d4-a716-446655440005', // CNY
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440106',
    at_date: '2024-01-01',
    rate: 26.3,
    currency_id: '550e8400-e29b-41d4-a716-446655440006', // SGD
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440107',
    at_date: '2024-01-01',
    rate: 4.5,
    currency_id: '550e8400-e29b-41d4-a716-446655440007', // HKD
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440108',
    at_date: '2024-01-01',
    rate: 0.027,
    currency_id: '550e8400-e29b-41d4-a716-446655440008', // KRW
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440109',
    at_date: '2024-01-01',
    rate: 23.1,
    currency_id: '550e8400-e29b-41d4-a716-446655440009', // AUD
  },
];
