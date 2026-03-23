import { useMutation, useQueryClient } from '@tanstack/react-query';

import { memberQueries } from '@/shared/queries';
import { scheduleQueries } from '@/shared/queries/schedule';
import { toastSuccess } from '@/shared/ui/toast';

interface UseScheduleActionsProps {
  crewId: number;
  scheduleId: number;
}

export function useScheduleParticipateActions({
  crewId,
  scheduleId,
}: UseScheduleActionsProps) {
  const queryClient = useQueryClient();

  const scheduleAllQueryKey = scheduleQueries.all;

  const participateMutation = useMutation({
    ...scheduleQueries.participateSchedule,
    meta: {
      errorMessages: {
        SCHEDULE_INTERVAL_TOO_CLOSE: '이전 일정과 시작 시간이 너무 가깝습니다',
      },
    },
    onSuccess: () => {
      toastSuccess('신청이 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: scheduleAllQueryKey });
      queryClient.invalidateQueries({ queryKey: memberQueries.myInfoKey() });
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.checkInStatusKey(),
      });
    },
  });

  const cancelMutation = useMutation({
    ...scheduleQueries.cancelParticipation,
    onSuccess: () => {
      toastSuccess('신청이 취소되었습니다');
      queryClient.invalidateQueries({ queryKey: scheduleAllQueryKey });
      queryClient.invalidateQueries({ queryKey: memberQueries.myInfoKey() });
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.checkInStatusKey(),
      });
    },
  });

  const participate = () => {
    if (crewId <= 0 || scheduleId <= 0) return;
    participateMutation.mutate({ crewId, scheduleId });
  };

  const cancelParticipation = () => {
    if (crewId <= 0 || scheduleId <= 0) return;
    cancelMutation.mutate({ crewId, scheduleId });
  };

  return {
    participate,
    cancelParticipation,
    isPending: participateMutation.isPending || cancelMutation.isPending,
  };
}
