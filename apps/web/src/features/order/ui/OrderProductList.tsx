import type { OrderProduct } from '@/shared/mock/order';
import { OrderProductItem } from '@/widgets/order-product-list/ui';
import * as styles from '../styles/OrderProductList.css';

interface OrderProductListProps {
  products: OrderProduct[];
}

export function OrderProductList({ products }: OrderProductListProps) {
  return (
    <div className={styles.productList}>
      <p className={styles.title}>주문 상품 총 {products.length}개</p>
      <div className={styles.itemsContainer}>
        {products.map((product) => (
          <OrderProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
