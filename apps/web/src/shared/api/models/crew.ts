import type { components } from '@/shared/api/apiTypes';

export type CreateCrewRequest = components['schemas']['CreateCrewRequest'];
export type CreateCrewResult = Required<
  components['schemas']['CreateCrewResponse']
>;
export type JoinCrewRequest = components['schemas']['JoinCrewRequest'];
export type CrewInfoResult = Required<
  components['schemas']['CrewInvitationResponse']
>;
export type CrewJoinStatusResult = Required<
  components['schemas']['CrewJoinStatusResponse']
>;
export type CrewMemberListResult = Required<
  components['schemas']['CrewMemberListResponse']
>;
export type CrewMemberDetailResult = Required<
  components['schemas']['CrewMemberDetailResponse']
>;
export type JoinRequestMemberResult = Required<
  components['schemas']['JoinRequestMemberResponse']
>;
