import { lazy, type ComponentType } from 'react';
import type { RouteConfig } from './types';
import { withAuth } from './withAuth';
import type { ActivityComponentType } from '@stackflow/react';

/**
 * RouteConfig[]를 stackflow의 activities와 routes로 변환
 * withAuth가 true인 경우 자동으로 withAuth HOC로 래핑
 * 리터럴 타입을 보존하여 stackflow의 타입 검증이 작동하도록 함
 */
export function transformRoutes<const Routes extends readonly RouteConfig[]>(
  routes: Routes
) {
  // readonly 튜플을 index access type으로 접근해 유니온 타입 만들기
  type ActivityName = Routes[number]['name'];

  const activities = {} as {
    [K in ActivityName]: ActivityComponentType<Record<string, unknown>>;
  };

  const routeMap = {} as Record<ActivityName, string>;

  routes.forEach((route) => {
    // withAuth가 true면 HOC로 래핑
    const Component = route.withAuth ? withAuth(route.element) : route.element;

    // stackflow의 ActivityComponentType에 맞추기 위해 타입 단언
    const activityName = route.name as ActivityName;
    activities[activityName] = Component as ActivityComponentType<
      Record<string, unknown>
    >;
    routeMap[activityName] = route.path;
  });

  return { activities, routeMap };
}

export function lazyImport<T extends Record<string, ComponentType<any>>>(
  importFn: () => Promise<T>,
  componentName: keyof T
) {
  return lazy(() =>
    importFn().then((m) => ({
      default: m[componentName] as ComponentType<any>,
    }))
  );
}
