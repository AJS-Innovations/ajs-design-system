import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import {
  ComponentPreview,
  InstallCommand,
} from "@/components/landing/component-preview";

const features = [
  {
    number: "01",
    title: "Start with the essentials.",
    description:
      "Buttons, fields, dialogs, and tables. Thoughtful defaults for the interfaces you build every day.",
    href: "/docs/button",
    link: "Explore components",
  },
  {
    number: "02",
    title: "Make the system yours.",
    description:
      "Shared colors, spacing, and typography. One set of tokens to keep your product feeling consistent.",
    href: "/docs/tokens",
    link: "Meet the design tokens",
  },
  {
    number: "03",
    title: "Go from parts to pages.",
    description:
      "Sidebars, app shells, and admin patterns. Put the pieces together without starting from scratch.",
    href: "/docs/app-shell",
    link: "Browse the patterns",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#060607] text-[#f5f5f6] selection:bg-[#ff4b4b]/30">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded focus:bg-[#ff4b4b] focus:p-3 focus:text-[#060607]"
      >
        Skip to content
      </a>
      <header className="mx-auto max-w-[1240px] px-5 pt-6 sm:px-8">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[800px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0c0d0f] py-2 pr-2 pl-5"
        >
          <Link
            href="/"
            aria-label="AJS UI home"
            className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-[#ff4b4b]"
          >
            <Image
              src="/assets/ajs-logo.png"
              alt="AJS Innovations"
              width={76}
              height={36}
              className="h-8 w-auto"
              priority
            />
            <span className="border-l border-white/15 pl-3 text-sm font-medium">
              UI
            </span>
          </Link>
          <div className="flex items-center gap-5 sm:gap-7">
            <a
              href="https://github.com/AJS-Innovations/ajs-design-system"
              aria-label="AJS UI on GitHub"
              className="text-[#b2b2ba] hover:text-white"
            >
              <Github size={18} />
            </a>
            <Link
              href="/docs"
              className="inline-flex h-10 items-center gap-3 rounded-full bg-[#ff4b4b] px-4 text-xs font-semibold text-[#060607] hover:bg-[#ff7070] sm:px-5"
            >
              Documentation <ArrowUpRight size={15} />
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content">
        <section className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 pt-20 pb-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28 lg:pb-24">
          <div>
            <p className="mb-6 flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-[#b2b2ba] uppercase">
              <span className="size-1.5 rounded-full bg-[#ff4b4b]" />
              The AJS React component library
            </p>
            <h1 className="text-[clamp(3.2rem,6.5vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.055em]">
              Less setup.
              <br />
              More <span className="text-[#ff4b4b]">building.</span>
            </h1>
            <p className="mt-7 max-w-[400px] text-base leading-7 text-[#a5a5ad]">
              A considered set of components for your next interface. Built with
              React, Radix UI, and Tailwind. Ready to make your own.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/docs"
                className="inline-flex h-12 items-center gap-6 rounded-lg bg-[#ff4b4b] px-6 text-sm font-semibold text-[#060607] hover:bg-[#ff7070]"
              >
                Start building <ArrowRight size={17} />
              </Link>
              <Link
                href="/docs/button"
                className="inline-flex items-center gap-2 py-3 text-sm text-[#e1e1e5] hover:text-[#ff4b4b]"
              >
                View components <ArrowUpRight size={16} />
              </Link>
            </div>
            <InstallCommand />
          </div>
          <ComponentPreview />
        </section>
        <div className="border-y border-white/10">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-6 text-xs sm:px-8">
            <p className="text-[#a5a5ad]">Fits right into your stack.</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-medium text-[#d3d3d9]">
              <span>React</span>
              <span>TypeScript</span>
              <span>Radix UI</span>
              <span>Tailwind CSS</span>
              <span>Next.js ready</span>
            </div>
          </div>
        </div>
        <section
          aria-labelledby="foundation-heading"
          className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 lg:py-20"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="foundation-heading"
              className="max-w-md text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
            >
              A shared foundation.
              <br />
              <span className="text-[#8d8d97]">Room for your ideas.</span>
            </h2>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm text-[#b2b2ba] hover:text-white"
            >
              Inside the library <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="border-t border-white/15 pt-6"
              >
                <span className="text-xs text-[#ff4b4b]">{feature.number}</span>
                <h3 className="mt-5 text-lg font-medium">{feature.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#a5a5ad]">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-medium hover:text-[#ff4b4b]"
                >
                  {feature.link}
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-6 py-7 text-xs text-[#a5a5ad] sm:px-8">
          <p>
            Built by{" "}
            <a
              href="https://ajsinnovations.in/"
              className="text-[#e1e1e5] hover:text-[#ff4b4b]"
            >
              AJS Innovations ↗
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-white">
              Documentation
            </Link>
            <a
              href="https://www.npmjs.com/package/@ajsinnovations/ui"
              className="hover:text-white"
            >
              npm ↗
            </a>
            <a
              href="https://github.com/AJS-Innovations/ajs-design-system"
              className="hover:text-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
