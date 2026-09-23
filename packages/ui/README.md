# @ajsinnovations/ui

AJS Innovations' React component library: compact forms, tables, navigation, dialogs, and member/admin interface patterns. Built with TypeScript, Radix UI, and Tailwind CSS.

## Install

```sh
npm install @ajsinnovations/ui
```

Requires React and React DOM 18.3 or 19. Includes ESM, CommonJS, TypeScript declarations, and compiled CSS. Tailwind and Next.js are **not required** in your application.

## Quick start

Import the stylesheet once at your application entry, then wrap your interface with `AjsProvider` to apply the base typography and resets.

```tsx
import "@ajsinnovations/ui/styles.css";
import { AjsProvider, Button, Field, Input } from "@ajsinnovations/ui";

export default function App() {
  return (
    <AjsProvider>
      <form onSubmit={(event) => event.preventDefault()}>
        <Field id="name" label="Business name" required>
          <Input name="name" placeholder="Your business" />
        </Field>
        <Button type="submit">Continue</Button>
      </form>
    </AjsProvider>
  );
}
```

### Next.js App Router

Import `@ajsinnovations/ui/styles.css` in `app/layout.tsx`. Components are distributed with a `"use client"` entry directive. Put event handlers and state in your own client component. The package does not depend on Next.js.

### Switzer font

Add this stylesheet to your document head:

```html
<link
  rel="stylesheet"
  href="https://api.fontshare.com/v2/css?f[]=switzer@1&display=swap"
/>
```

