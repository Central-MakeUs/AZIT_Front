import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  CrewMemberDetailResponse,
  CrewMemberListResponse,
  JoinRequestMemberResponse,
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
export type JoinRequestMemberResult = Required<JoinRequestMemberResponse>;

export type MemberRole = CrewMemberDetailResult['role'];
export type MemberItem = CrewMemberDetailResult;
export type MemberRequestItem = JoinRequestMemberResult;
