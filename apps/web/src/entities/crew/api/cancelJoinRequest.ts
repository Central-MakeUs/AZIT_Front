import { auth } from '@/shared/api/apiClient';
import { END_POINT } from '@/shared/constants/endpoint';

export const cancelJoinRequest = (crewId: number) => {
  return auth.delete(END_POINT.CREW.CANCEL_JOIN_REQUEST(crewId));
};
