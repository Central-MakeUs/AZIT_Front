import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { CREW_JOIN_STATUS } from '@/features/crew-join/model/crewJoinStatus';
import type { CrewJoinStatus } from '@/features/crew-join/model/types';
import { postConfirmJoinStatus } from '@/features/crew-join-approval/api/postConfirmJoinStatus';
import type { ConfirmJoinStatusResult } from '@/features/crew-join-approval/api/postConfirmJoinStatus';

import { crewQueries } from '@/shared/queries';

export const useConfirmJoinStatus = (status: CrewJoinStatus | null) => {
  const { replace } = useFlow();
  const queryClient = useQueryClient();

  const confirmJoinStatusMuation = useMutation<
    ConfirmJoinStatusResult,
    Error,
    void
  >({
    ...crewQueries.confirmJoinStatus,
    mutationFn: postConfirmJoinStatus,
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: crewQueries.defaultKey,
      });

      if (data.ok) {
        const redirectActivity =
          status === CREW_JOIN_STATUS.JOINED ? 'StorePage' : 'OnboardingPage';
        replace(redirectActivity, {}, { animate: false });
      } else {
        // TODO: 토스트 처리
        console.log(data.error);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleJoinStatus = () => {
    if (
      status === CREW_JOIN_STATUS.JOINED ||
      status === CREW_JOIN_STATUS.REJECTED
    ) {
      confirmJoinStatusMuation.mutate();
    }
  };

  return { handleJoinStatus };
};
