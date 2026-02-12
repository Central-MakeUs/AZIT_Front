import { useState } from 'react';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { Input } from '@azit/design-system/input';
import * as styles from '../styles/OnboardingCrewJoin.css';
import { BackButton } from '@/shared/ui/button';
import { BottomSheet } from '@/shared/ui/bottom-sheet/BottomSheet';
import { OnboardingCrewJoinBottomSheetContent } from './OnboardingCrewJoinBottomSheetContent';
import { getCrewInfo } from '../api/getCrewInfo';
import type { CrewInfoResult } from '@/shared/api/models';

export interface OnboardingCrewJoinProps {
  defaultValue?: string;
  onNext: (inviteCode: string, crewId: number) => void;
  onPrev: () => void;
}

const INVITE_CODE_LENGTH = 6;

export function OnboardingCrewJoin({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingCrewJoinProps) {
  const [hasValidationError, setHasValidationError] = useState(false);
  const [inviteCode, setInviteCode] = useState(defaultValue ?? '');
  const [crewInfo, setCrewInfo] = useState<CrewInfoResult | null>(null);
  const isActive = inviteCode.length === INVITE_CODE_LENGTH;

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasValidationError) {
      setHasValidationError(false);
    }
    setInviteCode(e.target.value.slice(0, INVITE_CODE_LENGTH));
  };

  const handleSubmit = async () => {
    const response = await getCrewInfo(inviteCode);

    if (!response.ok) {
      if (response.status === 404) {
        setHasValidationError(true);
      }
      return;
    }

    setCrewInfo(response.data.result);
    setIsBottomSheetOpen(true);
  };

  return (
    <>
      <Header sticky left={<BackButton onClick={onPrev} />} />
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>초대 코드 입력하기</h1>
          <p className={styles.subtitle}>
            크루의 초대 코드 6자리를 입력해주세요
          </p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.inputField}
            state={hasValidationError ? 'error' : 'default'}
            value={inviteCode}
            onChange={handleInviteCodeChange}
            placeholder="초대 코드 6자리"
          />
          {hasValidationError && (
            <p className={styles.errorMessage}>유효하지 않은 코드에요</p>
          )}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          state={isActive ? 'active' : 'disabled'}
          disabled={!isActive}
          onClick={handleSubmit}
        >
          다음
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onOutsideClick={() => setIsBottomSheetOpen(false)}
      >
        {crewInfo && (
          <OnboardingCrewJoinBottomSheetContent
            onClose={() => setIsBottomSheetOpen(false)}
            onRequestJoin={() => {
              onNext(inviteCode, crewInfo.crewId);
            }}
            crewInfo={crewInfo}
          />
        )}
      </BottomSheet>
    </>
  );
}
