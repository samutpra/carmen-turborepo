export class UserCreateDto {
	id?: string;
	username!: string;
}

export class UserUpdateDto extends UserCreateDto {
	override id!: string;
}
