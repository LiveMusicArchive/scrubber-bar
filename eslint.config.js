import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';
import wc from 'eslint-plugin-wc';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  lit.configs['flat/recommended'],
  wc.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      globals: { ...globals.mocha },
    },
    rules: {
      // chai assertion getters (e.g. `expect(x).to.exist`) read as unused expressions
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs}', '*.config.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  // Disable stylistic rules that Prettier owns; keep this last.
  prettier,
);
