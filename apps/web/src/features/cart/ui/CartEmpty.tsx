import { Button } from '@azit/design-system/button';
import { ShoppingBagIcon } from '@azit/design-system/icon';
import * as styles from '../styles/CartEmpty.css';
import { useFlow } from '@/app/routes/stackflow';

export function CartEmpty() {
  const { replace } = useFlow();

  const handleClick = () => {
    replace('StorePage', {});
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconTextContainer}>
        <ShoppingBagIcon size={64} color="secondary" />
        <p className={styles.emptyText}>장바구니가 비어있어요</p>
      </div>
      <Button state="outline" onClick={handleClick}>
        상품 보러가기
      </Button>
    </div>
  );
}
