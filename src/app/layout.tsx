import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AJS UI — Component Library", description: "Standalone React components, design tokens, and interface patterns by AJS Innovations." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://api.fontshare.com"/><link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous"/><link href="https://api.fontshare.com/v2/css?f[]=switzer@1&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
