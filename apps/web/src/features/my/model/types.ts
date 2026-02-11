import type {
  CrewMemberDetailResult,
  JoinRequestMemberResult,
} from '@/shared/api/models';

export type MemberRole = CrewMemberDetailResult['role'];
export type MemberItem = CrewMemberDetailResult;
export type MemberRequestItem = JoinRequestMemberResult;
