import type { components } from '@/shared/api/apiTypes';

/** API 스키마 기준 Response 타입만 정의 */

export type MyInfoResponse = components['schemas']['MyInfoResponse'];
export type CrewMemberListResponse =
  components['schemas']['CrewMemberListResponse'];
export type CrewMemberDetailResponse =
  components['schemas']['CrewMemberDetailResponse'];
