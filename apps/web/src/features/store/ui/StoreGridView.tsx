import { Button } from '@azit/design-system/button';
import { useInfiniteQuery } from '@tanstack/react-query';

import { StoreSkeleton } from '@/widgets/skeleton/ui';

import { useStoreGrid } from '@/features/store/model/useStoreGrid';
import * as styles from '@/features/store/styles/StoreGridView.css.ts';
import { StoreBanner } from '@/features/store/ui/StoreBanner';
import { StoreGrid } from '@/features/store/ui/StoreGrid';

import { storeQueries } from '@/shared/queries';
import { scrollContainer } from '@/shared/styles/container.css';

export function StoreGridView() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(storeQueries.productsInfiniteQuery());

  const products =
    data?.pages.flatMap((page) => (page.ok ? page.data.result.content : [])) ??
    [];

  const { scrollRef, bottomSentinelRef } = useStoreGrid({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div ref={scrollRef} className={scrollContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.bannerSection}>
          <StoreBanner />
        </div>
        <div className={styles.productsSection}>
          <Button size="small">전체</Button>
          {isPending ? <StoreSkeleton /> : <StoreGrid products={products} />}
          <div
            ref={bottomSentinelRef}
            style={{
              height: '1px',
              width: '100%',
            }}
          />
          {isFetchingNextPage && <StoreSkeleton />}
        </div>
      </div>
    </div>
  );
}
