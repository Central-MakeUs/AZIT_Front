import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { MyInfoResponse } from './types';

export const getMyInfo = () => {
  return auth.get<MyInfoResponse>(END_POINT.MEMBER.MY_INFO);
};
