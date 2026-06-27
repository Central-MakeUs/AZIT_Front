import type { StackflowPlugin } from '@stackflow/react';

export const activityLoggerPlugin = (): StackflowPlugin => () => ({
  key: 'activity-logger',
  onBeforePush({ actionParams }) {
    console.log(`[Stackflow] Activity: ${actionParams.activityName}`);
  },
  onBeforeReplace({ actionParams }) {
    console.log(`[Stackflow] Activity: ${actionParams.activityName}`);
  },
});
