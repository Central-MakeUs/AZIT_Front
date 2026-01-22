import type { RouteConfig } from './types';
import { LoginPage } from '@/pages/auth/ui/LoginPage';
import { HomePage } from '@/pages/home/ui/HomePage';
import { StorePage } from '@/pages/store/ui/StorePage';
import { CartPage } from '@/pages/cart/ui/CartPage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';
import { TermAgreePage } from '@/pages/onboarding/ui/TermAgreePage';
import { OnboardingPage } from '@/pages/onboarding/ui/OnboardingPage';

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
] as const satisfies readonly RouteConfig[];
