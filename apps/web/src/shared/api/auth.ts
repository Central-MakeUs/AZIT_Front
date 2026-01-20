import type { ApiResponse } from './baseTypes';
import type { ReissueTokenResult } from './models';
import { BASE_API_URL } from '../constants/url';
import { END_POINT } from '../constants/endpoint';
import ky from 'ky';

type ReissueTokenResponse = ApiResponse<ReissueTokenResult>;

export async function reissueToken(): Promise<ReissueTokenResponse> {
  const response = await ky
    .post(`${BASE_API_URL}${END_POINT.AUTH.REISSUE_TOKEN}`, {
      credentials: 'include',
    })
    .json<ReissueTokenResponse>();

  return response;
}
