import { AppScreen } from '@stackflow/plugin-basic-ui';
import Markdown from 'react-markdown';
import { Header } from '@azit/design-system/header';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { useActivityParams } from '@stackflow/react';
import * as styles from '../styles/TermDetailPage.css';
import {
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
  THIRD_PARTY_INFO_AGREEMENT,
} from '@/shared/constants/term';

const TERM_CONTENT_MAP: Record<string, { title: string; content: string }> = {
  'terms-of-service': {
    title: '서비스 이용약관',
    content: TERMS_OF_SERVICE,
  },
  'privacy-policy': {
    title: '개인정보 처리방침',
    content: PRIVACY_POLICY,
  },
  'third-party-info-agreement': {
    title: '제3자 정보제공 동의',
    content: THIRD_PARTY_INFO_AGREEMENT,
  },
};

export function TermDetailPage() {
  const { termType } = useActivityParams<{ termType: string }>();

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            color="sub"
            sticky
            left={<BackButton />}
            center={TERM_CONTENT_MAP[termType].title}
          />
        </div>
        <div className={styles.markdownContainer}>
          <Markdown>{TERM_CONTENT_MAP[termType].content}</Markdown>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
