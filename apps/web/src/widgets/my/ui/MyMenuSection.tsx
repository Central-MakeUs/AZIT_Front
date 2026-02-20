import { Fragment } from 'react';

import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import * as styles from '@/widgets/my/styles/MyMenuSection.css';
import { MyMenuItem } from '@/widgets/my/ui/MyMenuItem';

import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import type { MenuItem, MyPageMenuGroup } from '@/shared/types/my-menu';

interface MyMenuSectionProps {
  section: MyPageMenuGroup;
}

export function MyMenuSection({ section }: MyMenuSectionProps) {
  const { push } = useFlow();

  const handleItemClick = (item: MenuItem) => {
    if (item.type === 'page') {
      if (item.path === 'TermDetailPage') {
        push('TermDetailPage', { termType: item.id }, { animate: true });
      } else {
        push(item.path as ActivityName, item.pushParams ?? {}, {
          animate: true,
        });
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
