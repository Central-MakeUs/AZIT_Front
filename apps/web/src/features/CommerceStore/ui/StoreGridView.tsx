import { Button } from '@azit/design-system/button';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { StoreSkeleton } from '@/widgets/skeleton/ui';
import { StoreGrid } from '@/widgets/store/ui/StoreGrid';

import { useStoreGrid } from '@/features/CommerceStore/model/useStoreGrid';
import * as styles from '@/features/CommerceStore/styles/StoreGridView.css';

import { GOOGLE_FORM_URL } from '@/shared/constants/url';
import { openExternalUrl } from '@/shared/lib/openExternalUrl';
import { storeQueries } from '@/shared/queries';
import { scrollContainer } from '@/shared/styles/container.css';
import { AsyncBoundary } from '@/shared/ui/async-boundary';

function StoreGridContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(storeQueries.productsInfiniteQuery());

  const products =
    data?.pages.flatMap((page) => page.result?.content ?? []) ?? [];

  const { scrollRef, bottomSentinelRef } = useStoreGrid({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div ref={scrollRef} className={styles.productsSection}>
      <Button size="small">전체</Button>
      <StoreGrid products={products} />
      <div
        ref={bottomSentinelRef}
        style={{
          height: '1px',
          width: '100%',
        }}
      />
      {isFetchingNextPage && <StoreSkeleton />}
    </div>
  );
}

export function StoreGridView() {
  return (
    <div className={scrollContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.bannerSection}>
          <img
            src="/images/commerce-banner.webp"
            alt="AZIT에 대한 의견을 남겨주세요"
            className={styles.bannerImage}
            onClick={() => openExternalUrl(GOOGLE_FORM_URL)}
          />
        </div>
        <AsyncBoundary
          suspenseFallback={<StoreSkeleton />}
          errorFallback={<div>상품을 불러오지 못했습니다.</div>}
        >
          <StoreGridContent />
        </AsyncBoundary>
      </div>
    </div>
  );
}
