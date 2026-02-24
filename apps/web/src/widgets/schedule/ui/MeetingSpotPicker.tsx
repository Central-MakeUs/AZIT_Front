import { Button } from '@azit/design-system/button';
import { useState } from 'react';

import * as styles from '@/widgets/schedule/styles/MeetingSpotPicker.css';

import { NaverMap, type LatLng } from '@/shared/ui/naver-map/NaverMap';

interface MeetingSpotPickerProps {
  onOpenLocationNameSheet: () => void;
}

export function MeetingSpotPicker({
  onOpenLocationNameSheet,
}: MeetingSpotPickerProps) {
  const [center, setCenter] = useState<LatLng>({
    lat: 37.52964580905185,
    lng: 126.93366366931356,
  });

  const handleChangePosition = (pos: LatLng) => {
    setCenter(pos);
  };
  return (
    <div className={styles.mapContainer}>
      <p className={styles.mapDescription}>
        {`지도를 움직여\n집합 장소를 지정해주세요`}
      </p>
      <NaverMap center={center} onChangePosition={handleChangePosition} />
      <div className={styles.footerWrapper}>
        <Button size="large" state="active" onClick={onOpenLocationNameSheet}>
          장소명 입력하기
        </Button>
      </div>
    </div>
  );
}
