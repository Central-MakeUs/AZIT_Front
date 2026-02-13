import type { ConfirmJoinStatusResponseType } from '@/features/crew-join-status/api/types';

import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const postConfirmJoinStatus = () => {
  return auth.post<ConfirmJoinStatusResponseType>(
    END_POINT.ONBOARDING.CONFIRM_JOIN_STATUS,
    undefined
  );
};
