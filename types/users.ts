export interface LoginDto {
  login: string;
  password: string;
}

export interface Response {
  success: boolean;
  message: string;
}

export enum AuthFormType {
  LOGIN = "login",
  SIGN_UP = "sign-up",
}
