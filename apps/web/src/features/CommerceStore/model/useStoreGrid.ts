import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';

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
  return useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
}
