import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import '@azit/design-system';
import { Stack } from './routes/stackflow';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Stack />
  </StrictMode>
);
