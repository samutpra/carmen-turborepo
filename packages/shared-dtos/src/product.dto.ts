import { z } from 'zod';

export const ProductCreateSchema = z.object({
	id: z.string().uuid().optional(),
	code: z.string().min(1, 'code must be at least 1 character'),
	name: z.string().min(1, 'name must be at least 1 character'),
	description: z.string().nullable().optional(),
	is_active: z.boolean().default(true).nullable().optional(),
	primaryUnit_id: z.string().uuid().optional(),
});

export type ProductCreateModel = z.infer<typeof ProductCreateSchema>;

export class ProductCreateDto implements ProductCreateModel {
	id?: string;
	code!: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	primaryUnit_id?: string;
}

export const ProductUpdateSchema = ProductCreateSchema.extend({
	id: z.string().uuid(),
});

export type ProductUpdateModel = z.infer<typeof ProductUpdateSchema>;

export class ProductUpdateDto implements ProductUpdateModel {
	id!: string;
	code!: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	primaryUnit_id?: string;
}

export type Product_info = {
	brand? : string;
	uom? : string;
	packSize? : number;
	minStock? : number;
	maxStock? : number;
	reorderPoint? : number;
	currentStock? : number;
	value? : number;
	supplier? : string;
	expiryDate? : Date;
	lastCountDate? : Date;
}

export const ProductInfoCreateSchema = z.object({
	id: z.string().uuid().optional(),
	product_id: z.string().uuid(),
	price: z.number().nullable().optional(),
	info: z.object({
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
	}).optional(),

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


