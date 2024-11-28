export class UnitCreateDto {
	id?: string;
	name!: string;
	description?: string | null;
	is_active?: boolean | null;
}

export class UnitUpdateDto extends UnitCreateDto {
	override id!: string;
}
