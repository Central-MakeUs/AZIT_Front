import type { KyInstance, Options } from 'ky';
import { apiHandler, type ApiResult } from './apiHandler';
import type { ApiResponseWithoutResult } from './baseTypes';

export function get<T, E = ApiResponseWithoutResult>(
  client: KyInstance,
  url: string,
  options?: Options
): Promise<ApiResult<T, E>> {
  return apiHandler<T, E>(client, url, { ...options, method: 'get' });
}

export function post<T, B = unknown, E = ApiResponseWithoutResult>(
  client: KyInstance,
  url: string,
  body: B,
  options?: Options
): Promise<ApiResult<T, E>> {
  return apiHandler<T, E>(client, url, {
    ...options,
    method: 'post',
    json: body,
  });
}

export function put<T, B = unknown, E = ApiResponseWithoutResult>(
  client: KyInstance,
  url: string,
  body: B,
  options?: Options
): Promise<ApiResult<T, E>> {
  return apiHandler<T, E>(client, url, {
    ...options,
    method: 'put',
    json: body,
  });
}

export function patch<T, B = unknown, E = ApiResponseWithoutResult>(
  client: KyInstance,
  url: string,
  body: B,
  options?: Options
): Promise<ApiResult<T, E>> {
  return apiHandler<T, E>(client, url, {
    ...options,
    method: 'patch',
    json: body,
  });
}

export function del<T, E = ApiResponseWithoutResult>(
  client: KyInstance,
  url: string,
  options?: Options
): Promise<ApiResult<T, E>> {
  return apiHandler<T, E>(client, url, { ...options, method: 'delete' });
}
