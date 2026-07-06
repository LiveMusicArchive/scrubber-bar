import { defineConfig } from 'vite';

// Standalone app build for the GitHub Pages demo. The root vite.config.ts is a
// library build that externalizes Lit; here the demo is a self-contained static
// site, so Lit is bundled in.
export default defineConfig({
  root: 'demo',
  // The site is served from https://livemusicarchive.github.io/scrubber-bar/,
  // so assets resolve under the repo-name subpath.
  base: '/scrubber-bar/',
  build: {
    target: 'es2022',
    outDir: '../dist-demo',
    emptyOutDir: true,
  },
});
