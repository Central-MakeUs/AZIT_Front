import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { SettingsIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { useMypageMenu } from '@/pages/mypage/model/useMypageMenu';
import * as styles from '@/pages/mypage/styles/MyPage.css';

import { MyCrewInfoSection, MyProfileSection } from '@/widgets/mypage/ui';

import { WithdrawButton } from '@/features/auth/ui';

import { memberQueries } from '@/shared/queries';
import { useAuthStore } from '@/shared/store/auth';
import { AppLayout } from '@/shared/ui/layout';
import { MenuSection } from '@/shared/ui/menu';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

export function MyPage() {
  const { logout } = useAuthStore();
  const { push } = useFlow();

  const { data: myInfoData, isLoading } = useQuery(memberQueries.myInfoQuery());
  const { data: myCrewsData, isLoading: isCrewsLoading } = useQuery(
    memberQueries.myCrewsQuery()
  );

  const myInfo = myInfoData?.result;
  const crews = myCrewsData ?? [];

  const joinedCrew = crews.find((c) => c.memberStatus === 'JOINED') ?? null;
  const isLeader = joinedCrew?.memberRole === 'LEADER';
  const joinedCrewId = joinedCrew?.crewId ?? 0;

  const { data: membersData } = useInfiniteQuery({
    ...memberQueries.crewMembersQuery(joinedCrewId),
    enabled: isLeader && joinedCrewId > 0,
  });
  const memberCount = membersData?.pages[0]?.result?.totalCount ?? 0;
  const cannotWithdraw = isLeader && memberCount > 1;

  const filteredMenu = useMypageMenu();

  if (isLoading || isCrewsLoading || !myInfo) return null;

  const navigateToMyProfileEditPage = () => {
    push('MyProfileEditPage', {});
  };

  const handleNavigateToCrew = (crewId: number) => {
    push('CrewPage', { id: crewId }, { animate: true });
  };

  const handleCreateNewCrew = () => {
    push('OnboardingPage', {}, { animate: true });
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            center="마이페이지"
            right={
              <button
                type="button"
                onClick={() => push('SettingsPage', {})}
                aria-label="설정"
              >
                <SettingsIcon size={24} />
              </button>
            }
          />
        </div>
        <div className={styles.mainContainer}>
          <MyProfileSection
            profile={myInfo}
            navigateToMyProfileEditPage={navigateToMyProfileEditPage}
          />
          <MyCrewInfoSection
            crews={crews}
            onNavigateToCrew={handleNavigateToCrew}
            onCreateNewCrew={handleCreateNewCrew}
          />
          {filteredMenu.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
        </div>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
