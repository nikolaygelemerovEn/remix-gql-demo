export interface ErrorData extends Error {
  status?: number;
}

export interface UserData {
  email: string;
  id: string;
  password: string;
}

export type AuthData = Pick<UserData, 'email' | 'password'>;
