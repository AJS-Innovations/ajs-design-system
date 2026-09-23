"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { BadgeCheck, Building2, ChevronDown, Settings, X } from "lucide-react";
import { SearchInput } from "./primitives";
import { cn } from "./utils";

export interface Organization {
  id: string;
  name: string;
  code?: string;
  memberCount?: number;
  logo?: React.ReactNode;
}

export interface OrganizationSwitcherProps {
  organizations: Organization[];
  selectedId?: string;
  label?: string;
  onSelect?: (organization: Organization) => void;
  onManage?: () => void;
  disabled?: boolean;
}

export function OrganizationSwitcher({
  organizations,
  selectedId,
  label = "Select organization",
  onSelect,
  onManage,
  disabled,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const selected = organizations.find(
    (organization) => organization.id === selectedId,
  );
  const visible = organizations.filter((organization) =>
    organization.name
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <Dialog.Trigger
        disabled={disabled}
        className="flex min-w-0 items-center gap-2 rounded px-2 py-2 text-xs outline-none hover:bg-ajs-background focus-visible:ring-2 focus-visible:ring-ajs-primary disabled:opacity-50"
        aria-label={`Switch organization: ${selected?.name || label}`}
      >
        <span className="max-w-[225px] truncate">
          {selected?.name || label}
        </span>
        <ChevronDown aria-hidden size={15} className="shrink-0" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" onClick={() => { setOpen(false); setQuery(""); }} />
        <Dialog.Content className="ajs-root fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-ajs-card text-ajs-foreground shadow-xl outline-none sm:w-[400px]">
          <div className="flex min-h-[65px] shrink-0 items-center gap-3 border-b border-ajs-divider bg-[#f7f7fe] px-5 py-4">
            <Dialog.Title className="min-w-0 flex-1 text-base font-medium">
              Organizations
            </Dialog.Title>
            {onManage && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  onManage();
                }}
                className="flex items-center gap-1 border-r border-ajs-divider pr-3 text-xs font-medium text-ajs-primary outline-none focus-visible:ring-2 focus-visible:ring-ajs-primary"
              >
                <Settings aria-hidden size={16} />
                Manage
              </button>
            )}
            <Dialog.Close
              aria-label="Close organizations"
              className="rounded p-1 text-red-600 outline-none focus-visible:ring-2 focus-visible:ring-ajs-primary"
            >
              <X size={16} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Search for an organization and select it to switch workspaces.
          </Dialog.Description>
          <div className="shrink-0 border-b border-ajs-divider p-3">
            <SearchInput
              aria-label="Search organizations"
              placeholder="Search By Name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ul aria-label="Organizations" className="list-none p-0">
              {visible.map((organization) => (
                <li key={organization.id}>
                  <button
                    type="button"
                    aria-current={
                      organization.id === selectedId ? "true" : undefined
                    }
                    onClick={() => {
                      onSelect?.(organization);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex min-h-[73px] w-full items-center gap-3 border-b border-transparent px-3 py-4 text-left outline-none hover:bg-ajs-subtle focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ajs-primary",
                      organization.id === selectedId &&
                        "border-ajs-divider bg-ajs-subtle",
                    )}
                  >
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-ajs-divider bg-ajs-card text-ajs-muted"
                    >
                      {organization.logo || <Building2 size={20} />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block truncate text-[13px] font-bold"
                        title={organization.name}
                      >
                        {organization.name}
                      </span>
                      <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-ajs-primary">
                        {organization.code !== undefined && (
                          <span>Organization ID: {organization.code}</span>
                        )}
                        {organization.memberCount !== undefined && (
                          <span
                            className={
                              organization.code !== undefined
                                ? "border-l border-ajs-divider pl-2"
                                : undefined
                            }
                          >
                            Member Count: {organization.memberCount}
                          </span>
                        )}
                      </span>
                    </span>
                    {organization.id === selectedId && (
                      <BadgeCheck
                        aria-label="Current organization"
                        size={18}
                        className="shrink-0 text-green-500"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {!visible.length && (
              <p
                role="status"
                className="px-5 py-10 text-center text-sm text-ajs-muted"
              >
                {organizations.length
                  ? "No organizations match your search."
                  : "No organizations available."}
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
