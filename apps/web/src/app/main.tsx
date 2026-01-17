import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import '@azit/design-system';
import { Stack } from './routes/stackflow';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Stack />
    </ReactQueryProvider>
  </StrictMode>
);
