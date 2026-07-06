import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Lit components need a DOM. happy-dom is enough here: the tests exercise
    // shadow DOM, custom-element upgrade, and synthetic events, none of which
    // depend on real browser layout.
    environment: 'happy-dom',
    include: ['test/**/*.test.ts'],
    setupFiles: ['test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
