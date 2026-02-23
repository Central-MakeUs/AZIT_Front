import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import * as styles from '@/pages/schedule/styles/ScheduleMembersPage.css';

import {
  ScheduleParticipantListItem,
  ScheduleParticipantTitle,
} from '@/widgets/schedule/ui';

import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { memberQueries } from '@/shared/queries/member';
import { scheduleQueries } from '@/shared/queries/schedule';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

interface ScheduleMembersPageProps {
  params: { id: number };
}

export function ScheduleMembersPage({
  params: { id: scheduleId },
}: ScheduleMembersPageProps) {
  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;

  const { data: scheduleDetailData } = useQuery({
    ...scheduleQueries.scheduleDetailQuery(crewId, scheduleId),
    enabled: crewId > 0 && scheduleId > 0,
  });

  const participantCount = scheduleDetailData?.ok
    ? scheduleDetailData.data.result.currentParticipants
    : 0;
  const maxParticipants = scheduleDetailData?.ok
    ? scheduleDetailData.data.result.maxParticipants
    : 0;

  const {
    data: participantsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...scheduleQueries.scheduleParticipantsQuery(crewId, scheduleId),
    enabled: crewId > 0 && scheduleId > 0,
  });

  const { scrollRef, bottomSentinelRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const members =
    participantsData?.pages.flatMap((page) =>
      page.ok
        ? page.data.result.content.map((participant) => ({
            id: participant.memberId,
            nickname: participant.nickname,
            profileImageUrl: participant.profileImageUrl,
            isLeader: participant.role === 'LEADER',
          }))
        : []
    ) ?? [];

  return (
    <AppScreen>
      <AppLayout>
        <Header className={styles.headerSection} left={<BackButton />} />
        <div className={styles.contentWrapper} ref={scrollRef}>
          <ScheduleParticipantTitle
            participantCount={participantCount}
            maxParticipants={maxParticipants}
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
          <div ref={bottomSentinelRef} aria-hidden />
        </div>
      </AppLayout>
    </AppScreen>
  );
}
