export class LocationCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
	inventoryType!: LocationType;
	deliveryPointId?: string | null;
}

export class LocationUpdateDto extends LocationCreateDto {
	override id!: string;
}

export enum LocationType {
	Inventory = 'Inventory',
	Direct = 'Direct',
}
