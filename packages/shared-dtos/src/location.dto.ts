export class LocationCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
	locationType!: EnumLocationType;
	deliveryPointId?: string | null;
}

export class LocationUpdateDto extends LocationCreateDto {
	override id!: string;
}

export enum EnumLocationType {
	Inventory = 'Inventory',
	Direct = 'Direct',
}
