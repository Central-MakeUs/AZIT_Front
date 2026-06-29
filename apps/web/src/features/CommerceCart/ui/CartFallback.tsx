import { WarningIcon } from '@azit/design-system/icon';

import * as s from '../styles/CartFallback.css';

export default function CartFallback() {
  return (
    <div className={s.container}>
      <WarningIcon size={64} />
      <span className={s.message}>장바구니를 불러오지 못했어요</span>
    </div>
  );
}
