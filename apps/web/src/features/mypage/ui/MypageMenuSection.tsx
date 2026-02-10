import { useFlow } from '@/app/routes/stackflow';
import * as styles from '../styles/MypageMenuSection.css';
import { MypageMenuItem } from './MypageMenuItem';
import type { MenuItem, MyPageMenuGroup } from '../model/menu';

interface MypageMenuSectionProps {
  section: MyPageMenuGroup;
}

export function MypageMenuSection({ section }: MypageMenuSectionProps) {
  const { push } = useFlow();

  const handleItemClick = (item: MenuItem) => {
    if (item.type === 'page') {
      // TermDetailPage인 경우 termType params 전달
      if (item.path === 'TermDetailPage') {
        push(item.path, { termType: item.id }, { animate: true });
      } else {
        push(item.path, {}, { animate: true });
      }
    } else if (item.type === 'external_link') {
      console.log('item.url', item.url);
      window.open(item.url, '_blank');
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item) => (
          <MypageMenuItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
