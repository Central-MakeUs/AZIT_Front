import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { SettingsIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { useMypageMenu } from '@/pages/mypage/model/useMypageMenu';
import * as styles from '@/pages/mypage/styles/MyPage.css';

import { MyCrewInfoSection, MyProfileSection } from '@/widgets/mypage/ui';

import { memberQueries } from '@/shared/queries';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { MenuSection } from '@/shared/ui/menu';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

function MyPageContent() {
  const { push } = useFlow();

  const { data: myInfoData } = useSuspenseQuery(memberQueries.myInfoQuery());
  const { data: myCrewsData } = useSuspenseQuery(memberQueries.myCrewsQuery());

  const myInfo = myInfoData?.result;
  const crews = myCrewsData ?? [];

  const filteredMenu = useMypageMenu();

  const navigateToMyProfileEditPage = () => {
    push('MyProfileEditPage', {});
  };

  const handleNavigateToCrew = (crewId: number) => {
    push('CrewPage', { id: crewId }, { animate: true });
  };

  const handleCreateNewCrew = () => {
    push('OnboardingPage', { isExtra: 'true' }, { animate: true });
  };

  return (
    <div className={styles.mainContainer}>
      {myInfo && (
        <MyProfileSection
          profile={myInfo}
          navigateToMyProfileEditPage={navigateToMyProfileEditPage}
        />
      )}
      <MyCrewInfoSection
        crews={crews}
        onNavigateToCrew={handleNavigateToCrew}
        onCreateNewCrew={handleCreateNewCrew}
      />
      {filteredMenu.map((section) => (
        <MenuSection key={section.id} section={section} />
      ))}
    </div>
  );
}

export function MyPage() {
  const { push } = useFlow();

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
        <AsyncBoundary suspenseFallback={<PageLoader />}>
          <MyPageContent />
        </AsyncBoundary>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
