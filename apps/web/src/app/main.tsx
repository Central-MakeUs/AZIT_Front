import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { KakaoDeeplinkProvider } from '@/app/providers/KakaoDeeplinkProvider';
import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider';
import { Stack } from '@/app/routes/stackflow';

import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { Toaster } from '@/shared/ui/toast';

import '@/app/styles/globals.css';
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>
);
