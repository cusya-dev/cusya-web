import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { Logo } from "@/components/logo";
import { Mascot } from "@/components/mascot";
import { Button } from "@/components/ui/button";
import { dict } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

export const metadata: Metadata = { title: "404 — Cusya" };

export default async function NotFound() {
  const t = dict[await getLocale()].notFound;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cusya-100 via-cusya-50 to-white px-5 text-center">
      <div aria-hidden className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(147,188,245,0.55),transparent_68%)] will-change-transform" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-6 h-80 w-80 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.55),transparent_68%)] will-change-transform [animation-delay:3s]" />

      <Link href="/" aria-label={t.home} className="absolute left-5 top-5 flex items-center gap-3">
        <Logo className="h-8 w-8" />
        <span className="text-lg font-extrabold tracking-tight">Cusya</span>
      </Link>

      <div className="relative">
        <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cusya-200 to-sky-200 opacity-80" />
        <Mascot pose="confused" className="relative w-52 animate-float drop-shadow-[0_20px_30px_rgba(47,85,157,0.3)] sm:w-60" />
      </div>

      <p className="relative mt-8 text-sm font-bold tracking-[0.2em] text-cusya-500">{t.code}</p>
      <h1 className="relative mt-2 bg-gradient-to-r from-cusya-800 via-cusya-600 to-sky-500 bg-clip-text pb-1 text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
        {t.title}
      </h1>
      <p className="relative mt-4 max-w-md text-lg text-muted-foreground">{t.text}</p>
      <Button asChild size="lg" className="relative mt-8">
        <Link href="/"><Home className="h-5 w-5" />{t.back}</Link>
      </Button>
    </main>
  );
}
