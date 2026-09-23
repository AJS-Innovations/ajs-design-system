import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Code2,
  PanelLeft,
  Palette,
  Package,
} from "lucide-react";
const sections = [
  {
    name: "Foundations",
    description:
      "Color, typography, spacing, and surface tokens measured from the reference.",
    icon: Palette,
    href: "/docs/tokens",
    count: "Shared design tokens",
  },
  {
    name: "Components",
    description:
      "Accessible controls with interactive examples and typed APIs.",
    icon: Box,
    href: "/docs/button",
    count: "Primitives & controls",
  },
  {
    name: "Patterns",
    description: "Sidebars, tables, dialogs, and forms that work together.",
    icon: PanelLeft,
    href: "/docs/sidebar",
    count: "Composed interfaces",
  },
];
export default function DocsOverview() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          AJS Innovations · React component library
        </div>
        <h1 className="max-w-2xl text-[32px] leading-[1.2] font-semibold tracking-tight">
          Familiar components.
          <br />
          <span className="text-slate-400">A shared foundation.</span>
        </h1>
        <p className="mt-5 max-w-[500px] text-[13px] leading-6 text-slate-500">
          A standalone design system for building AJS interfaces. Measured
          components, accessible interactions, and Tailwind styling, ready to
          use in your next project.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/docs/installation"
            className="inline-flex h-10 items-center gap-3 rounded-full bg-primary px-5 text-sm font-medium text-white"
          >
            Get started <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/docs/button"
            className="inline-flex h-10 items-center gap-3 rounded-full border border-border px-5 text-sm font-medium"
          >
            Explore components <Box size={16} />
          </Link>
        </div>
        <div className="mt-9 flex max-w-[540px] items-center gap-3 rounded-md border border-border bg-[#f9f9fb] px-4 py-4">
          <span className="text-slate-400">$</span>
          <code className="overflow-x-auto text-xs">
            npm install @ajsinnovations/ui
          </code>
          <Package className="ml-auto shrink-0 text-slate-400" size={16} />
        </div>
        <p className="mt-2 text-[10px] text-slate-400">
          Version 0.1.1 · Available on npm.
        </p>
        <div className="mt-12 border-t border-slate-200 pt-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Inside the system</h2>
            <span className="text-[10px] text-slate-400">Built for reuse</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {sections.map(({ name, description, icon: Icon, href, count }) => (
              <Link
                href={href}
                key={name}
                className="group rounded-[13px] border border-slate-200 bg-[#f9f9fb] p-5 hover:border-slate-400"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Icon size={20} className="text-slate-500" />
                  <ArrowUpRight
                    size={14}
                    className="text-slate-300 group-hover:text-primary"
                  />
                </div>
                <h3 className="text-base font-medium">{name}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {description}
                </p>
                <p className="mt-5 text-[10px] font-medium text-slate-400">
                  {count}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-2">
            <Code2 size={14} />
            TypeScript
          </span>
          <span>React + Radix UI</span>
          <span>Tailwind CSS</span>
          <span>Switzer by Fontshare</span>
        </div>
      </div>
    </>
  );
}
