import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { SettingsIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { userQueries } from '@/entities/User/api/queries';
import { MyCrewInfoSection, MyProfileSection } from '@/entities/User/ui';

import {
  GOOGLE_FORM_URL,
  KAKAO_INQUIRY_CHAT_URL,
} from '@/shared/constants/url';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import type { MenuGroup } from '@/shared/types/menu';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { PageErrorFallback } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { MenuSection } from '@/shared/ui/menu';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';

import * as styles from './index.css';

function useMypageMenu(): MenuGroup[] {
  const { push } = useFlow();

  return [
    {
      id: 'shopping',
      title: '쇼핑 관리',
      items: [
        {
          id: 'order-history',
          label: '주문 내역',
          type: 'navigation',
          onNavigate: () => push('OrderHistory', {}, { animate: true }),
        },
        {
          id: 'address',
          label: '배송지 설정',
          type: 'navigation',
          onNavigate: () => push('AddressSettingPage', {}, { animate: true }),
        },
        {
          id: 'inquiry',
          label: '1:1 문의하기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(KAKAO_INQUIRY_CHAT_URL),
        },
      ],
    },
    {
      id: 'customer-support',
      title: '고객 지원',
      items: [
        {
          id: 'notice',
          label: '공지사항',
          type: 'action',
          onAction: () => {},
        },
        {
          id: 'inquiry-support',
          label: '1:1 문의하기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(KAKAO_INQUIRY_CHAT_URL),
        },
        {
          id: 'feedback',
          label: '의견 남기기',
          type: 'navigation',
          onNavigate: () => openExternalUrl(GOOGLE_FORM_URL),
        },
        {
          id: 'policy',
          label: '약관 및 정책',
          type: 'navigation',
          onNavigate: () =>
            push(
              'SettingsTermDetailPage',
              { termType: 'terms-of-service' },
              { animate: true }
            ),
        },
      ],
    },
  ];
}

function MyPageContent() {
  const { push } = useFlow();

  const { data: myInfoData } = useSuspenseQuery(userQueries.myInfoQuery());
  const { data: myCrewsData } = useSuspenseQuery(userQueries.myCrewsQuery());

  const myInfo = myInfoData?.result;
  const crews = myCrewsData ?? [];

  const filteredMenu = useMypageMenu();

  const navigateToMyProfileEditPage = () => {
    push('UserProfileEditPage', {});
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

export function UserPage() {
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
        <AsyncBoundary
          suspenseFallback={<PageLoader />}
          errorFallback={<PageErrorFallback />}
        >
          <MyPageContent />
        </AsyncBoundary>
      </AppLayout>
      <BottomNavigation activeTab="mypage" />
    </AppScreen>
  );
}
