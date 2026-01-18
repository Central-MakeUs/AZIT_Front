import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Stack } from './routes/stackflow';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

import './styles/globals.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Stack />
    </ReactQueryProvider>
  </StrictMode>
);
