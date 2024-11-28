export class UserBusinessUnitCreateDto {
	id?: string;
	user_id?: string | null;
	business_unit_id?: string | null;
}

export class UserBusinessUnitUpdateDto extends UserBusinessUnitCreateDto {
	override id!: string;
}
