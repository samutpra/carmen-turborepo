import { z } from 'zod';

export const product_location_item_schema = z.object( {
	location_id : z.string().uuid()
} );

export type ProductLocationModel = z.infer<typeof product_location_item_schema>;
export class product_location_item implements ProductLocationModel {
	location_id!: string;
};

// export class product_location_list {
// 	locations : product_location_item[] = [];
// }

export const Product_OrderUnit_item_schema = z.object({
	unit_id: z.string().uuid(),
})

export type ProductOrderUnitModel = z.infer<typeof Product_OrderUnit_item_schema>;
export class Product_OrderUnit_item implements ProductOrderUnitModel {
	unit_id!: string;
}
// export class Product_OrderUnit_list {
// 	units : Product_OrderUnit_item[] = [];
// }

export const Product_RecipeUnit_item_schema = z.object({
	unit_id: z.string().uuid(),
})

export type ProductRecipeUnitModel = z.infer<typeof Product_RecipeUnit_item_schema>;
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
	description: z.string().nullable().optional(),
	is_active: z.boolean().default(true).nullable().optional(),
	primary_unit_id: z.string().uuid().optional(),
	price: z.number().optional(),
	tax_type: z.string().optional(),
	tax_rate: z.number().optional(),
	price_deviation_limit : z.number().optional(),
    info: z.object({}).optional()
});

export type ProductCreateModel = z.infer<typeof ProductCreateSchema>;

export enum enum_tax_type {
	none = "NONE",
	vat = "VAT"
}

export class ProductCreateDto implements ProductCreateModel {
	id?: string;
	code!: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	primary_unit_id?: string;
	price?: number;
	tax_type? : enum_tax_type;
	tax_rate? :number;
	price_deviation_limit? : number;
	info?: Product_info;
	locations? : {
        add? : product_location_item[]
        remove? : product_location_item[]
    };
	orderUnits?: {
		add? : Product_OrderUnit_item[]
        remove? : Product_OrderUnit_item[]
	};
	recipeUnit? : {
		add? : Product_RecipeUnit_item[]
        remove? : Product_RecipeUnit_item[]
	}
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
	primary_unit_id?: string;
	price?: number;
	tax_type? : enum_tax_type;
	tax_rate? :number;
	price_deviation_limit? : number;
	info?: Product_info;
	locations? : {
        add? : product_location_item[]
        remove? : product_location_item[]
    };
	orderUnits?: {
		add? : Product_OrderUnit_item[]
        remove? : Product_OrderUnit_item[]
	};
	recipeUnit? : {
		add? : Product_RecipeUnit_item[]
        remove? : Product_RecipeUnit_item[]
	}
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


