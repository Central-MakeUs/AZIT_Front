import { vars } from '@azit/design-system';
import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import { getSettingsMenu } from '@/pages/settings/config/menu';
import * as styles from '@/pages/settings/styles/SettingsPage.css';

import * as menuSectionStyles from '@/widgets/settings/styles/MenuSection.css';
import { MenuItem, MenuSection } from '@/widgets/settings/ui';

import { useWithdraw } from '@/features/auth/model';

import { memberQueries } from '@/shared/queries/member';
import { useAuthStore } from '@/shared/store/auth';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: '카카오 연동',
  APPLE: '애플 연동',
};

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '1.0.0';

export function SettingsPage() {
  const { logout } = useAuthStore();
  const { handleWithdraw } = useWithdraw();
  const { data: providers } = useQuery(memberQueries.myProvidersQuery());

  const loginProvider =
    providers?.map((p) => PROVIDER_LABEL[p] ?? p).join(', ') ?? '-';

  const menu = getSettingsMenu({
    loginProvider,
    appVersion: `최신 버전(${APP_VERSION})`,
    onLogout: logout,
  });

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="설정" color="sub" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.menuSectionWrapper}>
            {menu.map((section) => {
              if (section.id !== 'etc') {
                return <MenuSection key={section.id} section={section} />;
              }

              return (
                <section
                  key={section.id}
                  className={menuSectionStyles.container}
                >
                  <h2 className={menuSectionStyles.title}>{section.title}</h2>
                  <div className={menuSectionStyles.list}>
                    {section.items.map((item) => (
                      <Fragment key={item.id}>
                        <MenuItem
                          item={item}
                          onClick={() => {
                            if (item.type === 'action') item.onAction();
                          }}
                        />
                        <div
                          className={menuSectionStyles.listItemDivider}
                          aria-hidden
                        />
                      </Fragment>
                    ))}
                    <AlertDialog
                      trigger={
                        <MenuItem
                          item={{
                            id: 'withdraw',
                            label: '탈퇴하기',
                            type: 'action',
                            onAction: () => {},
                          }}
                        />
                      }
                      title="정말로 탈퇴하시겠습니까?"
                      description="탈퇴 후 30일이 지나면 계정 복구가 불가능해요"
                      actionText="탈퇴하기"
                      cancelText="취소하기"
                      onAction={handleWithdraw}
                    />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
