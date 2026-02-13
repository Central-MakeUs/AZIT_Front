import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import '@stackflow/plugin-basic-ui/index.css';

import { routes } from './config';
import { transformRoutes } from './utils';
import { AuthInitializer } from '../providers/AuthInitializer';

const { activities, routeMap } = transformRoutes(routes);

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
      rootClassName: 'basic-ui-layout',
    }),
    historySyncPlugin({
      routes: routeMap,
      fallbackActivity: () => 'NotFoundPage',
    }),
    () => {
      return {
        key: 'auth-initializer',
        wrapStack: ({ stack }) => {
          return <AuthInitializer>{stack.render()}</AuthInitializer>;
        },
      };
    },
  ],
  activities,
  initialActivity: () => 'HomePage',
});
