import { cookies } from "next/headers";
import { defaultLocale, LANG_COOKIE, type Locale } from "@/lib/locale";

// Bahasa dibaca dari cookie (diset tombol ID/EN). Tanpa cookie → bahasa default (lihat defaultLocale di lib/locale.ts).
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === "id" || value === "en" ? value : defaultLocale;
}
