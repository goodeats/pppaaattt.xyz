// vite.config.ts
import { defineConfig } from "file:///Users/patrickneedham/code/pppaaattt/pppaaattt.xyz/node_modules/vite/dist/node/index.js";
import { unstable_vitePlugin as remix } from "file:///Users/patrickneedham/code/pppaaattt/pppaaattt.xyz/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///Users/patrickneedham/code/pppaaattt/pppaaattt.xyz/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { flatRoutes } from "file:///Users/patrickneedham/code/pppaaattt/pppaaattt.xyz/node_modules/remix-flat-routes/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGF0cmlja25lZWRoYW0vY29kZS9wcHBhYWF0dHQvcHBwYWFhdHR0Lnh5elwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BhdHJpY2tuZWVkaGFtL2NvZGUvcHBwYWFhdHR0L3BwcGFhYXR0dC54eXovdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BhdHJpY2tuZWVkaGFtL2NvZGUvcHBwYWFhdHR0L3BwcGFhYXR0dC54eXovdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHVuc3RhYmxlX3ZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tICdAcmVtaXgtcnVuL2Rldic7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCB7IGZsYXRSb3V0ZXMgfSBmcm9tICdyZW1peC1mbGF0LXJvdXRlcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVtaXgoe1xuICAgICAgaWdub3JlZFJvdXRlRmlsZXM6IFsnKiovKiddLFxuICAgICAgcm91dGVzOiBhc3luYyAoZGVmaW5lUm91dGVzKSA9PiB7XG4gICAgICAgIHJldHVybiBmbGF0Um91dGVzKCdyb3V0ZXMnLCBkZWZpbmVSb3V0ZXMpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsU0FBUyxvQkFBb0I7QUFDclcsU0FBUyx1QkFBdUIsYUFBYTtBQUM3QyxPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGtCQUFrQjtBQUczQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixtQkFBbUIsQ0FBQyxNQUFNO0FBQUEsTUFDMUIsUUFBUSxPQUFPLGlCQUFpQjtBQUM5QixlQUFPLFdBQVcsVUFBVSxZQUFZO0FBQUEsTUFDMUM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
