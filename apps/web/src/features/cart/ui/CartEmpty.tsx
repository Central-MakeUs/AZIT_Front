import { ShoppingBagIcon, Button } from '@azit/design-system';
import * as styles from '../styles/CartEmpty.css';

export function CartEmpty() {
  return (
    <div className={styles.container}>
      <div className={styles.iconTextContainer}>
        <ShoppingBagIcon size={64} color="secondary" />
        <p className={styles.emptyText}>장바구니가 비어있어요</p>
      </div>
      <Button state="cancelled">상품 보러가기</Button>
    </div>
  );
}
