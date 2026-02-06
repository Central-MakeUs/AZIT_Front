import type { ReissueTokenResult } from '@/shared/api/models';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';
import { base } from '@/shared/api/apiClient';

export const postReissueToken = () => {
  return base.post<ApiResponse<ReissueTokenResult>>(
    END_POINT.AUTH.REISSUE_TOKEN,
    undefined,
    {
      credentials: 'include',
    }
  );
};
