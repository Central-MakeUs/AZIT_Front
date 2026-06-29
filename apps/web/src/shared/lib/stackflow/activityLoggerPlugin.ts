import type { StackflowReactPlugin } from '@stackflow/react';

export const activityLoggerPlugin = (): StackflowReactPlugin => () => ({
  key: 'activity-logger',
  onBeforePush({ actionParams }: { actionParams: { activityName: string } }) {
    console.log(`[Stackflow] Activity: ${actionParams.activityName}`);
  },
  onBeforeReplace({
    actionParams,
  }: {
    actionParams: { activityName: string };
  }) {
    console.log(`[Stackflow] Activity: ${actionParams.activityName}`);
  },
});
