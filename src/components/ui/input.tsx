import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("h-[50px] w-full rounded-md border border-border bg-card px-4 text-sm leading-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 aria-invalid:border-destructive", className)} {...props} />;
}
