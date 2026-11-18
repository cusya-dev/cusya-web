import { NextResponse } from "next/server";
import { rateLimited } from "@/lib/rate-limit";
import { COOKIE, MAX_AGE, createToken, gateEnabled, safeNext } from "@/lib/verify";

export async function POST(request: Request) {
  let body: { token?: string; next?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* body kosong/rusak */
  }
  if (!gateEnabled()) return NextResponse.json({ ok: true, next: safeNext(body.next) });
  if (!body.token) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (rateLimited(ip ?? "anon")) return NextResponse.json({ ok: false }, { status: 429 });

  const form = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY ?? "", response: body.token });
  if (ip) form.set("remoteip", ip);

  let success = false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    success = ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    /* gagal menghubungi Cloudflare → anggap tidak lolos */
  }
  if (!success) return NextResponse.json({ ok: false }, { status: 403 });

  const response = NextResponse.json({ ok: true, next: safeNext(body.next) });
  response.cookies.set(COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return response;
}
