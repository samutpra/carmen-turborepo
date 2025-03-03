import { z } from "zod";

export enum enum_product_status_type {
  active = "active",
  inactive = "inactive",
  discontinued = "discontinued",
}

export const product_location_item_schema = z.object({
  location_id: z.string().uuid(),
});

export type ProductLocationModel = z.infer<typeof product_location_item_schema>;
export class product_location_item implements ProductLocationModel {
  location_id!: string;
}

export const product_location_update_item_schema = z.object({
  product_location_id: z.string().uuid(),
  location_id: z.string().uuid(),
});

export type ProductLocationUpdateModel = z.infer<
  typeof product_location_update_item_schema
>;
export class product_location_update_item
  implements ProductLocationUpdateModel
{
  product_location_id!: string;
  location_id!: string;
}

export const product_location_remove_item_schema = z.object({
  product_location_id: z.string().uuid(),
});

export type ProductLocationRemoveModel = z.infer<
  typeof product_location_remove_item_schema
>;
export class product_location_remove_item
  implements ProductLocationRemoveModel
{
  product_location_id!: string;
}

export const Product_Unit_item_schema = z.object({
  unit_id: z.string().uuid(),
  unit_quantity: z.number(),
  to_unit_id: z.string().uuid(),
  to_unit_quantity: z.number(),
  description: z.string().nullable().optional(),
  is_default: z.boolean().default(false).optional(),
});

export type ProductOrderUnitModel = z.infer<typeof Product_Unit_item_schema>;
export class Product_Unit_item implements ProductOrderUnitModel {
  unit_id!: string;
  unit_quantity!: number;
  to_unit_id!: string;
  to_unit_quantity!: number;
  description?: string | null;
  is_default?: boolean;
}

export const Product_Unit_update_item_schema = z.object({
  product_order_unit_id: z.string().uuid(),
  unit_id: z.string().uuid(),
  unit_quantity: z.number(),
  to_unit_id: z.string().uuid(),
  to_unit_quantity: z.number(),
  description: z.string().nullable().optional(),
  is_default: z.boolean().default(false).optional(),
});

export type ProductOrderUnitUpdateModel = z.infer<
  typeof Product_Unit_update_item_schema
>;
export class Product_Unit_update_item implements ProductOrderUnitUpdateModel {
  product_order_unit_id!: string;
  unit_id!: string;
  unit_quantity!: number;
  to_unit_id!: string;
  to_unit_quantity!: number;
  description?: string | null;
  is_default?: boolean;
}

export const Product_Unit_remove_item_schema = z.object({
  product_order_unit_id: z.string().uuid(),
});

export type ProductUnitRemoveModel = z.infer<
  typeof Product_Unit_remove_item_schema
>;

export class Product_Unit_remove_item implements ProductUnitRemoveModel {
  product_order_unit_id!: string;
}

export const ProductCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, "code must be at least 1 character"),
  name: z.string().min(1, "name must be at least 1 character"),
  local_name: z.string().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  primary_unit_id: z.string().uuid(),
  product_status_type: z.enum(
    Object.values(enum_product_status_type) as [string, ...string[]],
  ),
  product_item_group_id: z
    .string()
    .uuid()
    .min(1, "item group must be at least 1 character"),
  price: z.number().optional(),
  tax_type: z.string().optional(),
  tax_rate: z.number().optional(),
  is_ingredients: z.boolean().default(false).optional(),
  price_deviation_limit: z.number().optional(),
  info: z.object({}).optional(),
});

export type ProductCreateModel = z.infer<typeof ProductCreateSchema>;

export enum enum_tax_type {
  none = "none",
  vat = "vat",
}

export class ProductCreateDto implements ProductCreateModel {
  id?: string;
  code!: string;
  name!: string;
  local_name?: string;
  product_status_type!: enum_product_status_type;
  product_item_group_id!: string;
  description?: string | null;
  is_active?: boolean | null;
  primary_unit_id!: string;
  price?: number;
  tax_type?: enum_tax_type;
  tax_rate?: number;
  is_ingredients?: boolean;
  price_deviation_limit?: number;
  info?: Product_info;
  locations?: {
    add?: product_location_item[];
  };
  orderUnits?: {
    add?: Product_Unit_item[];
  };
  recipeUnits?: {
    add?: Product_Unit_item[];
  };
  countUnits?: {
    add?: Product_Unit_item[];
  };
}

export const ProductUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1, "code must be at least 1 character").optional(),
  name: z.string().min(1, "name must be at least 1 character").optional(),
  local_name: z.string().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  primary_unit_id: z.string().uuid().optional(),
  product_status_type: z
    .enum(Object.values(enum_product_status_type) as [string, ...string[]])
    .optional(),
  product_item_group_id: z
    .string()
    .uuid()
    .min(1, "item group must be at least 1 character")
    .optional(),
  price: z.number().optional(),
  tax_type: z.string().optional(),
  tax_rate: z.number().optional(),
  is_ingredients: z.boolean().default(false).optional(),
  price_deviation_limit: z.number().optional(),
  info: z.object({}).optional(),
});

export type ProductUpdateModel = z.infer<typeof ProductUpdateSchema>;

export class ProductUpdateDto implements ProductUpdateModel {
  // id!: string;
  code?: string;
  name?: string;
  local_name?: string;
  product_status_type?: enum_product_status_type;
  product_item_group_id?: string;
  description?: string | null;
  is_active?: boolean | null;
  primary_unit_id?: string;
  price?: number;
  tax_type?: enum_tax_type;
  tax_rate?: number;
  is_ingredients?: boolean;
  price_deviation_limit?: number;
  info?: Product_info;
  locations?: {
    add?: product_location_item[];
    update?: product_location_update_item[];
    remove?: product_location_remove_item[];
  };
  orderUnits?: {
    add?: Product_Unit_item[];
    update?: Product_Unit_update_item[];
    remove?: Product_Unit_remove_item[];
  };
  recipeUnits?: {
    add?: Product_Unit_item[];
    update?: Product_Unit_update_item[];
    remove?: Product_Unit_remove_item[];
  };
  countUnits?: {
    add?: Product_Unit_item[];
    update?: Product_Unit_update_item[];
    remove?: Product_Unit_remove_item[];
  };
}

export type Product_info = {
  label?: string;
  value?: string;
};

export const ProductInfoCreateSchema = z.object({
  id: z.string().uuid().optional(),
  product_id: z.string().uuid(),
  price: z.number().nullable().optional(),
  info: z
    .object({
      label: z.string().nullable().optional(),
      value: z.string().nullable().optional(),
    })
    .optional(),
});

export type ProductInfoCreateModel = z.infer<typeof ProductInfoCreateSchema>;

export class ProductInfoCreateDto implements ProductInfoCreateModel {
  id?: string;
  product_id!: string;
  price?: number | null;
  info?: Product_info;
}

export const ProductInfoUpdateSchema = ProductInfoCreateSchema.extend({
  id: z.string().uuid(),
});

export type ProductInfoUpdateModel = z.infer<typeof ProductInfoUpdateSchema>;

export class ProductInfoUpdateDto implements ProductInfoUpdateModel {
  id!: string;
  product_id!: string;
  price?: number | null;
  info?: Product_info;
}
