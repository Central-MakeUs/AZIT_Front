import { Button, Header } from '@azit/design-system';
import clsx from 'clsx';
import { REGION_OPTIONS, type RegionIdType } from '@/shared/constants/region';
import * as styles from '../styles/OnboardingCrewRegion.css';
import { BackButton } from '@/shared/ui/button';
import { useState } from 'react';

export interface OnboardingCrewRegionProps {
  defaultValue?: string;
  onNext: (selectedRegion: string) => void;
  onPrev: () => void;
}

export function OnboardingCrewRegion({
  defaultValue,
  onNext,
  onPrev,
}: OnboardingCrewRegionProps) {
  const [selectedRegion, setSelectedRegion] = useState(defaultValue ?? null);

  const handleRegionSelect = (region: RegionIdType) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <Header sticky left={<BackButton onClick={onPrev} />} />
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>지역을 선택해요</h1>
          <p className={styles.subtitle}>크루의 주 활동 지역을 알려주세요</p>
        </div>

        <div className={styles.regionGrid}>
          {REGION_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={clsx(
                styles.regionCard,
                selectedRegion === id && styles.regionCardSelected
              )}
              onClick={() => handleRegionSelect(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={selectedRegion ? 'active' : 'disabled'}
          disabled={!selectedRegion}
          onClick={() => {
            if (!selectedRegion) return;
            onNext(selectedRegion);
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
