import fs from 'fs';
import path from 'path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

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
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
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
