import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { MyCrewApiResponse } from '@/entities/user/model';

export const getMyCrews = () => {
  return auth.get<MyCrewApiResponse>(END_POINT.MEMBER.MY_CREWS);
};
