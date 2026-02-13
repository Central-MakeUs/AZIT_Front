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

      try {
        const body = (await res.clone().json()) as E;
        return {
          ok: false,
          status: res.status,
          error: body,
        };
      } catch {
        // TODO: 기술적 에러 관련 UI 처리
        // JSON 파싱 에러 (기술적 에러)
        throw error;
      }
    }

    // 네트워크 에러 등 (기술적 에러)
    throw error;
  }
}
