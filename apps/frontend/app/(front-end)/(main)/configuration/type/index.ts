/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'


export type FieldType = 'string' | 'boolean' | 'number';

export interface Field<T> {
    key: keyof T;
    display: string;
    type: FieldType;
    options?: T[keyof T][];
    required?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: (value: any) => string | undefined;
}

const StoreTypeEnum = z.enum(["Main"]);
const StoreStatusEnum = z.enum(["Default", "System"]);

export const storeLocationSchema = z.object({
	id: z.string().min(1, 'require'),
	storeCode: z.string().optional(),
	storeName: z.string(),
	departmentName: z.string(),
	type: StoreTypeEnum,
	status: StoreStatusEnum,
	is_active: z.boolean(),
});

export type storeLocationType = z.infer<typeof storeLocationSchema>;

export interface StoreLocationLabel {
	key: keyof storeLocationType;
	display: string;
	type: 'string' | 'boolean';
}

// Currency
export const currencySchema = z.object({
	id: z.string(),
	code: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type currencyType = z.infer<typeof currencySchema>;
export interface CurrencyLabel {
	key: keyof currencyType;
	display: string;
	type: 'string' | 'boolean';
}

// Unit
export const unitSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type unitType = z.infer<typeof unitSchema>;
export interface UnitLabel {
	key: keyof unitType;
	display: string;
	type: 'string' | 'boolean';
}

// Derivery Point
export const deliveryPointSchema = z.object({
	id: z.string(),
	code: z.string(),
	description: z.string(),
	is_active: z.boolean(),
});

export type deliveryPointType = z.infer<typeof deliveryPointSchema>;

export interface DeliveryPointLabel {
    key: keyof deliveryPointType;
    display: string;
    type: "string" | "boolean";
}

// Categoty
const itemGroupSchema = z.object({
    id: z.string(),
    subCategoryId: z.string(),
    name: z.string(),
});

const subCategorySchema = z.object({
    id: z.string(),
    subCategory: z.string(),
    categoryId: z.string(),
    itemGroups: z.array(itemGroupSchema),
});

const categorySchema = z.object({
    id: z.string(),
    category: z.string(),
    subCategories: z.array(subCategorySchema),
});

export const categoryDataSchema = z.array(categorySchema);

export type CategoryType = z.infer<typeof categoryDataSchema>;

