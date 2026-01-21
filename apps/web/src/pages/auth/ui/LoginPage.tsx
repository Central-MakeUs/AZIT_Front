import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, vars } from '@azit/design-system';
import * as styles from '../styles/LoginPage.css';
import { useSocialLogin } from '../hooks/useSocialLogin';
import type { AuthProvider } from '@/shared/api/models';
import { AUTH_PROVIDER } from '@/shared/constants/auth';

export function LoginPage() {
  const { loginWith } = useSocialLogin();

  const handleLogin = async (provider: AuthProvider) => {
    await loginWith(provider);
  };

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
          <KakaoLogin onClick={() => handleLogin(AUTH_PROVIDER.KAKAO)} />
          <AppleLogin onClick={() => handleLogin(AUTH_PROVIDER.APPLE)} />
        </div>
      </section>
    </AppScreen>
  );
}

function KakaoLogin({ onClick }: { onClick: () => void }) {
  return (
    <Button state="kakao" onClick={onClick}>
      <div className={styles.textWrapper}>
        <img
          className={styles.kakaoIcon}
          src="/icons/icon-kakao.svg"
          alt="kakao"
        />
        카카오로 로그인
      </div>
    </Button>
  );
}

function AppleLogin({ onClick }: { onClick: () => void }) {
  // TODO: 웹에서 테스트를 위한 주석 처리, 복구 필요 (Issue #29)
  // const ua = navigator.userAgent;

  // if (!/iPhone|iPad|iPod/.test(ua)) {
  //   return null;
  // }

  return (
    <Button state="apple" onClick={onClick}>
      <div className={styles.textWrapper}>
        <img src="/icons/icon-apple.svg" alt="apple" />
        <span>애플로 로그인</span>
      </div>
    </Button>
  );
}
