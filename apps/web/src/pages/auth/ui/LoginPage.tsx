import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, vars } from '@azit/design-system';
import * as styles from '../styles/loginPage.css';
import { useFlow } from '@/app/routes/stackflow';

export function LoginPage() {
  const { replace } = useFlow();

  const handleLogin = () => {
    localStorage.setItem('accessToken', '1234567890');
    replace('HomePage', {}, { animate: false });
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
          <KakaoLogin onClick={handleLogin} />
          <AppleLogin onClick={handleLogin} />
        </div>
      </section>
    </AppScreen>
  );
}

function KakaoLogin({ onClick }: { onClick: () => void }) {
  return (
    <Button color="kakao" onClick={onClick}>
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
    <Button color="apple" onClick={onClick}>
      <div className={styles.textWrapper}>
        <img src="/icons/icon-apple.svg" alt="apple" />
        <span>애플로 로그인</span>
      </div>
    </Button>
  );
}
