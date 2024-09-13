export interface ILoginResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export interface ILoginRequest {
  email: string;
  password: string;
}
