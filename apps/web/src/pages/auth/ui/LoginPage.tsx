import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useSocialLogin } from '@/pages/auth/hooks/useSocialLogin';
import * as styles from '@/pages/auth/styles/LoginPage.css';

import { useKakaoSDK } from '@/features/auth/model';

import type { AuthProvider } from '@/shared/api/models/auth';
import { AUTH_PROVIDER } from '@/shared/constants/auth';
import { isWebView } from '@/shared/lib/env';

export function LoginPage() {
  const { loginWith } = useSocialLogin();
  const { isLoaded: isKakaoReady } = useKakaoSDK();

  const handleLogin = async (provider: AuthProvider) => {
    await loginWith(provider);
  };

  return (
    <AppScreen
      backgroundImage={`linear-gradient(180deg, ${vars.colors.blue90} 0%, #000b1d 100%)`}
    >
      <section className={styles.loginContainer}>
        <div className={styles.logoWrapper}>
          <img
            src="/icons/icon-splash-logo.png"
            alt="AZIT"
            className={styles.logoImage}
          />
        </div>
        <img
          src="/icons/icon-splash-symbol.svg"
          alt="login-image"
          className={styles.loginImage}
        />
        <div className={styles.buttonWrapper}>
          <KakaoLogin
            onClick={() => handleLogin(AUTH_PROVIDER.KAKAO)}
            disabled={!isWebView() && !isKakaoReady}
          />
          <AppleLogin onClick={() => handleLogin(AUTH_PROVIDER.APPLE)} />
        </div>
      </section>
    </AppScreen>
  );
}

function KakaoLogin({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button state="kakao" onClick={onClick} disabled={disabled}>
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

  // WebView: 네이티브 SDK 사용 → iOS 기기에서만 노출
  // 웹 브라우저: Apple OAuth 리다이렉트 사용 → 항상 노출
  if (isWebView() && !/iPhone|iPad|iPod/.test(ua)) {
    return null;
  }

  return (
    <Button state="apple" onClick={onClick}>
      <div className={styles.textWrapper}>
        <img src="/icons/icon-apple.svg" alt="apple" />
        <span>Apple로 로그인</span>
      </div>
    </Button>
  );
}
