import type { RouteConfig } from '@/app/routes/types';
import { lazyImport } from '@/app/routes/utils';

import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RedirectPage } from '@/pages/RedirectPage';

const LoginPage = lazyImport(() => import('@/pages/LoginPage'), 'LoginPage');
const StorePage = lazyImport(() => import('@/pages/StorePage'), 'StorePage');
const StoreDetailPage = lazyImport(
  () => import('@/pages/StoreDetailPage'),
  'StoreDetailPage'
);
const CartPage = lazyImport(() => import('@/pages/CartPage'), 'CartPage');
const TermAgreePage = lazyImport(
  () => import('@/pages/TermAgreePage'),
  'TermAgreePage'
);
const OnboardingPage = lazyImport(
  () => import('@/pages/OnboardingPage'),
  'OnboardingPage'
);
const OnboardingCompletePage = lazyImport(
  () => import('@/pages/OnboardingCompletePage'),
  'OnboardingCompletePage'
);
const OrderPage = lazyImport(() => import('@/pages/OrderPage'), 'OrderPage');
const OrderCompletePage = lazyImport(
  () => import('@/pages/OrderCompletePage'),
  'OrderCompletePage'
);
const OrderDetailPage = lazyImport(
  () => import('@/pages/OrderDetailPage'),
  'OrderDetailPage'
);
const MyPage = lazyImport(() => import('@/pages/MyPage'), 'MyPage');
const OrderHistory = lazyImport(
  () => import('@/pages/OrderHistoryPage'),
  'OrderHistoryPage'
);
const NotificationSettingsPage = lazyImport(
  () => import('@/pages/MyNotificationPage'),
  'MyNotificationPage'
);
const CrewBannedStatusPage = lazyImport(
  () => import('@/pages/CrewBannedStatusPage'),
  'CrewBannedStatusPage'
);
const ScheduleDetailPage = lazyImport(
  () => import('@/pages/ScheduleDetailPage'),
  'ScheduleDetailPage'
);
const ScheduleEditPage = lazyImport(
  () => import('@/pages/ScheduleEditPage'),
  'ScheduleEditPage'
);
const ScheduleMembersPage = lazyImport(
  () => import('@/pages/ScheduleMembersPage'),
  'ScheduleMembersPage'
);
const ScheduleCreatePage = lazyImport(
  () => import('@/pages/ScheduleCreatePage'),
  'ScheduleCreatePage'
);
const NotificationPage = lazyImport(
  () => import('@/pages/NotificationPage'),
  'NotificationPage'
);
const SchedulePage = lazyImport(
  () => import('@/pages/SchedulePage'),
  'SchedulePage'
);
const AttendancePage = lazyImport(
  () => import('@/pages/MyAttendancePage'),
  'MyAttendancePage'
);
const AddressSettingPage = lazyImport(
  () => import('@/pages/AddressSettingPage'),
  'AddressSettingPage'
);
const AddressRegisterPage = lazyImport(
  () => import('@/pages/AddressRegisterPage'),
  'AddressRegisterPage'
);
const AddressSearchPage = lazyImport(
  () => import('@/pages/AddressSearchPage'),
  'AddressSearchPage'
);
const AddressEditPage = lazyImport(
  () => import('@/pages/AddressEditPage'),
  'AddressEditPage'
);
const TermDetailPage = lazyImport(
  () => import('@/pages/TermDetailPage'),
  'TermDetailPage'
);
const MemberManagePage = lazyImport(
  () => import('@/pages/MemberManagePage'),
  'MemberManagePage'
);
const MemberViewPage = lazyImport(
  () => import('@/pages/MemberViewPage'),
  'MemberViewPage'
);
const MyProfileEditPage = lazyImport(
  () => import('@/pages/MyProfileEditPage'),
  'MyProfileEditPage'
);
const CrewInfoEditPage = lazyImport(
  () => import('@/pages/CrewInfoEditPage'),
  'CrewInfoEditPage'
);
const ScheduleLocationPage = lazyImport(
  () => import('@/pages/ScheduleLocationPage'),
  'ScheduleLocationPage'
);
const CrewPage = lazyImport(() => import('@/pages/CrewPage'), 'CrewPage');
const SettingsPage = lazyImport(
  () => import('@/pages/SettingsPage'),
  'SettingsPage'
);

