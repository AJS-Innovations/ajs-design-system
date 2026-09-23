"use client";
import * as React from "react";
import { ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Avatar, Button } from "./primitives";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./controls";
import { cn } from "./utils";

const MobileNavigationContext = React.createContext<(() => void) | undefined>(
  undefined,
);

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}
export interface SidebarProps {
  brand: React.ReactNode;
  items: NavigationItem[];
  activeId?: string;
  onNavigate?: (item: NavigationItem) => void;
  user?: { name: string; subtitle?: string; avatar?: string };
  userActions?: { label: string; onSelect: () => void }[];
  footer?: React.ReactNode;
  className?: string;
  variant?: "member" | "admin";
}
export function Sidebar({
  brand,
  items,
  activeId,
  onNavigate,
  user,
  userActions,
  footer,
  className,
  variant = "member",
}: SidebarProps) {
  const closeMobileNavigation = React.useContext(MobileNavigationContext);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col overflow-y-auto text-white",
        variant === "admin"
          ? "w-[225px] bg-[#1e293b]"
          : "w-[275px] bg-ajs-sidebar",
        className,
      )}
    >
      <div className="flex min-h-16 items-center px-4 py-3">{brand}</div>
      {user && (
        <div className="flex flex-col items-center px-3 pt-4 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={!userActions?.length}
              className="flex w-full flex-col items-center rounded-md text-center outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Avatar name={user.name} src={user.avatar} size="lg" />
              <span className="mt-4 flex items-center gap-1 text-[13px] font-semibold">
                {user.name}
                {!!userActions?.length && <ChevronDown size={12} />}
              </span>
              {user.subtitle && (
                <span className="mt-1 text-xs font-medium text-slate-400">
                  {user.subtitle}
                </span>
              )}
            </DropdownMenuTrigger>
            {!!userActions?.length && (
              <DropdownMenuContent>
                {userActions.map((a) => (
                  <DropdownMenuItem key={a.label} onSelect={a.onSelect}>
                    {a.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      )}
      <nav aria-label="Main navigation" className="space-y-1 px-1.5 py-2">
        {items.map((item) => {
          const open =
            expanded[item.id] ??
            !!item.children?.some((c) => c.id === activeId);
          const classes = cn(
            "flex min-h-10 w-full items-center gap-2.5 rounded-md px-2.5 py-2.5 text-left text-[13px] font-medium text-white/80 outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white",
            activeId === item.id && "bg-white/[0.12] text-white",
          );
          return (
            <div key={item.id}>
              {item.children ? (
                <button
                  type="button"
                  aria-expanded={open}
                  className={classes}
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [item.id]: !open }))
                  }
                >
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                  <ChevronRight
                    size={16}
                    className={cn(
                      "ml-auto text-slate-400",
                      open && "rotate-90",
                    )}
                  />
                </button>
              ) : (
                <a
                  href={item.href || "#"}
                  aria-current={activeId === item.id ? "page" : undefined}
                  className={classes}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(item);
                      }
                      closeMobileNavigation?.();
                    }
                  }}
                >
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                </a>
              )}
              {item.children && open && (
                <div className="mt-1 space-y-1">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={child.href || "#"}
                      aria-current={activeId === child.id ? "page" : undefined}
                      className={cn(
                        classes,
                        "pl-9",
                        activeId === child.id && "bg-white/[0.12] text-white",
                      )}
                      onClick={(e) => {
                        if (
                          !e.metaKey &&
                          !e.ctrlKey &&
                          !e.shiftKey &&
                          !e.altKey
                        ) {
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(child);
                          }
                          closeMobileNavigation?.();
                        }
                      }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {footer && <div className="mt-auto p-4">{footer}</div>}
    </aside>
  );
}
export interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  mobileBrand?: React.ReactNode;
  variant?: "member" | "admin";
  mainId?: string;
}

export function AppShell({
  sidebar,
  children,
  footer,
  header,
  mobileBrand,
  variant = "member",
  mainId = "app-content",
}: AppShellProps) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <div className="ajs-root flex min-h-dvh bg-ajs-background text-ajs-foreground">
      <a
        href={`#${mainId}`}
        className="sr-only z-[100] rounded bg-ajs-primary p-3 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      <div className="sticky top-0 hidden h-dvh shrink-0 lg:block">
        {sidebar}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center gap-3 border-b border-ajs-divider bg-ajs-card px-4 lg:hidden">
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/35" />
              <DialogPrimitive.Content
                className={cn(
                  "ajs-root fixed inset-y-0 left-0 z-50 max-w-[calc(100vw-32px)] outline-none [&>aside]:w-full [&>aside>div:first-child]:pr-12",
                  variant === "admin"
                    ? "w-[225px] bg-[#1e293b]"
                    : "w-[275px] bg-ajs-sidebar",
                )}
              >
                <DialogPrimitive.Title className="sr-only">
                  Navigation
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Choose a page from the navigation.
                </DialogPrimitive.Description>
                <MobileNavigationContext.Provider value={() => setOpen(false)}>
                  {sidebar}
                </MobileNavigationContext.Provider>
                <DialogPrimitive.Close
                  aria-label="Close navigation"
                  className="absolute top-4 right-3 rounded p-1 text-white focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={18} />
                </DialogPrimitive.Close>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
          {mobileBrand}
        </div>
        {header}
        <main
          id={mainId}
          tabIndex={-1}
          className="min-w-0 flex-1 bg-ajs-card outline-none"
        >
          {children}
        </main>
        {footer && (
          <footer className="border-t border-ajs-divider bg-ajs-card px-6 py-3 text-[11px] text-ajs-muted">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
