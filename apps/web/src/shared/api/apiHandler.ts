import type { KyInstance, Options } from 'ky';
import { HTTPError } from 'ky';

import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';

interface BaseResult {
  status: number;
}

export interface Ok<T> extends BaseResult {
  ok: true;
  data: T;
}

export interface Err<E = unknown> extends BaseResult {
  ok: false;
  error: E;
}

export type ApiResult<T, E = unknown> = Ok<T> | Err<E>;

export async function apiHandler<T, E = ApiResponseWithoutResult>(
  client: KyInstance,
  endpoint: string,
  options?: Options
): Promise<ApiResult<T, E>> {
  try {
    const data = await client(endpoint, options).json<T>();
    return {
      ok: true,
      status: 200,
      data,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const res = error.response;
      let body: E;

      try {
        body = (await res.clone().json()) as E;
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
      throw new Error(message);
    }

    throw error;
  }
}