export const routes = [
  {
    name: 'LoginPage',
    path: '/auth',
    element: LoginPage,
    withAuth: false,
  },
  {
    name: 'TermAgreePage',
    path: '/term-agree',
    element: TermAgreePage,
    withAuth: false,
  },
  {
    name: 'OnboardingPage',
    path: '/onboarding',
    element: OnboardingPage,
    withAuth: false,
  },
  {
    name: 'OnboardingCompletePage',
    path: '/onboarding/complete',
    element: OnboardingCompletePage,
    withAuth: false,
  },
  {
    name: 'RedirectPage',
    path: '/auth/kakao/callback',
    element: RedirectPage,
    withAuth: false,
  },
  {
    name: 'HomePage',
    path: '/',
    element: HomePage,
    withAuth: false,
  },
  {
    name: 'NotificationPage',
    path: '/notification',
    element: NotificationPage,
    withAuth: false,
  },
  {
    name: 'SchedulePage',
    path: '/schedule',
    element: SchedulePage,
    withAuth: false,
  },
  {
    name: 'ScheduleCreatePage',
    path: '/schedule/create',
    element: ScheduleCreatePage,
    withAuth: true,
  },
  {
    name: 'StorePage',
    path: '/store',
    element: StorePage,
    withAuth: false,
  },
  {
    name: 'StoreDetailPage',
    path: '/store/:id',
    element: StoreDetailPage,
    withAuth: true,
  },
  {
    name: 'CartPage',
    path: '/cart',
    element: CartPage,
    withAuth: false,
  },
  {
    name: 'NotFoundPage',
    path: '/404',
    element: NotFoundPage,
    withAuth: false,
  },
  {
    name: 'OrderPage',
    path: '/order',
    element: OrderPage,
    withAuth: true,
  },
  {
    name: 'OrderCompletePage',
    path: '/order-complete',
    element: OrderCompletePage,
    withAuth: true,
  },
  {
    name: 'OrderDetailPage',
    path: '/order/:id',
    element: OrderDetailPage,
    withAuth: true,
  },
  {
    name: 'Mypage',
    path: '/mypage',
    element: MyPage,
    withAuth: true,
  },
  {
    name: 'OrderHistory',
    path: '/order-history',
    element: OrderHistory,
    withAuth: true,
  },
  {
    name: 'NotificationSettingsPage',
    path: '/mypage-notification',
    element: NotificationSettingsPage,
    withAuth: true,
  },
  {
    name: 'CrewBannedStatusPage',
    path: '/crew-join/status/banned',
    element: CrewBannedStatusPage,
    withAuth: true,
  },
  {
    name: 'ScheduleDetailPage',
    path: '/schedule/:id',
    element: ScheduleDetailPage,
    withAuth: true,
  },
  {
    name: 'ScheduleEditPage',
    path: '/schedule/:id/edit',
    element: ScheduleEditPage,
    withAuth: true,
  },
  {
    name: 'ScheduleMembersPage',
    path: '/schedule/:id/members',
    element: ScheduleMembersPage,
    withAuth: true,
  },
  {
    name: 'AttendancePage',
    path: '/mypage-attendance',
    element: AttendancePage,
    withAuth: true,
  },
  {
    name: 'AddressSettingPage',
    path: '/address',
    element: AddressSettingPage,
    withAuth: true,
  },
  {
    name: 'AddressRegisterPage',
    path: '/address/register',
    element: AddressRegisterPage,
    withAuth: true,
  },
  {
    name: 'AddressSearchPage',
    path: '/address/search',
    element: AddressSearchPage,
    withAuth: true,
  },
  {
    name: 'AddressEditPage',
    path: '/address/:id/edit',
    element: AddressEditPage,
    withAuth: true,
  },
  {
    name: 'TermDetailPage',
    path: '/term-detail/:termType',
    element: TermDetailPage,
    withAuth: false,
  },
  {
    name: 'MemberManagePage',
    path: '/crew/:id/manage',
    element: MemberManagePage,
    withAuth: true,
  },
  {
    name: 'MemberViewPage',
    path: '/crew/:id/members',
    element: MemberViewPage,
    withAuth: true,
  },
  {
    name: 'ScheduleLocationPage',
    path: '/schedule/location/search',
    element: ScheduleLocationPage,
    withAuth: true,
  },
  {
    name: 'MyProfileEditPage',
    path: '/mypage/profile/edit',
    element: MyProfileEditPage,
    withAuth: true,
  },
  {
    name: 'CrewInfoEditPage',
    path: '/crew/:id/edit',
    element: CrewInfoEditPage,
    withAuth: true,
  },
  {
    name: 'CrewPage',
    path: '/crew/:id',
    element: CrewPage,
    withAuth: true,
  },
  {
    name: 'SettingsPage',
    path: '/settings',
    element: SettingsPage,
    withAuth: true,
  },
] as const satisfies readonly RouteConfig[];
