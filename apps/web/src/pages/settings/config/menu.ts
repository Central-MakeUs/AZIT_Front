import { bridge } from '@/shared/lib/bridge';
import type { MenuGroup } from '@/shared/types/menu';

const LOCATION_PERMISSION_LABEL: Record<string, string> = {
  granted: '활성',
  denied: '비활성',
};

interface SettingsMenuOptions {
  loginProvider: string;
  appVersion: string;
  onLogout: () => void;
}

export const getSettingsMenu = ({
  loginProvider,
  appVersion,
  onLogout,
}: SettingsMenuOptions): MenuGroup[] => [
  {
    id: 'account',
    title: '내 계정',
    items: [
      {
        id: 'login-info',
        label: '로그인 정보',
        type: 'info',
        value: loginProvider,
      },
    ],
  },
  {
    id: 'location',
    title: '위치 설정',
    items: [
      {
        id: 'location-permission',
        label: '위치 권한 설정',
        type: 'action',
        getStatusLabel: async () => {
          if (!bridge.isNativeMethodAvailable('getLocationPermissionStatus')) {
            return '미설정';
          }

          const status = await bridge.getLocationPermissionStatus();
          return LOCATION_PERMISSION_LABEL[status] ?? '미설정';
        },
        onAction: async () => {
          if (!bridge.isNativeMethodAvailable('openLocationSettings')) return;
          await bridge.openLocationSettings();
        },
      },
    ],
  },
  {
    id: 'etc',
    title: '기타',
    items: [
      {
        id: 'version-info',
        label: '버전 정보',
        type: 'info',
        value: appVersion,
      },
      {
        id: 'logout',
        label: '로그아웃',
        type: 'action',
        onAction: onLogout,
      },
    ],
  },
];
