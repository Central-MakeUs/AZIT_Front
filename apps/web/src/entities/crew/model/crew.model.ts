import type { components } from '@/shared/api/apiTypes';

/** API 스키마 기준 Response 타입만 정의 */

export type CrewInvitationResponseSchema =
  components['schemas']['CrewInvitationResponse'];

export type CrewJoinStatusResponseSchema =
  components['schemas']['CrewJoinStatusResponse'];

export type JoinRequestMemberResponse =
  components['schemas']['JoinRequestMemberResponse'];
