import { useInfiniteQuery } from '@tanstack/react-query';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { TruckIcon } from '@azit/design-system/icon';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import { orderQueries } from '@/shared/api/queries/order';
import { useFlow } from '@/app/routes/stackflow';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import * as styles from '../styles/OrderHistory.css.ts';
import type { OrderListItem } from '../api/types';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatOrderDateLabel(dateString: string | undefined) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = WEEKDAYS[date.getDay()];
    return `${year}.${month}.${day}(${dayOfWeek})`;
  } catch {
    return dateString;
  }
}

export function OrderHistoryPage() {
  const { push } = useFlow();

  const {
    data: orderHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery(orderQueries.orderHistoryInfiniteQuery());

  const { scrollRef, bottomSentinelRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  const orders: OrderListItem[] =
    orderHistoryData?.pages.flatMap((page) =>
      page.ok && page.data?.result?.content ? page.data.result.content : []
    ) ?? [];

  const isEmpty = !isPending && orders.length === 0;

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="주문내역" />
        </div>
        <div className={styles.mainContainer} ref={scrollRef}>
          {isPending ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>로딩 중...</p>
            </div>
          ) : isEmpty ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIconText}>
                <TruckIcon size={64} color="secondary" />
                <p className={styles.emptyStateText}>주문 내역이 아직 없어요</p>
              </div>
            </div>
          ) : (
            <>
              {orders.map((order) => (
                <section
                  key={order.id ?? order.orderNumber}
                  className={styles.dateSection}
                >
                  <div className={styles.dateSectionHeader}>
                    <span className={styles.dateLabel}>
                      {formatOrderDateLabel(order.orderDate)}
                    </span>
                    <Button
                      type="button"
                      state="outline"
                      className={styles.detailButton}
                      onClick={() =>
                        push('OrderDetailPage', {
                          id: order.orderNumber!.replace(/^#/, ''),
                        })
                      }
                    >
                      주문 상세
                    </Button>
                  </div>
                  <OrderProductListSection
                    products={order.items ?? []}
                    title=""
                    showDivider={false}
                    showOriginalPrice={false}
                  />
                </section>
              ))}
              <div
                ref={bottomSentinelRef}
                className={styles.sentinel}
                aria-hidden
              />
            </>
          )}
        </div>
      </AppLayout>
    </AppScreen>
  );
}
