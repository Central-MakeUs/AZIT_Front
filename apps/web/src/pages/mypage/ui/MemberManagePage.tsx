import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';

import * as styles from '@/pages/mypage/styles/MemberManagePage.css';

import {
  MemberList,
  MemberManagementTab,
  RequestListEmpty,
} from '@/widgets/mypage/ui';

import { RequestList } from '@/features/crew-join-approval/ui';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

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

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    ...memberQueries.deleteCrewMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueries.crewMembersKey(crewId),
      });
    },
  });

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
