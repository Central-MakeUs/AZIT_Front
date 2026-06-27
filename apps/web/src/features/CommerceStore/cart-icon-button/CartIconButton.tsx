import { ShoppingCartIcon } from '@azit/design-system/icon';
import { useQuery } from '@tanstack/react-query';

import { cartCountQueries } from '@/entities/CommerceCart/api/queries';

import * as styles from './CartIconButton.css';

interface CartIconButtonProps {
  onClick?: () => void;
  'aria-label'?: string;
}

export function CartIconButton({
  onClick,
  'aria-label': ariaLabel,
}: CartIconButtonProps) {
  const { data } = useQuery(cartCountQueries.countQuery());
  const count = data?.result?.count ?? 0;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={ariaLabel ?? '장바구니'}
    >
      <ShoppingCartIcon size={24} />
      {count > 0 && (
        <span className={styles.badge} aria-hidden>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
