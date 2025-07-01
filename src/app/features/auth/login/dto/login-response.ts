export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  userId: string;
  username: string;
  email: string;
  role: string;
}
