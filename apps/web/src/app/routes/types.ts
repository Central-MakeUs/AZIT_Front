import type { ComponentType } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ComponentType;
  withAuth: boolean;
}
