"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <main className="flex min-h-dvh flex-col items-center bg-white sm:justify-center sm:bg-transparent sm:py-8">
      <section className="w-full px-4 py-8 sm:w-auto sm:rounded-2xl sm:bg-card sm:p-12 sm:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
          <Image src="/assets/vmn-logo.svg" alt="VMN - Vyapaar Mahila Network" width={320} height={65} priority className="mt-[5px] h-auto w-full" />
          <h1 className="my-5 text-center text-lg leading-[27px] font-bold uppercase">Sign In</h1>
          <div className="border-t border-slate-200" />
          <form className="mt-8" onSubmit={(event) => { event.preventDefault(); setNotice("This local preview is not connected to production."); }}>
            <div className="pb-[19.5px]">
              <label htmlFor="contact" className="mb-[3px] block text-sm leading-[21px] font-medium">Contact Number<span className="text-destructive">*</span></label>
              <Input id="contact" name="contact" type="tel" autoComplete="tel" required />
            </div>
            <div className="mt-2 pb-[19.5px]">
              <label htmlFor="password" className="mb-[3px] block text-sm leading-[21px] font-medium">Password<span className="text-destructive">*</span></label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="pr-12" />
                <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute top-[5px] right-[7px]" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}</Button>
              </div>
            </div>
            <div className="mt-1 flex justify-end"><button type="button" className="cursor-pointer text-xs leading-5 font-medium text-[#051734] hover:underline" onClick={() => setNotice("Password recovery is unavailable in this local preview.")}>Forgot password?</button></div>
            <Button type="submit" size="lg" className="mt-5 w-full">Sign in</Button>
            <p className="mt-6 text-[13px] leading-[19.5px]">New to VMN? <button type="button" className="cursor-pointer text-xs font-medium text-[#051734] hover:underline" onClick={() => setNotice("Registration is unavailable in this local preview.")}>Create an Account</button></p>
            {notice && <p role="status" className="mt-4 text-xs text-foreground">{notice}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
