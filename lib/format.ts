import type { Locale } from "@/lib/locale";

/** "2026-10-26" → "26 Oktober 2026" / "October 26, 2026" */
export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
