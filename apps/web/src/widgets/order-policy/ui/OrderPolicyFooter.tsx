import { useFlow } from '@/app/routes/stackflow';

import * as styles from '../styles/OrderPolicyFooter.css';

export default function OrderPolicyFooter() {
  const { push } = useFlow();

  return (
    <footer className={styles.orderPolicyFooter}>
      <p className={styles.orderPolicyFooterText}>
        © 2026 AZIT All rights reserved.
      </p>
      <div className={styles.orderPolicyFooterText}>
        <p>AZIT (아지트)</p>
        <p>대표: 성수립 | 이메일: azitcrewbusiness@gmail.com</p>
        <p>주소: 경기 시흥시 능곡중앙로 33</p>
        <p>고객문의: 카카오톡 채널 &apos;아지트플랫폼&apos;</p>
      </div>
      <div className={styles.orderPolicyFooterLinks}>
        <button
          type="button"
          className={styles.orderPolicyFooterLink}
          onClick={() => push('TermDetailPage', { termType: 'privacy-policy' })}
        >
          개인정보처리방침
        </button>
        <span className={styles.orderPolicyFooterDivider}>|</span>
        <button
          type="button"
          className={styles.orderPolicyFooterLink}
          onClick={() =>
            push('TermDetailPage', { termType: 'terms-of-service' })
          }
        >
          서비스 이용약관
        </button>
        <span className={styles.orderPolicyFooterDivider}>|</span>
        <button
          type="button"
          className={styles.orderPolicyFooterLink}
          onClick={() =>
            push('TermDetailPage', {
              termType: 'third-party-info-agreement',
            })
          }
        >
          제3자 정보제공 동의 내역
        </button>
      </div>
    </footer>
  );
}
