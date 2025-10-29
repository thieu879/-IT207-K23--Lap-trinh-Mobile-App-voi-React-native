export interface BaseResponse<T> {
  data: T[];
  message: string;
  statusCode: number;
}

export interface SingleResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}
