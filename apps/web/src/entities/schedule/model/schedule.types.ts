import type {
  CrewScheduleDetailResponse,
  CrewScheduleListResponse,
} from './schedule.model';

export type ScheduleListItem = CrewScheduleListResponse;
export type ScheduleList = ScheduleListItem[];
export type ScheduleParticipant =
  CrewScheduleDetailResponse['participants'][number];
