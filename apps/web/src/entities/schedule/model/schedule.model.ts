import type { RequiredDeep } from 'type-fest';

import type { components, operations } from '@/shared/api/apiTypes';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

export type CrewScheduleListResponse =
  components['schemas']['CrewScheduleListResponse'];
export type CrewScheduleListRequest = NonNullable<
  operations['getCrewSchedules']['parameters']['query']
>;

// TODO: OAS 변경 후 타입 가드 제거
export type ScheduleParticipantDetail = Omit<
  RequiredDeep<components['schemas']['ParticipantResponse']>,
  'nickname' | 'profileImageUrl'
> & {
  nickname: string | null;
  profileImageUrl: string | null;
};

export type CrewScheduleDetailResponse = Omit<
  RequiredDeep<components['schemas']['CrewScheduleDetailResponse']>,
  | 'creatorId'
  | 'creatorNickname'
  | 'creatorProfileImageUrl'
  | 'creatorRole'
  | 'participants'
> & {
  creatorId: number | null;
  creatorNickname: string | null;
  creatorProfileImageUrl: string | null;
  creatorRole: 'LEADER' | 'MEMBER' | null;
  participants: ScheduleParticipantDetail[];
};

export type CrewScheduleCalendarResponse = ScheduleCalendarItem[];
export type CrewScheduleCalendarRequest = NonNullable<
  operations['getMonthlySchedulesForCalendar']['parameters']['query']
>;

export type CreateScheduleRequest =
  components['schemas']['CreateScheduleRequest'];
export type UpdateScheduleRequest =
  components['schemas']['UpdateScheduleRequest'];
export type ScheduleParticipantsResponse = RequiredDeep<
  components['schemas']['SliceResponseParticipantResponse']
>;
export type ScheduleParticipantsRequest =
  components['schemas']['CursorPageQuery'];

export type ScheduleCheckInRequest = components['schemas']['CheckInRequest'];

export type ScheduleCheckInStatusResponse = RequiredDeep<
  components['schemas']['CheckInStatusResponse']
>;
