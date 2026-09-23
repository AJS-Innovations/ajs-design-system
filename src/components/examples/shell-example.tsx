"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  EllipsisVertical,
  Globe,
  Home,
  LayoutGrid,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import * as UI from "../../../packages/ui/src";

type View = "dashboard" | "contacts" | "apps" | "settings";
type Person = {
  id: string;
  name: string;
  company: string;
  city: string;
  status: "Active" | "Pending";
};
const initialPeople: Person[] = [
  {
    id: "1",
    name: "Alex Morgan",
    company: "Northstar Studio",
    city: "Hyderabad",
    status: "Active",
  },
  {
    id: "2",
    name: "Jamie Chen",
    company: "Fieldwork Design",
    city: "Bengaluru",
    status: "Pending",
  },
  {
    id: "3",
    name: "Taylor Reed",
    company: "Common Ground",
    city: "Chennai",
    status: "Active",
  },
  {
    id: "4",
    name: "Jordan Lee",
    company: "Paperplane",
    city: "Pune",
    status: "Active",
  },
  {
    id: "5",
    name: "Sam Rivera",
    company: "New Leaf",
    city: "Mumbai",
    status: "Pending",
  },
];
const titles: Record<View, string> = {
  dashboard: "Dashboard",
  contacts: "Contacts",
  apps: "Connected apps",
  settings: "Account settings",
};

