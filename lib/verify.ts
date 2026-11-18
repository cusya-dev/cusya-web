import { createHmac, timingSafeEqual } from "node:crypto";

// Verifikasi keamanan (Cloudflare Turnstile). Hanya aktif jika kedua kunci diisi di environment variable.
export const COOKIE = "cusya-verified";
export const MAX_AGE = 60 * 60 * 24; // 24 jam

export const gateEnabled = () => Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);

const sign = (payload: string) => createHmac("sha256", process.env.TURNSTILE_SECRET_KEY ?? "").update(payload).digest("hex");

/** Cookie bertanda tangan: "<waktu-kedaluwarsa>.<hmac>" */
export function createToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${sign(String(exp))}`;
}

export function hasValidCookie(value?: string) {
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Hanya izinkan path internal (cegah open redirect). */
export function safeNext(value?: string | null) {
  // Tolak karakter kontrol (tab/newline dibuang browser saat parsing URL: "/\t/evil.com" menjadi "//evil.com").
  return value && /^\/(?![/\\])[^\u0000-\u001f\u007f\\]*$/.test(value) ? value : "/";
}
