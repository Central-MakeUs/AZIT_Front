import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import {
  MemberList,
  MemberManagementTab,
  RequestList,
  RequestListEmpty,
} from '@/features/my/ui';
import { memberQueries } from '@/shared/queries';
import { MEMBER_ROLE } from '@/features/my/model/role';
import type { MemberItem, MemberRequestItem } from '@/features/my/model/types';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import * as styles from '../styles/MemberManagePage.css';

export function MemberManagePage({ params }: { params?: { id?: string } }) {
  const [activeTab, setActiveTab] = useState<'member' | 'request'>('member');

  const crewId = Number(params?.id) || 0;

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());
  const myInfo = myInfoData?.ok ? myInfoData.data.result : null;

  const {
    data: membersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...memberQueries.crewMembersQuery(crewId),
    enabled: crewId > 0 && activeTab === 'member',
  });

  const { scrollRef, bottomSentinelRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const members: MemberItem[] =
    membersData?.pages.flatMap((page) =>
      page.ok
        ? page.data.result.content.map((member) => ({
            id: member.id ?? 0,
            memberId: member.memberId ?? member.id ?? 0,
            nickname: member.nickname ?? '',
            profileImageUrl: member.profileImageUrl ?? '',
            role: member.role ?? 'MEMBER',
            joinedDate: member.joinedDate ?? '',
          }))
        : []
    ) ?? [];

  const totalCount =
    membersData?.pages[0]?.ok === true
      ? membersData.pages[0].data.result.totalCount
      : undefined;

  const { data: joinRequestsData } = useQuery({
    ...memberQueries.joinRequestsQuery(crewId),
    enabled: crewId > 0,
  });

  const requests = joinRequestsData?.ok
    ? (joinRequestsData.data.result ?? [])
    : [];

  if (isLoading || !myInfoData?.ok) {
    return <></>;
  }

  const isLeader = myInfo?.crewMemberRole === MEMBER_ROLE.LEADER;

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="멤버 관리" />
          <MemberManagementTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            requestCount={requests.length}
          />
        </div>
        <div
          className={styles.mainContainer}
          ref={activeTab === 'member' ? scrollRef : undefined}
        >
          {activeTab === 'request' ? (
            <RequestListView crewId={crewId} requests={requests} />
          ) : (
            <MemberListView
              members={members}
              totalCount={totalCount}
              isLeader={isLeader}
              bottomSentinelRef={bottomSentinelRef}
            />
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}

function MemberListView({
  members,
  totalCount,
  isLeader,
  bottomSentinelRef,
}: {
  members: MemberItem[];
  totalCount: number | undefined;
  isLeader: boolean;
  bottomSentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <p className={styles.totalCount}>총 {totalCount ?? members.length}명</p>
      <MemberList members={members} />
      <div ref={bottomSentinelRef} className={styles.sentinel} aria-hidden />
    </>
  );
}

function RequestListView({
  crewId,
  requests,
}: {
  crewId: number;
  requests: MemberRequestItem[];
}) {
  return requests.length > 0 ? (
    <RequestList crewId={crewId} requests={requests} />
  ) : (
    <RequestListEmpty />
  );
}
