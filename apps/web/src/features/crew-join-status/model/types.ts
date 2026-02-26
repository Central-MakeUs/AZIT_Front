import type { CrewJoinStatusResult } from '@/entities/crew/model';
import type { MyInfoResult } from '@/entities/user/model';
export type CrewJoinStatus =
  | CrewJoinStatusResult['status']
  | MyInfoResult['status'];
