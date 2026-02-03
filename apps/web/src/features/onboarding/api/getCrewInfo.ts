import { baseApi } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';
import type { CrewInfoResponseType } from './types';

export const getCrewInfo = async (invitationCode: string) => {
  const response = await baseApi
    .get(END_POINT.ONBOARDING.CREW_INFO(invitationCode), {})
    .json<CrewInfoResponseType>();

  return response;
};
