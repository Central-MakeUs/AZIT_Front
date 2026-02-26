import { useState, useEffect } from 'react';

import * as styles from '@/features/order/styles/OrderDiscountSection.css';

interface OrderDiscountSectionProps {
  availablePoints: number;
  usedPoints?: number;
  onPointsChange?: (usedPoints: number) => void;
}

export function OrderDiscountSection({
  availablePoints,
  usedPoints = 0,
  onPointsChange,
}: OrderDiscountSectionProps) {
  const [inputValue, setInputValue] = useState(
    usedPoints ? String(usedPoints) : ''
  );

  useEffect(() => {
    if (onPointsChange !== undefined) {
      setInputValue(usedPoints ? String(usedPoints) : '');
    }
  }, [usedPoints, onPointsChange]);

  const commitPoints = (raw: number) => {
    if (isNaN(raw) || raw < 0) {
      setInputValue('');
      onPointsChange?.(0);
      return;
    }
    const inThousands = Math.floor(raw / 1000) * 1000;
    const clamped = Math.min(inThousands, availablePoints);
    setInputValue(clamped ? String(clamped) : '');
    onPointsChange?.(clamped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '');
    setInputValue(v);
  };

  const handleInputBlur = () => {
    commitPoints(Number(inputValue) || 0);
  };

  const handleUseAllPoints = () => {
    if (availablePoints >= 1000) {
      setInputValue(String(availablePoints));
      onPointsChange?.(availablePoints);
    }
  };

  const isPointsDisabled = availablePoints < 1000;

  return (
    <div className={styles.discountSection}>
      <p className={styles.title}>할인</p>
      <div className={styles.pointsContainer}>
        <div className={styles.pointsHeader}>
          <div className={styles.pointsTitle}>
            <p>AZIT</p>
            <p>포인트</p>
          </div>
          <div className={styles.availablePoints}>
            <div className={styles.availablePointsLabel}>
              <p>보유 포인트 :</p>
            </div>
            <div className={styles.availablePointsValue}>
              <p>{availablePoints.toLocaleString()}P</p>
            </div>
          </div>
        </div>
        <div className={styles.pointsInputSection}>
          <div
            className={
              isPointsDisabled
                ? styles.pointsInputContainerDisabled
                : styles.pointsInputContainer
            }
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={styles.pointsInput}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="0"
              disabled={isPointsDisabled}
              aria-disabled={isPointsDisabled}
            />
            <p className={styles.pointsUnit}>P</p>
          </div>
          <button
            type="button"
            className={
              isPointsDisabled
                ? styles.useAllButtonDisabled
                : styles.useAllButton
            }
            onClick={handleUseAllPoints}
            disabled={isPointsDisabled}
            aria-disabled={isPointsDisabled}
          >
            <p className={styles.useAllButtonText}>모두 사용</p>
          </button>
        </div>
        <p className={styles.pointsNotice}>
          포인트는 1,000P부터 사용할 수 있어요
        </p>
      </div>
    </div>
  );
}
