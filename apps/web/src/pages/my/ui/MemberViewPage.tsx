import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useInfiniteQuery } from '@tanstack/react-query';

import { MemberList } from '@/features/my/ui';

import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/MemberViewPage.css';

export function MemberViewPage({ params }: { params?: { id?: string } }) {
  const crewId = Number(params?.id) || 0;

  const { data: membersData, isLoading } = useInfiniteQuery({
    ...memberQueries.crewMembersQuery(crewId),
    enabled: crewId > 0,
  });

  const members =
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

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="멤버 목록" />
        </div>
        <div className={styles.mainContainer}>
          {members?.length === 0 || isLoading ? (
            <></>
          ) : (
            <>
              <p className={styles.totalCount}>총 {members.length}명</p>
              <MemberList members={members} />
            </>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
