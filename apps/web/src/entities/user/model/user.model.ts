import type { components, operations } from '@/shared/api/apiTypes';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

/** API 스키마 기준 Response 타입만 정의 */

export type MyInfoResponse = components['schemas']['MyInfoResponse'];
export type CrewMemberListResponse =
  components['schemas']['CrewMemberListResponse'];
export type CrewMemberDetailResponse =
  components['schemas']['CrewMemberDetailResponse'];

export type MyAttendanceCalendarResponse = ScheduleCalendarItem[];
export type MyAttendanceCalendarRequest = NonNullable<
  operations['getMonthlySchedulesForCalendar']['parameters']['query']
>;

export type MyAttendanceResponse =
  components['schemas']['MyAttendanceLogResponse'];
export type MyAttendanceRequest = NonNullable<
  operations['getMonthlySchedulesForCalendar']['parameters']['query']
>;
