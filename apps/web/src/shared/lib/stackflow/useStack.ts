import { actions, useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

export const useStack = () => {
  const { push, pop: originalPop } = useFlow();

  const pop = (fallback?: ActivityName) => {
    const stack = actions.getStack();
    const currentActivityIdx = stack.activities.findIndex(
      (activity) => activity.isActive
    );

    if (currentActivityIdx === 0 && fallback) {
      push(fallback, {}, { animate: false });
      return;
    }

    originalPop();
  };

  return { pop };
};
