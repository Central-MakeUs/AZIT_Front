import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { ShareIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleDetailPage.css';

import {
  ScheduleDetailHeaderSection,
  ScheduleDetailInfoSection,
  ScheduleDetailDescriptionSection,
  SchedulePreparationList,
  ScheduleParticipantList,
} from '@/widgets/schedule/ui';
import { ScheduleDetailSkeleton } from '@/widgets/skeleton/ui';

import { useScheduleParticipateActions } from '@/features/schedule-participate/model/useScheduleParticipateActions';

import { bridge } from '@/shared/lib/bridge';
import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { Show } from '@/shared/ui/show';

import {
  formatDistance,
  formatMeetTime,
  formatPace,
  formatRunType,
} from '@/entities/schedule/lib/formatter';
import type { CrewScheduleDetailResponse } from '@/entities/schedule/model/schedule.model';

const transformScheduleDetail = (detail: CrewScheduleDetailResponse) => {
  const { date, time } = formatMeetTime(detail.meetingAt);
  const creator = detail.participants.find((p) => p.isCreator)!;

  return {
    runType: formatRunType(detail.runType),
    distance: formatDistance(detail.distance),
    pace: formatPace(detail.pace),
    title: detail.title,
    creatorName: creator.nickname,
    isCreatorLeader: creator.role === 'LEADER',
    creatorProfileImageUrl: creator.profileImageUrl,
    date,
    time,
    locationName: detail.locationInfo.placeName,
    address: detail.locationInfo.address,
    description: detail.description,
    preparationItems: detail.supplies,
    participants: detail.participants.map((p) => ({
      id: p.memberId,
      nickname: p.nickname,
      profileImageUrl: p.profileImageUrl,
      isLeader: p.role === 'LEADER',
    })),
    participantCount: detail.currentParticipants,
    maxParticipants: detail.maxParticipants,
    scheduleId: detail.scheduleId,
    isCreator: detail.isMine,
    isParticipating: detail.isParticipating,
    isFull: detail.currentParticipants === detail.maxParticipants,
    hasMoreParticipants: detail.hasMoreParticipants,
  };
};

interface ScheduleDetailPageProps {
  params: { id: number };
}

export function ScheduleDetailPage({
  params: { id: scheduleId },
}: ScheduleDetailPageProps) {
  const { push, replace } = useFlow();
  const queryClient = useQueryClient();

  const { data: myInfoData, isLoading: myInfoLoading } = useQuery(
    memberQueries.myInfoQuery()
  );
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;

  const { data: scheduleDetailData, isLoading: scheduleDetailLoading } =
    useQuery({
      ...scheduleQueries.scheduleDetailQuery(crewId, scheduleId),
      enabled: !!crewId,
    });

  const isLoading = myInfoLoading || scheduleDetailLoading;

  const scheduleDetailViewData = useMemo(() => {
    if (!scheduleDetailData?.ok) return null;
    return transformScheduleDetail(scheduleDetailData.data.result);
  }, [scheduleDetailData]);

  const { participate, cancelParticipation, isPending } =
    useScheduleParticipateActions({
      crewId,
      scheduleId,
    });

  const deleteScheduleMutation = useMutation({
    ...scheduleQueries.deleteSchedule,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: scheduleQueries.detail(scheduleId),
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.all,
        predicate: (query) => {
          const [, type] = query.queryKey;
          return type !== 'detail';
        },
      });
      replace('SchedulePage', {});
    },
  });

  const handleEdit = () => {
    if (scheduleDetailViewData?.scheduleId != null) {
      push('ScheduleEditPage', {
        id: scheduleDetailViewData.scheduleId,
      });
    }
  };

  const handleDelete = () => {
    if (crewId > 0 && scheduleId > 0) {
      deleteScheduleMutation.mutate({ crewId, scheduleId });
    }
  };

  const handleShare = () => {
    if (scheduleDetailViewData?.scheduleId != null) {
      bridge.shareSchedule(String(scheduleDetailViewData.scheduleId));
    }
  };

  const handleSeeMoreParticipants = () => {
    if (scheduleDetailViewData?.scheduleId != null) {
      push('ScheduleMembersPage', {
        id: scheduleDetailViewData.scheduleId,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && scheduleDetailViewData === null) {
      push('NotFoundPage', {});
    }
  }, [isLoading, scheduleDetailViewData]);

  if (isLoading) {
    return (
      <AppScreen>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header left={<BackButton />} />
          </div>
          <ScheduleDetailSkeleton />
        </AppLayout>
      </AppScreen>
    );
  }

  if (scheduleDetailViewData === null) {
    return null;
  }

  const isCreator = scheduleDetailViewData.isCreator;
  const isParticipating = scheduleDetailViewData.isParticipating;
  const isFull = scheduleDetailViewData.isFull;

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<BackButton />}
            right={
              <button
                type="button"
                className={styles.shareButton}
                onClick={handleShare}
                aria-label="공유하기"
              >
                <ShareIcon size={24} color="default" />
              </button>
            }
          />
        </div>
        <div className={styles.mainContainer}>
          <ScheduleDetailHeaderSection
            runType={scheduleDetailViewData.runType}
            distance={scheduleDetailViewData.distance}
            pace={scheduleDetailViewData.pace}
            title={scheduleDetailViewData.title}
            creatorName={scheduleDetailViewData.creatorName}
            creatorProfileImageUrl={
              scheduleDetailViewData.creatorProfileImageUrl
            }
            isCreatorLeader={scheduleDetailViewData.isCreatorLeader}
          />
          <ScheduleDetailInfoSection
            date={scheduleDetailViewData.date}
            time={scheduleDetailViewData.time}
            locationName={scheduleDetailViewData.locationName}
            address={scheduleDetailViewData.address}
          />
          <ScheduleDetailDescriptionSection
            description={scheduleDetailViewData.description}
          />
          <SchedulePreparationList
            items={scheduleDetailViewData.preparationItems}
          />
          <ScheduleParticipantList
            participants={scheduleDetailViewData.participants}
            participantCount={scheduleDetailViewData.participantCount}
            maxParticipants={scheduleDetailViewData.maxParticipants}
            handleClickMore={handleSeeMoreParticipants}
          />
        </div>
        <div className={styles.footerWrapper}>
          <Show when={isFull}>
            <Button size="large" state="disabled" disabled>
              신청이 마감되었어요
            </Button>
          </Show>
          <Show when={isCreator}>
            <div className={styles.creatorButtonWrapper}>
              <AlertDialog
                trigger={
                  <Button size="large" state="outline">
                    삭제하기
                  </Button>
                }
                title="일정을 삭제하시겠어요?"
                description="삭제된 일정은 복구할 수 없어요"
                actionText="삭제하기"
                cancelText="취소하기"
                onAction={handleDelete}
              />
              <Button size="large" state="active" onClick={handleEdit}>
                수정하기
              </Button>
            </div>
          </Show>
          <Show when={!isCreator && isParticipating}>
            <Button
              size="large"
              state="outline"
              onClick={cancelParticipation}
              disabled={isPending}
            >
              취소하기
            </Button>
          </Show>
          <Show when={!isCreator && !isParticipating}>
            <Button
              size="large"
              state="active"
              onClick={participate}
              disabled={isPending}
            >
              신청하기
            </Button>
          </Show>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
