import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { LinkedProvidersApiResponse } from '@/entities/user/model';

export const getMyProviders = () => {
  return auth.get<LinkedProvidersApiResponse>(END_POINT.MEMBER.MY_PROVIDERS);
};
