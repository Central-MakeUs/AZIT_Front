import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { OrderProductListSection } from '@/widgets/order-product-list/ui';

import { useOrderHistory } from '@/features/CommerceOrder/model/useOrderHistory';

import { formatOrderDateLabel } from '@/shared/lib/formatters';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

import * as styles from './index.css';

function OrderHistoryContent() {
  const { push } = useFlow();
  const {
    orders,
    isEmpty,
    scrollRef,
    bottomSentinelRef,
    handlers: { handleOrderDetail },
  } = useOrderHistory({
    onOrderDetail: (id) => push('CommerceOrderDetailPage', { id }),
  });

  if (isEmpty) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIconText}>
          <img src="/icons/truck.svg" width={64} height={64} alt="" />
          <p className={styles.emptyStateText}>주문 내역이 아직 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer} ref={scrollRef}>
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
      <div ref={bottomSentinelRef} className={styles.sentinel} aria-hidden />
    </div>
  );
}

export function CommerceOrderHistoryPage() {
  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header left={<BackButton />} center="주문내역" />
        </div>
        <AsyncBoundary suspenseFallback={<PageLoader />}>
          <OrderHistoryContent />
        </AsyncBoundary>
      </AppLayout>
    </AppScreen>
  );
}
