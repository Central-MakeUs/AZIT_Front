import { Description } from '@azit/design-system/description';

import * as styles from '@/widgets/order-product-list/styles/OrderProductItem.css.ts';

import type { OrderItem, OrderItemResponse } from '@/features/order/api/types';

import { formatPrice } from '@/shared/lib/formatters';

type OrderProductListItem = OrderItem | OrderItemResponse;

function isCheckoutItem(item: OrderProductListItem): item is OrderItem {
  return 'basePrice' in item && 'salePrice' in item;
}

interface OrderProductItemProps {
  product: OrderProductListItem;
  showOriginalPrice?: boolean;
}

export function OrderProductItem({
  product,
  showOriginalPrice = true,
}: OrderProductItemProps) {
  const hasBasePrice = isCheckoutItem(product) && (product.basePrice ?? 0) > 0;
  const salePrice =
    (isCheckoutItem(product)
      ? product.salePrice
      : (product as OrderItemResponse).totalSalePrice) ?? 0;
  const basePrice = isCheckoutItem(product) ? (product.basePrice ?? 0) : 0;
  const quantity = product.quantity ?? 0;

  return (
    <div className={styles.productItem}>
      <img className={styles.productImage} src={product.productImageUrl} />
      <div className={styles.productInfo}>
        <div className={styles.productDetails}>
          <div className={styles.productTexts}>
            <p className={styles.brandName}>{product.brandName}</p>
            <p className={styles.productName}>{product.productName}</p>
          </div>
          <Description>
            <Description.Label>
              <p className={styles.quantity}>
                <span style={{ color: 'black' }}>
                  {product.optionDescription}
                </span>{' '}
                / {quantity}개
              </p>
            </Description.Label>
            <Description.Value className={styles.priceContainer}>
              {showOriginalPrice && hasBasePrice && (
                <span className={styles.originalPrice}>
                  {formatPrice(basePrice * quantity)}
                </span>
              )}
              <span className={styles.discountedPrice}>
                {formatPrice(salePrice * quantity)}
              </span>
            </Description.Value>
          </Description>
        </div>
      </div>
    </div>
  );
}
