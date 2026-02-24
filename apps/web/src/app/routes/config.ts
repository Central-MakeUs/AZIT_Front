import type { RouteConfig } from '@/app/routes/types';
import { lazyImport } from '@/app/routes/utils';

import { RedirectPage } from '@/pages/auth/ui/RedirectPage';
import { HomePage } from '@/pages/home/ui/HomePage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

const LoginPage = lazyImport(
  () => import('@/pages/auth/ui/LoginPage'),
  'LoginPage'
);
const StorePage = lazyImport(
  () => import('@/pages/store/ui/StorePage'),
  'StorePage'
);
const StoreDetailPage = lazyImport(
  () => import('@/pages/store/ui/StoreDetailPage'),
  'StoreDetailPage'
);
const CartPage = lazyImport(
  () => import('@/pages/cart/ui/CartPage'),
  'CartPage'
);
const TermAgreePage = lazyImport(
  () => import('@/pages/onboarding/ui/TermAgreePage'),
  'TermAgreePage'
);
const OnboardingPage = lazyImport(
  () => import('@/pages/onboarding/ui/OnboardingPage'),
  'OnboardingPage'
);
const OrderPage = lazyImport(
  () => import('@/pages/order/ui/OrderPage'),
  'OrderPage'
);
const OrderCompletePage = lazyImport(
  () => import('@/pages/order/ui/OrderCompletePage'),
  'OrderCompletePage'
);
const OrderDetailPage = lazyImport(
  () => import('@/pages/order/ui/OrderDetailPage'),
  'OrderDetailPage'
);
const MyPage = lazyImport(() => import('@/pages/mypage/ui/MyPage'), 'MyPage');
const OrderHistory = lazyImport(
  () => import('@/pages/order/ui/OrderHistoryPage'),
  'OrderHistoryPage'
);
const NotificationSettingsPage = lazyImport(
  () => import('@/pages/mypage/ui/MyNotificationPage'),
  'MyNotificationPage'
);
const CrewJoinStatusPage = lazyImport(
  () => import('@/pages/crew-join-status/ui/CrewJoinStatusPage'),
  'CrewJoinStatusPage'
);
const CrewBannedStatusPage = lazyImport(
  () => import('@/pages/crew-join-status/ui/CrewBannedStatusPage'),
  'CrewBannedStatusPage'
);
const ScheduleDetailPage = lazyImport(
  () => import('@/pages/schedule/ui/ScheduleDetailPage'),
  'ScheduleDetailPage'
);
const ScheduleMembersPage = lazyImport(
  () => import('@/pages/schedule/ui/ScheduleMembersPage'),
  'ScheduleMembersPage'
);
const HomeAlertPage = lazyImport(
  () => import('@/pages/home-alert/ui/HomeAlertPage'),
  'HomeAlertPage'
);
const SchedulePage = lazyImport(
  () => import('@/pages/schedule/ui/SchedulePage'),
  'SchedulePage'
);
const AttendancePage = lazyImport(
  () => import('@/pages/mypage/ui/MyAttendancePage'),
  'MyAttendancePage'
);
const AddressSettingPage = lazyImport(
  () => import('@/pages/address/ui/AddressSettingPage'),
  'AddressSettingPage'
);
const AddressRegisterPage = lazyImport(
  () => import('@/pages/address/ui/AddressRegisterPage'),
  'AddressRegisterPage'
);
const AddressSearchPage = lazyImport(
  () => import('@/pages/address/ui/AddressSearchPage'),
  'AddressSearchPage'
);
const AddressEditPage = lazyImport(
  () => import('@/pages/address/ui/AddressEditPage'),
  'AddressEditPage'
);
const TermDetailPage = lazyImport(
  () => import('@/pages/term-detail/ui/TermDetailPage'),
  'TermDetailPage'
);
const MemberManagePage = lazyImport(
  () => import('@/pages/mypage/ui/MemberManagePage'),
  'MemberManagePage'
);
const MemberViewPage = lazyImport(
  () => import('@/pages/mypage/ui/MemberViewPage'),
  'MemberViewPage'
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
    name: 'AlertPage',
    path: '/alert',
    element: HomeAlertPage,
    withAuth: false,
  },
  {
    name: 'SchedulePage',
    path: '/schedule',
    element: SchedulePage,
    withAuth: false,
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
    name: 'CrewJoinStatusPage',
    path: '/crew-join/status',
    element: CrewJoinStatusPage,
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
] as const satisfies readonly RouteConfig[];
