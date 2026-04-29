import type { MenuGroup } from '@/shared/types/menu';

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
        type: 'permission',
        permission: 'location',
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
