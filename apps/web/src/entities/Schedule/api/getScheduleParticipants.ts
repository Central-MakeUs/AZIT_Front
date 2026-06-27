import { auth } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/baseTypes';
import { END_POINT } from '@/shared/constants/endpoint';

import type {
  ScheduleParticipantsRequest,
  ScheduleParticipantsResponse,
} from '../model/schedule.model';

export const getScheduleParticipants = (
  crewId: number,
  scheduleId: number,
  searchParams?: ScheduleParticipantsRequest
) => {
  return auth.get<ApiResponse<ScheduleParticipantsResponse>>(
    END_POINT.SCHEDULE.PARTICIPANTS(crewId, scheduleId),
    { searchParams }
  );
};
