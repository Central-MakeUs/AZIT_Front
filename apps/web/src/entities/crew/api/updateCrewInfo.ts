import { auth } from '@/shared/api/apiClient';
import type { UpdateCrewInfoRequest } from '@/shared/api/models/crew';
import { END_POINT } from '@/shared/constants/endpoint';


export const updateCrewInfo = (crewId: number, body: UpdateCrewInfoRequest) => {
  return auth.patch(END_POINT.CREW.UPDATE_INFO(crewId), body);
};
