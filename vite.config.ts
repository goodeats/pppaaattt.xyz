import { defineConfig } from 'vite';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import { flatRoutes } from 'remix-flat-routes';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
});
