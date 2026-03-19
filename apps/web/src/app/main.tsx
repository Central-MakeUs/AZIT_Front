import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { GlobalErrorBoundary } from '@/app/providers/GlobalErrorBoundary';
import { KakaoDeeplinkProvider } from '@/app/providers/KakaoDeeplinkProvider';
import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider';
import { Stack } from '@/app/routes/stackflow';

import { initSentry } from '@/shared/lib/sentry';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { Toaster } from '@/shared/ui/toast';

import '@/app/styles/globals.css';
import '@/app/styles/index.css';

initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <ReactQueryProvider>
        <KakaoDeeplinkProvider>
          <Suspense fallback={<PageLoader />}>
            <Stack />
          </Suspense>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2500,
              className: 'azit-toast',
            }}
          />
        </KakaoDeeplinkProvider>
      </ReactQueryProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
