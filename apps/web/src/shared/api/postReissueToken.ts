import { base } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import type { ReissueTokenResult } from '@/shared/api/models';
import { END_POINT } from '@/shared/constants/endpoint';

export const postReissueToken = () => {
  return base.post<ApiResponse<ReissueTokenResult>>(
    END_POINT.AUTH.REISSUE_TOKEN,
    undefined,
    {
      credentials: 'include',
    }
  );
};
