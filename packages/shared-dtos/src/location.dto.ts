export class LocationCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
}

export class LocationUpdateDto extends LocationCreateDto {
	override id!: string;
}
