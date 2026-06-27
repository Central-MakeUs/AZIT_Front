import { vars } from '@azit/design-system';
import { AlertDialog } from '@azit/design-system/alert-dialog';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';

import { getSettingsMenu } from '@/pages/settings/config/menu';
import * as styles from '@/pages/settings/styles/SettingsPage.css';

import { useWithdraw } from '@/features/auth/model';

import { BusinessError } from '@/shared/api/apiHandler';
import { bridge } from '@/shared/lib/bridge';
import { memberQueries } from '@/shared/queries/member';
import { useAuthStore } from '@/shared/store/auth';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { MenuItem, MenuSection, menuSectionStyles } from '@/shared/ui/menu';

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: '카카오 연동',
  APPLE: '애플 연동',
};

export function SettingsPage() {
  const { logout } = useAuthStore();
  const { handleWithdraw } = useWithdraw();
  const { data: providers } = useQuery(memberQueries.myProvidersQuery());
  const [appVersion, setAppVersion] = useState<string>('');
  const [showLeaderError, setShowLeaderError] = useState(false);

  const handleWithdrawWithErrorHandling = async () => {
    try {
      await handleWithdraw();
    } catch (error) {
      if (
        error instanceof BusinessError &&
        error.code === 'CANNOT_SERVICE_WITHDRAW_AS_LEADER'
      ) {
        setShowLeaderError(true);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    bridge
      .getAppVersion()
      .then(setAppVersion)
      .catch(() => {});
  }, []);

  const loginProvider =
    providers?.map((p) => PROVIDER_LABEL[p] ?? p).join(', ') ?? '-';

  const menu = getSettingsMenu({
    loginProvider,
    appVersion: appVersion ? `최신 버전(${appVersion})` : '',
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
                      onAction={handleWithdrawWithErrorHandling}
                    />
                    <AlertDialog
                      open={showLeaderError}
                      onOpenChange={setShowLeaderError}
                      title="탈퇴를 할 수 없습니다"
                      description="리더는 크루원이 존재하는 크루를 탈퇴할 수 없습니다"
                      actionText="확인"
                      singleButton
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
