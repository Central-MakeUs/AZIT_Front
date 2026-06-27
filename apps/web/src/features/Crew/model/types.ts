import type { CrewJoinStatusResult } from '@/entities/Crew/model';

import type { ApiResponse } from '@/shared/api/baseTypes';
import type { CreateCrewResult } from '@/shared/api/models';

export type CrewJoinStatus = CrewJoinStatusResult['status'];
export type CreateCrewResponseType = ApiResponse<CreateCrewResult>;
export type JoinCrewResponseType = ApiResponse<Record<string, never>>;
