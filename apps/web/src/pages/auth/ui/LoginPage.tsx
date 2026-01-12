import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, vars } from '@azit/design-system';
import * as styles from '../styles/loginPage.css';

export function LoginPage() {
  return (
    <AppScreen
      backgroundImage={`linear-gradient(180deg, ${vars.colors.blue90} 0%, #000b1d 100%)`}
    >
      <section className={styles.loginContainer}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>AZIT</h2>
          <p className={styles.description}>
            러닝 크루를 위한 운영 & 제휴 서비스
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button color="kakao" onClick={() => {}}>
            카카오로 로그인
          </Button>
          <AppleLogin />
        </div>
      </section>
    </AppScreen>
  );
}

function AppleLogin() {
  const ua = navigator.userAgent;

  if (!/iPhone|iPad|iPod/.test(ua)) {
    return null;
  }

  return (
    <Button color="apple" onClick={() => {}}>
      애플로 로그인
    </Button>
  );
}
