import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

import type { ConfirmJoinStatusResponseType } from './types';

export const postConfirmJoinStatus = () => {
  return auth.post<ConfirmJoinStatusResponseType>(
    END_POINT.ONBOARDING.CONFIRM_JOIN_STATUS,
    undefined
  );
};
