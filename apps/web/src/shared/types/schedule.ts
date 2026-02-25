import type { components } from '@/shared/api/apiTypes';

export type RunType =
  components['schemas']['CrewScheduleListResponse']['runType'];

export type ScheduleCalendarItem =
  components['schemas']['CrewScheduleMonthlyListResponse'];
