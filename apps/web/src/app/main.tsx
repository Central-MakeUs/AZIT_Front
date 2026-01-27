import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Stack } from './routes/stackflow';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { PageLoader } from '@/shared/ui/loading/PageLoader';

import './styles/globals.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Suspense fallback={<PageLoader />}>
        <Stack />
      </Suspense>
    </ReactQueryProvider>
  </StrictMode>
);
