import {
  HomeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  UserIcon,
  type IconProps,
} from '@azit/design-system';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as styles from './BottomNavigation.css';

type NavigationState = 'home' | 'schedule' | 'store' | 'mypage';

interface BottomNavigationProps {
  activeTab: NavigationState;
}

interface MenuItemProps {
  icon: ForwardRefExoticComponent<
    Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  isActive: boolean;
}

function MenuItem({ icon: Icon, label, isActive }: MenuItemProps) {
  const iconColor = isActive ? 'primary' : 'secondary';
  const labelClass = isActive
    ? `${styles.menuLabel} ${styles.menuLabelActive}`
    : `${styles.menuLabel} ${styles.menuLabelInactive}`;

  return (
    <div className={styles.menuItem}>
      <div className={styles.menuItemContent}>
        <div className={styles.iconWrapper}>
          <Icon size={24} color={iconColor} />
        </div>
        <p className={labelClass}>{label}</p>
      </div>
    </div>
  );
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navigationContainer}>
        <MenuItem icon={HomeIcon} label="홈" isActive={activeTab === 'home'} />
        <MenuItem
          icon={CalendarIcon}
          label="일정"
          isActive={activeTab === 'schedule'}
        />
        <MenuItem
          icon={ShoppingBagIcon}
          label="스토어"
          isActive={activeTab === 'store'}
        />
        <MenuItem
          icon={UserIcon}
          label="마이페이지"
          isActive={activeTab === 'mypage'}
        />
      </nav>
    </div>
  );
}
