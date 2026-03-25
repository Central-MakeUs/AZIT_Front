import { ErrorBoundary } from '@sentry/react';
import type { ReactNode } from 'react';

import { ServerError } from '@/shared/api/apiHandler';

interface FallbackProps {
  error: unknown;
  resetError: () => void;
}

function ErrorFallback({ error, resetError }: FallbackProps) {
  const isServerError = error instanceof ServerError;
  const status = isServerError ? error.status : null;

  return (
    <div
      role="alert"
      style={{ padding: 24, textAlign: 'center', paddingTop: 80 }}
    >
      <p>
        {status === 503
          ? '서비스가 일시적으로 점검 중입니다.'
          : '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
      </p>
      <button type="button" onClick={resetError}>
        다시 시도
      </button>
    </div>
  );
}

export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error} resetError={resetError} />
      )}
      onError={(error) => {
        console.error('[GlobalErrorBoundary]', error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
