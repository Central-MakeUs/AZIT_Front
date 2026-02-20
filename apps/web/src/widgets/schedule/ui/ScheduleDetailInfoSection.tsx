import {
  CalendarIcon,
  ClockIcon,
  MarkerPinIcon,
} from '@azit/design-system/icon';

import * as styles from '@/widgets/schedule/styles/ScheduleDetailInfoSection.css';
import { StaticMap } from '@/widgets/schedule/ui/StaticMap';

interface ScheduleDetailInfoSectionProps {
  date: string;
  dayOfWeek: string;
  time: string;
  locationName: string;
  address: string;
}

export function ScheduleDetailInfoSection({
  date,
  dayOfWeek,
  time,
  locationName,
  address,
}: ScheduleDetailInfoSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.dateTimeRow}>
        <div className={styles.infoItem}>
          <div className={styles.iconWrapper}>
            <CalendarIcon size={20} color="inherit" />
          </div>
          <span className={styles.infoText}>
            {date}({dayOfWeek})
          </span>
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
            <span className={styles.locationName}>{locationName}</span>
            <span className={styles.address}>{address}</span>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <StaticMap
            latitude={37.52964580905185}
            longitude={126.93366366931356}
          />
        </div>
      </div>
    </div>
  );
}