Switzer is supplied by [Fontshare](https://www.fontshare.com/fonts/switzer) under its [font license](https://www.fontshare.com/licenses/itf-ffl). Font binaries are not bundled. Without this stylesheet, components use the system sans-serif fallback.

## Components

| Area       | Exports                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundation | `AjsProvider`, `Button`, `buttonVariants`, `cn`                                                                                             |
| Forms      | `Input`, `CompactInput`, `PasswordInput`, `SearchInput`, `Textarea`, `Label`, `Field`, `Checkbox`, `Switch`, `FileUpload`                   |
| Selection  | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`                                                                     |
| Content    | `Card`, `CardHeader`, `CardContent`, `Badge`, `Avatar`, `Separator`, `Skeleton`, `Alert`                                                    |
| Tabs       | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`                                                                                            |
| Accordion  | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`                                                                        |
| Dialog     | `Dialog`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter` |
| Menus      | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `Tooltip`                        |
| Data       | `DataTable`, `ChartPanel`, `Timeline`, `DetailList`, `MetricCard`                                                                           |
| Layout     | `Sidebar`, `AppShell`, `PageHeader`, `AdminToolbar`, `ListToolbar`, `SettingsGroup`                                                         |
| Patterns   | `EmptyState`, `FilterChip`, `AppCard`, `ProfileCard`, `IdentityCard`, `AuthCard`                                                            |

### Buttons

```tsx
<Button variant="outline" size="sm" shape="rounded">Cancel</Button>
<Button loading={saving} type="submit">Save changes</Button>
<Button asChild><a href="/dashboard">Dashboard</a></Button>
```

- `variant`: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`.
- `size`: `sm` (32px), `default` (40px), `lg` (48px), `icon` (40px square).
- `shape`: `pill` (default) or `rounded`.
- `asChild`: supply exactly one element; interactive behavior follows that element. A disabled anchor still needs application-level navigation handling.
- Native button props and a forwarded ref are supported. Set `type="button"` for non-submit buttons inside forms.

### Fields and validation

```tsx
<Field id="email" label="Email" required error={errors.email}>
  <Input name="email" type="email" autoComplete="email" />
</Field>
```

`Field` associates its label, hint/error, required state, and `aria-invalid` with one child control. Application code owns validation and submission. Standard inputs are 50px tall; `CompactInput` is 42px.

### Dialogs

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button type="button">View details</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Business details</DialogTitle>
      <DialogDescription>Review the selected business.</DialogDescription>
    </DialogHeader>
    <DialogBody>Details go here.</DialogBody>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Radix manages keyboard navigation, focus trapping, Escape dismissal, and focus restoration. Always provide a title and an appropriate description. Dialogs and menus render into portals with their own base styling.

### Typed data tables

```tsx
import { DataTable, type Column } from "@ajsinnovations/ui";

type Person = { id: string; name: string; city: string };
const columns: Column<Person>[] = [
  { id: "name", header: "Name", accessor: (row) => row.name, sortable: true },
  { id: "city", header: "City", accessor: (row) => row.city },
];

<DataTable<Person>
  data={[{ id: "1", name: "Alex Morgan", city: "Hyderabad" }]}
  columns={columns}
  rowKey={(row) => row.id}
  caption="Contacts"
  searchPlaceholder="Search contacts"
  pageSize={10}
/>;
```

Search, sorting, and pagination operate on the supplied data in memory. This component does not fetch records, support server pagination, or virtualize large datasets. Use `cell` on a column for custom rendering and keep `accessor` searchable/sortable.

### Navigation

```tsx
<AppShell
  sidebar={
    <Sidebar
      brand={<strong>Your application</strong>}
      variant="admin"
      activeId="overview"
      items={[{ id: "overview", label: "Overview", href: "/overview" }]}
    />
  }
>
  <PageHeader title="Overview" />
</AppShell>
```

`Sidebar` supports member (275px) and admin (225px) variants, nested items, optional user details, and callbacks. `AppShell` provides a mobile navigation drawer. In the latest workspace, set its `variant` to match `Sidebar`, use `mobileBrand` for the compact header, and provide `mainId` when multiple shells appear on one page. Sidebar selections dismiss the mobile drawer. These additions are unreleased and are not included in npm 0.1.0. Supply `onNavigate` when your router should handle navigation instead of standard links.

## Theme and styling

Import overrides **after** the package CSS. Set variables globally so portaled content receives the same theme:

```css
:root {
  --ajs-primary: #05152f;
  --ajs-foreground: #1e293b;
  --ajs-background: #f1f5f9;
  --ajs-card: #ffffff;
  --ajs-subtle: #f9f9fb;
  --ajs-border: #cbd5e1;
  --ajs-divider: #e2e8f0;
  --ajs-muted: #64748b;
  --ajs-sidebar: #0f172a;
  --ajs-success: #16a34a;
  --ajs-danger: #dc2626;
  --ajs-font: "Switzer", ui-sans-serif, system-ui, sans-serif;
}
```

`@ajsinnovations/ui/tokens.css` exports only the variables. `styles.css` already includes them, so importing both is unnecessary. Base resets are scoped to `.ajs-root`; compiled Tailwind utility selectors are global. Applications with their own Tailwind utilities should check cascade ordering. `className` customizations require your application to supply any additional utility classes that are not included in this package.

Some decorative/status colors remain fixed. This release does not provide a complete dark theme. Root-level overrides are necessary for portals; overriding variables only on a provider does not reach them.

## Behavior and accessibility

- Label inputs and provide accessible names for icon-only buttons.
- Radix controls accept their underlying controlled/uncontrolled props.
- `FileUpload` selects a local file and calls `onFileChange`; it does not upload. `accept` and `maxBytes` are client-side checks, not server validation.
- Charts are lightweight SVG presentations, not an analytics engine.
- Callbacks are application-owned. No authentication, API calls, credentials, or production records are included.
- Keyboard interaction is tested for core docs workflows; this is not a formal accessibility certification.

## Documentation and development

The source workspace includes a Next.js documentation app with live previews, API notes, copyable snippets, design tokens, coverage notes, and Cmd+K / Ctrl+K search. Run `npm install` and `npm run dev` in the workspace root, then open `http://localhost:3000`.

Version 0.1.0 is an initial release. Review changes before upgrading; APIs may change in subsequent 0.x releases.
