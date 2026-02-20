import type { CrewScheduleListResponse } from '@/shared/api/models/schedule';

export type ScheduleListItem = CrewScheduleListResponse;
export type ScheduleList = ScheduleListItem[];
export type RunType = ScheduleListItem['runType'];
