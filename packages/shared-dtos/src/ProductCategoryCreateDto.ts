export class ProductCategoryCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
}

export class ProductCategoryUpdateDto extends ProductCategoryCreateDto {
	override id!: string;
}
