import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { TruckIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/order-history/styles/OrderHistory.css.ts';

import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { useOrderHistory } from '@/features/order-history/model/useOrderHistory';

import { formatOrderDateLabel } from '@/shared/lib/formatters';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function OrderHistoryPage() {
  const { push } = useFlow();
  const {
    orders,
    isPending,
    isEmpty,
    scrollRef,
    bottomSentinelRef,
    handlers: { handleOrderDetail },
  } = useOrderHistory({
    onOrderDetail: (id) => push('OrderDetailPage', { id }),
  });

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
                      onClick={() => handleOrderDetail(order)}
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
