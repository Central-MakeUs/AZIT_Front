import type { ScheduleItem } from '@/shared/mock/home';

import { ScheduleListItem } from './ScheduleListItem';
import * as styles from '../styles/ScheduleList.css';

interface ScheduleListProps {
  items: ScheduleItem[];
}

export function ScheduleList({ items }: ScheduleListProps) {
  return (
    <div className={styles.listContainer}>
      {items.map((item) => (
        <ScheduleListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
