import { Button } from '@azit/design-system/button';
import { ShoppingBagIcon } from '@azit/design-system/icon';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/features/CommerceCart/styles/CartEmpty.css';

export function CartEmpty() {
  const { replace } = useFlow();

  const handleClick = () => {
    replace('CommerceStorePage', {});
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconTextContainer}>
        <ShoppingBagIcon size={64} color="secondary" strokeWidth={1.2} />
        <p className={styles.emptyText}>장바구니가 비어있어요</p>
      </div>
      <Button state="outline" onClick={handleClick}>
        상품 보러가기
      </Button>
    </div>
  );
}
