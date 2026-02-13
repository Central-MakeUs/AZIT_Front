import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { ScheduleMemberListItem } from '@/features/schedule-members/ui';

import { mockScheduleDetail } from '@/shared/mock/schedule';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/ScheduleMembersPage.css';

export function ScheduleMembersPage() {
  // TODO: 실제 API에서 scheduleId로 멤버 리스트 가져오기
  const members = mockScheduleDetail.participants.map((participant, index) => ({
    ...participant,
    isLeader: index === 0, // 첫 번째 멤버를 리더로 설정 (임시)
  }));

  return (
    <AppScreen>
      <AppLayout>
        <Header className={styles.headerSection} left={<BackButton />} />
        <div className={styles.contentWrapper}>
          <div className={styles.countSection}>
            <h2 className={styles.title}>참여 멤버</h2>
            <div className={styles.countRow}>
              <span className={styles.count}>
                {mockScheduleDetail.participantCount}
              </span>
              <span className={styles.countSuffix}>
                /{mockScheduleDetail.maxParticipants}
              </span>
            </div>
          </div>
          <div className={styles.memberList}>
            {members.map((member) => (
              <ScheduleMemberListItem key={member.id} member={member} />
            ))}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
