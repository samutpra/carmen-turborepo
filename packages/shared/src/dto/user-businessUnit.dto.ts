export class UserBusinessUnitCreateDto {
	id?: string;
	userId?: string | null;
	businessUnitId?: string | null;
}

export class UserBusinessUnitUpdateDto extends UserBusinessUnitCreateDto {
	id!: string;
}
