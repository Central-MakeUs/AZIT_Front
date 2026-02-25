import type { CrewScheduleListResponse } from './schedule.model';

export type ScheduleListItem = CrewScheduleListResponse;
export type ScheduleList = ScheduleListItem[];
export type ScheduleParticipant = {
  id: number;
  nickname: string;
  profileImageUrl: string;
  isLeader: boolean;
};
