import type { ApiResponse } from '@/shared/api/baseTypes';
import type { RunType } from '@/shared/types/schedule';

import type {
  CrewMemberDetailResponse,
  CrewMemberListResponse,
  MyAttendanceResponse,
  MyInfoResponse,
} from './user.model';

type MyInfoResponseSchema = MyInfoResponse;

export type MyInfoResult = Required<
  Omit<MyInfoResponseSchema, 'invitationCode'>
> & {
  invitationCode: string | null;
};

export type MyInfoApiResponse = ApiResponse<MyInfoResult>;

export type CrewMemberListResult = Required<CrewMemberListResponse>;
export type CrewMemberDetailResult = Required<CrewMemberDetailResponse>;

export type MemberRole = CrewMemberDetailResult['role'];
export type MemberItem = CrewMemberDetailResult;

export type AttendanceRecord = Omit<
  NonNullable<MyAttendanceResponse['attendanceLogs']>[number],
  'runType'
> & {
  runType?: NonNullable<RunType>;
};
