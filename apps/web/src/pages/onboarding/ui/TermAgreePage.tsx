import { useState, useMemo } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useFlow } from '@/app/routes/stackflow';
import { postTermAgree } from '@/features/onboarding/api/postTermAgree';
import { TermAgreeItem } from '@/features/onboarding/ui';
import { Button, Checkbox, Divider } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/TermAgreePage.css';

type TermsState = {
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  locationServiceAgreed: boolean;
  thirdPartyInfoAgreed: boolean;
  marketingTermsAgreed: boolean;
  notificationTermsAgreed: boolean;
};

const TERM_LIST = [
  {
    id: 'serviceTermsAgreed',
    label: '서비스 이용약관',
    required: true,
  },
  {
    id: 'privacyPolicyAgreed',
    label: '개인정보 처리방침',
    required: true,
  },
  {
    id: 'locationServiceAgreed',
    label: '위치 기반 서비스 이용약관',
    required: true,
  },
  {
    id: 'thirdPartyInfoAgreed',
    label: '제 3자 정보제공 동의',
    required: true,
  },
  {
    id: 'marketingTermsAgreed',
    label: '마케팅 정보 수신 동의',
    required: false,
  },
  {
    id: 'notificationTermsAgreed',
    label: '알림 수신 동의',
    required: false,
  },
] as const;

export function TermAgreePage() {
  const { replace } = useFlow();
  const [terms, setTerms] = useState<TermsState>(
    () =>
      Object.fromEntries(
        TERM_LIST.map((term) => [term.id, false])
      ) as TermsState
  );

  const isAllChecked = useMemo(() => {
    return Object.values(terms).every((value) => value === true);
  }, [terms]);

  const isRequiredChecked = useMemo(() => {
    return TERM_LIST.filter((term) => term.required).every(
      (term) => terms[term.id] === true
    );
  }, [terms]);

  const handleAllAgreeChange = (checked: boolean) => {
    setTerms(
      Object.fromEntries(
        TERM_LIST.map((term) => [term.id, checked])
      ) as TermsState
    );
  };

  const handleTermChange = (id: keyof TermsState, checked: boolean) => {
    setTerms((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleTermAgree = async () => {
    try {
      await postTermAgree(terms);
      replace('OnboardingPage', {}, { animate: false });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailClick = (id: string) => {
    // TODO: 약관 상세 페이지로 이동
    console.log('클릭한 약관 상세:', id);
  };

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.pageContainer}>
          <div className={styles.headerSection}>
            <h1 className={styles.title}>AZIT에 오신 걸 환영해요!</h1>
            <p className={styles.subtitle}>
              서비스 이용을 위해 약관 동의가 필요해요
            </p>
          </div>
          <div className={styles.termsSection}>
            <div className={styles.allAgreeItem}>
              <Checkbox
                id="all-agree"
                checked={isAllChecked}
                onCheckedChange={(checked) =>
                  handleAllAgreeChange(checked === true)
                }
              />
              <label htmlFor="all-agree" className={styles.allAgreeLabel}>
                전체 동의
              </label>
            </div>
            <Divider />
            <div className={styles.termsList}>
              {TERM_LIST.map((term) => (
                <TermAgreeItem
                  key={term.id}
                  id={term.id}
                  label={term.label}
                  required={term.required}
                  checked={terms[term.id]}
                  onCheckedChange={(checked) =>
                    handleTermChange(term.id, checked)
                  }
                  onDetailClick={() => handleDetailClick(term.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <Button
            state={isRequiredChecked ? 'active' : 'disabled'}
            disabled={!isRequiredChecked}
            onClick={handleTermAgree}
          >
            다음
          </Button>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
