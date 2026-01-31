import type { ActivityName } from '@/app/routes/types';
import { useFlow } from '@/app/routes/stackflow';
import * as styles from '../styles/MypageMenuSection.css';
import { MypageMenuItem } from './MypageMenuItem';
import type { MypageMenuSection as MypageMenuSectionType } from '@/shared/mock/mypage';

interface MypageMenuSectionProps {
  section: MypageMenuSectionType;
}

export function MypageMenuSection({ section }: MypageMenuSectionProps) {
  const { push } = useFlow();

  const handleItemClick = (path: ActivityName) => {
    push(path, {}, { animate: true });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item) => (
          <MypageMenuItem key={item.id} item={item} onClick={handleItemClick} />
        ))}
      </div>
    </section>
  );
}
