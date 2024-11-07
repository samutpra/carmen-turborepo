export class ProductItemGroupCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
	productSubCategoryId!: string;
}

export class ProductItemGroupUpdateDto extends ProductItemGroupCreateDto {
	override id!: string;
}
