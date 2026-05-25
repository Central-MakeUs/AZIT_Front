import type { ApiResponse } from '@/shared/api/baseTypes';
import type { RunType } from '@/shared/types/schedule';

import type {
  CrewMemberDetailResponse,
  CrewMemberListResponse,
  LinkedProviderResponse,
  MyAttendanceResponse,
  MyCrewResponse,
  MyInfoResponse,
} from './user.model';

export type MyInfoResult = Required<MyInfoResponse>;

export type MyCrewResult = Required<
  Omit<MyCrewResponse, 'memberRole' | 'invitationCode'>
> & {
  memberRole: 'LEADER' | 'MEMBER' | null;
  invitationCode: string | null;
};
export type MyCrewApiResponse = ApiResponse<MyCrewResult[]>;

export type MyInfoApiResponse = ApiResponse<MyInfoResult>;

export type CrewMemberListResult = Required<CrewMemberListResponse>;
export type CrewMemberDetailResult = Required<CrewMemberDetailResponse>;

export type MemberRole = CrewMemberDetailResult['role'];
export type MemberItem = CrewMemberDetailResult;

export type SocialProvider = NonNullable<
  LinkedProviderResponse['providers']
>[number];
export type LinkedProvidersApiResponse = ApiResponse<LinkedProviderResponse>;

export type AttendanceRecord = Omit<
  NonNullable<MyAttendanceResponse['attendanceLogs']>[number],
  'runType'
> & {
  runType?: NonNullable<RunType>;
};
