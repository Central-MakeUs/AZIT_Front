import { stackflow } from '@stackflow/react';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';

import '@stackflow/plugin-basic-ui/index.css';

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {},
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
});
