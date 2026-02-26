import { actions, useFlow } from '@/app/routes/stackflow';
import type { ActivityName } from '@/app/routes/types';

export const useStack = () => {
  const stack = actions.getStack();
  const stackSize = stack.activities.length;
  const { push, pop: originalPop } = useFlow();

  const pop = (fallback?: ActivityName) => {
    if (stackSize === 1 && fallback) {
      push(fallback, {}, { animate: false });
      return;
    }

    originalPop();
  };

  return { pop };
};