export function ShellExample() {
  const [mode, setMode] = useState<"member" | "admin">("admin");
  const [view, setView] = useState<View>("dashboard");
  const [workspace, setWorkspace] = useState("Acme Network");
  const [people, setPeople] = useState(initialPeople);
  const [filter, setFilter] = useState("All members");
  const [period, setPeriod] = useState("This Fiscal Year");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<"create" | "notifications" | null>(null);
  const [selected, setSelected] = useState<Person | null>(null);
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex@example.com",
    company: "Northstar Studio",
    city: "Hyderabad",
    notifications: true,
  });
  const [appFilter, setAppFilter] = useState("All apps");
  const navigate = (next: View) => {
    setView(next);
    setNotice("");
  };
  const items: UI.NavigationItem[] = [
    {
      id: "dashboard",
      label: "Home",
      icon: <Home size={17} />,
      href: "#dashboard",
    },
    {
      id: "contacts",
      label: mode === "admin" ? "Members" : "Contacts",
      icon: <Users size={17} />,
      href: "#contacts",
    },
    {
      id: "apps",
      label: "Connected apps",
      icon: <LayoutGrid size={17} />,
      href: "#apps",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={17} />,
      children: [
        { id: "account", label: "Account settings", href: "#settings" },
      ],
    },
  ];
  const columns: UI.Column<Person>[] = [
    {
      id: "name",
      header: "Name",
      accessor: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <UI.Avatar name={row.name} size="sm" />
          {row.name}
        </div>
      ),
    },
    {
      id: "company",
      header: "Business name",
      accessor: (row) => row.company,
      sortable: true,
    },
    { id: "city", header: "City", accessor: (row) => row.city, sortable: true },
    {
      id: "status",
      header: "Status",
      accessor: (row) => row.status,
      cell: (row) => (
        <UI.Badge variant={row.status === "Active" ? "success" : "warning"}>
          {row.status}
        </UI.Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessor: () => "",
      cell: (row) => (
        <UI.DropdownMenu>
          <UI.DropdownMenuTrigger asChild>
            <UI.Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Actions for ${row.name}`}
            >
              <EllipsisVertical size={16} />
            </UI.Button>
          </UI.DropdownMenuTrigger>
          <UI.DropdownMenuContent>
            <UI.DropdownMenuItem onSelect={() => setSelected(row)}>
              Business information
            </UI.DropdownMenuItem>
          </UI.DropdownMenuContent>
        </UI.DropdownMenu>
      ),
    },
  ];
  const filteredPeople = people.filter(
    (person) =>
      filter === "All members" ||
      person.status === (filter === "Approved" ? "Active" : "Pending"),
  );
  const active = people.filter((person) => person.status === "Active").length;
  const brand = (
    <Link href="/docs" className="flex items-center gap-3">
      <Image
        src="/assets/ajs-logo.png"
        alt="AJS Innovations"
        width={76}
        height={36}
        className="h-8 w-auto"
      />
      <span className="border-l border-white/20 pl-3 text-sm">UI</span>
    </Link>
  );
  return (
    <UI.AppShell
      variant={mode}
      mobileBrand={<span className="font-semibold">{workspace}</span>}
      sidebar={
        <UI.Sidebar
          variant={mode}
          brand={brand}
          items={items}
          activeId={view === "settings" ? "account" : view}
          onNavigate={(item) =>
            navigate(item.id === "account" ? "settings" : (item.id as View))
          }
          user={
            mode === "member"
              ? { name: profile.name, subtitle: "Professional member" }
              : undefined
          }
          userActions={[
            { label: "Account settings", onSelect: () => navigate("settings") },
          ]}
          footer={
            <Link
              href="/docs/app-shell"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to documentation
            </Link>
          }
        />
      }
      header={
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ajs-divider bg-ajs-subtle px-4 py-3">
            <div>
              <span className="font-semibold">App shell playground</span>
              <span className="ml-3 text-xs text-ajs-muted">
                Fictional data · changes reset on reload
              </span>
            </div>
            <div role="group" aria-label="Shell variant" className="flex gap-1">
              {(["member", "admin"] as const).map((value) => (
                <UI.Button
                  key={value}
                  type="button"
                  variant={mode === value ? "default" : "ghost"}
                  size="sm"
                  shape="rounded"
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                >
                  {value === "member" ? "Member" : "Admin"}
                </UI.Button>
              ))}
            </div>
          </div>
          <UI.AdminToolbar
            workspace={workspace}
            workspaces={["Acme Network", "Design Team"]}
            onWorkspaceChange={(value) => {
              setWorkspace(value);
              setNotice(
                `Preview workspace changed to ${value}. The same sample records are shared between workspaces.`,
              );
            }}
            userName={profile.name}
            onNotifications={() => setDialog("notifications")}
            onSettings={() => navigate("settings")}
            userActions={[
              { label: "View account", onSelect: () => navigate("settings") },
            ]}
          />
        </>
      }
      footer={
        <div className="flex flex-wrap justify-between gap-2">
          <span>{workspace} · Local component example</span>
          <Link href="/docs/coverage" className="underline underline-offset-2">
            Component coverage
          </Link>
        </div>
      }
    >
      <UI.PageHeader
        title={
          view === "contacts" && mode === "admin" ? "Members" : titles[view]
        }
        description={
          view === "dashboard"
            ? `Welcome back, ${profile.name.split(" ")[0]}. Here is your workspace overview.`
            : "Explore the components together in a complete layout."
        }
        actions={
          view === "contacts" && mode === "admin" ? (
            <UI.Button onClick={() => setDialog("create")}>
              <Plus size={16} />
              Create member
            </UI.Button>
          ) : undefined
        }
      />
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {notice && (
          <UI.Alert
            title={notice}
            variant="success"
            onDismiss={() => setNotice("")}
          />
        )}
        {view === "dashboard" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <UI.MetricCard
                value={people.length}
                label="Total members"
                tone="indigo"
              />
              <UI.MetricCard
                value={people.length - active}
                label="Review pending"
                tone="orange"
              />
              <UI.MetricCard value={active} label="Approved" tone="green" />
              <UI.MetricCard value="0" label="Rejected" tone="red" />
            </div>
            <div className="grid items-start gap-6 xl:grid-cols-[1.25fr_1fr]">
              <UI.ChartPanel
                title="Income"
                total={
                  period === "This Fiscal Year" ? "₹12,000.00" : "₹9,000.00"
                }
                period={period}
                onPeriodChange={setPeriod}
                points={["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(
                  (label, i) => ({
                    label,
                    value: (period === "This Fiscal Year"
                      ? [1000, 1500, 2000, 2500, 2000, 3000]
                      : [1000, 1500, 1000, 1500, 2000, 2000])[i],
                  }),
                )}
              />
              <UI.Card>
                <UI.CardHeader>
                  <h2 className="text-base font-semibold">Recent activity</h2>
                </UI.CardHeader>
                <UI.CardContent>
                  <UI.Timeline
                    items={[
                      {
                        id: "1",
                        date: "Today, 10:30 AM",
                        title: "Profile updated",
                        description: "Alex Morgan updated business details.",
                      },
                      {
                        id: "2",
                        date: "Yesterday, 4:15 PM",
                        title: "Member joined",
                        description: "Jamie Chen joined the workspace.",
                      },
                      {
                        id: "3",
                        date: "21 Sep 2026",
                        title: "Workspace created",
                        description: "Your shared space is ready.",
                      },
                    ]}
                  />
                </UI.CardContent>
              </UI.Card>
            </div>
            <UI.Card className="overflow-hidden">
              <UI.CardHeader className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold">Recent members</h2>
                <UI.Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate("contacts")}
                >
                  View all members
                </UI.Button>
              </UI.CardHeader>
              <UI.DataTable
                data={people}
                columns={columns}
                rowKey={(row) => row.id}
                pageSize={3}
                caption="Recent members"
              />
            </UI.Card>
          </>
        )}
        {view === "contacts" && (
          <UI.Card className="overflow-hidden">
            <UI.ListToolbar
              title={filter}
              views={["All members", "Approved", "Pending"]}
              onViewChange={setFilter}
            >
              <span className="text-xs text-ajs-muted">
                {filteredPeople.length} records
              </span>
            </UI.ListToolbar>
            <UI.DataTable
              data={filteredPeople}
              columns={columns}
              rowKey={(row) => row.id}
              pageSize={4}
              searchPlaceholder="Search members"
              caption="Workspace members"
            />
          </UI.Card>
        )}
        {view === "apps" && (
          <>
            <div className="flex flex-wrap gap-3">
              {["All apps", "Business", "Tools"].map((value) => (
                <UI.FilterChip
                  key={value}
                  active={appFilter === value}
                  onClick={() => setAppFilter(value)}
                >
                  {value}
                </UI.FilterChip>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {appFilter !== "Tools" && (
                <UI.AppCard
                  title="Digital Card"
                  description="Share a professional profile with your network."
                  icon={<Users size={28} />}
                  features={["Business cards", "Professional profiles"]}
                  accent="lime"
                  onLaunch={() =>
                    setNotice(
                      "Digital Card is a preview. No external application was opened.",
                    )
                  }
                />
              )}{" "}
              {appFilter !== "Business" && (
                <UI.AppCard
                  title="Website"
                  description="Build a home for your business online."
                  icon={<Globe size={28} />}
                  category="Tools"
                  features={["Content management", "Analytics"]}
                  accent="red"
                  onLaunch={() =>
                    setNotice(
                      "Website is a preview. No external application was opened.",
                    )
                  }
                />
              )}
            </div>
          </>
        )}
        {view === "settings" && (
          <div className="grid items-start gap-6 xl:grid-cols-[1fr_1.4fr]">
            <UI.ProfileCard
              name={profile.name}
              subtitle={profile.company}
              actions={<UI.Badge variant="success">Active</UI.Badge>}
            >
              <UI.DetailList
                items={[
                  { label: "Email", value: profile.email },
                  { label: "City", value: profile.city },
                ]}
              />
            </UI.ProfileCard>
            <UI.Card>
              <UI.CardHeader>
                <h2 className="text-base font-semibold">Profile details</h2>
              </UI.CardHeader>
              <UI.CardContent>
                <form
                  className="space-y-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    setProfile({
                      ...profile,
                      name: String(data.get("name")),
                      email: String(data.get("email")),
                      company: String(data.get("company")),
                      city: String(data.get("city")),
                    });
                    setNotice("Profile saved in this preview only.");
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {(
                      [
                        ["name", "Full name"],
                        ["email", "Email address"],
                        ["company", "Business name"],
                        ["city", "City"],
                      ] as const
                    ).map(([key, label]) => (
                      <UI.Field
                        key={key}
                        id={`profile-${key}`}
                        label={label}
                        required
                      >
                        <UI.Input
                          name={key}
                          defaultValue={profile[key]}
                          type={key === "email" ? "email" : "text"}
                        />
                      </UI.Field>
                    ))}
                  </div>
                  <label className="flex items-center gap-3">
                    <UI.Checkbox
                      checked={profile.notifications}
                      onCheckedChange={(checked) =>
                        setProfile({
                          ...profile,
                          notifications: checked === true,
                        })
                      }
                    />
                    Receive email notifications
                  </label>
                  <UI.Button type="submit">Save profile</UI.Button>
                </form>
              </UI.CardContent>
            </UI.Card>
          </div>
        )}
      </div>
      <UI.Dialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <UI.DialogContent>
          <UI.DialogHeader>
            <UI.DialogTitle>
              {dialog === "create" ? "Create member" : "Notifications"}
            </UI.DialogTitle>
            <UI.DialogDescription>
              {dialog === "create"
                ? "Add a fictional member to this local example."
                : "Updates for your example workspace."}
            </UI.DialogDescription>
          </UI.DialogHeader>
          {dialog === "create" ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setPeople((current) => [
                  ...current,
                  {
                    id: crypto.randomUUID(),
                    name: String(data.get("name")),
                    company: String(data.get("company")),
                    city: String(data.get("city")),
                    status: "Pending",
                  },
                ]);
                setFilter("All members");
                setDialog(null);
                setNotice(
                  "Member created locally. Reloading restores the example records.",
                );
              }}
            >
              <UI.DialogBody>
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["name", "Full name"],
                    ["company", "Business name"],
                    ["city", "City"],
                  ].map(([name, label]) => (
                    <UI.Field
                      key={name}
                      id={`create-${name}`}
                      label={label}
                      required
                    >
                      <UI.CompactInput name={name} />
                    </UI.Field>
                  ))}
                </div>
              </UI.DialogBody>
              <UI.DialogFooter>
                <UI.DialogClose asChild>
                  <UI.Button type="button" variant="secondary">
                    Cancel
                  </UI.Button>
                </UI.DialogClose>
                <UI.Button type="submit">Create</UI.Button>
              </UI.DialogFooter>
            </form>
          ) : (
            <UI.DialogBody>
              <UI.EmptyState
                compact
                title="You're all caught up"
                description="There are no new notifications in this preview."
              />
            </UI.DialogBody>
          )}
        </UI.DialogContent>
      </UI.Dialog>
      <UI.Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <UI.DialogContent>
          <UI.DialogHeader>
            <UI.DialogTitle>Business information</UI.DialogTitle>
            <UI.DialogDescription>
              Fictional member details.
            </UI.DialogDescription>
          </UI.DialogHeader>
          <UI.DialogBody>
            {selected && (
              <UI.DetailList
                items={[
                  { label: "Name", value: selected.name },
                  { label: "Business", value: selected.company },
                  { label: "City", value: selected.city },
                  {
                    label: "Status",
                    value: (
                      <UI.Badge
                        variant={
                          selected.status === "Active" ? "success" : "warning"
                        }
                      >
                        {selected.status}
                      </UI.Badge>
                    ),
                  },
                ]}
              />
            )}
          </UI.DialogBody>
        </UI.DialogContent>
      </UI.Dialog>
    </UI.AppShell>
  );
}
