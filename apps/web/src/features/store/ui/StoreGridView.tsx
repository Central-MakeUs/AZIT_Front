import { Button } from '@azit/design-system/button';
import { useInfiniteQuery } from '@tanstack/react-query';

import { StoreSkeleton } from '@/widgets/skeleton/ui';
import { StoreBanner } from '@/widgets/store/ui/StoreBanner';
import { StoreGrid } from '@/widgets/store/ui/StoreGrid';

import { useStoreGrid } from '@/features/store/model/useStoreGrid';
import * as styles from '@/features/store/styles/StoreGridView.css.ts';

import { GOOGLE_FORM_URL } from '@/shared/constants/url';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
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
          <StoreBanner handleClick={() => openExternalUrl(GOOGLE_FORM_URL)}>
            <StoreBanner.Title>
              <span>[구글폼] AZIT에게 한마디 하기</span>
            </StoreBanner.Title>
            <StoreBanner.Description>
              <p>정성 가득 피드백 주시면</p>
              <p className={styles.bannerDescriptionText}>
                기프티콘 당첨 기회가 찾아와요
              </p>
            </StoreBanner.Description>
          </StoreBanner>
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
