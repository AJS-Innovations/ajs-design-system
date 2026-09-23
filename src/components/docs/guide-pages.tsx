import Link from "next/link";
import { CodeBlock } from "./code-block";

export function InstallationGuide() {
  return (
    <div className="max-w-3xl space-y-9">
      <section>
        <h2 className="mb-3 text-lg font-semibold">1. Install the package</h2>
        <p className="mb-4 leading-6 text-slate-500">
          Install the published package{" "}
          <code className="text-xs text-primary">@ajsinnovations/ui</code>. Version 0.1.0 is available on npm.
        </p>
        <CodeBlock label="terminal" code={"npm install @ajsinnovations/ui"} />
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          2. Load the styles and font
        </h2>
        <p className="mb-4 leading-6 text-slate-500">
          The stylesheet is compiled from Tailwind. Consumers do not need
          Tailwind or a source-scanning configuration. Import it once and load
          Switzer from Fontshare in your document head.
        </p>
        <CodeBlock
          code={
            'import "@ajsinnovations/ui/styles.css";\n\n// Add to your document head:\n<link rel="stylesheet"\n  href="https://api.fontshare.com/v2/css?f[]=switzer@1&display=swap" />'
          }
        />
        <p className="mt-3 text-xs text-slate-500">
          The package does not redistribute font binaries. Font source:{" "}
          <a
            href="https://www.fontshare.com/fonts/switzer"
            className="underline"
          >
            Fontshare / Switzer
          </a>
          .{" "}
          <a
            href="https://www.fontshare.com/licenses/itf-ffl"
            className="underline"
          >
            Font license
          </a>
          .
        </p>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          3. Compose your interface
        </h2>
        <CodeBlock
          code={
            '"use client";\nimport { AjsProvider, Button, Field, Input } from "@ajsinnovations/ui";\n\nexport function Example() {\n  return (\n    <AjsProvider>\n      <Field id="business-name" label="Business name" required>\n        <Input placeholder="Your business" />\n      </Field>\n      <Button onClick={() => console.log("Continue")}>Continue</Button>\n    </AjsProvider>\n  );\n}'
          }
        />
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">Compatibility</h2>
        <div className="rounded-[13px] border border-slate-200 bg-[#f9f9fb] p-5">
          <dl className="grid grid-cols-[100px_1fr] gap-3 text-xs">
            <dt className="text-slate-500">React</dt>
            <dd>18.3 or 19, supplied by the consuming app</dd>
            <dt className="text-slate-500">Modules</dt>
            <dd>ESM and CommonJS, with TypeScript declarations</dd>
            <dt className="text-slate-500">Next.js</dt>
            <dd>Client entry directive preserved in the distributed package</dd>
            <dt className="text-slate-500">Styling</dt>
            <dd>
              Compiled Tailwind utilities; scoped base rules under AjsProvider
            </dd>
          </dl>
        </div>
        <p className="mt-4 leading-6 text-slate-500">
          No Next.js dependency, production API, credentials, organization
          branding, or member records are included in the package. Override
          global <code>--ajs-*</code> variables to theme portaled dialogs and
          menus consistently.
        </p>
      </section>
      <Link
        href="/docs/button"
        className="inline-block font-medium underline underline-offset-4"
      >
        Build with Button →
      </Link>
    </div>
  );
}
const colors = [
  ["Primary", "#05152f", "--ajs-primary", "bg-[#05152f]"],
  ["Sidebar", "#0f172a", "--ajs-sidebar", "bg-[#0f172a]"],
  ["Foreground", "#1e293b", "--ajs-foreground", "bg-[#1e293b]"],
  ["Muted", "#64748b", "--ajs-muted", "bg-[#64748b]"],
  ["Background", "#f1f5f9", "--ajs-background", "bg-[#f1f5f9]"],
  ["Card", "#ffffff", "--ajs-card", "bg-white"],
  ["Subtle", "#f9f9fb", "--ajs-subtle", "bg-[#f9f9fb]"],
  ["Border", "#cbd5e1", "--ajs-border", "bg-[#cbd5e1]"],
  ["Divider", "#e2e8f0", "--ajs-divider", "bg-[#e2e8f0]"],
  ["Success", "#16a34a", "--ajs-success", "bg-[#16a34a]"],
  ["Danger", "#dc2626", "--ajs-danger", "bg-[#dc2626]"],
];
export function TokensGuide() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-5 text-lg font-semibold">Color</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {colors.map(([name, hex, token, cls]) => (
            <div
              key={name}
              className="overflow-hidden rounded-md border border-slate-200"
            >
              <div className={`h-20 border-b border-slate-200 ${cls}`} />
              <div className="p-3">
                <p className="font-medium">
                  {name}
                  <span className="float-right text-[10px] text-slate-400">
                    {hex}
                  </span>
                </p>
                <code className="mt-1 block text-[10px] text-slate-500">
                  {token}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Typography · Switzer</h2>
        <p className="mb-5 text-slate-500">
          The reference uses a 13px base with a compact 10 / 11 / 12 / 13 / 14 /
          16 / 18 / 20px scale. These docs use the same scale for component
          content.
        </p>
        <div className="divide-y divide-slate-200 rounded-[13px] border border-slate-200 bg-[#f9f9fb] px-5">
          {[
            ["text-xl font-semibold", "20 / 28 · Page title"],
            ["text-lg font-semibold", "18 / 27 · Section title"],
            ["text-base font-medium", "16 / 24 · Panel title"],
            ["text-sm font-medium", "14 / 21 · Field label"],
            ["text-[13px]", "13 / 19.5 · Body"],
            ["text-xs", "12 / 18 · Supporting text"],
            ["text-[10px] uppercase", "10 / 15 · Metadata"],
          ].map(([cls, label]) => (
            <div
              key={label}
              className="flex flex-wrap items-center justify-between gap-3 py-5"
            >
              <span className={cls}>The details make the difference.</span>
              <span className="text-[10px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Geometry</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Field", "50px high · 6px radius"],
            ["Button", "40px high · pill radius"],
            ["Sidebar", "275px wide · 40px rows"],
            ["Dialog", "600px maximum width"],
            ["Table", "13px radius · 12px cells"],
            ["Tabs", "3px active underline"],
          ].map(([name, value]) => (
            <div key={name} className="rounded-md border border-slate-200 p-4">
              <p className="font-medium">{name}</p>
              <p className="mt-2 text-xs text-slate-500">{value}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          Override once, reuse everywhere
        </h2>
        <CodeBlock
          label="css"
          code={
            ':root {\n  --ajs-primary: #05152f;\n  --ajs-sidebar: #0f172a;\n  --ajs-font: "Switzer", ui-sans-serif, system-ui, sans-serif;\n}'
          }
        />
      </section>
    </div>
  );
}
const coverage = [
  [
    "Sign-in",
    "Measured",
    "Fields, password toggle, button, authentication surface",
  ],
  [
    "Dashboard",
    "Measured",
    "Sidebar, tabs, rounded tables, status, chart containers",
  ],
  [
    "Chapter contacts",
    "Measured",
    "Search, table headers, avatars, action menu, information dialog",
  ],
  ["My contacts", "Coming Soon", "Only the placeholder screen is exposed"],
  [
    "Events & meetings",
    "Unavailable",
    "Link did not navigate; direct route returned to the app root",
  ],
  [
    "Schemes",
    "Empty state",
    "Tabs, search, empty state; no populated scheme card available",
  ],
  [
    "Donations",
    "Empty state",
    "Tabs, search, empty state; no donation submission performed",
  ],
  [
    "Referrals",
    "Empty state",
    "Table, action button; referral submission not performed",
  ],
  [
    "ID card",
    "Adapted",
    "Generic identity composition; organization artwork excluded",
  ],
  ["Certificates", "Coming Soon", "Only the placeholder screen is exposed"],
  ["Knowledge base", "Coming Soon", "Only the placeholder screen is exposed"],
  [
    "Connected apps",
    "Measured",
    "Category chips, app cards, feature tags, metadata",
  ],
  ["Account", "Measured", "Profile, accordions, record history"],
  [
    "Business settings",
    "Measured",
    "Form fields and selectors; no changes saved",
  ],
  ["Change password", "Measured", "Password fields; form not submitted"],
  ["Help and support", "Coming Soon", "Only the placeholder screen is exposed"],
  [
    "Admin dashboard",
    "Measured",
    "Compact sidebar, toolbar, metric cards, chart containers",
  ],
  [
    "Admin members",
    "Measured",
    "View menu, table toolbar, quick-create dialog; no submission",
  ],
  [
    "Admin settings",
    "Measured",
    "Settings groups, compact forms, uploads and configuration tables; no changes saved",
  ],
  [
    "Admin events, payments & reports",
    "Limited",
    "Some controls did not navigate or routes returned to the root",
  ],
];
export function CoverageGuide() {
  return (
    <div className="space-y-7">
      <p className="max-w-3xl leading-6 text-slate-500">
        The reference was inspected read-only on 23 September 2026. This library
        extracts reusable design patterns; it does not reproduce the source
        application’s data, integrations, advertisements, or branding.
        Pixel-perfect coverage of every possible state has not been established.
      </p>
      <div className="overflow-x-auto rounded-[13px] border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f9f9fb]">
            <tr>
              {["Source area", "Coverage", "Extracted patterns / limit"].map(
                (v) => (
                  <th
                    key={v}
                    className="border-b border-slate-200 p-4 font-medium"
                  >
                    {v}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {coverage.map(([area, state, detail]) => (
              <tr
                key={area}
                className="border-b border-slate-200 last:border-0"
              >
                <td className="p-4 font-medium whitespace-nowrap">{area}</td>
                <td className="p-4 text-slate-500 whitespace-nowrap">
                  {state}
                </td>
                <td className="min-w-64 p-4 text-slate-500">{detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-lg font-semibold">Library extensions</h2>
      <p className="leading-6 text-slate-500">
        Switches, feedback variants, pagination, non-zero chart data, and the
        documentation command palette are implementation additions using the
        reference tokens. Radix supplies keyboard interaction, focus management,
        and accessible semantics. Screenshots were used to inspect layouts;
        personal records were replaced with fictional fixtures.
      </p>
    </div>
  );
}
