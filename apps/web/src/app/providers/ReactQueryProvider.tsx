import * as Sentry from '@sentry/react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { lazy, type ReactNode, Suspense } from 'react';

import { BusinessError } from '@/shared/api/apiHandler';
import { toastError } from '@/shared/ui/toast';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      Sentry.captureException(error);

      const errorMessages = mutation.meta?.errorMessages;
      const customMessage =
        error instanceof BusinessError
          ? errorMessages?.[error.code]
          : undefined;

      toastError(
        customMessage ??
          (error instanceof BusinessError
            ? error.message
            : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      );
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      throwOnError: (error) => !(error instanceof BusinessError),
      retry: (failureCount, error) =>
        error instanceof BusinessError ? false : failureCount < 2,
    },
  },
});

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((m) => ({
    default: m.ReactQueryDevtools,
  }))
);

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ReactQueryDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
