/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";

// Category

export const categorySchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type CategoryType = z.infer<typeof categorySchema>;

export const subCategorySchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	product_category_id: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type SubCategoryType = z.infer<typeof subCategorySchema>;

export const productItemGroupSchema = z.object({
	id: z.string(),
	name: z.string(),
	product_subcategory_id: z.string(),
	description: z.string(),
	code: z.string(),
	is_active: z.boolean(),
});

export type ProductItemGroupType = z.infer<typeof productItemGroupSchema>;

const productSubCategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	product_category_id: z.string(),
	productItemGroups: z.array(productItemGroupSchema).optional(),
	description: z.string(),
	is_active: z.boolean().optional(),
});

export type ProductSubCategoryType = z.infer<typeof productSubCategorySchema>;

const produtcCategorySchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	productSubCategories: z.array(productSubCategorySchema),
});

export const productCategoryDataSchema = z.array(produtcCategorySchema);

export type ProductCategoryType = z.infer<typeof productCategoryDataSchema>;

export interface CategoryFormData {
	name: string;
	description: string;
	is_active: boolean;
}

export interface SubCategoryFormData {
	name: string;
	description: string;
	is_active: boolean;
	product_category_id: string;
}

export interface ItemGroupFormData {
	name: string;
	description: string;
	is_active: boolean;
	product_subcategory_id: string;
}

export interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
	description?: string;
}


