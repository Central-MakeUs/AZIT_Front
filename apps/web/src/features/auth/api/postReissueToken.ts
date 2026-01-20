import ky from 'ky';

import type { ApiResponse } from '@/shared/api/baseTypes';
import type { ReissueTokenResult } from '@/shared/api/models';
import { BASE_API_URL } from '@/shared/constants/url';
import { END_POINT } from '@/shared/constants/endpoint';

type ReissueTokenResponse = ApiResponse<ReissueTokenResult>;

export const postReissueToken = async (): Promise<ReissueTokenResponse> => {
  const response = await ky
    .post(`${BASE_API_URL}${END_POINT.AUTH.REISSUE_TOKEN}`, {
      credentials: 'include',
    })
    .json<ReissueTokenResponse>();

  return response;
};
