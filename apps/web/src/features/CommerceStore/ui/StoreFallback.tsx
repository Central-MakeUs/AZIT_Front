import { WarningIcon } from '@azit/design-system/icon';

import * as s from '../styles/StoreFallback.css';

export default function StoreFallback() {
  return (
    <div className={s.container}>
      <WarningIcon size={64} />
      <span className={s.message}>상품 로딩에 실패했어요</span>
    </div>
  );
}
