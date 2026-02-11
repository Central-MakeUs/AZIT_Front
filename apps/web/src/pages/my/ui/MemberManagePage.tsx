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
import { memberQueries } from '@/shared/api/queries';
import { MEMBER_ROLE } from '@/features/my/model/role';
import type { MemberItem, MemberRequestItem } from '@/features/my/model/types';
import * as styles from '../styles/MemberManagePage.css';

export function MemberManagePage({ params }: { params?: { id?: string } }) {
  const [activeTab, setActiveTab] = useState<'member' | 'request'>('member');

  const crewId = Number(params?.id) || 0;

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());
  const myInfo = myInfoData?.ok ? myInfoData.data.result : null;

  const { data: membersData } = useInfiniteQuery({
    ...memberQueries.crewMembersQuery(crewId),
    enabled: crewId > 0 && activeTab === 'member',
  });

  const members: MemberItem[] =
    membersData?.pages.flatMap((page) =>
      page.ok
        ? page.data.result.content.map((member) => ({
            id: member.id ?? 0,
            nickname: member.nickname ?? '',
            profileImageUrl: member.profileImageUrl ?? '',
            role: member.role ?? 'MEMBER',
            joinedDate: member.joinedDate ?? '',
          }))
        : []
    ) ?? [];

  const { data: joinRequestsData } = useQuery({
    ...memberQueries.joinRequestsQuery(crewId),
    enabled: crewId > 0 && activeTab === 'request',
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
        <div className={styles.mainContainer}>
          {activeTab === 'request' ? (
            <RequestListView requests={requests} />
          ) : (
            <MemberListView members={members} isLeader={isLeader} />
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}

function MemberListView({
  members,
  isLeader,
}: {
  members: MemberItem[];
  isLeader: boolean;
}) {
  return (
    <>
      <p className={styles.totalCount}>총 {members.length}명</p>
      <MemberList members={members} canRemoveMember={isLeader} />
    </>
  );
}

function RequestListView({ requests }: { requests: MemberRequestItem[] }) {
  return requests.length > 0 ? (
    <RequestList requests={requests} />
  ) : (
    <RequestListEmpty />
  );
}
