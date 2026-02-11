import { useState } from 'react';
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
import * as styles from '../styles/MemberManagementPage.css';

export function MemberManagementPage() {
  const [activeTab, setActiveTab] = useState<'member' | 'request'>('member');
  const members = mockMemberList;
  const memberCount = members.length;
  const requests = mockMemberRequestList;
  const requestCount = requests.length;

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="멤버 관리" />
          <MemberManagementTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            requestCount={mockMemberRequestCount}
          />
        </div>
        <div className={styles.mainContainer}>
          <div>
            {activeTab === 'member' && (
              <>
                <p className={styles.totalCount}>총 {memberCount}명</p>
                <MemberList members={members} />
              </>
            )}
            {activeTab === 'request' &&
              (requestCount > 0 ? (
                <RequestList requests={requests} />
              ) : (
                <RequestListEmpty />
              ))}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
