import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import * as styles from '@/pages/mypage/styles/MemberManagePage.css';

import {
  MemberList,
  MemberManagementTab,
  RequestListEmpty,
} from '@/widgets/mypage/ui';

import { RequestList } from '@/features/crew-manage/ui';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { usePullToRefresh } from '@/shared/lib/usePullToRefresh';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { spinner as pageLoaderSpinner } from '@/shared/ui/loading/PageLoader.css.ts';

import type { MemberRequestItem } from '@/entities/crew/model/crew.types';
import type { MemberItem } from '@/entities/user/model';

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
    refetch: refetchMembers,
  } = useInfiniteQuery({
    ...memberQueries.crewMembersQuery(crewId),
    enabled: crewId > 0 && activeTab === 'member',
  });

  const { scrollRef: infiniteScrollRef, bottomSentinelRef } = useInfiniteScroll(
    {
      hasNextPage: hasNextPage ?? false,
      isFetchingNextPage,
      fetchNextPage,
    }
  );

  const members: MemberItem[] =
    membersData?.pages.flatMap((page) =>
      page.ok
        ? page.data.result.content.map((member) => ({
            id: member.id!,
            memberId: member.memberId!,
            nickname: member.nickname!,
            profileImageUrl: member.profileImageUrl!,
            role: member.role!,
            joinedDate: member.joinedDate!,
          }))
        : []
    ) ?? [];

  const totalCount =
    membersData?.pages[0]?.ok === true
      ? membersData.pages[0].data.result.totalCount
      : undefined;

  const { data: joinRequestsData, refetch: refetchRequests } = useQuery({
    ...memberQueries.joinRequestsQuery(crewId),
    enabled: crewId > 0,
  });

  const requests = joinRequestsData?.ok
    ? (joinRequestsData.data.result ?? [])
    : [];

  const {
    scrollRef: pullToRefreshScrollRef,
    isRefreshing: isPullRefreshing,
    pullProgress,
  } = usePullToRefresh({
    enabled: crewId > 0,
    onRefresh: async () => {
      if (crewId <= 0) return;

      if (activeTab === 'member') {
        await refetchMembers();
      } else {
        await refetchRequests();
      }
    },
  });

  const setMainContainerRef = useCallback(
    (el: HTMLDivElement | null) => {
      pullToRefreshScrollRef.current = el;
      infiniteScrollRef.current = activeTab === 'member' ? el : null;
    },
    [activeTab, infiniteScrollRef, pullToRefreshScrollRef]
  );

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...memberQueries.deleteCrewMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueries.crewMembersKey(crewId),
      });
    },
  });

  if (isLoading || !myInfoData?.ok) {
    return <></>;
  }

  const isLeader = myInfo?.crewMemberRole === MEMBER_ROLE.LEADER;

  const handleDeleteMember = isLeader
    ? (targetMemberId: number) =>
        deleteMutation.mutate({ crewId, targetMemberId })
    : undefined;

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
        <div className={styles.mainContainer} ref={setMainContainerRef}>
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
          {activeTab === 'request' ? (
            <RequestListView crewId={crewId} requests={requests} />
          ) : (
            <MemberListView
              members={members}
              totalCount={totalCount}
              onDeleteMember={handleDeleteMember}
              isDeletingMemberId={
                deleteMutation.isPending
                  ? deleteMutation.variables?.targetMemberId
                  : undefined
              }
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
  onDeleteMember,
  isDeletingMemberId,
  bottomSentinelRef,
}: {
  members: MemberItem[];
  totalCount: number | undefined;
  onDeleteMember?: (memberId: number) => void;
  isDeletingMemberId?: number;
  bottomSentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <p className={styles.totalCount}>총 {totalCount ?? members.length}명</p>
      <MemberList
        members={members}
        onDeleteMember={onDeleteMember}
        isDeletingMemberId={isDeletingMemberId}
      />
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
