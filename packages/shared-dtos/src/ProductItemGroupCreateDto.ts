import { subCategoryData } from '../../../apps/frontend/app/(front-end)/(main)/configuration/data/store';
export class ProductItemGroupCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
	productSubCategoryId!: string;
}

export class ProductItemGroupUpdateDto extends ProductItemGroupCreateDto {
	id!: string;
}