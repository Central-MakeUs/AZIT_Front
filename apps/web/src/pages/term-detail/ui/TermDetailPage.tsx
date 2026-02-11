import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { useActivityParams } from '@stackflow/react';
import * as styles from '../styles/TermDetailPage.css';

const TERM_TITLES: Record<string, string> = {
  'terms-of-service': '서비스 이용약관',
  'privacy-policy': '개인정보 처리방침',
  'location-service-terms': '위치 기반 서비스 이용약관',
  'third-party-info-agreement': '제 3자 정보제공 동의 내역',
};

export function TermDetailPage() {
  const { termType } = useActivityParams<{ termType: string }>();
  const title = termType ? TERM_TITLES[termType] || '약관' : '약관';

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header color="sub" sticky left={<BackButton />} center={title} />
        </div>
        <div className={styles.mainContainer}>{/* TODO: 약관 내용 표시 */}</div>
      </AppLayout>
    </AppScreen>
  );
}
