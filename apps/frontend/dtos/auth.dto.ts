import { z } from 'zod';

//#region  Zod
export const authLoginSchema = z.object({
  username: z
    .string({
      required_error: 'Username field is required',
    })
    .min(3, 'Username must be at least 3 characters'),
  password: z
    .string({
      required_error: 'password field is required',
    })
    .min(3, 'Password must be at least 3 characters'),
});

export type AuthLoginModel = z.infer<typeof authLoginSchema>;

export const authChangePassword = z.object({
  old_pass: z.string({ required_error: 'request old password' }),
  new_pass: z.string({ required_error: 'request new password' }),
});

export type AuthChangePasswordModel = z.infer<typeof authChangePassword>;

//#endregion Zod

export class AuthPayloadDto {
  id?: string;
  username!: string;
  password!: string;
}

export class AuthLoginDto implements AuthLoginModel {
  username!: string;
  password!: string;
}

export class AuthChangePasswordDto implements AuthChangePasswordModel {
  old_pass!: string;
  new_pass!: string;
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

export const mockUserLogins: AuthLoginDto[] = [
  {
    username: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane@example.com',
    password: 'password123',
  },
  {
    username: 'bob@example.com',
    password: 'password123',
  },
  {
    username: 'alice@example.com',
    password: 'password123',
  },
];
