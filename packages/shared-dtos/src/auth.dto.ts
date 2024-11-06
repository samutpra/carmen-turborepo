export class AuthPayloadDto {
  id?: string;
  username: string;
  password: string;
}

export class AuthLoginDto {
  username: string;
  password: string;
}

export class AuthLoginResponseDto {
  access_token: string;
  refresh_token?: string;
}
