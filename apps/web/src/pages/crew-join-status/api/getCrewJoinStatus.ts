import { authApi } from '@/shared/api/apiClient';
import type { CrewJoinStatusResponse } from './types';

export const getCrewJoinStatus = async (crewId: number) => {
  const response = await authApi
    .get(`api/v1/crews/${crewId}/join-status`)
    .json<CrewJoinStatusResponse>();

  return response;
};
