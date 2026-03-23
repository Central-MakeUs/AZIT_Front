import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { ShareIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMemo, Suspense, type ReactNode } from 'react';

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
import { useStack } from '@/shared/lib/stackflow/useStack';
import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { BackButton } from '@/shared/ui/button';
import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';
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

  return {
    runType: formatRunType(detail.runType),
    distance: formatDistance(detail.distance),
    pace: formatPace(detail.pace),
    title: detail.title,
    creatorName: detail.creatorNickname,
    creatorRole: detail.creatorRole,
    creatorProfileImageUrl: detail.creatorProfileImageUrl,
    date,
    time,
    locationName: detail.locationInfo.placeName,
    detailedLocation: detail.locationInfo.meetingSpot,
    address: detail.locationInfo.address,
    latitude: detail.locationInfo.latitude,
    longitude: detail.locationInfo.longitude,
    description: detail.description,
    preparationItems: detail.supplies,
    participants: detail.participants,
    participantCount: detail.currentParticipants,
    maxParticipants: detail.maxParticipants,
    isCreator: detail.isMine,
    isParticipating: detail.isParticipating,
    isCheckedIn: detail.isCheckedIn,
    isModifiable: detail.isModifiable ?? true,
    isParticipationModifiable: detail.isParticipationModifiable ?? true,
    isFull: detail.currentParticipants === detail.maxParticipants,
    hasMoreParticipants: detail.hasMoreParticipants,
  };
};

interface ScheduleDetailPageProps {
  params: { id: number };
}

