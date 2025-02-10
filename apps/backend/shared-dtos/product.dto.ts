import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
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

// export class product_location_list {
// 	locations : product_location_item[] = [];
// }

export const Product_Unit_item_schema = z.object({
  unit_id: z.string().uuid(),
  unit_quantity: z.number(),
  to_unit_id: z.string().uuid(),
  to_unit_quantity: z.number(),
  description: z.string().nullable().optional(),
});

export type ProductOrderUnitModel = z.infer<typeof Product_Unit_item_schema>;
export class Product_Unit_item implements ProductOrderUnitModel {
  unit_id!: string;
  unit_quantity!: number;
  to_unit_id!: string;
  to_unit_quantity!: number;
  description?: string | null;
}

export const Product_Unit_update_item_schema = z.object({
  product_order_unit_id: z.string().uuid(),
  unit_id: z.string().uuid(),
  unit_quantity: z.number(),
  to_unit_id: z.string().uuid(),
  to_unit_quantity: z.number(),
  description: z.string().nullable().optional(),
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

// export class Product_OrderUnit_list {
// 	units : Product_OrderUnit_item[] = [];
// }

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
  none = "NONE",
  vat = "VAT",
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

// export class ProductUpdateDto2 {
//   @ApiPropertyOptional({
//     type: String,
//     description: "The code of the product",
//   })
//   @IsOptional()
//   @IsString()
//   code: string;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The name of the product",
//   })
//   @IsOptional()
//   @IsString()
//   name: string;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The local name of the product",
//   })
//   @IsOptional()
//   @IsString()
//   local_name: string;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The product status type",
//   })
//   @IsOptional()
//   @IsEnum(enum_product_status_type)
//   product_status_type?: enum_product_status_type;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The product item group id",
//   })
//   @IsOptional()
//   @IsString()
//   product_item_group_id: string;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The description of the product",
//   })
//   @IsOptional()
//   @IsString()
//   description: string;

//   @ApiPropertyOptional({
//     type: Boolean,
//     description: "The active status of the product",
//   })
//   @IsOptional()
//   @IsString()
//   is_active: boolean;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The primary unit id of the product",
//   })
//   @IsOptional()
//   @IsString()
//   primary_unit_id: string;

//   @ApiPropertyOptional({
//     type: Number,
//     description: "The price of the product",
//   })
//   @IsOptional()
//   @IsNumber()
//   price: number;

//   @ApiPropertyOptional({
//     type: String,
//     description: "The tax type of the product",
//   })
//   @IsOptional()
//   @IsString()
//   tax_type: string;

//   @ApiPropertyOptional({
//     type: Number,
//     description: "The tax rate of the product",
//   })
//   @IsOptional()
//   @IsNumber()
//   tax_rate: number;

//   @ApiPropertyOptional({
//     type: Boolean,
//     description: "The ingredients status of the product",
//   })
//   @IsOptional()
//   @IsBoolean()
//   is_ingredients: boolean;

//   @ApiPropertyOptional({
//     type: Number,
//     description: "The price deviation limit of the product",
//   })
//   @IsOptional()
//   @IsNumber()
//   price_deviation_limit: number;

//   @ApiPropertyOptional({
//     type: Object,
//     description: "The info of the product",
//   })
//   @IsOptional()
//   @IsObject()
//   info: Product_info;

//   @ApiPropertyOptional({
//     type: Object,
//     description: "The info of the product",
//   })
//   @IsOptional()
//   @IsObject()
//   locations: {
//     add?: product_location_item[];
//     remove?: product_location_item[];
//   };

//   @ApiPropertyOptional({
//     type: Object,
//     description: "The info of the product",
//   })
//   @IsOptional()
//   @IsObject()
//   orderUnits: {
//     add?: Product_OrderUnit_item[];
//     remove?: Product_OrderUnit_item[];
//   };

//   @ApiPropertyOptional({
//     type: Object,
//     description: "The info of the product",
//   })
//   @IsOptional()
//   @IsObject()
//   recipeUnit: {
//     add?: Product_RecipeUnit_item[];
//     remove?: Product_RecipeUnit_item[];
//   };

//   @ApiPropertyOptional({
//     type: Object,
//     description: "The info of the product",
//   })
//   @IsOptional()
//   @IsObject()
//   countUnits: {
//     add?: Product_CountUnit_item[];
//     remove?: Product_CountUnit_item[];
//   };
// }

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
