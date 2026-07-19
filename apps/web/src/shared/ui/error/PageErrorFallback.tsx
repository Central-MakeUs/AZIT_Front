import { WarningIcon } from '@azit/design-system/icon';

import { container, message } from './PageErrorFallback.css';

interface Props {
  message?: string;
}

export function PageErrorFallback({
  message: msg = '정보를 불러오지 못했어요',
}: Props) {
  return (
    <div className={container}>
      <WarningIcon size={64} />
      <span className={message}>{msg}</span>
    </div>
  );
}
