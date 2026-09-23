# Deploy the documentation with Coolify

The root Dockerfile builds the Next.js docs and runs its standalone Node server. It uses a multi-stage build, installs from the lockfile, includes public/static assets, and runs as the non-root `node` user. The npm package is not published by deployment.

## Coolify configuration

Create a Git repository application connected to `AJS-Innovations/ajs-design-system` with these settings:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Build Pack | `Dockerfile` |
| Base Directory | `/` (repository root) |
| Dockerfile Location | `/Dockerfile` |
| Ports Exposes | `3000` |
| Domain | Your documentation domain, with `https://` |

Keep the default image command; do not override it with `npm start`. Build/install commands are already in the Dockerfile. No database, persistent volume, npm token, or production application credentials are required.

The image sets `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`, `PORT=3000`, and `HOSTNAME=0.0.0.0`. Keep port 3000 unless you also update Coolify's exposed port. The image includes a Node-based HTTP health check for `/`; no curl installation is needed. If you configure a separate Coolify health check, use HTTP GET `/` on port 3000.

Save the settings and deploy. Confirm the home page, `/docs/button`, Cmd+K search, and favicon load at your domain. Switzer loads from Fontshare in the visitor's browser; allow its API/CDN domains if you add a Content Security Policy.

See [Coolify's Dockerfile deployment guide](https://coolify.io/docs/applications/builds/dockerfile) for Git integration and health-check configuration.

## Local Docker verification

```sh
docker build -t ajs-ui-docs .
docker run --rm --name ajs-ui-docs -p 3000:3000 ajs-ui-docs
```

Open http://localhost:3000. If the development server already uses that host port, use `-p 3001:3000` instead.

The final image includes only the standalone runtime and static/public assets. `.dockerignore` excludes local dependencies, builds, credentials, test output, and development metadata from the build context.
