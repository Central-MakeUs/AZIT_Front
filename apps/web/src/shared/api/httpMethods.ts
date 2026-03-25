import type { KyInstance, Options } from 'ky';

import { apiHandler } from '@/shared/api/apiHandler';

export function createHttpMethods(client: KyInstance) {
  return {
    get: <T>(url: string, options?: Options): Promise<T> => {
      return apiHandler<T>(client, url, { ...options, method: 'get' });
    },

    post: <T, B = unknown>(
      url: string,
      body: B,
      options?: Options
    ): Promise<T> => {
      return apiHandler<T>(client, url, {
        ...options,
        method: 'post',
        json: body,
      });
    },

    put: <T, B = unknown>(
      url: string,
      body: B,
      options?: Options
    ): Promise<T> => {
      return apiHandler<T>(client, url, {
        ...options,
        method: 'put',
        json: body,
      });
    },

    patch: <T, B = unknown>(
      url: string,
      body: B,
      options?: Options
    ): Promise<T> => {
      return apiHandler<T>(client, url, {
        ...options,
        method: 'patch',
        json: body,
      });
    },

    delete: <T, B = unknown>(
      url: string,
      body: B,
      options?: Options
    ): Promise<T> => {
      return apiHandler<T>(client, url, {
        ...options,
        method: 'delete',
        json: body,
      });
    },
  };
}
