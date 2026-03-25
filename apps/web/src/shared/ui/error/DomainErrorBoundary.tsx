import { ErrorBoundary } from '@sentry/react';
import type { ReactNode } from 'react';

import { BusinessError } from '@/shared/api/apiHandler';

interface Props {
  children: ReactNode;
  fallback: (props: { error: BusinessError; reset: () => void }) => ReactNode;
}

export function DomainErrorBoundary({ children, fallback }: Props) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => {
        if (!(error instanceof BusinessError)) {
          throw error;
        }
        return <>{fallback({ error, reset: resetError })}</>;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
