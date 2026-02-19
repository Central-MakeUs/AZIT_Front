import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import * as styles from '@/pages/schedule/styles/ScheduleMembersPage.css';

import {
  ScheduleParticipantListItem,
  ScheduleParticipantTitle,
} from '@/features/schedule/ui';

import { mockScheduleDetail } from '@/shared/mock/schedule';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

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
          <ScheduleParticipantTitle
            participantCount={mockScheduleDetail.participantCount}
            maxParticipants={mockScheduleDetail.maxParticipants}
          />
          <div className={styles.memberList}>
            {members.map((member) => (
              <ScheduleParticipantListItem
                key={member.id}
                participant={member}
                orientation="horizontal"
              />
            ))}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
