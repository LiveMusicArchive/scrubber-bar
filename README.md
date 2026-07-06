# \<scrubber-bar>

A [Lit](https://lit.dev) range/scrubber web component for scrubbing through
media, with optional section markers.

This is a fork of [`@internetarchive/scrubber-bar`](https://github.com/internetarchive/iaux/tree/main/packages/scrubber-bar)
(part of the Internet Archive UX monorepo). Because the upstream is licensed
AGPL-3.0-only, so is this fork. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).

## Installation

Published to the Astral Engineering registry:

```bash
npm i @astralengineering/scrubber-bar
```

## Usage

Importing the package registers the `<scrubber-bar>` custom element:

```html
<script type="module">
  import '@astralengineering/scrubber-bar';
</script>

<scrubber-bar></scrubber-bar>
```

`lit` is a peer dependency, kept external to the bundle so your app supplies a
single shared copy.

## Development

```bash
npm start        # Vite dev server for demo/index.html
npm run build    # bundle to dist/index.js (ESM) + type declarations
npm test         # Vitest (happy-dom) with coverage
npm run lint     # ESLint + Prettier
npm run format   # auto-fix
npm run typecheck
npm run analyze  # regenerate custom-elements.json
```
