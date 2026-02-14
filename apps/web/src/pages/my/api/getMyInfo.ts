import type { MyInfoResponse } from '@/pages/my/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const getMyInfo = () => {
  return auth.get<MyInfoResponse>(END_POINT.MEMBER.MY_INFO);
};
