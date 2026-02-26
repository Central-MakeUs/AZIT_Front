import { Fragment, useCallback, useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

import * as styles from '@/widgets/mypage/styles/MyMenuSection.css';
import { MyMenuItem } from '@/widgets/mypage/ui/MyMenuItem';

import { bridge } from '@/shared/lib/bridge';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import type { MenuItem, MypageMenuGroup } from '@/shared/types/mypage-menu';
import { toastError } from '@/shared/ui/toast';

type LocationPermissionStatus = 'granted' | 'denied' | 'undetermined' | null;

const LOCATION_PERMISSION_LABEL: Record<
  Exclude<LocationPermissionStatus, null>,
  string
> = {
  granted: '활성',
  denied: '비활성',
  undetermined: '미설정',
};

interface MyMenuSectionProps {
  section: MypageMenuGroup;
}

export function MyMenuSection({ section }: MyMenuSectionProps) {
  const { push } = useFlow();
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<LocationPermissionStatus>(null);

  // 위치 권한 상태 받아오는 로직, 무한 렌더링 방지를 위해 useCallback 사용
  const fetchLocationPermissionStatus = useCallback(async () => {
    try {
      if (typeof bridge.getLocationPermissionStatus === 'function') {
        const status = await bridge.getLocationPermissionStatus();
        setLocationPermissionStatus(status);
      }
    } catch {
      setLocationPermissionStatus(null);
    }
  }, []);

  useEffect(() => {
    const hasLocationItem = section.items.some(
      (item) => item.type === 'permission' && item.permission === 'location'
    );
    if (hasLocationItem) fetchLocationPermissionStatus();
  }, [section.items, fetchLocationPermissionStatus]);

  // 설정 화면에서 앱으로 돌아왔을 때 위치 권한 상태를 다시 받아옴
  useEffect(() => {
    const handleFocus = () => fetchLocationPermissionStatus();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchLocationPermissionStatus]);

  const requestPermission = async (permission: string) => {
    if (permission === 'location') {
      try {
        if (typeof bridge.openLocationSettings === 'function') {
          await bridge.openLocationSettings();
        }
      } catch {
        toastError('위치 권한 설정을 열지 못했어요.');
      }
    }
  };

  const getStatusLabelForItem = (item: MenuItem): string | null => {
    if (item.type !== 'permission' || item.permission !== 'location') {
      return null;
    }
    if (locationPermissionStatus === null)
      return LOCATION_PERMISSION_LABEL.undetermined;
    return LOCATION_PERMISSION_LABEL[locationPermissionStatus];
  };

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
    } else if (item.type === 'permission') {
      void requestPermission(item.permission);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{section.title}</h2>
      <div className={styles.list}>
        {section.items.map((item, index) => (
          <Fragment key={item.id}>
            <MyMenuItem
              item={item}
              onClick={() => handleItemClick(item)}
              statusLabel={getStatusLabelForItem(item)}
            />
            {index < section.items.length - 1 && (
              <div className={styles.listItemDivider} aria-hidden />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
