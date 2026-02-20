import type { ApiResponse } from '@/shared/api/baseTypes';

import type {
  CrewInvitationResponseSchema,
  CrewJoinStatusResponseSchema,
} from './crew.model';

export type CrewInfoResult = Required<CrewInvitationResponseSchema>;
export type CrewInfoResponse = ApiResponse<CrewInfoResult>;

export type CrewJoinStatusResult = Required<CrewJoinStatusResponseSchema>;
export type CrewJoinStatusResponse = ApiResponse<CrewJoinStatusResult>;
