export class ProductCreateDto {
  id?: string;
  code: string;
  name: string;
  description?: string | null;
  isActive?: boolean | null;
  ProductInfo?: ProductInfoCreateDto;
  ProductVendor?: ProductVendorCreateDto[];
  UnitConversion?: undefined;
}

export class ProductUpdateDto extends ProductCreateDto {
  id: string;
}

export class ProductInfoCreateDto {
  id?: string;
  price?: number | null;
}

export class ProductInfoUpdateDto extends ProductInfoCreateDto {
  id: string;
}

export class ProductVendorCreateDto {
  id?: string;
  vendorId?: string | null;
  description?: string | null;
  isActive?: boolean | null;
}
