# AJS UI

Standalone React component library published as `@ajsinnovations/ui`, with a Next.js documentation playground. Built with TypeScript, Radix UI, Tailwind CSS, and Switzer.

## Use the package

```sh
npm install @ajsinnovations/ui
```

See [the package README](packages/ui/README.md) for installation, Next.js setup, component examples, theming, and limitations.

## Run the documentation

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use Cmd+K or Ctrl+K to search. The docs include component previews, usage snippets, API notes, design tokens, and a coverage page. The AJS logo and favicon are used by the docs; they are not bundled in the component package.

## Workspace

- `packages/ui/src`: framework-independent React components and tokens.
- `packages/ui/dist`: generated ESM, CommonJS, declarations, and compiled CSS.
- `src/app` and `src/components/docs`: Next.js documentation app.
- `tests/docs.spec.ts`: Playwright docs and interaction checks.

Reference interfaces were inspected read-only. Demos use fictional fixtures and local callbacks; this workspace has no production API integration.

## Validate

```sh
npm run build:ui
npm run lint
npm run typecheck
npm run build
npm exec -- playwright test
npm run pack:ui
```

Playwright expects the documentation server on port 3000 and Chrome installed. The package build emits styles consumers can use without installing Tailwind.

## Release

See [RELEASING.md](RELEASING.md). The root is private; only `packages/ui` is published.

## Deploy the docs

Use the root [Dockerfile](Dockerfile) with Coolify's Dockerfile build pack and port `3000`. See [DEPLOYMENT.md](DEPLOYMENT.md) for the exact settings and local Docker commands.

## Keep preview code in sync

The component Code tabs are generated from the actual live examples in `src/components/docs/component-demo.tsx`. Run `npm run docs:generate` after editing examples; development startup and production builds also regenerate them. Run `npm run docs:check` to verify freshness and typecheck every displayed snippet independently. Do not edit `src/lib/demo-code.generated.ts` by hand.
