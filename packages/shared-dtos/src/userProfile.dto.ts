export class UserProfileCreateDto {
	id?: string;
	userId!: string;
	firstname!: string;
	middlename?: string;
	lastname!: string;
	bio?: JSON;
}

export class UserProfileUpdateDto extends UserProfileCreateDto {
	override id!: string;
}
