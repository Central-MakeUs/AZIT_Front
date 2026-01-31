import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Button, Header, vars } from '@azit/design-system';
import { AppLayout } from '@/shared/ui/layout';
import { BackButton } from '@/shared/ui/button';
import { OrderProductListSection } from '@/widgets/order-product-list/ui';
import { mockOrderHistoryList } from '@/shared/mock/order-history';
import { useFlow } from '@/app/routes/stackflow';
import * as styles from '../styles/OrderHistory.css';

export function OrderHistoryPage() {
  const { push } = useFlow();

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <Header sticky left={<BackButton />} center="주문내역" />
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            {mockOrderHistoryList.map((group) => (
              <section key={group.orderId} className={styles.dateSection}>
                <div className={styles.dateSectionHeader}>
                  <span className={styles.dateLabel}>{group.dateLabel}</span>
                  <Button
                    type="button"
                    state="cancelled"
                    className={styles.detailButton}
                    onClick={() =>
                      push(
                        'OrderDetailPage',
                        { id: group.orderId },
                        { animate: true }
                      )
                    }
                  >
                    주문 상세
                  </Button>
                </div>
                <OrderProductListSection
                  products={group.products}
                  title=""
                  showDivider={false}
                  showOriginalPrice={false}
                />
              </section>
            ))}
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
