export interface IUser {
  name?: string;
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  login: string;
}
