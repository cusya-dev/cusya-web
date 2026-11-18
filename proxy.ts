import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, gateEnabled, hasValidCookie } from "@/lib/verify";

// Mesin pencari & pratinjau link (WhatsApp, Telegram, Discord, dll.) dibiarkan lewat supaya situs tetap bisa
// diindeks dan dibagikan. Catatan: User-Agent bisa dipalsukan; ini gerbang anti-bot, bukan kontrol akses.
const BOTS = /googlebot|bingbot|duckduckbot|baiduspider|yandex|slurp|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot/i;

export function proxy(request: NextRequest) {
  if (!gateEnabled()) return NextResponse.next(); // kunci Turnstile belum diisi → gerbang nonaktif
  if (BOTS.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();
  if (hasValidCookie(request.cookies.get(COOKIE)?.value)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/verify";
  url.search = "";
  url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

// Lewati: aset Next, /verify, API verifikasi, dan semua file statis (path yang mengandung titik).
export const config = { matcher: ["/((?!_next|api/verify|verify|.*\\..*).*)"] };
