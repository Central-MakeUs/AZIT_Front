import type { RouteConfig } from './types';

import { HomePage } from '@/pages/home/ui/HomePage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

import { lazyImport } from './utils';

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
const RedirectPage = lazyImport(
  () => import('@/pages/auth/ui/RedirectPage'),
  'RedirectPage'
);
const OrderPage = lazyImport(
  () => import('@/pages/order/ui/OrderPage'),
  'OrderPage'
);
const OrderCompletePage = lazyImport(
  () => import('@/pages/order-complete/ui/OrderCompletePage'),
  'OrderCompletePage'
);
const OrderDetailPage = lazyImport(
  () => import('@/pages/order-detail/ui/OrderDetailPage'),
  'OrderDetailPage'
);
const Mypage = lazyImport(() => import('@/pages/mypage/ui/Mypage'), 'Mypage');
const OrderHistory = lazyImport(
  () => import('@/pages/order-history/ui/OrderHistoryPage'),
  'OrderHistoryPage'
);
const NotificationSettingsPage = lazyImport(
  () => import('@/pages/mypage-notification/ui/NotificationSettingsPage'),
  'NotificationSettingsPage'
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
    element: Mypage,
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
] as const satisfies readonly RouteConfig[];
