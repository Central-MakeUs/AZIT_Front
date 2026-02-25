import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/shared/api/apiHandler';
import { scheduleQueries } from '@/shared/queries/schedule';
import { toastError, toastSuccess } from '@/shared/ui/toast';

interface UseScheduleActionsProps {
  crewId: number;
  scheduleId: number;
}

export function useScheduleParticipateActions({
  crewId,
  scheduleId,
}: UseScheduleActionsProps) {
  const queryClient = useQueryClient();

  const detailQueryKey = scheduleQueries.detail(scheduleId);
  const participantsQueryKey = scheduleQueries.participants(scheduleId);

  const participateMutation = useMutation({
    ...scheduleQueries.participateSchedule,
    onSuccess: () => {
      toastSuccess('신청이 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: detailQueryKey });
      queryClient.invalidateQueries({ queryKey: participantsQueryKey });
    },
    onError: (error) => {
      if (
        error instanceof ApiError &&
        error.code === 'SCHEDULE_INTERVAL_TOO_CLOSE'
      ) {
        toastError('이전 일정과 시작 시간이 너무 가깝습니다');
        return;
      }
      toastError('일정 참여에 실패했습니다.');
    },
  });

  const cancelMutation = useMutation({
    ...scheduleQueries.cancelParticipation,
    onSuccess: () => {
      toastSuccess('신청이 취소되었습니다');
      queryClient.invalidateQueries({ queryKey: detailQueryKey });
      queryClient.invalidateQueries({ queryKey: participantsQueryKey });
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
