export interface UserRegisterDto {
  username: string;
  email: string;
  password: string;
  emailToken: string;
  consent: boolean;

  userInfo: {
    firstname: string;
    middlename: string;
    lastname: string;
    bio: JSON;
  };
}

export interface UserRegisterEmailDto {
  email: string;
}

export interface UserForgotPassDto {
  username: string;
  password: string;
  emailToken: string;
}
