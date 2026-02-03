import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      https:
        env.VITE_SSL_KEY_PATH && env.VITE_SSL_CERT_PATH
          ? {
              key: fs.readFileSync(
                path.resolve(__dirname, env.VITE_SSL_KEY_PATH)
              ),
              cert: fs.readFileSync(
                path.resolve(__dirname, env.VITE_SSL_CERT_PATH)
              ),
            }
          : undefined,
      port: 5173,
    },
  };
});
