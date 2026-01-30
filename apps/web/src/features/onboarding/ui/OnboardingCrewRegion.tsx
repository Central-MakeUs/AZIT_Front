import { useState } from 'react';
import { Button } from '@azit/design-system';
import clsx from 'clsx';
import { REGION, type RegionType } from '@/shared/constants/region';
import * as styles from '../styles/OnboardingCrewRegion.css';

export interface OnboardingCrewRegionProps {
  onNext: (region: RegionType) => void;
  onBack?: () => void;
}

interface RegionOption {
  id: RegionType;
  label: string;
}

const REGION_OPTIONS: RegionOption[] = [
  { id: REGION.SEOUL, label: '서울' },
  { id: REGION.GYEONGGI_INCHEON, label: '경기/인천' },
  { id: REGION.CHUNGCHEONG_DAEJEON, label: '충청/대전' },
  { id: REGION.JEOLLA_GWANGJU, label: '전라/광주' },
  { id: REGION.GYEONGBUK_DAEGU, label: '경북/대구' },
  { id: REGION.GYEONGNAM_BUSAN, label: '경남/부산' },
  { id: REGION.GANGWON, label: '강원' },
  { id: REGION.JEJU, label: '제주' },
];

export function OnboardingCrewRegion({ onNext }: OnboardingCrewRegionProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(null);

  const handleRegionSelect = (region: RegionType) => {
    setSelectedRegion(region);
  };

  const handleNext = () => {
    if (!selectedRegion) return;
    onNext(selectedRegion);
  };

  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>지역을 선택해요</h1>
          <p className={styles.subtitle}>크루의 주 활동 지역을 알려주세요</p>
        </div>

        <div className={styles.regionGrid}>
          {REGION_OPTIONS.map((region) => (
            <button
              key={region.id}
              type="button"
              className={clsx(
                styles.regionCard,
                selectedRegion === region.id && styles.regionCardSelected
              )}
              onClick={() => handleRegionSelect(region.id)}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={selectedRegion ? 'active' : 'disabled'}
          disabled={!selectedRegion}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </>
  );
}
