import type { RouteConfig } from './types';
import { LoginPage } from '@/pages/auth/ui/LoginPage';
import { HomePage } from '@/pages/home/ui/HomePage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

// TODO: stackflow 테스트 위한 라우트 설정, 추후 수정 필요
export const routes = [
  {
    name: 'LoginPage',
    path: '/auth',
    element: LoginPage,
    withAuth: false,
  },
  {
    name: 'HomePage',
    path: '/',
    element: HomePage,
    withAuth: false,
  },
  {
    name: 'NotFoundPage',
    path: '/404',
    element: NotFoundPage,
    withAuth: false,
  },
] as const satisfies readonly RouteConfig[];
