import type {
  CrewScheduleCalendarResponse,
  CrewScheduleListResponse,
} from './schedule.model';

export type ScheduleListItem = CrewScheduleListResponse;
export type ScheduleList = ScheduleListItem[];
export type RunType = ScheduleListItem['runType'];

export type ScheduleCalendarItem = CrewScheduleCalendarResponse;
export type ScheduleCalendarList = ScheduleCalendarItem[];
