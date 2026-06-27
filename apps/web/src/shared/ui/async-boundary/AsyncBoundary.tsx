import { Suspense, type ReactNode } from 'react';

import type { BusinessError } from '@/shared/api/apiHandler';
import { DomainErrorBoundary } from '@/shared/ui/error';

interface Props {
  children: ReactNode;
  suspenseFallback: ReactNode;
  errorFallback?: (props: {
    error: BusinessError;
    reset: () => void;
  }) => ReactNode;
}

export function AsyncBoundary({
  children,
  suspenseFallback,
  errorFallback,
}: Props) {
  const content = <Suspense fallback={suspenseFallback}>{children}</Suspense>;

  if (!errorFallback) return content;

  return (
    <DomainErrorBoundary fallback={errorFallback}>
      {content}
    </DomainErrorBoundary>
  );
}
