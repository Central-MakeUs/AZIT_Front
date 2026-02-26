import * as styles from '@/widgets/order-product-list/styles/OrderProductListSection.css';
import { OrderProductItem } from '@/widgets/order-product-list/ui/OrderProductItem';

import type { OrderItem, OrderItemResponse } from '@/entities/order/model';

type OrderProductListItem = OrderItem | OrderItemResponse;

interface OrderProductListSectionProps {
  products: OrderProductListItem[];
  title?: string;
  showDivider?: boolean;
  showOriginalPrice?: boolean;
}

export function OrderProductListSection({
  products,
  title = '주문 상품',
  showDivider = true,
  showOriginalPrice = true,
}: OrderProductListSectionProps) {
  return (
    <div className={styles.section}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <div className={styles.productList}>
        {products.map((product, index) => (
          <OrderProductItem
            key={product.productId ?? product.skuId ?? index}
            product={product}
            showOriginalPrice={showOriginalPrice}
          />
        ))}
      </div>
      {showDivider && <div className={styles.divider} />}
    </div>
  );
}
