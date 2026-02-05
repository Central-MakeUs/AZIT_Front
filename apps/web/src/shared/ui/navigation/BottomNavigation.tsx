import {
  HomeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  UserIcon,
  type IconProps,
} from '@azit/design-system/icon';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as styles from './BottomNavigation.css';
import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

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
  onClick: () => void;
}

function MenuItem({ icon: Icon, label, isActive, onClick }: MenuItemProps) {
  const iconColor = isActive ? 'primary' : 'secondary';
  const labelClass = isActive
    ? `${styles.menuLabel} ${styles.menuLabelActive}`
    : `${styles.menuLabel} ${styles.menuLabelInactive}`;

  return (
    <div className={styles.menuItem} onClick={onClick}>
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
  const { replace } = useFlow();

  const handleClick = (tab: ActivityName) => {
    replace(tab, {}, { animate: false });
  };

  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navigationContainer}>
        <MenuItem
          icon={HomeIcon}
          label="홈"
          isActive={activeTab === 'home'}
          onClick={() => handleClick('HomePage')}
        />
        <MenuItem
          icon={CalendarIcon}
          label="일정"
          isActive={activeTab === 'schedule'}
          onClick={() => {}}
        />
        <MenuItem
          icon={ShoppingBagIcon}
          label="스토어"
          isActive={activeTab === 'store'}
          onClick={() => handleClick('StorePage')}
        />
        <MenuItem
          icon={UserIcon}
          label="마이페이지"
          isActive={activeTab === 'mypage'}
          onClick={() => handleClick('Mypage')}
        />
      </nav>
    </div>
  );
}
