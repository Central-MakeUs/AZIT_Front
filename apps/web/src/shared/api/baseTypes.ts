export interface ApiResponse<T> {
  code: string;
  message: string;
  result: T;
}

export interface ApiResponseWithoutResult {
  code: string;
  message: string;
}
