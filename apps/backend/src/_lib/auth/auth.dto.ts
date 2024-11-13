import { ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';

export interface IUserRegisterDto {
  username: string;

  email: string;
  password: string;
  emailToken: string;
  consent: boolean;

  userInfo: IUserProfile | null;
}

export class UserRegisterDto implements IUserRegisterDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  emailToken: string;
  @ApiProperty()
  consent: boolean;

  @ApiProperty()
  userInfo: IUserProfile | null;
}

export interface IUserProfile {
  firstname: string;
  middlename: string;
  lastname: string;
  bio: JSON;
}

export class userProfile implements IUserProfile {
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  middlename: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  bio: JSON;
}

export class EmailDto {
  @ApiProperty()
  email: string;
}

export class UserForgotPassDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  emailToken: string;
}
