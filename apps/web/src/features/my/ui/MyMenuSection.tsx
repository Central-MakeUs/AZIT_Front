import { Fragment } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import type { MenuItem, MyPageMenuGroup } from '@/features/my/model/menu';
import * as styles from '@/features/my/styles/MyMenuSection.css';
import { MyMenuItem } from '@/features/my/ui/MyMenuItem';

import { openExternalUrl } from '@/shared/lib/openExternalUrl';

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
      openExternalUrl(item.url);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item, index) => (
          <Fragment key={item.id}>
            <MyMenuItem item={item} onClick={() => handleItemClick(item)} />
            {index < section.items.length - 1 && (
              <div className={styles.listItemDivider} aria-hidden />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
