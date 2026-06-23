import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: 'index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // Keep Lit out of the bundle so the consuming app supplies a single
      // shared copy.
      external: [/^lit(\/.*)?$/],
    },
  },
  server: {
    open: '/demo/',
  },
});
