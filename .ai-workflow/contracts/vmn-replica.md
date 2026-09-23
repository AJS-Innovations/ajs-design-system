# VMN component extraction

Recreate the observed VMN member frontend in Next.js App Router, TypeScript, Tailwind CSS, and shadcn-compatible Radix primitives. Production inspection is read-only; do not submit business forms, change account data, or invoke mutations. Credentials must not enter repository files. Local interactions use isolated demo state.

## Phases
1. Inspect sign-in and authenticated member routes; inventory components and states.
2. Extract public brand assets and measured design tokens.
3. Implement reusable primitives, sidebar, shell, and observed member pages.
4. Compare desktop/mobile screenshots; run lint, types, and build.

## Current coverage
- Sign-in inspected at 1440 × 715 CSS pixels.
- Switzer variable font, logo, background, card, button, field dimensions extracted.
- Authenticated inspection pending clarification of supplied login/password.
- Admin inspection deferred until user supplies admin access.

## Initial target file set
package.json, package-lock.json, .gitignore, tsconfig.json, next-env.d.ts, postcss.config.mjs, eslint.config.mjs, components.json, src/app/{globals.css,layout.tsx,page.tsx,sign-in/page.tsx}, src/lib/utils.ts, src/components/ui/{button,input}.tsx, src/components/auth/sign-in.tsx, public/assets/{vmn-logo.svg,switzer-variable.woff2}, README.md, this contract.
