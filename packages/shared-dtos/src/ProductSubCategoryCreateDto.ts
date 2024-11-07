export class ProductSubCategoryCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
	productCategoryId!: string;
}

export class ProductSubCategoryUpdateDto extends ProductSubCategoryCreateDto {
	override id!: string;
}
