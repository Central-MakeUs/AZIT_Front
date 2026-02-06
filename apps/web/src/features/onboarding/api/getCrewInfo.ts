import { base } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CrewInfoResponseType } from './types';

export const getCrewInfo = (invitationCode: string) => {
  return base.get<CrewInfoResponseType>(
    END_POINT.ONBOARDING.CREW_INFO(invitationCode)
  );
};
