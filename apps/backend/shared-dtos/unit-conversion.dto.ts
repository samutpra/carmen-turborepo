import { z } from "zod";

export enum enum_unit_type {
  order_unit = "order_unit",
  inventory_unit = "inventory_unit",
  recipe_unit = "recipe_unit",
  count_unit = "count_unit",
}

export const UnitConversionCreateSchema = z.object({
  id: z.string().uuid().optional(),
  product_id: z.string().uuid(),
  unit_type: z.enum(Object.values(enum_unit_type) as [string, ...string[]]),
  from_unit_id: z.string().uuid(),
  to_unit_id: z.string().uuid(),
  rate: z.number().default(1).optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitConversionCreateModel = z.infer<
  typeof UnitConversionCreateSchema
>;

export class UnitConversionCreateDto implements UnitConversionCreateModel {
  id?: string;
  product_id!: string;
  unit_type!: enum_unit_type;
  from_unit_id!: string;
  to_unit_id!: string;
  rate?: number;
  description?: string | null;
  is_active?: boolean | null;
}

export const UnitConversionUpdateSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid().optional(),
  unit_type: z
    .enum(Object.values(enum_unit_type) as [string, ...string[]])
    .optional(),
  from_unit_id: z.string().uuid().optional(),
  to_unit_id: z.string().uuid().optional(),
  rate: z.number().default(1).optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
});

export type UnitConversionUpdateModel = z.infer<
  typeof UnitConversionUpdateSchema
>;

export class UnitConversionUpdateDto implements UnitConversionUpdateModel {
  id!: string;
  product_id?: string;
  unit_type?: enum_unit_type;
  from_unit_id?: string;
  to_unit_id?: string;
  rate?: number;
  description?: string | null;
  is_active?: boolean | null;
}

export const mockUnitConversions: UnitConversionCreateDto[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440050",
    product_id: "550e8400-e29b-41d4-a716-446655440060",
    unit_type: enum_unit_type.order_unit,
    from_unit_id: "550e8400-e29b-41d4-a716-446655440070",
    to_unit_id: "550e8400-e29b-41d4-a716-446655440071",
    rate: 1000,
    description: "แปลงหน่วยจากกิโลกรัมเป็นกรัม",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440051",
    product_id: "550e8400-e29b-41d4-a716-446655440061",
    unit_type: enum_unit_type.order_unit,
    from_unit_id: "550e8400-e29b-41d4-a716-446655440072",
    to_unit_id: "550e8400-e29b-41d4-a716-446655440073",
    rate: 100,
    description: "แปลงหน่วยจากเมตรเป็นเซนติเมตร",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440052",
    product_id: "550e8400-e29b-41d4-a716-446655440062",
    unit_type: enum_unit_type.recipe_unit,
    from_unit_id: "550e8400-e29b-41d4-a716-446655440074",
    to_unit_id: "550e8400-e29b-41d4-a716-446655440075",
    rate: 1000,
    description: "แปลงหน่วยจากลิตรเป็นมิลลิลิตร",
    is_active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440053",
    product_id: "550e8400-e29b-41d4-a716-446655440063",
    unit_type: enum_unit_type.inventory_unit,
    from_unit_id: "550e8400-e29b-41d4-a716-446655440076",
    to_unit_id: "550e8400-e29b-41d4-a716-446655440077",
    rate: 10000,
    description: "แปลงหน่วยจากตารางเมตรเป็นตารางเซนติเมตร",
    is_active: false,
  },
];
