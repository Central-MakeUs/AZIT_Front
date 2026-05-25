import { Fragment } from 'react';

import type { MenuGroup, MenuItem as MenuItemType } from '@/shared/types/menu';

import { MenuItem } from './MenuItem';
import * as styles from './MenuSection.css';

interface MenuSectionProps {
  section: MenuGroup;
}

export function MenuSection({ section }: MenuSectionProps) {
  const handleItemClick = (item: MenuItemType) => {
    if (item.type === 'navigation') {
      item.onNavigate();
    } else if (item.type === 'action') {
      item.onAction();
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item, index) => (
          <Fragment key={item.id}>
            <MenuItem item={item} onClick={() => handleItemClick(item)} />
            {index < section.items.length - 1 && (
              <div className={styles.listItemDivider} aria-hidden />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
