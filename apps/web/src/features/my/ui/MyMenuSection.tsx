import { useFlow } from '@/app/routes/stackflow';

import type { MenuItem, MyPageMenuGroup } from '@/features/my/model/menu';
import * as styles from '@/features/my/styles/MyMenuSection.css';
import { MyMenuItem } from '@/features/my/ui/MyMenuItem';

interface MyMenuSectionProps {
  section: MyPageMenuGroup;
}

export function MyMenuSection({ section }: MyMenuSectionProps) {
  const { push } = useFlow();

  const handleItemClick = (item: MenuItem) => {
    if (item.type === 'page') {
      // TermDetailPage인 경우 termType params 전달
      if (item.path === 'TermDetailPage') {
        push(item.path, { termType: item.id }, { animate: true });
      } else {
        push(item.path, item.pushParams ?? {}, { animate: true });
      }
    } else if (item.type === 'external_link') {
      window.open(item.url, '_blank');
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item) => (
          <MyMenuItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
