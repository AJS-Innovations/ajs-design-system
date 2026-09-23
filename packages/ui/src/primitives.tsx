"use client";
import * as React from "react";
import { Slot, Avatar as AvatarPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Search, LoaderCircle, X } from "lucide-react";
import { cn } from "./utils";

export function AjsProvider({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("ajs-root", className)} {...props}/>;
}
export const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ajs-primary disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: { default: "bg-ajs-primary text-white hover:opacity-90", secondary: "bg-[#efeff0] text-ajs-primary hover:bg-slate-200", outline: "border border-ajs-border bg-ajs-card text-ajs-primary hover:bg-ajs-background", ghost: "text-ajs-muted hover:bg-ajs-background", destructive: "bg-ajs-danger text-white hover:opacity-90", link: "text-ajs-primary hover:underline" },
    size: { sm: "h-8 px-3 text-xs", default: "h-10 px-5", lg: "h-12 px-5", icon: "size-10" },
    shape: { pill: "rounded-full", rounded: "rounded-md" },
  }, defaultVariants: { variant: "default", size: "default", shape: "pill" },
});
export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean };
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, shape, asChild, loading, disabled, children, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp ref={ref} className={cn(buttonVariants({variant,size,shape}),className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{asChild ? children : <>{loading && <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none"/>}{children}</>}</Comp>;
});
export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(function Input({ className, ...props },ref) {
  return <input ref={ref} className={cn("h-[50px] w-full min-w-0 rounded-md border border-ajs-border bg-ajs-card px-4 text-sm leading-6 text-ajs-foreground shadow-[0_2px_4px_rgba(0,0,0,0.075)] outline-none placeholder:text-slate-400 focus:border-ajs-primary focus:ring-1 focus:ring-ajs-primary disabled:opacity-50 aria-invalid:border-ajs-danger",className)} {...props}/>;
});
export const Textarea = React.forwardRef<HTMLTextAreaElement,React.ComponentPropsWithoutRef<"textarea">>(function Textarea({className,...props},ref){return <textarea ref={ref} className={cn("min-h-24 w-full rounded-md border border-ajs-border bg-ajs-card px-4 py-3 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.075)] outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-ajs-primary disabled:opacity-50 aria-invalid:border-ajs-danger",className)} {...props}/>;});
export function Label({className,...props}:React.ComponentProps<"label">){return <label className={cn("mb-1 block text-sm font-medium",className)} {...props}/>;}
export interface FieldProps { label:string; id:string; required?:boolean; error?:string; hint?:string; children:React.ReactElement<{id?:string;required?:boolean;"aria-invalid"?:boolean;"aria-describedby"?:string}>; className?:string }
export function Field({label,id,required,error,hint,children,className}:FieldProps){return <div className={className}><Label htmlFor={id}>{label}{required&&<span className="text-ajs-danger">*</span>}</Label>{React.cloneElement(children,{id,required,"aria-invalid":!!error,"aria-describedby":error||hint?`${id}-description`:undefined})}{(error||hint)&&<p id={`${id}-description`} className={cn("mt-1 text-xs",error?"text-ajs-danger":"text-ajs-muted")}>{error||hint}</p>}</div>;}
export const PasswordInput = React.forwardRef<HTMLInputElement,React.ComponentPropsWithoutRef<"input">>(function PasswordInput({className,...props},ref){const [visible,setVisible]=React.useState(false);return <div className="relative"><Input ref={ref} {...props} type={visible?"text":"password"} className={cn("pr-12",className)}/><Button disabled={props.disabled} variant="ghost" size="icon" type="button" className="absolute top-[5px] right-[7px] text-slate-400" aria-label={visible?"Hide password":"Show password"} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible?<EyeOff size={18}/>:<Eye size={18}/>}</Button></div>;});
export function SearchInput({className,...props}:React.ComponentProps<"input">){return <div className={cn("relative",className)}><Input type="search" aria-label="Search" {...props} className="h-[42px] pr-12"/><Search aria-hidden className="pointer-events-none absolute top-2.5 right-4 size-5 text-ajs-primary"/></div>;}

const badgeVariants=cva("inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium",{variants:{variant:{success:"border-green-200 bg-green-50 text-green-700",warning:"border-amber-200 bg-amber-50 text-amber-700",danger:"border-red-200 bg-red-50 text-red-700",neutral:"border-ajs-divider bg-ajs-background text-ajs-muted",info:"border-blue-200 bg-blue-50 text-blue-700"}},defaultVariants:{variant:"neutral"}});
export function Badge({className,variant,...props}:React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>){return <span className={cn(badgeVariants({variant}),className)} {...props}/>;}
export interface AvatarProps {name:string;src?:string;size?:"sm"|"md"|"lg";className?:string}
export function Avatar({name,src,size="md",className}:AvatarProps){return <AvatarPrimitive.Root className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-ajs-muted",{sm:"size-8 text-xs",md:"size-10 text-sm",lg:"size-24 text-2xl"}[size],className)}><AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover"/><AvatarPrimitive.Fallback delayMs={src?200:0}>{name.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarPrimitive.Fallback></AvatarPrimitive.Root>;}
export function Card({className,...props}:React.ComponentProps<"div">){return <div className={cn("rounded-[13px] border border-ajs-divider bg-ajs-card",className)} {...props}/>;}
export function CardHeader({className,...props}:React.ComponentProps<"div">){return <div className={cn("border-b border-ajs-divider bg-ajs-subtle px-4 py-3",className)} {...props}/>;}
export function CardContent({className,...props}:React.ComponentProps<"div">){return <div className={cn("p-4",className)} {...props}/>;}
export function Separator({className,...props}:React.ComponentProps<"hr">){return <hr className={cn("my-4 border-t border-ajs-divider",className)} {...props}/>;}
export function Skeleton({className,...props}:React.ComponentProps<"div">){return <div aria-hidden className={cn("animate-pulse rounded-md bg-slate-200 motion-reduce:animate-none",className)} {...props}/>;}
export function Alert({title,children,variant="info",onDismiss}: {title:string;children?:React.ReactNode;variant?:"info"|"success"|"danger";onDismiss?:()=>void}) {return <div role={variant==="danger"?"alert":"status"} className={cn("relative rounded-md border p-4",{info:"border-blue-200 bg-blue-50 text-blue-900",success:"border-green-200 bg-green-50 text-green-900",danger:"border-red-200 bg-red-50 text-red-900"}[variant])}><p className="pr-6 font-semibold">{title}</p>{children&&<div className="mt-1 text-xs">{children}</div>}{onDismiss&&<button type="button" aria-label="Dismiss notification" onClick={onDismiss} className="absolute top-3 right-3 rounded p-1 focus-visible:outline-2"><X size={16}/></button>}</div>;}
