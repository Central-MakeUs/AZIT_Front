
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { Suspense } from 'react';

import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';

interface RenderWithProvidersOptions {
  withErrorBoundary?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { withErrorBoundary = true }: RenderWithProvidersOptions = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 0 } },
  });

  const wrapped = withErrorBoundary ? (
    <DomainErrorBoundary
      fallback={({ error, reset }) => (
        <BusinessErrorFallback error={error} onReset={reset} />
      )}
    >
      <Suspense fallback={null}>{ui}</Suspense>
    </DomainErrorBoundary>
  ) : (
    <Suspense fallback={null}>{ui}</Suspense>
  );

  return render(
    <QueryClientProvider client={queryClient}>{wrapped}</QueryClientProvider>
  );
}
