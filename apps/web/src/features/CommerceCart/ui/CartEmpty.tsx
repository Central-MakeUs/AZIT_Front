import { Button } from '@azit/design-system/button';

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
        <img src="/icons/shopping-bag.svg" width={64} height={64} alt="" />
        <p className={styles.emptyText}>장바구니가 비어있어요</p>
      </div>
      <Button state="outline" onClick={handleClick}>
        상품 보러가기
      </Button>
    </div>
  );
}
