import type { RouteConfig } from './types';
import { LoginPage } from '@/pages/auth/ui/LoginPage';
import { HomePage } from '@/pages/home/ui/HomePage';
import { StorePage } from '@/pages/store/ui/StorePage';
import { StoreDetailPage } from '@/pages/store/ui/StoreDetailPage';
import { CartPage } from '@/pages/cart/ui/CartPage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';
import { RedirectPage } from '@/pages/auth/ui/RedirectPage';

export const routes = [
  {
    name: 'LoginPage',
    path: '/auth',
    element: LoginPage,
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
    withAuth: true,
  },
  {
    name: 'StorePage',
    path: '/store',
    element: StorePage,
    withAuth: true,
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
    withAuth: true,
  },
  {
    name: 'NotFoundPage',
    path: '/404',
    element: NotFoundPage,
    withAuth: false,
  },
] as const satisfies readonly RouteConfig[];
