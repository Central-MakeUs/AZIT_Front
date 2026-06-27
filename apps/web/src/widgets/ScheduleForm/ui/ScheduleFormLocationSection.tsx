import { MapIcon, MarkerPinIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/ScheduleForm/ui/AccordionItem';

export interface ScheduleFormLocationSectionProps {
  locationName: string;
  detailedLocation: string;
  isLocationFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onMapSearchClick?: () => void;
}

export const ScheduleFormLocationSection = memo(
  function ScheduleFormLocationSection({
    locationName,
    detailedLocation,
    isLocationFilled,
    open,
    onToggle,
    onMapSearchClick,
  }: ScheduleFormLocationSectionProps) {
    return (
      <AccordionItem
        icon={<MarkerPinIcon size={20} color="default" />}
        label="집합 장소"
        filled={isLocationFilled}
        open={open}
        onToggle={onToggle}
      >
        <div id="schedule-location" className={styles.fakeInputContainer}>
          <div>
            <MarkerPinIcon size={20} color="inherit" />
          </div>
          <div
            className={
              locationName ? styles.fakeInputText : styles.fakeInputPlaceholder
            }
          >
            {locationName && detailedLocation
              ? `${locationName} ${detailedLocation}`
              : '장소를 지정해주세요'}
          </div>
        </div>
        <button
          type="button"
          className={styles.mapSearchButton}
          onClick={onMapSearchClick}
        >
          <MapIcon size={20} color="primary" aria-hidden />
          지도에서 찾기
        </button>
      </AccordionItem>
    );
  }
);
