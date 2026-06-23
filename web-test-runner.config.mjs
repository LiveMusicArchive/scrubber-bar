import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: true,
  plugins: [
    // Transform TypeScript on the fly. The absolute tsconfig path makes esbuild
    // honor experimentalDecorators + useDefineForClassFields, so Lit's reactive
    // decorators work in tests exactly as they do in the Vite build. (A relative
    // path is read against the plugin's cwd and may not resolve.)
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
  ],
};
