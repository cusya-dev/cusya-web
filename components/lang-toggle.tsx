"use client";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { LANG_COOKIE, locales, type Locale } from "@/lib/locale";

const labels: Record<Locale, string> = { id: "Bahasa Indonesia", en: "English" };

export function LangToggle() {
  const { locale, t, setSwitching } = useI18n();
  const router = useRouter();
  const [pending, start] = useTransition();

  // Konten kembali normal begitu proses ganti bahasa selesai (atau gagal).
  useEffect(() => {
    if (!pending) setSwitching(false);
  }, [pending, setSwitching]);

  function switchTo(next: Locale) {
    if (next === locale) return;
    setSwitching(true);
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    start(() => router.refresh());
  }

  return (
    <div role="group" aria-label={t.nav.language} className="flex rounded-xl border bg-white p-0.5 text-xs font-bold">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-label={labels[l]}
          aria-pressed={locale === l}
          onClick={() => switchTo(l)}
          className={`h-10 min-w-10 rounded-[10px] px-2.5 transition-colors ${locale === l ? "bg-cusya-600 text-white" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
