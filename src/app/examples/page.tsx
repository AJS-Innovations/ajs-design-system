import type { Metadata } from "next";
import { ShellExample } from "@/components/examples/shell-example";

export const metadata: Metadata = {
  title: "App shell examples — AJS UI",
  description:
    "Interactive member and admin app shells built with AJS UI components and fictional local data.",
};

export default function ExamplesPage() {
  return <ShellExample />;
}
