import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import * as styles from '../styles/LoginPage.css';
import { useSocialLogin } from '../hooks/useSocialLogin';
import type { AuthProvider } from '@/shared/api/models';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { useKakaoSDK } from '@/features/auth/model';

export function LoginPage() {
  useKakaoSDK();
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
          <p className={styles.description}>러닝 크루를 위한 제휴 서비스</p>
        </div>
        <img
          src="/icons/icon-splash-symbol.svg"
          alt="login-image"
          className={styles.loginImage}
        />
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
  const ua = navigator.userAgent;

  if (!/iPhone|iPad|iPod/.test(ua)) {
    return null;
  }

  return (
    <Button state="apple" onClick={onClick}>
      <div className={styles.textWrapper}>
        <img src="/icons/icon-apple.svg" alt="apple" />
        <span>애플로 로그인</span>
      </div>
    </Button>
  );
}
