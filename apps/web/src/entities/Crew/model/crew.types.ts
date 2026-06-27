import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  CrewInvitationResponseSchema,
  CrewJoinStatusResponseSchema,
  CrewMemberListResponse,
  JoinRequestMemberResponse,
} from './crew.model';

export type CrewInfoResult = Required<CrewInvitationResponseSchema>;
export type CrewInfoResponse = ApiResponse<CrewInfoResult>;

export type CrewJoinStatusResult = Required<CrewJoinStatusResponseSchema>;
export type CrewJoinStatusResponse = ApiResponse<CrewJoinStatusResult>;

export type JoinRequestMemberResult = Required<JoinRequestMemberResponse>;
export type MemberRequestItem = JoinRequestMemberResult;

export type CrewMemberListResult = Required<CrewMemberListResponse>;
