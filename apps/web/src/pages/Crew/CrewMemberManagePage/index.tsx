import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useLayoutEffect, useRef, useState } from 'react';

import {
  MemberList,
  MemberManagementTab,
  RequestListEmpty,
} from '@/widgets/mypage/ui';


import { crewQueries } from '@/features/Crew/api/queries';
import { RequestList } from '@/features/Crew/crew-manage/ui';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { usePullToRefresh } from '@/shared/lib/usePullToRefresh';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { spinner as pageLoaderSpinner } from '@/shared/ui/loading/PageLoader.css.ts';

import * as styles from './index.css';

import { userQueries } from '@/entities/User/api/queries';
import type { MemberItem } from '@/entities/User/model';

function MemberListContent({
  crewId,
  containerRef,
}: {
  crewId: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const queryClient = useQueryClient();

  const { data: myCrewsData } = useSuspenseQuery(userQueries.myCrewsQuery());
  const crew = myCrewsData?.find((c) => c.crewId === crewId) ?? null;

  const {
    data: membersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMembers,
  } = useSuspenseInfiniteQuery(crewQueries.crewMembersQuery(crewId));

  const { scrollRef: infiniteScrollRef, bottomSentinelRef } = useInfiniteScroll(
    {
      hasNextPage: hasNextPage ?? false,
      isFetchingNextPage,
      fetchNextPage,
    }
  );

  const {
    scrollRef: pullScrollRef,
    isRefreshing: isPullRefreshing,
    pullProgress,
  } = usePullToRefresh({
    enabled: crewId > 0,
    onRefresh: async () => {
      await refetchMembers();
    },
  });

  useLayoutEffect(() => {
    infiniteScrollRef.current = containerRef.current;
    pullScrollRef.current = containerRef.current;
  });

  const deleteMutation = useMutation({
    ...crewQueries.deleteCrewMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.crewMembersKey(crewId),
      });
    },
  });

  if (!crew) return null;

  const isLeader = crew.memberRole === MEMBER_ROLE.LEADER;
  const handleDeleteMember = isLeader
    ? (targetMemberId: number) =>
        deleteMutation.mutate({ crewId, targetMemberId })
    : undefined;

  const members: MemberItem[] =
    membersData?.pages.flatMap(
      (page) =>
        page.result.content?.map((member) => ({
          id: member.id!,
          memberId: member.memberId!,
          nickname: member.nickname!,
          profileImageUrl: member.profileImageUrl!,
          role: member.role!,
          joinedDate: member.joinedDate!,
        })) ?? []
    ) ?? [];

  const totalCount = membersData?.pages[0]?.result?.totalCount;

  return (
    <>
      {(isPullRefreshing || pullProgress > 0) && (
        <div className={styles.pullIndicator} aria-hidden>
          {isPullRefreshing ? (
            <>
              <div className={pageLoaderSpinner} />
              <p className={styles.pullText}>새로고침 중</p>
            </>
          ) : (
            <p className={styles.pullHint}>
              {pullProgress >= 1 ? '놓으면 새로고침' : '당겨서 새로고침'}
            </p>
          )}
        </div>
      )}
      <p className={styles.totalCount}>총 {totalCount ?? members.length}명</p>
      <MemberList
        members={members}
        onDeleteMember={handleDeleteMember}
        isDeletingMemberId={
          deleteMutation.isPending
            ? deleteMutation.variables?.targetMemberId
            : undefined
        }
      />
      <div ref={bottomSentinelRef} className={styles.sentinel} aria-hidden />
    </>
  );
}

function RequestListContent({
  crewId,
  containerRef,
}: {
  crewId: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { data: joinRequestsData, refetch: refetchRequests } = useSuspenseQuery(
    crewQueries.joinRequestsQuery(crewId)
  );

  const requests = joinRequestsData?.result ?? [];

  const {
    scrollRef: pullScrollRef,
    isRefreshing: isPullRefreshing,
    pullProgress,
  } = usePullToRefresh({
    enabled: crewId > 0,
    onRefresh: async () => {
      await refetchRequests();
    },
  });

  useLayoutEffect(() => {
    pullScrollRef.current = containerRef.current;
  });

  return (
    <>
      {(isPullRefreshing || pullProgress > 0) && (
        <div className={styles.pullIndicator} aria-hidden>
          {isPullRefreshing ? (
            <>
              <div className={pageLoaderSpinner} />
              <p className={styles.pullText}>새로고침 중</p>
            </>
          ) : (
            <p className={styles.pullHint}>
              {pullProgress >= 1 ? '놓으면 새로고침' : '당겨서 새로고침'}
            </p>
          )}
        </div>
      )}
      {requests.length > 0 ? (
        <RequestList crewId={crewId} requests={requests} />
      ) : (
        <RequestListEmpty />
      )}
    </>
  );
}

export function CrewMemberManagePage({ params }: { params?: { id?: string } }) {
  const [activeTab, setActiveTab] = useState<'member' | 'request'>('member');
  const crewId = Number(params?.id) || 0;
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const { data: joinRequestsData } = useQuery({
    ...crewQueries.joinRequestsQuery(crewId),
    enabled: crewId > 0,
  });
  const requestCount = joinRequestsData?.result?.length ?? 0;

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="멤버 관리" />
          <MemberManagementTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            requestCount={requestCount}
          />
        </div>
        <div
          className={`${styles.mainContainer}${activeTab === 'request' ? ` ${styles.noPaddingTop}` : ''}`}
          ref={mainContainerRef}
        >
          {activeTab === 'request' ? (
            <AsyncBoundary suspenseFallback={<PageLoader />}>
              <RequestListContent
                crewId={crewId}
                containerRef={mainContainerRef}
              />
            </AsyncBoundary>
          ) : (
            <AsyncBoundary suspenseFallback={<PageLoader />}>
              <MemberListContent
                crewId={crewId}
                containerRef={mainContainerRef}
              />
            </AsyncBoundary>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
