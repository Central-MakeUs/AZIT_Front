import { stackflow } from '@stackflow/react';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';

import '@stackflow/plugin-basic-ui/index.css';

import { routes } from './config';
import { transformRoutes } from './utils';

const { activities, routeMap } = transformRoutes(routes);

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: routeMap,
      fallbackActivity: () => 'NotFoundPage',
    }),
  ],
  activities,
  initialActivity: () => 'HomePage',
});
