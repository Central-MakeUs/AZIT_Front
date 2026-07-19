import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import {
  AppleIcon,
  BoatIcon,
  BreadIcon,
  ForkIcon,
  MandarinIcon,
  PlaneIcon,
  PotatoIcon,
  SeoulIcon,
} from '@azit/design-system/icon';
import clsx from 'clsx';
import type { ComponentType } from 'react';
import { useState } from 'react';

import * as styles from '@/features/Onboarding/styles/OnboardingCrewRegion.css';

import { REGION_OPTIONS, type RegionIdType } from '@/shared/constants/region';
import { BackButton } from '@/shared/ui/button';

export interface OnboardingCrewRegionProps {
  defaultValue?: string;
  isLoading?: boolean;
  onNext: (selectedRegion: string) => void;
  onPrev: () => void;
}

const REGION_ICON_MAP: Record<
  RegionIdType,
  ComponentType<{ size?: number }>
> = {
  SEOUL: SeoulIcon,
  GYEONGGI_INCHEON: PlaneIcon,
  CHUNGCHEONG_DAEJEON: BreadIcon,
  JEOLLA_GWANGJU: ForkIcon,
  GYEONGBUK_DAEGU: AppleIcon,
  GYEONGNAM_BUSAN: BoatIcon,
  GANGWON: PotatoIcon,
  JEJU: MandarinIcon,
};

export function OnboardingCrewRegion({
  defaultValue,
  isLoading = false,
  onNext,
  onPrev,
}: OnboardingCrewRegionProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionIdType | null>(
    (defaultValue as RegionIdType) ?? null
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <Header left={<BackButton onClick={onPrev} />} />
      </div>
      <div className={styles.stepContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>지역을 선택해요</h1>
          <p className={styles.subtitle}>크루의 주 활동 지역을 알려주세요</p>
        </div>

        <div className={styles.regionGrid}>
          {REGION_OPTIONS.map(({ id, label }) => {
            const Icon = REGION_ICON_MAP[id];
            return (
              <button
                key={id}
                type="button"
                className={clsx(
                  styles.regionCard,
                  selectedRegion === id && styles.regionCardSelected
                )}
                onClick={() => setSelectedRegion(id)}
              >
                <Icon size={32} />
                <span className={styles.regionLabel}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          state={selectedRegion && !isLoading ? 'active' : 'disabled'}
          onClick={() => {
            if (selectedRegion) {
              onNext(selectedRegion);
            }
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
