# \<scrubber-bar>

A [Lit](https://lit.dev) range/scrubber web component for scrubbing through
media, with optional section markers.

This is a fork of [`@internetarchive/scrubber-bar`](https://github.com/internetarchive/iaux/tree/main/packages/scrubber-bar)
(part of the Internet Archive UX monorepo). Because the upstream is licensed
AGPL-3.0-only, so is this fork. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).

## Demo

Live demo: https://livemusicarchive.github.io/scrubber-bar/

It's the `demo/` app deployed to GitHub Pages on every push to `main` (see
[.github/workflows/deploy-demo.yml](./.github/workflows/deploy-demo.yml)). Build
it locally with `pnpm build:demo`, then `pnpm preview:demo`.

## Installation

Published to the Astral Engineering registry:

```bash
pnpm add @astralengineering/scrubber-bar
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

This repo uses [pnpm](https://pnpm.io). Run `pnpm install` first (the pinned
version comes from the `packageManager` field, so Corepack picks it up
automatically).

```bash
pnpm start      # Vite dev server for demo/index.html
pnpm build      # bundle to dist/index.js (ESM) + type declarations
pnpm test       # Vitest (happy-dom) with coverage
pnpm lint       # ESLint + Prettier
pnpm format     # auto-fix
pnpm typecheck
pnpm analyze    # regenerate custom-elements.json
```
