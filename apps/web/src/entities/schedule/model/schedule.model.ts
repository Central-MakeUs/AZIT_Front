import type { RequiredDeep } from 'type-fest';

import type { components, operations } from '@/shared/api/apiTypes';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

export type CrewScheduleListResponse =
  components['schemas']['CrewScheduleListResponse'];
export type CrewScheduleListRequest = NonNullable<
  operations['getCrewSchedules']['parameters']['query']
>;
export type CrewScheduleDetailResponse = RequiredDeep<
  components['schemas']['CrewScheduleDetailResponse']
>;
export type CrewScheduleCalendarResponse = ScheduleCalendarItem[];
export type CrewScheduleCalendarRequest = NonNullable<
  operations['getMonthlySchedulesForCalendar']['parameters']['query']
>;
export type ScheduleParticipantsResponse = RequiredDeep<
  components['schemas']['SliceResponseParticipantResponse']
>;
export type ScheduleParticipantsRequest =
  components['schemas']['CursorPageQuery'];
