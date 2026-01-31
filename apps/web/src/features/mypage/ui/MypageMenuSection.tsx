import * as styles from '../styles/MypageMenuSection.css';
import { MypageMenuItem } from './MypageMenuItem';
import type { MypageMenuSection as MypageMenuSectionType } from '@/shared/mock/mypage';

interface MypageMenuSectionProps {
  section: MypageMenuSectionType;
}

export function MypageMenuSection({ section }: MypageMenuSectionProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item) => (
          <MypageMenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
