import { useEffect, useRef } from 'react';

interface UseStoreGridOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export function useStoreGrid({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseStoreGridOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const timeoutId = setTimeout(() => {
      const sentinel = bottomSentinelRef.current;
      const scrollEl = scrollRef.current;

      if (!sentinel || !scrollEl) {
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          });
        },
        {
          root: scrollEl,
          threshold: 0,
        }
      );

      observer.observe(sentinel);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    scrollRef,
    bottomSentinelRef,
  };
}
