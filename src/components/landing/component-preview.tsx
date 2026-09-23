"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import {
  AjsProvider,
  Avatar,
  Badge,
  Button,
  Field,
  Input,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../packages/ui/src";

export function InstallCommand() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText("npm install @ajsinnovations/ui");
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }
  return (
    <div className="mt-8 max-w-[420px]">
      <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3">
        <span aria-hidden="true" className="text-[#777780]">
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-[11px] text-[#c6c6cb] sm:text-xs">
          npm install @ajsinnovations/ui
        </code>
        <button
          type="button"
          aria-label="Copy install command"
          onClick={copy}
          className="rounded p-2 text-[#a5a5ad] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4b4b]"
        >
          {status === "copied" ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-xs text-[#a5a5ad]">
        {status === "copied"
          ? "Copied. You're ready to install."
          : status === "failed"
            ? "Select and copy the command above."
            : "v0.1.0 · Available on npm"}
      </p>
    </div>
  );
}

export function ComponentPreview() {
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="mb-4 flex items-center justify-between text-[11px] text-[#a5a5ad]">
        <span>THE COMPONENTS, IN ACTION</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#ff4b4b]" />
          Live preview
        </span>
      </div>
      <AjsProvider className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-ajs-foreground shadow-[0_32px_90px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 border-b border-ajs-divider px-6 py-5">
          <Avatar name="Alex Morgan" />
          <div className="flex-1">
            <p className="font-semibold">Your workspace</p>
            <p className="text-xs text-ajs-muted">
              A little structure. A lot of possibility.
            </p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        <Tabs defaultValue="settings" className="px-6 pb-6">
          <TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSaved(true);
              }}
              className="space-y-5"
            >
              <Field id="preview-workspace" label="Workspace name">
                <Input
                  defaultValue="Studio workspace"
                  onChange={() => setSaved(false)}
                />
              </Field>
              <div className="flex items-center justify-between gap-4 py-1">
                <div>
                  <label
                    htmlFor="preview-notifications"
                    className="font-medium"
                  >
                    Email notifications
                  </label>
                  <p className="mt-1 text-xs text-ajs-muted">
                    Keep your team in the loop.
                  </p>
                </div>
                <Switch
                  id="preview-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ajs-divider pt-5">
                <span role="status" className="text-xs text-ajs-muted">
                  {saved ? "Saved in this preview." : "Make it yours."}
                </span>
                <Button type="submit">
                  {saved ? "Saved" : "Save changes"}
                  {saved ? <Check size={15} /> : <ArrowRight size={15} />}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="members" className="min-h-[248px]">
            {[
              ["Alex Morgan", "Owner"],
              ["Jamie Chen", "Designer"],
              ["Sam Taylor", "Developer"],
            ].map(([name, role]) => (
              <div
                key={name}
                className="flex items-center gap-3 border-b border-ajs-divider py-4 last:border-0"
              >
                <Avatar name={name} size="sm" />
                <span className="flex-1 font-medium">{name}</span>
                <Badge>{role}</Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </AjsProvider>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#a5a5ad]">
        <span>Real components.</span>
        <span>Real interactions.</span>
        <span>Your next interface.</span>
      </div>
    </div>
  );
}
