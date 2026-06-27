import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { MyInfoApiResponse } from '@/entities/User/model';

export const getMyInfo = () => {
  return auth.get<MyInfoApiResponse>(END_POINT.MEMBER.MY_INFO);
};
