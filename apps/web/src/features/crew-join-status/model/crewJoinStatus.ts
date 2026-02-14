import type { ButtonProps } from '@azit/design-system/button';

import type { CrewJoinStatusResult } from '@/shared/api/models/crew';

export type CrewJoinStatus = CrewJoinStatusResult['status'];

export const CREW_JOIN_STATUS = {
  REQUESTED: 'REQUESTED',
  JOINED: 'JOINED',
  REJECTED: 'REJECTED',
  EXITED: 'EXITED',
} as const;

export const STATUS_CONTENT: Record<
  CrewJoinStatus,
  {
    primaryMessage: string;
    secondaryMessage: string;
    buttonText: string;
    buttonState: ButtonProps['state'];
  }
> = {
  REQUESTED: {
    primaryMessage: '가입 요청이 완료되었어요',
    secondaryMessage: '요청이 승인되면 알림으로 알려드릴게요',
    buttonText: '승인 대기 중',
    buttonState: 'disabled',
  },
  JOINED: {
    primaryMessage: '가입 요청이 승인되었어요',
    secondaryMessage: '아지트에서 크루와 함께 활동해보세요',
    buttonText: '홈으로',
    buttonState: 'active',
  },
  REJECTED: {
    primaryMessage: '가입 요청이 거절되었어요',
    secondaryMessage: '크루 초대코드를 다시 확인해주세요',
    buttonText: '처음으로',
    buttonState: 'active',
  },
  // TODO: EXITED 관련 요구사항 반영
  EXITED: {
    primaryMessage: '크루를 탈퇴했어요',
    secondaryMessage: '크루 초대코드를 다시 확인해주세요',
    buttonText: '처음으로',
    buttonState: 'active',
  },
};
