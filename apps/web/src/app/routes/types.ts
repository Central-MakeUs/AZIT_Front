import type { ComponentType } from 'react';
import type { routes } from './config';

export interface RouteConfig {
  name: string;
  path: string;
  element: ComponentType;
  withAuth: boolean;
}

// routes/types.ts
export type ActivityName = (typeof routes)[number]['name'];
