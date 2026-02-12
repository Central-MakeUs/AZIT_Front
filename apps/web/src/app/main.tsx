import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Stack } from './routes/stackflow';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { PageLoader } from '@/shared/ui/loading/PageLoader';
import { KakaoDeeplinkProvider } from './providers/KakaoDeeplinkProvider';

import './styles/globals.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <KakaoDeeplinkProvider>
        <Suspense fallback={<PageLoader />}>
          <Stack />
        </Suspense>
      </KakaoDeeplinkProvider>
    </ReactQueryProvider>
  </StrictMode>
);
