export class ProductItemGroupCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	product_subcategory_id!: string;
}

export class ProductItemGroupUpdateDto extends ProductItemGroupCreateDto {
	override id!: string;
}
