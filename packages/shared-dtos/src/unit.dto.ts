export class UnitCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	isActive?: boolean | null;
}

export class UnitUpdateDto extends UnitCreateDto {
	id!: string;
}
