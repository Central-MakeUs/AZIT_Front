import * as styles from '@/features/CommerceOrder/styles/OrderProductListSection.css';

import type {
  OrderItem,
  OrderItemResponse,
} from '@/entities/CommerceOrder/model';

import { OrderProductItem } from './OrderProductItem';


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
            key={`${product.productId ?? ''}_${product.skuId ?? ''}_${index}`}
            product={product}
            showOriginalPrice={showOriginalPrice}
          />
        ))}
      </div>
      {showDivider && <div className={styles.divider} />}
    </div>
  );
}
