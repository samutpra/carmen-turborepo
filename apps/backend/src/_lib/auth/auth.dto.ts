export interface UserRegisterDto {
  username: string;
  password: string;
  emailToken: string;

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
}
