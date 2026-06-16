import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { JoinedCrewApiResponse } from '@/entities/user/model/user.types';

export const getJoinedCrews = () => {
  return auth.get<JoinedCrewApiResponse>(END_POINT.CREW.MY_JOINED_CREWS);
};
