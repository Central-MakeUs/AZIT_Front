import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';

import '@stackflow/plugin-basic-ui/index.css';

import { AuthInitializer } from '@/app/providers/AuthInitializer';
import { routes } from '@/app/routes/config';
import { transformRoutes } from '@/app/routes/utils';

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
