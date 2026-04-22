import { actions, useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

export const useStack = () => {
  const { push, pop: originalPop } = useFlow();

  const pop = (fallback?: ActivityName) => {
    const stack = actions.getStack();
    const visibleActivities = stack.activities.filter(
      (activity) => !activity.exitedBy
    );

    if (visibleActivities.length <= 1 && fallback) {
      originalPop();
      push(fallback, {});
      return;
    }

    originalPop();
  };

  return { pop };
};
