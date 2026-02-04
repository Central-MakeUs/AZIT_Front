import type { ReissueTokenResult } from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';
import { baseApi } from '@/shared/api/apiClient';
import { post } from '@/shared/api/httpMethods';

export const postReissueToken = () => {
  return post<ApiResponse<ReissueTokenResult>>(
    baseApi,
    END_POINT.AUTH.REISSUE_TOKEN,
    {
      credentials: 'include',
    }
  );
};
