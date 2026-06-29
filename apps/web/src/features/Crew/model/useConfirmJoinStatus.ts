import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { crewQueries } from '@/features/Crew/api/queries';
import { CREW_JOIN_STATUS } from '@/features/Crew/model/crewJoinStatus';
import type { CrewJoinStatus } from '@/features/Crew/model/types';

import { userQueries } from '@/entities/User/api/queries';

export const useConfirmJoinStatus = (status: CrewJoinStatus | null) => {
  const { replace } = useFlow();
  const queryClient = useQueryClient();

  const confirmJoinStatusMuation = useMutation({
    ...crewQueries.confirmJoinStatus,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: crewQueries.defaultKey,
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.myInfoKey(),
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.myCrewsKey(),
      });
      queryClient.invalidateQueries({
        queryKey: ['schedule'],
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