function ScheduleDetailContent({
  scheduleId,
  onBack,
}: {
  scheduleId: number;
  onBack: () => void;
}) {
  const { push } = useFlow();
  const queryClient = useQueryClient();

  const { data: myInfoData } = useSuspenseQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData.result.crewId;

  const { data: scheduleDetailData } = useSuspenseQuery(
    scheduleQueries.scheduleDetailQuery(crewId, scheduleId)
  );

  const scheduleDetailViewData = useMemo(
    () => transformScheduleDetail(scheduleDetailData.result),
    [scheduleDetailData]
  );

  const { participate, cancelParticipation, isPending } =
    useScheduleParticipateActions({
      crewId,
      scheduleId,
    });

  const deleteScheduleMutation = useMutation({
    ...scheduleQueries.deleteSchedule,
    onSuccess: () => {
      onBack();

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
    },
  });

  const handleEdit = () => {
    push('ScheduleEditPage', { id: scheduleId });
  };

  const handleDelete = () => {
    if (crewId > 0 && scheduleId > 0) {
      deleteScheduleMutation.mutate({ crewId, scheduleId });
    }
  };

  const handleSeeMoreParticipants = () => {
    push('ScheduleMembersPage', { id: scheduleId });
  };

  const isCreator = scheduleDetailViewData.isCreator;
  const isParticipating = scheduleDetailViewData.isParticipating;
  const isCheckedIn = scheduleDetailViewData.isCheckedIn;
  const isModifiable = scheduleDetailViewData.isModifiable;
  const isParticipationModifiable =
    scheduleDetailViewData.isParticipationModifiable;
  const isFull = scheduleDetailViewData.isFull;

  return (
    <>
      <ScheduleDetailHeader
        onBack={onBack}
        right={
          <button
            type="button"
            className={styles.shareButton}
            onClick={() => bridge.shareSchedule(String(scheduleId))}
            aria-label="공유하기"
          >
            <ShareIcon size={24} color="default" />
          </button>
        }
      />
      <div className={styles.mainContainer}>
        <ScheduleDetailHeaderSection
          runType={scheduleDetailViewData.runType}
          distance={scheduleDetailViewData.distance}
          pace={scheduleDetailViewData.pace}
          title={scheduleDetailViewData.title}
          creatorName={scheduleDetailViewData.creatorName}
          creatorProfileImageUrl={scheduleDetailViewData.creatorProfileImageUrl}
          creatorRole={scheduleDetailViewData.creatorRole}
        />
        <ScheduleDetailInfoSection
          date={scheduleDetailViewData.date}
          time={scheduleDetailViewData.time}
          locationName={scheduleDetailViewData.locationName}
          detailedLocation={scheduleDetailViewData.detailedLocation}
          address={scheduleDetailViewData.address}
          latitude={scheduleDetailViewData.latitude}
          longitude={scheduleDetailViewData.longitude}
        />
        <Show when={!!scheduleDetailViewData.description}>
          <ScheduleDetailDescriptionSection
            description={scheduleDetailViewData.description}
          />
        </Show>
        <Show when={scheduleDetailViewData.preparationItems.length > 0}>
          <SchedulePreparationList
            items={scheduleDetailViewData.preparationItems}
          />
        </Show>
        <ScheduleParticipantList
          participants={scheduleDetailViewData.participants}
          participantCount={scheduleDetailViewData.participantCount}
          maxParticipants={scheduleDetailViewData.maxParticipants}
          handleClickMore={handleSeeMoreParticipants}
        />
      </div>
      <div className={styles.footerWrapper}>
        <Show when={!!isCheckedIn}>
          <Button size="large" state="disabled">
            이미 참여한 일정이에요
          </Button>
        </Show>
        <Show when={!isCheckedIn && !isCreator && isFull && !isParticipating}>
          <Button size="large" state="disabled">
            신청이 마감되었어요
          </Button>
        </Show>
        <Show when={!isCheckedIn && isCreator}>
          <div className={styles.creatorButtonWrapper}>
            <AlertDialog
              trigger={
                <Button
                  size="large"
                  state={isModifiable ? 'outline' : 'disabled'}
                >
                  삭제하기
                </Button>
              }
              title="일정을 삭제하시겠어요?"
              description="삭제된 일정은 복구할 수 없어요"
              actionText="삭제하기"
              cancelText="취소하기"
              onAction={handleDelete}
            />
            <Button
              size="large"
              state={isModifiable ? 'active' : 'disabled'}
              onClick={handleEdit}
            >
              수정하기
            </Button>
          </div>
        </Show>
        <Show when={!isCheckedIn && !isCreator && isParticipating}>
          <Button
            size="large"
            state={
              isPending || !isParticipationModifiable ? 'disabled' : 'outline'
            }
            onClick={cancelParticipation}
          >
            취소하기
          </Button>
        </Show>
        <Show when={!isCheckedIn && !isCreator && !isFull && !isParticipating}>
          <Button
            size="large"
            onClick={participate}
            state={
              isPending || !isParticipationModifiable ? 'disabled' : 'active'
            }
          >
            신청하기
          </Button>
        </Show>
      </div>
    </>
  );
}

function ScheduleDetailHeader({
  onBack,
  right,
}: {
  onBack: () => void;
  right?: ReactNode;
}) {
  return (
    <div className={styles.headerWrapper}>
      <Header left={<BackButton onClick={onBack} />} right={right} />
    </div>
  );
}

export function ScheduleDetailPage({ params }: ScheduleDetailPageProps) {
  const { pop } = useStack();
  const handleBack = () => pop('SchedulePage');

  return (
    <AppScreen>
      <AppLayout>
        <DomainErrorBoundary
          fallback={({ error, reset }) => (
            <>
              <ScheduleDetailHeader onBack={handleBack} />
              <BusinessErrorFallback error={error} onReset={reset} />
            </>
          )}
        >
          <Suspense
            fallback={
              <>
                <ScheduleDetailHeader onBack={handleBack} />
                <ScheduleDetailSkeleton />
              </>
            }
          >
            <ScheduleDetailContent scheduleId={params.id} onBack={handleBack} />
          </Suspense>
        </DomainErrorBoundary>
      </AppLayout>
    </AppScreen>
  );
}
