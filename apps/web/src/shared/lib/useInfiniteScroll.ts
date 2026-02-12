import { useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/**
 * IntersectionObserver 기반 무한 스크롤 훅.
 * scrollRef는 스크롤 컨테이너, bottomSentinelRef는 리스트 하단에 배치할 센티넬 요소에 연결한다.
 */
export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollOptions) {
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
