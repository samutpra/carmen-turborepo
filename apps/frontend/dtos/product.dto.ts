import { z } from 'zod';

export enum enum_product_status_type {
  active = 'active',
  inactive = 'inactive',
  discontinued = 'discontinued',
}

export const product_location_item_schema = z.object({
  location_id: z.string().uuid(),
});

export type ProductLocationModel = z.infer<typeof product_location_item_schema>;
export class product_location_item implements ProductLocationModel {
  location_id!: string;
}

// export class product_location_list {
// 	locations : product_location_item[] = [];
// }

export const Product_OrderUnit_item_schema = z.object({
  unit_id: z.string().uuid(),
});

export type ProductOrderUnitModel = z.infer<
  typeof Product_OrderUnit_item_schema
>;
export class Product_OrderUnit_item implements ProductOrderUnitModel {
  unit_id!: string;
}
// export class Product_OrderUnit_list {
// 	units : Product_OrderUnit_item[] = [];
// }

export const Product_RecipeUnit_item_schema = z.object({
  unit_id: z.string().uuid(),
});

export type ProductRecipeUnitModel = z.infer<
  typeof Product_RecipeUnit_item_schema
>;
export class Product_RecipeUnit_item implements ProductRecipeUnitModel {
  unit_id!: string;
}
// export class Product_RecipeUnit_list {
// 	units : Product_OrderUnit_item[] = [];
// }

export const ProductCreateSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, 'code must be at least 1 character'),
  name: z.string().min(1, 'name must be at least 1 character'),
  local_name: z.string().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true).nullable().optional(),
  primary_unit_id: z.string().uuid().optional(),
  product_status_type: z.enum(
    Object.values(enum_product_status_type) as [string, ...string[]],
  ),
  product_item_group_id: z
    .string()
    .uuid()
    .min(1, 'item group must be at least 1 character'),
  price: z.number().optional(),
  tax_type: z.string().optional(),
  tax_rate: z.number().optional(),
  is_ingredients: z.boolean().default(false).optional(),
  price_deviation_limit: z.number().optional(),
  info: z.object({}).optional(),
});

export type ProductCreateModel = z.infer<typeof ProductCreateSchema>;

export enum enum_tax_type {
  none = 'NONE',
  vat = 'VAT',
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
  primary_unit_id?: string;
  price?: number;
  tax_type?: enum_tax_type;
  tax_rate?: number;
  is_ingredients?: boolean;
  price_deviation_limit?: number;
  info?: Product_info;
  locations?: {
    add?: product_location_item[];
    remove?: product_location_item[];
  };
  orderUnits?: {
    add?: Product_OrderUnit_item[];
    remove?: Product_OrderUnit_item[];
  };
  recipeUnit?: {
    add?: Product_RecipeUnit_item[];
    remove?: Product_RecipeUnit_item[];
  };
}

export const ProductUpdateSchema = ProductCreateSchema.extend({
  id: z.string().uuid(),
});

export type ProductUpdateModel = z.infer<typeof ProductUpdateSchema>;

export class ProductUpdateDto implements ProductUpdateModel {
  id!: string;
  code!: string;
  name!: string;
  local_name?: string;
  product_status_type!: enum_product_status_type;
  product_item_group_id!: string;
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
    remove?: product_location_item[];
  };
  orderUnits?: {
    add?: Product_OrderUnit_item[];
    remove?: Product_OrderUnit_item[];
  };
  recipeUnit?: {
    add?: Product_RecipeUnit_item[];
    remove?: Product_RecipeUnit_item[];
  };
}

export type Product_info = {
  brand?: string;
  uom?: string;
  packSize?: number;
  minStock?: number;
  maxStock?: number;
  reorderPoint?: number;
  currentStock?: number;
  value?: number;
  supplier?: string;
  expiryDate?: Date;
  lastCountDate?: Date;
};

export const ProductInfoCreateSchema = z.object({
  id: z.string().uuid().optional(),
  product_id: z.string().uuid(),
  price: z.number().nullable().optional(),
  info: z
    .object({
      brand: z.string().nullable().optional(),
      uom: z.string().nullable().optional(),
      packSize: z.number().nullable().optional(),
      minStock: z.number().nullable().optional(),
      maxStock: z.number().nullable().optional(),
      reorderPoint: z.number().nullable().optional(),
      currentStock: z.number().nullable().optional(),
      value: z.number().nullable().optional(),
      supplier: z.string().nullable().optional(),
      expiryDate: z.date().nullable().optional(),
      lastCountDate: z.date().nullable().optional(),
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

export type ProductDto = {
  id: string;
  product_code: string;
  product_name: string;
  local_name?: string;
  description?: string;
  is_active: boolean;
  primary_unit_id?: string;
  product_status_type: enum_product_status_type;
  product_item_group_id: string;
  price?: number;
  tax_type?: string;
  tax_rate?: number;
  is_ingredients?: boolean;
  price_deviation_limit?: number;
  created_at: Date;
  updated_at: Date;
};


export type ProductInfoDto = {
  price: string;
  tax_type: string;
  tax_rate: string;
  price_deviation_limit: string;
  info?: {
    attribute: {
      label?: string;
      value?: string;
    }[],
  }
}
export interface ProductInfoClient {
  data: {
    id: string;
    code: string;
    name: string;
    description: string;
    tb_product_info?: ProductInfoDto;
    product_status_type: string;
  };
  item_group_name: string;
  sub_category_name: string;
  category_name: string;
}
