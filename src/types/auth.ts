export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  token?: string;
  accessToken?: string;
};

export type AuthSession = {
  user: AuthUser;
};
