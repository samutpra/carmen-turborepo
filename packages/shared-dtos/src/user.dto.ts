export class UserCreateDto {
	id?: string;
	username!: string;
	email!: string;
}

export class UserUpdateDto extends UserCreateDto {
	override id!: string;
}
