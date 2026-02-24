import { Button } from '@azit/design-system/button';
import { useState } from 'react';

import * as styles from '@/widgets/schedule/styles/MeetingSpotPicker.css';

import { NaverMap, type LatLng } from '@/shared/ui/naver-map/NaverMap';

interface MeetingSpotPickerProps {
  initialCoords: LatLng;
  onOpenLocationNameSheet: () => void;
}

export function MeetingSpotPicker({
  initialCoords,
  onOpenLocationNameSheet,
}: MeetingSpotPickerProps) {
  const [coordsState, setCoordsState] = useState<LatLng | null>(null);
  const coords = coordsState ?? initialCoords;

  const handleChangePosition = (pos: LatLng) => {
    setCoordsState(pos);
  };
  return (
    <div className={styles.mapContainer}>
      <p className={styles.mapDescription}>
        {`지도를 움직여\n집합 장소를 지정해주세요`}
      </p>
      <NaverMap center={coords} onChangePosition={handleChangePosition} />
      <div className={styles.footerWrapper}>
        <Button size="large" state="active" onClick={onOpenLocationNameSheet}>
          장소명 입력하기
        </Button>
      </div>
    </div>
  );
}
