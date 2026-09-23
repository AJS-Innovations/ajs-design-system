# Publishing @ajsinnovations/ui

Run commands from the workspace root. Your npm account must own the `ajsinnovations` scope or have permission to publish to it.

## First-time authentication

```sh
npm login --auth-type=web
npm whoami
```

Complete npm's browser verification yourself. Never commit npm credentials or paste tokens into documentation.

## Prepare the release

Update `packages/ui/package.json` and the changelog for a new release. npm versions cannot be overwritten after publication.

```sh
npm run build:ui
npm run lint
npm run typecheck
npm run build
npm exec -- playwright test
npm run pack:ui
npm publish ./ajsinnovations-ui-0.1.1.tgz --access public --dry-run
```

Start the docs server before Playwright. Inspect the tarball contents and install the tarball in a separate React application before publishing. It should contain only the library build, tokens, package metadata, and documentation. It must not contain private reference data, credentials, or the documentation application.

## Publish the inspected artifact

```sh
npm publish ./ajsinnovations-ui-0.1.1.tgz --access public
npm view @ajsinnovations/ui version
```

Complete any npm two-factor or browser verification prompt. For later versions, substitute the matching tarball filename. Publish the exact artifact you validated.
