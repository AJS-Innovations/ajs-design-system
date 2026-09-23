import { notFound } from "next/navigation";
import { catalog, getDoc } from "@/lib/catalog";
import { ComponentPage } from "@/components/docs/component-page";
import { InstallationGuide, TokensGuide, CoverageGuide } from "@/components/docs/guide-pages";
export function generateStaticParams(){return catalog.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:`${getDoc(slug)?.title||"Documentation"} — AJS UI`};}
export default async function DocPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=getDoc(slug);if(!entry)notFound();return <article className="mx-auto max-w-4xl"><div className="mb-8"><p className="mb-3 text-[10px] font-medium tracking-widest text-slate-400 uppercase">{entry.group}</p><h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1><p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-500">{entry.description}</p></div>{slug==="installation"?<InstallationGuide/>:slug==="tokens"?<TokensGuide/>:slug==="coverage"?<CoverageGuide/>:<ComponentPage entry={entry}/>}</article>;}
