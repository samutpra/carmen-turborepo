export class LocationCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
	location_type!: enum_location_type;
	deliveryPointId?: string | null;
}

export class LocationUpdateDto extends LocationCreateDto {
	override id!: string;
}

export enum enum_location_type {
	inventory = 'Inventory',
	direct = 'Direct',
	consignment = 'Consignment',
}
