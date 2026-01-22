import type { ApiResponse } from '@/shared/api/baseTypes';
import type { ReissueTokenResult } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';
import { baseApi } from '@/shared/api/apiClient';

type ReissueTokenResponse = ApiResponse<ReissueTokenResult>;

export const postReissueToken = async (): Promise<ReissueTokenResponse> => {
  const response = await baseApi
    .post(END_POINT.AUTH.REISSUE_TOKEN, {
      credentials: 'include',
    })
    .json<ReissueTokenResponse>();

  return response;
};
