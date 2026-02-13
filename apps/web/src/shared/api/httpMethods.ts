import type { KyInstance, Options } from 'ky';

import { apiHandler, type ApiResult } from '@/shared/api/apiHandler';
import type { ApiResponseWithoutResult } from '@/shared/api/baseTypes';

export function createHttpMethods(client: KyInstance) {
  return {
    get: <T, E = ApiResponseWithoutResult>(
      url: string,
      options?: Options
    ): Promise<ApiResult<T, E>> => {
      return apiHandler<T, E>(client, url, { ...options, method: 'get' });
    },

    post: <T, B = unknown, E = ApiResponseWithoutResult>(
      url: string,
      body: B,
      options?: Options
    ): Promise<ApiResult<T, E>> => {
      return apiHandler<T, E>(client, url, {
        ...options,
        method: 'post',
        json: body,
      });
    },

    put: <T, B = unknown, E = ApiResponseWithoutResult>(
      url: string,
      body: B,
      options?: Options
    ): Promise<ApiResult<T, E>> => {
      return apiHandler<T, E>(client, url, {
        ...options,
        method: 'put',
        json: body,
      });
    },

    patch: <T, B = unknown, E = ApiResponseWithoutResult>(
      url: string,
      body: B,
      options?: Options
    ): Promise<ApiResult<T, E>> => {
      return apiHandler<T, E>(client, url, {
        ...options,
        method: 'patch',
        json: body,
      });
    },

    delete: <T, B = unknown, E = ApiResponseWithoutResult>(
      url: string,
      body: B,
      options?: Options
    ): Promise<ApiResult<T, E>> => {
      return apiHandler<T, E>(client, url, {
        ...options,
        method: 'delete',
        json: body,
      });
    },
  };
}
