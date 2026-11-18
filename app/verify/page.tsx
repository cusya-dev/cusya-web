import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Mascot } from "@/components/mascot";
import { TurnstileGate } from "@/components/turnstile-gate";
import { dict } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { COOKIE, gateEnabled, hasValidCookie, safeNext } from "@/lib/verify";

export const metadata: Metadata = { title: "Security check — Cusya", robots: { index: false, follow: false } };

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  // Gerbang nonaktif atau sudah terverifikasi → langsung ke tujuan.
  if (!gateEnabled() || hasValidCookie((await cookies()).get(COOKIE)?.value)) redirect(next);

  const t = dict[await getLocale()].verify;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cusya-50 to-white px-5 py-10 text-center">
      <Mascot pose="head" className="w-24 animate-float drop-shadow-[0_16px_20px_rgba(47,85,157,0.3)] sm:w-28" eager />
      <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 max-w-md text-balance text-base text-muted-foreground sm:text-lg">{t.text}</p>
      <TurnstileGate siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} next={next} />
      <noscript>
        <p className="mt-6 text-sm font-semibold text-rose-600">{t.noscript}</p>
      </noscript>
    </main>
  );
}
