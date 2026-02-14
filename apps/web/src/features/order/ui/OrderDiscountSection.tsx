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
  const [pointsToUse, setPointsToUse] = useState(usedPoints);

  useEffect(() => {
    if (onPointsChange !== undefined) {
      setPointsToUse(usedPoints);
    }
  }, [usedPoints]);

  const handlePointsChange = (value: number) => {
    setPointsToUse(value);
    onPointsChange?.(value);
  };

  const handleUseAllPoints = () => {
    if (availablePoints >= 1000) {
      setPointsToUse(availablePoints);
      onPointsChange?.(availablePoints);
    }
  };

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
          <div className={styles.pointsInputContainer}>
            <input
              type="number"
              className={styles.pointsInput}
              value={pointsToUse || ''}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              placeholder="0"
            />
            <p className={styles.pointsUnit}>P</p>
          </div>
          <button
            type="button"
            className={styles.useAllButton}
            onClick={handleUseAllPoints}
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
