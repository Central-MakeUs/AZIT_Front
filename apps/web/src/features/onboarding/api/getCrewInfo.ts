import { baseApi } from '@/shared/api/apiClient';
import { get } from '@/shared/api/httpMethods';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CrewInfoResponseType } from './types';

export const getCrewInfo = (invitationCode: string) => {
  return get<CrewInfoResponseType>(
    baseApi,
    END_POINT.ONBOARDING.CREW_INFO(invitationCode)
  );
};
