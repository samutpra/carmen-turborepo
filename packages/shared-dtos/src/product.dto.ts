export class ProductCreateDto {
	id?: string;
	code!: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	// ProductInfo?: ProductInfoCreateDto;
	// ProductVendor?: ProductVendorCreateDto[];
	// UnitConversion?: undefined;

	primaryUnit?: string;
}

export class ProductUpdateDto extends ProductCreateDto {
	override id!: string;
}

export class ProductInfoCreateDto {
	id?: string;
	price?: number | null;
}

export class ProductInfoUpdateDto extends ProductInfoCreateDto {
	override id!: string;
}

export class ProductVendorCreateDto {
	id?: string;
	vendor_id?: string | null;
	description?: string | null;
	is_active?: boolean | null;
}
