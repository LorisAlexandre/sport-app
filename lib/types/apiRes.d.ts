export interface CustomResponse<T> {
  data?: T;
  result: boolean;

  message?: string;
  redirectTo?: string;
}
