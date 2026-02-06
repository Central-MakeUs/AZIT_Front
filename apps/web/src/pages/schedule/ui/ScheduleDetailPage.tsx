import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { Button } from '@azit/design-system/button';
import { ShareIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  ScheduleDetailHeaderSection,
  ScheduleDetailInfoSection,
  ScheduleDetailDescriptionSection,
  SchedulePreparationList,
  ScheduleParticipantList,
} from '@/features/schedule-detail/ui';
import { useState } from 'react';
import { mockScheduleDetail } from '@/shared/mock/schedule';
import * as styles from '../styles/ScheduleDetailPage.css';
import { useFlow } from '@/app/routes/stackflow';
import { bridge } from '@/shared/lib/bridge';

// TODO: 실제 인증/API 연동 시 교체
const MOCK_CURRENT_USER_ID = 'user-1';
const MOCK_HAS_APPLIED = false;

export function ScheduleDetailPage() {
  const { push } = useFlow();
  const [hasApplied, setHasApplied] = useState(MOCK_HAS_APPLIED);

  const isOwner = MOCK_CURRENT_USER_ID === mockScheduleDetail.creatorId;

  const handleApply = () => {
    setHasApplied(true);
    // TODO: 신청하기 API
  };

  const handleCancel = () => {
    setHasApplied(false);
    // TODO: 취소하기 API
  };

  const handleEdit = () => {
    // TODO: 수정하기 네비게이션
  };

  const handleShare = () => {
    bridge.shareSchedule(mockScheduleDetail.id);
  };

  const handleSeeMoreParticipants = () => {
    push('ScheduleMembersPage', { id: mockScheduleDetail.id });
  };

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
            runType={mockScheduleDetail.runType}
            distance={mockScheduleDetail.distance}
            pace={mockScheduleDetail.pace}
            title={mockScheduleDetail.title}
            leaderNickname={mockScheduleDetail.leader.nickname}
          />
          <ScheduleDetailInfoSection
            date={mockScheduleDetail.date}
            dayOfWeek={mockScheduleDetail.dayOfWeek}
            time={mockScheduleDetail.time}
            locationName={mockScheduleDetail.locationName}
            address={mockScheduleDetail.address}
          />
          <ScheduleDetailDescriptionSection
            description={mockScheduleDetail.description}
          />
          <SchedulePreparationList
            items={mockScheduleDetail.preparationItems}
          />
          <ScheduleParticipantList
            participants={mockScheduleDetail.participants}
            participantCount={mockScheduleDetail.participantCount}
            maxParticipants={mockScheduleDetail.maxParticipants}
            handleClickMore={handleSeeMoreParticipants}
          />
        </div>
        <div className={styles.footerWrapper}>
          {isOwner ? (
            <Button size="large" state="active" onClick={handleEdit}>
              수정하기
            </Button>
          ) : hasApplied ? (
            <Button size="large" state="outline" onClick={handleCancel}>
              취소하기
            </Button>
          ) : (
            <Button size="large" state="active" onClick={handleApply}>
              신청하기
            </Button>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
