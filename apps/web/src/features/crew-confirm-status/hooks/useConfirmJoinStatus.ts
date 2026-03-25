import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { postConfirmJoinStatus } from '@/features/crew-confirm-status/api/postConfirmJoinStatus';
import { CREW_JOIN_STATUS } from '@/features/crew-join-status/model/crewJoinStatus';
import type { CrewJoinStatus } from '@/features/crew-join-status/model/types';

import { crewQueries, memberQueries, scheduleQueries } from '@/shared/queries';

export const useConfirmJoinStatus = (status: CrewJoinStatus | null) => {
  const { replace } = useFlow();
  const queryClient = useQueryClient();

  const confirmJoinStatusMuation = useMutation({
    ...crewQueries.confirmJoinStatus,
    mutationFn: postConfirmJoinStatus,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: crewQueries.defaultKey,
      });
      queryClient.invalidateQueries({
        queryKey: memberQueries.myInfoKey(),
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.all,
      });

      const redirectActivity =
        status === CREW_JOIN_STATUS.JOINED ? 'HomePage' : 'OnboardingPage';
      replace(redirectActivity, {}, { animate: false });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleJoinStatus = () => {
    if (
      status === CREW_JOIN_STATUS.JOINED ||
      status === CREW_JOIN_STATUS.REJECTED ||
      status === CREW_JOIN_STATUS.EXPELLED
    ) {
      confirmJoinStatusMuation.mutate();
    }
  };

  return { handleJoinStatus };
};
