import type { KyInstance, Options } from 'ky';
import { HTTPError } from 'ky';

export class BusinessError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = 'BusinessError';
    this.code = code;
    this.status = status;
  }
}

export class ServerError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ServerError';
    this.status = status;
  }
}

export async function apiHandler<T>(
  client: KyInstance,
  endpoint: string,
  options?: Options
): Promise<T> {
  try {
    return await client(endpoint, options).json<T>();
  } catch (error) {
    if (error instanceof HTTPError) {
      const res = error.response;
      let body: unknown;

      try {
        body = await res.clone().json();
      } catch {
        throw error;
      }

      const message =
        typeof body === 'object' &&
        body !== null &&
        'message' in body &&
        typeof (body as { message?: unknown }).message === 'string'
          ? (body as { message: string }).message
          : '요청에 실패했습니다';

      const code =
        typeof body === 'object' &&
        body !== null &&
        'code' in body &&
        typeof (body as { code?: unknown }).code === 'string'
          ? (body as { code: string }).code
          : '';

      const isBusinessError =
        res.status >= 400 && res.status < 500 && code !== '';

      if (isBusinessError) {
        throw new BusinessError(message, code, res.status);
      } else {
        throw new ServerError(message, res.status);
      }
    }

    throw error;
  }
}
