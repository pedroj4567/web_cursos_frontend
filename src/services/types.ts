export interface StrapiAuthResponse {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}
