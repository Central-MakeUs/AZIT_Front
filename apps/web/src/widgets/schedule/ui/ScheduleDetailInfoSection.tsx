import {
  CalendarIcon,
  ClockIcon,
  MarkerPinIcon,
} from '@azit/design-system/icon';

import * as styles from '@/widgets/schedule/styles/ScheduleDetailInfoSection.css';
import { StaticMap } from '@/widgets/schedule/ui/StaticMap';

interface ScheduleDetailInfoSectionProps {
  date: string;
  time: string;
  locationName: string;
  detailedLocation: string;
  address: string;
  latitude: number;
  longitude: number;
}

export function ScheduleDetailInfoSection({
  date,
  time,
  locationName,
  detailedLocation,
  address,
  latitude,
  longitude,
}: ScheduleDetailInfoSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.dateTimeRow}>
        <div className={styles.infoItem}>
          <div className={styles.iconWrapper}>
            <CalendarIcon size={20} color="inherit" />
          </div>
          <span className={styles.infoText}>{date}</span>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.iconWrapper}>
            <ClockIcon size={20} color="inherit" />
          </div>
          <span className={styles.infoText}>{time}</span>
        </div>
      </div>
      <div className={styles.locationBlock}>
        <div className={styles.locationRow}>
          <div className={styles.iconWrapper}>
            <MarkerPinIcon size={20} color="inherit" />
          </div>
          <div className={styles.locationTexts}>
            <span
              className={styles.locationName}
            >{`${locationName} ${detailedLocation}`}</span>
            <span className={styles.address}>{address}</span>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <StaticMap
            address={address}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </div>
    </div>
  );
}
