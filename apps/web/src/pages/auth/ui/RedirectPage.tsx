import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { useKakaoCode } from '@/features/auth/model/useKakaoCode';

import * as styles from '../styles/LoginPage.css';

export function RedirectPage() {
  const { isLoading, error, invalidAccess } = useKakaoCode();
  const { replace } = useFlow();

  const handleRetry = () => {
    replace('LoginPage', {});
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>AZIT</h2>
          <p className={styles.description}>로그인 중입니다...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>AZIT</h2>
          <p className={styles.description}>로그인에 실패했습니다</p>
          <Button onClick={handleRetry}>다시 시도</Button>
        </div>
      );
    }

    if (invalidAccess) {
      return (
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>AZIT</h2>
          <p className={styles.description}>잘못된 접근입니다</p>
        </div>
      );
    }

    return null;
  };

  return (
    <AppScreen
      backgroundImage={`linear-gradient(180deg, ${vars.colors.blue90} 0%, #000b1d 100%)`}
    >
      <section className={styles.loginContainer}>{renderContent()}</section>
    </AppScreen>
  );
}
