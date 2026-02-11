import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import {
  mockMemberList,
  mockMemberRequestCount,
  mockMemberRequestList,
} from '@/shared/mock/member-management';
import { memberQueries } from '@/shared/api/queries';
import { MEMBER_ROLE } from '@/features/my/model/role';
import * as styles from '../styles/MemberManagementPage.css';

export function MemberManagementPage() {
  const [activeTab, setActiveTab] = useState<'member' | 'request'>('member');

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());

  if (isLoading || !myInfoData?.ok) {
    return <></>;
  }

  const myInfo = myInfoData.data.result;
  const isLeader = myInfo.crewMemberRole === MEMBER_ROLE.LEADER;
  const members = mockMemberList;
  const memberCount = members.length;
  const requests = mockMemberRequestList;
  const requestCount = requests.length;

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={<BackButton />}
            center={isLeader ? '멤버 관리' : '멤버 목록'}
          />
          {isLeader && (
            <MemberManagementTab
              activeTab={activeTab}
              onTabChange={setActiveTab}
              requestCount={mockMemberRequestCount}
            />
          )}
        </div>
        <div className={styles.mainContainer}>
          <div>
            {isLeader ? (
              <>
                {activeTab === 'member' && (
                  <>
                    <p className={styles.totalCount}>총 {memberCount}명</p>
                    <MemberList members={members} canRemoveMember={isLeader} />
                  </>
                )}
                {activeTab === 'request' &&
                  (requestCount > 0 ? (
                    <RequestList requests={requests} />
                  ) : (
                    <RequestListEmpty />
                  ))}
              </>
            ) : (
              <>
                <p className={styles.totalCount}>총 {memberCount}명</p>
                <MemberList members={members} canRemoveMember={isLeader} />
              </>
            )}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
