export interface IRegisterResponse {
  success: boolean;
  errors: [
    {
      message: string;
    }
  ];
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
