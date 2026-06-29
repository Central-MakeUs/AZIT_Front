import { Suspense, type ReactNode } from 'react';

import { DomainErrorBoundary } from '@/shared/ui/error';

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
    <DomainErrorBoundary fallback={() => errorFallback}>
      {content}
    </DomainErrorBoundary>
  );
}
