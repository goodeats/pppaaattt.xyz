import { defineConfig } from 'vite';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
});
