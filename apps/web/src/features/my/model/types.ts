import type {
  CrewMemberDetailResult,
  JoinRequestMemberResult,
} from '@/shared/api/models/crew';

export type MemberRole = CrewMemberDetailResult['role'];
export type MemberItem = CrewMemberDetailResult;
export type MemberRequestItem = JoinRequestMemberResult;
