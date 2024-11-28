export class ProductSubCategoryCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	product_category_id!: string;
}

export class ProductSubCategoryUpdateDto extends ProductSubCategoryCreateDto {
	override id!: string;
}
