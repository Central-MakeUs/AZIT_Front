import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { scheduleQueries } from '@/features/Schedule/api/queries';
import {
  ScheduleParticipantListItem,
  ScheduleParticipantTitle,
} from '@/features/Schedule/ui';

import { userQueries } from '@/entities/User/api/queries';

import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

interface ScheduleMembersPageProps {
  params: { id: number };
}

export function ScheduleMembersPage({
  params: { id: scheduleId },
}: ScheduleMembersPageProps) {
  const { data: myCrewsData } = useQuery(userQueries.myCrewsQuery());
  const crewId =
    myCrewsData?.find((c) => c.memberStatus === 'JOINED')?.crewId ?? 0;

  const { data: scheduleDetailData } = useQuery({
    ...scheduleQueries.scheduleDetailQuery(crewId, scheduleId),
    enabled: crewId > 0 && scheduleId > 0,
  });

  const participantCount = scheduleDetailData?.result.currentParticipants ?? 0;
  const maxParticipants = scheduleDetailData?.result.maxParticipants ?? 0;

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
    participantsData?.pages.flatMap((page) => page.result?.content ?? []) ?? [];

  return (
    <AppScreen>
      <AppLayout>
        <Header
          className={styles.headerSection}
          left={<BackButton />}
          center={<span>참여 멤버</span>}
        />
        <div className={styles.contentWrapper} ref={scrollRef}>
          <ScheduleParticipantTitle
            participantCount={participantCount}
            maxParticipants={maxParticipants}
          />
          <div className={styles.memberList}>
            {members.map((member) => (
              <ScheduleParticipantListItem
                key={member.memberId}
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
