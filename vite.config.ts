import { defineConfig } from 'vite';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [remix(), react(), tsconfigPaths()],
});
