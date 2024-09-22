export interface IErrorResponse {
  response?: {
    data?: {
      errors: Array<{
        message: string;
      }>;
    };
  };
}
