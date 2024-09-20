import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
      external: ['styles.css'],
      external: ['@trezor/env-utils']
    }
  },
  define: {
    'process.env': process.env
  }
});
