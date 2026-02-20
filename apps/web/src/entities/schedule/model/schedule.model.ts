import type { components, operations } from '@/shared/api/apiTypes';

export type CrewScheduleListResponse =
  components['schemas']['CrewScheduleListResponse'];
export type CrewScheduleListRequest = NonNullable<
  operations['getCrewSchedules']['parameters']['query']
>;

export type CrewScheduleCalendarResponse =
  components['schemas']['CrewScheduleMonthlyListResponse'];
export type CrewScheduleCalendarRequest = NonNullable<
  operations['getMonthlySchedulesForCalendar']['parameters']['query']
>;
