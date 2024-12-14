/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";

// Category

const productItemGroupSchema = z.object({
	id: z.string(),
	name: z.string(),
	product_subcategory_id: z.string(),
});

export type ProductItemGroupType = z.infer<typeof productItemGroupSchema>;

const productSubCategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	product_category_id: z.string(),
	productItemGroups: z.array(productItemGroupSchema),
});

export type ProductSubCategoryType = z.infer<typeof productSubCategorySchema>;

const produtcCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  productSubCategories: z.array(productSubCategorySchema),
});

export const productCategoryDataSchema = z.array(produtcCategorySchema);

export type ProductCategoryType = z.infer<typeof productCategoryDataSchema>;

export interface CategoryFormData {
	name: string;
	description: string;
	is_active: boolean;
}
