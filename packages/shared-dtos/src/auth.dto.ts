export class AuthPayloadDto {
	id?: string;
	username!: string;
	password!: string;
}

export class AuthLoginDto {
	username!: string;
	password!: string;
}

export class AuthLoginResponseDto {
	id?: string;
	username!: string;
	access_token!: string;
	refresh_token?: string;
}

export class UserRegisterDto {
	username!: string;
	email!: string;
	password!: string;
	emailToken!: string;
	consent!: boolean;

	userInfo?: UserProfile;
}

export class UserProfile {
	firstName!: string;
	middleName?: string;
	lastName!: string;
	bio?: JSON;
}

export class EmailDto {
	email!: string;
}

export class UserForgotPassDto {
	username!: string;
	password!: string;
	emailToken!: string;
}
