import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleQueries } from '@/shared/queries/schedule';
import { toast } from '@/shared/ui/toast';

interface UseScheduleActionsProps {
  crewId: number;
  scheduleId: number;
}

export function useScheduleParticipateActions({
  crewId,
  scheduleId,
}: UseScheduleActionsProps) {
  const queryClient = useQueryClient();

  const detailQueryKey = scheduleQueries.scheduleDetailQuery(
    crewId,
    scheduleId
  ).queryKey;
  const participantsQueryKey = scheduleQueries.scheduleParticipantsQuery(
    crewId,
    scheduleId
  ).queryKey;

  const participateMutation = useMutation({
    ...scheduleQueries.participateSchedule,
    onSuccess: () => {
      // TODO: 토스트 메세지 스타일 변경
      toast.success('신청이 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: detailQueryKey });
      queryClient.invalidateQueries({ queryKey: participantsQueryKey });
    },
  });

  const cancelMutation = useMutation({
    ...scheduleQueries.cancelParticipation,
    onSuccess: () => {
      // TODO: 토스트 메세지 스타일 변경
      toast.success('신청이 취소되었습니다');
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
