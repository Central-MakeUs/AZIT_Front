import { Button } from '@azit/design-system/button';

import { useFlow } from '@/app/routes/stackflow';

import { BusinessError } from '@/shared/api/apiHandler';

import * as styles from './BusinessErrorFallback.css';
import { DEFAULT_FALLBACK, ERROR_FALLBACK_MAP } from './errorFallbackMap';

interface Props {
  error: BusinessError;
  onReset: () => void;
}

export function BusinessErrorFallback({ error, onReset }: Props) {
  const { replace } = useFlow();
  const config = ERROR_FALLBACK_MAP[error.code] ?? DEFAULT_FALLBACK;

  const handleAction = () => {
    if (config.action === 'replace' && config.navigateTo) {
      replace(config.navigateTo as Parameters<typeof replace>[0], {});
    } else {
      onReset();
    }
  };

  return (
    <div role="alert" className={styles.container}>
      <p>{config.message}</p>
      <Button size="medium" onClick={handleAction}>
        {config.label}
      </Button>
    </div>
  );
}
