import { ErrorBoundary } from '@sentry/react';
import { Suspense, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  suspenseFallback: ReactNode;
  errorFallback?: ReactNode;
}

export function AsyncBoundary({
  children,
  suspenseFallback,
  errorFallback,
}: Props) {
  const content = <Suspense fallback={suspenseFallback}>{children}</Suspense>;

  if (!errorFallback) return content;

  return (
    <ErrorBoundary fallback={() => <>{errorFallback}</>}>
      {content}
    </ErrorBoundary>
  );
}
