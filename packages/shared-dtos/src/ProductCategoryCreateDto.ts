export class ProductCategoryCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
}

export class ProductCategoryUpdateDto extends ProductCategoryCreateDto {
	id!: string;
}
