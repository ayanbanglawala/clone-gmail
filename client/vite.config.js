import { defineConfig } from 'vite';

export default defineConfig({
  base: '/clone-gmail/', // Set base path for GitHub Pages
  resolve: {
    alias: {
      // Add polyfills if necessary
      buffer: 'buffer/',
      // Add other aliases as needed
    },
  },
  define: {
    global: 'globalThis', // Global variable definition
  },
  optimizeDeps: {
    include: ['buffer'], // Include buffer in the optimized dependencies
  },
});
